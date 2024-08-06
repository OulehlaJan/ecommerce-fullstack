import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addToCart } from "../../redux/cartSlice";
import { fetchItems, fetchItem } from "../../api/items";
import { getItemImageUrl } from "../../utils/itemImageUtils";
import { shades } from "../../theme";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Tab,
  Tabs,
  CircularProgress,
} from "@mui/material";
import {
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
  Favorite as FavoriteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from "@mui/icons-material";
import Item from "../../components/Item";

const ItemDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [showSizeError, setShowSizeError] = useState(false);

  // Function to fetch a single item
  const getItem = async (itemId) => {
    try {
      const item = await fetchItem(itemId);
      setItem(item);
    } catch (error) {
      console.error("Error fetching item", error);
    }
  };

  // Function to fetch all items
  const getItems = async () => {
    try {
      const items = await fetchItems();
      setItems(items);
    } catch (error) {
      console.error("Error fetching items", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getItem(itemId);
      await getItems();
      setLoading(false);
    };

    fetchData();
  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

  // For breadcrumb navigation
  const category = item?.attributes?.clothingTypeCategory || "unknown Category";
  const itemName = item?.attributes?.name || "unknown Item";

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setShowSizeError(false);
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      dispatch(
        addToCart({
          item: {
            ...item,
            count,
            size: selectedSize,
            uniqueKey: `${item.id}-${selectedSize}`,
          },
        })
      );
    } else {
      setShowSizeError(true);
    }
  };

  const handleFavoriteIconClick = () => {
    setLiked(!liked);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGE */}
        <Box
          flex="1 1 40%"
          mb="40px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="450px"
        >
          {imageLoading && <CircularProgress />}
          <img
            src={getItemImageUrl(item)}
            alt={item?.attributes?.name}
            width="100%"
            height="100%"
            onLoad={handleImageLoad}
            style={{
              objectFit: "contain",
              display: imageLoading ? "none" : "block",
            }}
          />
        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%">
          <Box display="flex" justifyContent="">
            {/* BREADCRUMB NAVIGATION */}
            <Box
              sx={{
                cursor: "pointer",
                "&:hover": {
                  color: "black",
                  fontWeight: "bold",
                },
              }}
              onClick={() => history.push("/")}
            >
              Home
            </Box>
            <Box p="0 4px">/</Box>
            <Box
              sx={{
                cursor: "pointer",
                "&:hover": {
                  color: "black",
                  fontWeight: "bold",
                },
              }}
              onClick={() => history.push(`/category/${category}`)}
            >
              {category}
            </Box>
            <Box p="0 4px">/</Box>
            <Box fontWeight="bold">{itemName}</Box>
          </Box>

          {/* PRODUCT INFO */}
          <Box m="35px 0 25px 0">
            <Typography variant="h2" fontSize="35px" fontWeight="bold">
              {item?.attributes?.name}
            </Typography>
            <Typography mt="20px" fontSize="20px">
              ${item?.attributes?.price}
            </Typography>
            <Typography mt="20px" fontSize="15px">
              {item?.attributes?.longDescription}
            </Typography>
          </Box>

          {/* SIZES */}
          <Box m="30px 0 25px 0">
            {showSizeError && !selectedSize && (
              <Typography color="error">Please select a size</Typography>
            )}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(auto-fit, minmax(60px, 1fr))",
                  md: "repeat(9, 1fr)",
                },
                gap: "10px",
              }}
            >
              {item?.attributes?.sizes ? (
                item.attributes.sizes.map((size, index) => (
                  <Button
                    key={index}
                    variant={selectedSize === size ? "contained" : "outlined"}
                    onClick={() => handleSizeChange(size)}
                    sx={{
                      borderRadius: "3px",
                      backgroundColor:
                        selectedSize === size
                          ? "#222222"
                          : "rgba(34, 34, 34, 0.05)",
                      color: selectedSize === size ? "white" : "black",
                      "&:hover": {
                        backgroundColor: "#222222",
                        color: "white",
                      },
                    }}
                  >
                    {size}
                  </Button>
                ))
              ) : (
                <Typography fontWeight="bold">No sizes available</Typography>
              )}
            </Box>
          </Box>

          {/* COUNTER AND ADD TO CART BUTTON */}
          <Box display="flex" alignItems="center" minHeight="50px" mt="20px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
              borderRadius="3px"
              sx={{ backgroundColor: "rgba(34, 34, 34, 0.05)" }}
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: "3px",
                minWidth: "150px",
                p: "10px 40px",
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
              onClick={handleAddToCart}
            >
              ADD TO CART
            </Button>
          </Box>
          <Box>
            <Box m="20px 0 5px 0" display="flex">
              <IconButton
                sx={{
                  borderRadius: "5px",
                  color: "#000000DE",
                }}
                onClick={handleFavoriteIconClick}
              >
                {liked ? (
                  <FavoriteIcon sx={{ color: "red" }} />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )}
                <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* INFORMATION TABS */}
      <Box m="20px 0">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="scrollable auto tabs"
          sx={{
            "& .MuiTabs-scrollButtons": {
              transition: "opacity 0.3s ease, width 0.3s ease",
              "&.Mui-disabled": {
                width: 0,
                opacity: 0,
              },
            },
          }}
        >
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="SIZE CHART" value="size chart" />
          <Tab label="MATERIALS & CARE" value="materials & care" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && (
          <Typography fontSize="15px">
            {item?.attributes?.longDescription}
          </Typography>
        )}
        {value === "materials & care" && (
          <Typography fontSize="15px">Materials & Care</Typography>
        )}
        {value === "size chart" && (
          <Typography fontSize="15px">Size Chart</Typography>
        )}
        {value === "reviews" && (
          <Typography fontSize="15px">Reviews</Typography>
        )}
      </Box>

      {/* RELATED ITEMS */}
      <Box mt="50px" width="100%">
        <Typography
          variant="h3"
          fontWeight="bold"
          display="flex"
          justifyContent="center"
        >
          Related Products
        </Typography>
        <Box
          m="25px auto"
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
          {items.slice(0, 4).map((item, i) => (
            <Box
              key={`${item.name}-${i}`}
              display="flex"
              justifyContent="center"
            >
              <Item item={item} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;
