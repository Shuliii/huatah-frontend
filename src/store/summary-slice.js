import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: null,
  data: null,
};

const summarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {
    replaceData(state, action) {
      state.data = action.payload.item;
    },
    replaceBalance(state, action) {
      state.balance = action.payload.item;
    },
    removeData(state) {
      state.balance = null;
      state.data = null;
    },
  },
});

export const summaryActions = summarySlice.actions;
export default summarySlice;
