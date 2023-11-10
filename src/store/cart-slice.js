import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart(state, action) {
      console.log(state);
      console.log(action.payload);
      state.cart.push(action.payload.item);
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
