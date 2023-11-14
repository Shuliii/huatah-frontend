import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import cartSlice from "./cart-slice";
import activeBetSlice from "./activeBet-slice";
import summarySlice from "./summary-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    activeBet: activeBetSlice.reducer,
    summary: summarySlice.reducer,
  },
});

export default store;
