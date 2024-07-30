import { Box, Typography, Button } from "@mui/material";
import { shades } from "../../theme";
import Image from "../../assets/aboutUsSection/AboutUsSection.jpeg";
import AnchorLink from "react-anchor-link-smooth-scroll";

const AboutUsSection = () => {
  return (
    <Box
      // id - Anchor from MainCarousel
      id="about-us"
      p={{ md: "60px 40px 32px 40px", xs: "40px 20px 35px 20px" }}
      overflow="hidden"
      sx={{
        "& > div": {
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          borderTopRightRadius: { md: "50px", xs: "none" },
          borderBottomRightRadius: "50px",
          "&:hover": {
            transform: "scale(1.03)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
            borderTopRightRadius: { md: "50px", xs: "none" },
            borderBottomRightRadius: "50px",
          },
        },
      }}
    >
      <Box display="flex" flexDirection={{ md: "row", xs: "column" }}>
        <Box
          flex="1"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src={Image} alt="About Us" height="100%" width="100%" />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          flex="1"
          bgcolor="rgba(245, 245, 245, 0.4)"
          p={{ md: "50px", xs: "20px" }}
          sx={{
            borderTopRightRadius: { md: "50px", xs: "none" },
            borderBottomRightRadius: "50px",
          }}
        >
          <Box>
            <Typography
              variant="h2"
              fontSize={{ md: "38px", sm: "30px", xs: "26px" }}
              fontWeight="bold"
              mb={{ md: "15px", xs: "18px" }}
              gutterBottom
              sx={{
                borderBottom: "2px solid",
                borderColor: shades.neutral[300],
                pb: "10px",
              }}
            >
              STYLISH ONE
            </Typography>
            <Typography
              fontSize={{ md: "23px", sm: "22px", xs: "20px" }}
              fontWeight="bold"
              mb="16px"
            >
              About Us
            </Typography>
            <Typography fontSize={{ md: "19px", sm: "17px", xs: "15px" }}>
              Our company is dedicated to providing the best service in the
              industry. With a focus on innovation and quality, we strive to
              exceed our customers' expectations.
            </Typography>
            <Typography
              fontSize={{ md: "19px", sm: "17px", xs: "15px" }}
              mt="16px"
            >
              Founded in 2014, we have grown to become a leader in our field,
              thanks to our commitment to excellence and our talented team of
              professionals.
            </Typography>
            <Typography
              fontSize={{ md: "19px", sm: "17px", xs: "15px" }}
              mt="16px"
            >
              Subscribe to our newsletter to receive news and updates on sales.
            </Typography>
            {/* ANCHOR ON SUBSCRIBE */}
            <AnchorLink href="#subscribe-section">
              <Button
                variant="contained"
                sx={{
                  m: {
                    md: "20px 0 0 0",
                    xs: "20px 0 10px 0",
                  },
                  p: "10px",
                  fontSize: { md: "15px", sm: "14px", xs: "11px" },
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
                Newsletter
              </Button>
            </AnchorLink>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutUsSection;
