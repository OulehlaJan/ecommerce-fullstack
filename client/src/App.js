import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { Box } from "@mui/material";
import Home from "./scenes/home/Home";
import Navbar from "./scenes/global/Navbar";
import Footer from "./scenes/global/Footer";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import ItemsPage from "./scenes/itemsPage/ItemsPage";
import CartMenu from "./scenes/global/CartMenu";
import Checkout from "./scenes/checkout/Checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import NotFound from "./scenes/notFound/NotFound";

// Scroll to top after refresh
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    const handleLoad = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return null;
};

function App() {
  return (
    <Box
      className="app"
      display="flex"
      flexDirection="column"
      minHeight="100vh"
    >
      <Router>
        <ScrollToTop />
        <Navbar />
        <Box component="main" flex="1">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/item/:itemId" component={ItemDetails} />
            <Route path="/category/:categoryId" component={ItemsPage} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/checkout/success" component={Confirmation} />
            <Route component={NotFound} />
          </Switch>
        </Box>
        <CartMenu />
        <Box>
          <Footer />
        </Box>
      </Router>
    </Box>
  );
}

export default App;
