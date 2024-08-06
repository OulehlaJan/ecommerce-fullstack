import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { shades } from "../../theme";

const Footer = () => {
  const {
    palette: { neutral },
  } = useTheme();

  return (
    <Box p="40px 0" backgroundColor={neutral.light}>
      <Box
        width="80%"
        m="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            mt="10px"
            mb="20px"
            color={shades.secondary[500]}
          >
            STYLISH ONE
          </Typography>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat
          </div>
        </Box>

        <Box
          width={{ sm: "clamp(20%, 25%, 30%)", xs: "100%" }}
          sx={{ mt: { sm: "30px", xs: "35px" } }}
        >
          <Typography variant="h4" fontWeight="bold" mb="20px">
            About Us
          </Typography>
          <Typography mb="20px">Careers</Typography>
          <Typography mb="20px">Our Stores</Typography>
          <Typography mb="20px">Terms & Conditions</Typography>
          <Typography>Privacy Policy</Typography>
        </Box>

        <Box
          width={{ sm: "clamp(20%, 25%, 30%)", xs: "100%" }}
          sx={{ mt: { sm: "30px", xs: "35px" } }}
        >
          <Typography variant="h4" fontWeight="bold" mb="20px">
            Customer Care
          </Typography>
          <Typography mb="20px">Help Center</Typography>
          <Typography mb="20px">Track Your Order</Typography>
          <Typography mb="20px">Corporate & Bulk Purchasing</Typography>
          <Typography>Returns & Refunds</Typography>
        </Box>

        <Box
          width={{ sm: "clamp(20%, 25%, 30%)", xs: "100%" }}
          sx={{ mt: { sm: "30px", xs: "35px" } }}
        >
          <Typography variant="h4" fontWeight="bold" mb="20px">
            Contact Us
          </Typography>
          <Typography mb="20px">
            50 north Whatever Blvd, Washington, DC 10501
          </Typography>
          <Typography mb="20px" sx={{ wordWrap: "break-word" }}>
            Email: mredwardroh@gmail.com
          </Typography>
          <Typography mb="20px">(222)333-4444</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
