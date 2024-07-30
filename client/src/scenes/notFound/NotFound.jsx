import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
    >
      <Typography variant="h1" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h2" component="h2" gutterBottom>
        Oops! Page not found.
      </Typography>
      <Typography fontSize="16px" gutterBottom>
        The page you're looking for doesn't exist.
      </Typography>
      <Button
        onClick={() => navigate("/")}
        variant="contained"
        color="primary"
        sx={{
          p: "10px 40px",
          mt: "15px",
          backgroundColor: "#222222",
          color: "white",
          borderRadius: "3px",
          minWidth: "150px",
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
        Go to Homepage
      </Button>
    </Box>
  );
};

export default NotFound;
