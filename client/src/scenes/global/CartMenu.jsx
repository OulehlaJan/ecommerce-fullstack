import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { shades } from "../../theme";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "../../redux/cartSlice";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import styled from "@emotion/styled";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const [cartEmptyMessage, setCartEmptyMessage] = useState("");

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.attributes.price;
  }, 0);

  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate("/checkout");
      dispatch(setIsCartOpen({}));
    } else {
      setCartEmptyMessage("Cart is Empty!<br />Please Add Product First");
      setTimeout(() => {
        setCartEmptyMessage("");
      }, 2000);
    }
  };

  return (
    <Box // Overlay
      display={isCartOpen ? "block" : "none"}
      backgroundColor="rgba(0, 0, 0, 0.4)"
      position="fixed"
      zIndex="10"
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
    >
      {/* MODAL */}
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width={{ xs: "360px", sm: "400px" }}
        height="100%"
        backgroundColor="white"
      >
        <Box p="30px" overflow="auto" height="100%">
          {/* HEADER */}
          <FlexBox mb="15px">
            <Typography variant="h3">SHOPPING BAG ({cart.length})</Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          {/* CART LIST */}
          <Box>
            {cart.map((item) => (
              <Box key={item.uniqueKey}>
                <FlexBox p="15px 0">
                  <Box flex="1 1 40%">
                    {/* IMAGE */}
                    <Box
                      component="img"
                      src={`http://localhost:1337${item?.attributes?.image?.data?.attributes.formats?.medium?.url}`}
                      alt={item?.name}
                      width={{ xs: "110px", sm: "123px" }}
                      height={{ xs: "150px", sm: "164px" }}
                    />
                  </Box>
                  {/* ITEM NAME & SIZE */}
                  <Box flex="1 1 60%">
                    <FlexBox mb="5px">
                      <Typography fontWeight="bold">
                        {item.attributes.name}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          dispatch(
                            removeFromCart({ uniqueKey: item.uniqueKey })
                          )
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>
                    <Typography>Size: {item.size}</Typography>
                    {/* AMOUNT */}
                    <FlexBox m="15px 0">
                      <Box
                        display="flex"
                        alignItems="center"
                        border={`1.5px solid ${shades.neutral[500]}`}
                      >
                        <IconButton
                          onClick={() =>
                            dispatch(
                              decreaseCount({ uniqueKey: item.uniqueKey })
                            )
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.count}</Typography>
                        <IconButton
                          onClick={() =>
                            dispatch(
                              increaseCount({ uniqueKey: item.uniqueKey })
                            )
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      {/* PRICE */}
                      <Typography fontWeight="bold">
                        ${item.attributes.price}
                      </Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}
          </Box>

          {/* ACTIONS */}
          <Box m="20px 0">
            <FlexBox m="20px 0">
              <Typography fontWeight="bold">SUBTOTAL</Typography>
              <Typography fontWeight="bold">${totalPrice}</Typography>
            </FlexBox>
            <Button
              sx={{
                color: "white",
                minWidth: "100%",
                p: "20px 40px",
                m: "20px 0",
                backgroundColor:
                  cart.length === 0 ? "grey" : shades.primary[400],
                "&:hover": {
                  backgroundColor:
                    cart.length === 0 ? "grey" : "rgba(34, 34, 34, 0.05)",
                  color: cart.length === 0 ? "white" : "black",
                },
              }}
              onClick={handleCheckout}
            >
              CHECKOUT
            </Button>
            <Box textAlign="center">
              {cartEmptyMessage && (
                <Typography
                  component="span"
                  color="error"
                  textAlign="center"
                  dangerouslySetInnerHTML={{ __html: cartEmptyMessage }}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;
