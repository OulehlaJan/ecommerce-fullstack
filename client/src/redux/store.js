import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import throttle from "lodash.throttle";

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state.cart.cart);
    localStorage.setItem("cart", serializedState);
  } catch (err) {}
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

store.subscribe(
  throttle(() => {
    const state = store.getState();
    saveState(state);
  }, 1000)
);

export default store;
