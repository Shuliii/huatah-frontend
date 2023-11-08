import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  profile: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = true;
      state.profile = action.payload.name;
    },
    logOut(state) {
      state.isLoggedIn = false;
      state.profile = "";
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
