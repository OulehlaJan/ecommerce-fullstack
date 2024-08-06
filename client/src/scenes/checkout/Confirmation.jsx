import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Alert, AlertTitle } from "@mui/material";
import { clearCart } from "../../redux/cartSlice";

const Confirmation = () => {
  const dispatch = useDispatch();

  // Clearing cart after successful order
  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      mt="50px"
      width="100%"
      height="70vh"
    >
      <Alert
        severity="success"
        sx={{ p: "100px", borderRadius: "10px", fontSize: "18px" }}
      >
        <AlertTitle>Success</AlertTitle>
        You have successfully made an Order - <strong>Thank You!</strong>
      </Alert>
    </Box>
  );
};

export default Confirmation;
