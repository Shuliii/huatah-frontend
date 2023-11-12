import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    toggleToCart(state, action) {
      const itemToRemove = state.cart.find(
        (item) => item.Helper_ID === action.payload.item.Helper_ID
      );

      if (itemToRemove) {
        return {
          ...state,
          cart: state.cart.filter(
            (item) => item.Helper_ID !== action.payload.item.Helper_ID
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, action.payload.item],
      };
    },

    removeAllCart(state) {
      return {
        ...state,
        cart: [],
      };
    },

    addAmount(state, action) {
      const updatedCart = state.cart.map((item) =>
        item.Helper_ID === action.payload.item.Helper_ID
          ? { ...item, Amount: +action.payload.item.Amount }
          : item
      );

      return {
        ...state,
        cart: updatedCart,
      };
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
