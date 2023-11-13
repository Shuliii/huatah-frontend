import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const activeBetSlice = createSlice({
  name: "activeBet",
  initialState,
  reducers: {
    replaceData(state, action) {
      state.data = action.payload.item;
    },
  },
});

export const activeBetActions = activeBetSlice.actions;
export default activeBetSlice;
