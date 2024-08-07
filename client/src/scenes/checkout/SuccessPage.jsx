import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Button, Alert, AlertTitle } from "@mui/material";
import { clearCart } from "../../redux/cartSlice";

const SuccessPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // Clearing cart after successful order
  useEffect(() => {
    console.log("Confirmation component rendered");
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      m="20px 15px 0px 15px"
      height="100vh"
    >
      <Alert
        severity="success"
        sx={{
          p: { sm: "100px 190px 100px 190px", xs: "100px 20px 100px 20px" },
          borderRadius: "10px",
          fontSize: "18px",
        }}
      >
        <AlertTitle>Success</AlertTitle>
        You have successfully made an Order - <strong>Thank You!</strong>
      </Alert>
      <Box>
        <Button
          onClick={() => history.push("/")}
          variant="contained"
          color="primary"
          sx={{
            p: "10px 25px",
            mt: "25px",
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
          Continue shopping
        </Button>
      </Box>
    </Box>
  );
};

export default SuccessPage;
