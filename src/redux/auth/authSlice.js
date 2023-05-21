import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUp(state, { payload }) {
      state.user = payload;
      state.isLoggedIn = true;
    },
    logIn: (state, { payload }) => {
      state.user = payload;
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.user = {};
      state.isLoggedIn = false;
    },
  },
});
export const { signUp, logIn, logOut, update } = authSlice.actions;
