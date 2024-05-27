import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import md5 from "md5";
import { RootState } from "../app/store";

const prepareHeaders = (
  headers: Headers,
  { getState }: { getState: () => RootState }
) => {
  const state = getState();
  const { token, secret } = state.auth;

  if (token && secret) {
    headers.set("Key", token);

    const method = headers.get("method") || "GET";
    const url = headers.get("url") || "";
    const body = headers.get("body") || "";

    const signString = `${method}${url}${body}${secret}`;
    const sign = md5(signString);

    headers.set("Sign", sign);
  }

  return headers;
};

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://no23.lavina.tech",
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
    }),
    addBook: builder.mutation({
      query: (newBook) => ({
        url: "/books",
        method: "POST",
        body: newBook,
      }),
    }),
    editBook: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: rest,
      }),
    }),
    deleteBook: builder.mutation({
      query: ({ id }) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useAddBookMutation,
  useEditBookMutation,
  useDeleteBookMutation,
} = bookApi;
