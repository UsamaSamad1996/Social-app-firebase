import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  userData: {},
  toggleTheme: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setToggleTheme: (state) => {
      state.toggleTheme = !state.toggleTheme;
    },
  },
});

export const { loginSuccess, logout, setUserData, setToggleTheme } =
  userSlice.actions;

export default userSlice.reducer;
