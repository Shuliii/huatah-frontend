import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: "",
  data: [],
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
      state = initialState;
    },
  },
});

export const summaryActions = summarySlice.actions;
export default summarySlice;
