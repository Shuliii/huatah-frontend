import { createSlice } from "@reduxjs/toolkit";

const isLoggedIn = localStorage.getItem("isLoggedIn");
const profile = localStorage.getItem("profile");

const initialState = {
  isLoggedIn: isLoggedIn === "true" ? true : false,
  profile: profile,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = true;
      state.profile = action.payload.name;
      state.isAdmin = action.payload.isAdmin;
    },
    logOut(state) {
      state.isLoggedIn = false;
      state.profile = null;
      state.isAdmin = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
