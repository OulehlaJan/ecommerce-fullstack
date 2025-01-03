import { useState } from "react";
import { Box, InputBase, Divider, Typography, IconButton } from "@mui/material";
import { MarkEmailReadOutlined as MarkEmailReadOutlinedIcon } from "@mui/icons-material";

const Subscribe = () => {
  const [email, setEmail] = useState("");

  return (
    <Box
      // id - Anchor from AboutUsSection
      id="subscribe-section"
      width="80%"
      m="0px auto"
      p={{ md: "60px 0 120px 0", sm: "30px 0 70px 0", xs: "60px 0 80px 0" }}
      textAlign="center"
    >
      <IconButton>
        <MarkEmailReadOutlinedIcon fontSize="large" />
      </IconButton>
      <Typography variant="h3">Subscribe To Our Newsletter</Typography>
      <Typography>
        and receive $20 coupon for your first order when you checkout
      </Typography>
      <Box
        p="2px 4px"
        m="15px auto"
        display="flex"
        alignItems="center"
        width="75%"
        backgroundColor="#F2F2F2"
      >
        <InputBase
          sx={{
            ml: "1px",
            flex: "1px",
          }}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Divider sx={{ height: "28px", m: "0.5px" }} orientation="vertical" />
        <Typography sx={{ p: "10px", ":hover": { cursor: "pointer" } }}>
          Subscribe
        </Typography>
      </Box>
    </Box>
  );
};

export default Subscribe;
