import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Box component="main" flex="1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="item/:itemId" element={<ItemDetails />} />
            <Route path="category/:categoryId" element={<ItemsPage />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="checkout/success" element={<Confirmation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
        <CartMenu />
        <Box>
          <Footer />
        </Box>
      </BrowserRouter>
    </Box>
  );
}

export default App;
