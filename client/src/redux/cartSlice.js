import { createSlice, createSelector } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return [];
  }
};

const initialState = {
  isCartOpen: false,
  cart: loadState() || [],
  items: [],
};

const selectTotalItemsCount = createSelector(
  (state) => state.cart.cart,
  (cart) => cart.reduce((total, item) => total + item.count, 0)
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },

    addToCart: (state, action) => {
      const { id, size } = action.payload.item;
      const uniqueKey = `${id}-${size}`;
      const itemInCart = state.cart.find(
        (item) => item.uniqueKey === uniqueKey
      );
      if (itemInCart) {
        itemInCart.count += action.payload.item.count;
      } else {
        state.cart = [
          ...state.cart,
          {
            ...action.payload.item,
            count: action.payload.item.count,
            uniqueKey,
          },
        ];
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.uniqueKey !== action.payload.uniqueKey
      );
    },

    increaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.uniqueKey === action.payload.uniqueKey) {
          item.count++;
        }
        return item;
      });
    },

    decreaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.uniqueKey === action.payload.uniqueKey && item.count > 1) {
          item.count--;
        }
        return item;
      });
    },

    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },

    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  setItems,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
  clearCart,
} = cartSlice.actions;

export { selectTotalItemsCount };

export default cartSlice.reducer;
