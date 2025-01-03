import MainCarousel from "./MainCarousel";
import AboutUsSection from "./AboutUsSection";
import ShoppingList from "./ShoppingList";
import Subscribe from "./Subscribe";

const Home = () => {
  return (
    <div className="home">
      <MainCarousel />
      <AboutUsSection />
      <ShoppingList />
      <Subscribe />
    </div>
  );
};

export default Home;
