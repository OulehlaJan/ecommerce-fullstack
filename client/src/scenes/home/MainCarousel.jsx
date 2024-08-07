import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import { shades } from "../../theme";
import { useTheme } from "@mui/material/styles";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
  KeyboardDoubleArrowDown as KeyboardDoubleArrowDownIcon,
} from "@mui/icons-material";
import AnchorLink from "react-anchor-link-smooth-scroll";

// Imports all image from assets/mainCarousel folder
const importAll = (r) =>
  r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, []);

const heroTextureImports = importAll(
  require.context("../../assets/mainCarousel", false, /\.(png|jpe?g|svg)$/)
);

const MainCarousel = () => {
  const isNonMobile = useMediaQuery("min-width:600px");
  const theme = useTheme();

  const imgHeight = {
    width: "100%",
    height: "650px",
    objectFit: "cover",
    backgroundAttachment: "fixed",
    [theme.breakpoints.up("md")]: {
      height: "900px",
    },
  };

  return (
    <Box position="relative">
      <Carousel
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        swipeScrollTolerance={200}
        renderArrowPrev={(onClickHandler, hasPrev, label) => (
          <IconButton
            onClick={onClickHandler}
            sx={{
              position: "absolute",
              top: "50%",
              left: "0",
              color: "white",
              padding: "5px",
              zIndex: "9",
            }}
          >
            <NavigateBeforeIcon sx={{ fontSize: 40 }} />
          </IconButton>
        )}
        renderArrowNext={(onClickHandler, hasNext, label) => (
          <IconButton
            onClick={onClickHandler}
            sx={{
              position: "absolute",
              top: "50%",
              right: "0",
              color: "white",
              padding: "5px",
              zIndex: "10",
            }}
          >
            <NavigateNextIcon sx={{ fontSize: 40 }} />
          </IconButton>
        )}
      >
        {Object.values(heroTextureImports).map((texture, index) => (
          <Box key={`carousel-image-${index}`}>
            {/* IMAGE */}
            <Box
              component="img"
              src={texture}
              alt={`carousel-${index}`}
              sx={imgHeight}
            />
            {/* TEXT BOX */}
            <Box
              color="white"
              padding="20px"
              borderRadius="1px"
              textAlign="left"
              backgroundColor="rgb(0, 0, 0, 0.4)"
              position="absolute"
              top="46%"
              left={isNonMobile ? "10%" : "0"}
              right={isNonMobile ? undefined : "0"}
              margin={isNonMobile ? undefined : "0 auto"}
              maxWidth={isNonMobile ? undefined : "240px"}
            >
              <Typography color={shades.secondary[200]}>
                -- NEW ITEMS
              </Typography>
              <Typography variant="h1">Summer Sale</Typography>
              {/* ANCHOR ON SHOPPING LIST */}
              <AnchorLink href="#featured-products">
                <Typography
                  fontWeight="bold"
                  color={shades.secondary[300]}
                  sx={{
                    textDecoration: "underline",
                  }}
                >
                  Discover More
                </Typography>
              </AnchorLink>
            </Box>
          </Box>
        ))}
      </Carousel>
      {/* ANCHOR ON ABOUT US SECTION */}
      <AnchorLink href="#about-us">
        <Box
          sx={{
            position: "absolute",
            bottom: "30px",
            left: { md: "50%", sm: "50%", xs: "45%" },
            transform: "translateX(-50%)",
            color: "white",
            zIndex: "9",
            animation: "bounce 2s infinite",
            "@keyframes bounce": {
              "0%, 100%": {
                transform: "translateY(0)",
              },
              "50%": {
                transform: "translateY(-10px)",
              },
            },
          }}
        >
          <KeyboardDoubleArrowDownIcon
            sx={{ fontSize: { md: "50px", xs: "40px" } }}
          />
        </Box>
      </AnchorLink>
    </Box>
  );
};

export default MainCarousel;
