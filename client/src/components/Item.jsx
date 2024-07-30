import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { shades } from "../theme";
import { fetchSizes } from "../api/sizes";
import {
  IconButton,
  Box,
  Typography,
  useTheme,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
  Favorite as FavoriteIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  ArrowBackIos as ArrowBackIosIcon,
} from "@mui/icons-material";
import LazyLoad from "react-lazyload";

const Item = ({ item, width, useLazyLoad = true }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sizes, setSizes] = useState([]);
  const [sizeIndex, setSizeIndex] = useState(0);
  const {
    palette: { neutral },
  } = useTheme();

  const { category, price, name, image } = item.attributes;
  const {
    data: {
      attributes: {
        formats: {
          medium: { url },
        },
      },
    },
  } = image;

  // Function to fetch sizes
  const getSizes = async (itemId) => {
    try {
      const sizes = await fetchSizes(itemId);
      setSizes(sizes);
    } catch (error) {
      console.error("Error fetching sizes:", error);
    }
  };

  useEffect(() => {
    getSizes(item.id);
  }, [item.id]);

  const handleFavoriteIconClick = () => {
    setLiked(!liked);
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleSizeChange = (direction) => {
    if (sizes.length > 0) {
      if (direction === "left") {
        setSizeIndex(
          (prevIndex) => (prevIndex - 1 + sizes.length) % sizes.length
        );
      } else if (direction === "right") {
        setSizeIndex((prevIndex) => (prevIndex + 1) % sizes.length);
      }
    }
  };

  const itemContent = (
    <Box
      width={width}
      position="relative"
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <IconButton
        onClick={handleFavoriteIconClick}
        sx={{
          position: "absolute",
          top: "10px",
          left: "10px",
          color: liked ? "red" : "gray",
          zIndex: 1,
          "& .MuiSvgIcon-root": {
            fontSize: "25px",
          },
        }}
      >
        {liked ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
      </IconButton>
      <Box
        position="relative"
        width="300px"
        height="400px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {loading && <CircularProgress />}
        <img
          alt={item.name}
          width="300px"
          height="400px"
          src={`http://localhost:1337${url}`}
          onClick={() => navigate(`/item/${item.id}`)}
          onLoad={handleImageLoad}
          style={{ display: loading ? "none" : "block", cursor: "pointer" }}
        />
        <Box
          display={isHovered ? "block" : "none"}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          p="0 5%"
        >
          {/* BUTTONS */}
          <Box display="flex" justifyContent="space-between">
            {/* COUNTER */}
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.neutral[100]}
              borderRadius="3px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            {/* SIZES */}
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.neutral[100]}
              borderRadius="3px"
            >
              <IconButton
                onClick={() => handleSizeChange("left")}
                disabled={sizes.length === 0}
              >
                <ArrowBackIosIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>
                {sizes.length > 0 ? sizes[sizeIndex] : "N/A"}
              </Typography>
              <IconButton
                onClick={() => handleSizeChange("right")}
                disabled={sizes.length === 0}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>
            <Button
              sx={{ backgroundColor: shades.primary[300], color: "white" }}
              onClick={() => {
                if (sizes[sizeIndex]) {
                  dispatch(
                    addToCart({
                      item: { ...item, count, size: sizes[sizeIndex] },
                    })
                  );
                } else {
                  alert("Please select a size.");
                }
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>
      <Box mt="10px">
        <Typography variant="subtitle2" color={neutral.dark}>
          {category
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
        </Typography>
        <Typography>{name}</Typography>
        <Typography fontWeight="bold">${price}</Typography>
      </Box>
    </Box>
  );

  return useLazyLoad ? (
    <LazyLoad height={200} offset={100} once>
      {itemContent}
    </LazyLoad>
  ) : (
    itemContent
  );
};

export default Item;
