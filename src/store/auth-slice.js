import { createSlice } from "@reduxjs/toolkit";

const isLoggedIn = localStorage.getItem("isLoggedIn");
const profile = localStorage.getItem("profile");

const initialState = {
  isLoggedIn: isLoggedIn === "true" ? true : false,
  profile: profile,
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
      state.profile = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
