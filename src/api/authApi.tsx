import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://no23.lavina.tech",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const key = state.auth.key;
      const sign = state.auth.sign;
      if (key) {
        headers.set("Key", key);
      }
      if (sign) {
        headers.set("Sign", sign);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: "/signup",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "/login",
        method: "POST",
        body: user,
      }),
    }),
    addBook: builder.mutation({
      query: (book) => ({
        url: "/books",
        method: "POST",
        body: book,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useAddBookMutation } =
  authApi;
