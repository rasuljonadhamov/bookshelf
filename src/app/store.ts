import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "../api/bookApi";
import bookReducer from "../features/bookSlice";
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
    books: bookReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
