import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

const activeBetSlice = createSlice({
  name: "activeBet",
  initialState,
  reducers: {
    replaceData(state, action) {
      state.data = action.payload.item;
    },
    removeData(state) {
      return { ...state, data: null };
    },
  },
});

export const activeBetActions = activeBetSlice.actions;
export default activeBetSlice;
