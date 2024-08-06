import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../redux/cartSlice";
import { fetchItems } from "../../api/items";
import { shades } from "../../theme";
import {
  Box,
  Typography,
  Tab,
  Tabs,
  useMediaQuery,
  Button,
} from "@mui/material";
import Item from "../../components/Item";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [value, setValue] = useState("all");
  const isXs = useMediaQuery("(max-width:600px)");
  const isSm = useMediaQuery("(min-width:601px) and (max-width:960px)");
  const isMd = useMediaQuery("(min-width:961px) and (max-width:1280px)");
  const isLg = useMediaQuery("(min-width:1280px)");

  const getInitialVisibleItems = () => {
    if (isXs) return 3;
    if (isSm) return 4;
    if (isMd) return 6;
    if (isLg) return 8;
  };

  const [visibleItems, setVisibleItems] = useState(getInitialVisibleItems);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setVisibleItems(getInitialVisibleItems());
  };

  const getItems = async () => {
    try {
      const items = await fetchItems();
      dispatch(setItems(items));
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    getItems();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const loadMoreItems = () => {
    const increment = isXs ? 3 : isSm ? 4 : isMd ? 6 : 8;
    setVisibleItems((preVisibleItems) => preVisibleItems + increment);
  };

  const filteredItems = (items || []).filter((item) => {
    if (value === "all") return true;
    return item.attributes.category === value;
  });

  const itemsToDisplay = filteredItems.slice(0, visibleItems);

  return (
    <Box
      // id - Anchor from MainCarousel
      id="featured-products"
      width="80%"
      m={{ md: "0 auto", xs: "0 auto" }}
      p={{ md: "15px 40px 40px 40px", xs: "10px 0 30px 0" }}
      sx={{
        borderBottom: "2px solid",
        borderColor: shades.neutral[300],
      }}
    >
      <Typography variant="h2" fontSize="30px" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="scrollable auto tabs"
          sx={{
            margin: "20px 0 30px 0",
            "& .MuiTabs-scrollButtons": {
              transition: "opacity 0.3s ease, width 0.3s ease",
              "&.Mui-disabled": {
                width: "0",
                opacity: "0",
              },
            },
          }}
        >
          <Tab label="ALL" value="all" />
          <Tab label="NEW ARRIVALS" value="newArrivals" />
          <Tab label="BEST SELLERS" value="bestSellers" />
          <Tab label="TOP RATED" value="topRated" />
        </Tabs>
      </Box>
      <Box
        m="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
        sx={{
          "& > div": {
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.03)",
            },
          },
        }}
      >
        {itemsToDisplay.map((item) => (
          <Box key={item.id} display="flex" justifyContent="center">
            <Item item={item} useLazyLoad={false} />
          </Box>
        ))}
      </Box>
      {visibleItems < filteredItems.length && (
        <Box
          display="flex"
          justifyContent="center"
          m={{ md: "35px 0 0 0", sm: "20px 0 0 0", xs: "20px 0 0 0" }}
        >
          <Button
            onClick={loadMoreItems}
            variant="contained"
            sx={{
              borderRadius: "3px",
              backgroundColor: "#222222",
              color: "white",
              "@media (min-width: 960px)": {
                "&:hover": {
                  backgroundColor: "rgba(34, 34, 34, 0.05)",
                  color: "black",
                },
                "&:active": {
                  backgroundColor: "#222222",
                  color: "white",
                },
              },
            }}
          >
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ShoppingList;
