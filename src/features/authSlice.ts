import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface AuthState {
  token: string;
  secret: string;
}

const initialState: AuthState = {
  token: "",
  secret: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<AuthState>) {
      state.token = action.payload.token;
      state.secret = action.payload.secret;
    },
    clearAuth(state) {
      state.token = "";
      state.secret = "";
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
