import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  key: string;
  secret: string;
}

const initialState: AuthState = {
  key: "",
  secret: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<AuthState>) {
      state.key = action.payload.key;
      state.secret = action.payload.secret;
    },
  },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
