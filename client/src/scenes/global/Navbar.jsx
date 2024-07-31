import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { setIsCartOpen } from "../../redux/cartSlice";
import { selectTotalItemsCount } from "../../redux/cartSlice";
import { shades } from "../../theme";
import { fetchCategories } from "../../api/categories";
import { fetchItem } from "../../api/items";
import {
  Badge,
  Box,
  IconButton,
  Tab,
  Tabs,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import {
  ShoppingBagOutlined as ShoppingBagOutlinedIcon,
  MenuOutlined as MenuOutlinedIcon,
  SearchOutlined as SearchOutlinedIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const totalItemsCount = useSelector(selectTotalItemsCount);
  const isDesktop = useMediaQuery("(min-width:600px)");
  const [value, setValue] = useState(0);
  const [categories, setCategories] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Function to fetch categories
  const getCategories = async () => {
    try {
      const categories = await fetchCategories();
      setCategories(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const updateTabValue = async (path, categories) => {
    const parts = path.split("/");
    if (parts.length > 2 && parts[1] === "item") {
      const itemId = parts[2];
      try {
        const item = await fetchItem(itemId);
        const category = item.attributes.clothingTypeCategory;
        const index = categories.findIndex((cat) => cat === category);
        if (index !== -1) {
          setValue(index);
        }
      } catch (error) {
        console.error("Error fetching item category:", error);
      }
    } else {
      const categoryPath = parts[2];
      if (categoryPath) {
        const index = categories.findIndex(
          (category) => category === categoryPath
        );
        if (index !== -1) {
          setValue(index);
        }
      } else {
        setValue(false);
      }
    }
  };

  useEffect(() => {
    updateTabValue(location.pathname, categories);
  }, [location.pathname, categories]);

  const handleChange = (event, newValue) => {
    const selectedCategory = categories[newValue];
    setValue(newValue);
    history.push(`/category/${selectedCategory}`);
  };

  // Handle for hamburger menu
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Handle for search icon in navbar &
  // Props for SearchBar:
  // Using in handleItemClick &
  // ClickAwayListener &
  // Close icon for textfield &
  const handleToggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      backgroundColor="rgba(255, 255, 255, 0.95)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="10"
    >
      <Box
        width="80%"
        m="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt="5px"
      >
        {/* LOGO */}
        <Box
          onClick={() => history.push("/")}
          color={shades.secondary[500]}
          fontSize="18px"
          sx={{ "&:hover": { cursor: "pointer" } }}
        >
          STYLISH ONE
        </Box>

        {/* 600PX SCREEN & MORE */}
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          alignItems="center"
          zIndex="2"
        >
          {isDesktop && (
            <Tabs value={value} onChange={handleChange}>
              {categories.map((category, index) => (
                <Tab
                  key={index}
                  label={category}
                  onClick={() => history.push(`/category/${category}`)}
                />
              ))}
            </Tabs>
          )}

          {/* SEARCH ICON */}
          <IconButton sx={{ color: "black" }} onClick={handleToggleSearch}>
            <SearchOutlinedIcon />
          </IconButton>

          {/* SHOPPING BAG ICON */}
          <Badge
            badgeContent={totalItemsCount}
            color="secondary"
            invisible={totalItemsCount === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: "5px",
                top: "5px",
                p: "0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}
          >
            <IconButton
              onClick={() => dispatch(setIsCartOpen({}))}
              sx={{ color: "black" }}
            >
              <ShoppingBagOutlinedIcon />
            </IconButton>
          </Badge>

          {/* 600 PX AND LESS - MOBILE MENU */}
          {!isDesktop && (
            <IconButton sx={{ color: "black" }} onClick={handleDrawerToggle}>
              <MenuOutlinedIcon />
            </IconButton>
          )}
        </Box>
      </Box>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: "180px", position: "relative" }} role="presentation">
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              color: "black",
              position: "absolute",
              top: "8px",
              right: "12px",
            }}
          >
            <CloseIcon />
          </IconButton>
          <List sx={{ mt: "30px" }}>
            {categories.map((category, index) => (
              <ListItem key={index}>
                <ListItemButton
                  onClick={() => history.push(`/category/${category}`)}
                >
                  <ListItemText primary={category} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <SearchBar
        searchOpen={searchOpen}
        handleToggleSearch={handleToggleSearch}
      />
    </Box>
  );
};

export default Navbar;
