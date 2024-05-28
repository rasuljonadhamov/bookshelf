import md5 from "md5";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";

const prepareHeaders = (
  headers: Headers,
  { getState }: { getState: () => RootState }
) => {
  const state = getState();
  const method = headers.get("method") || "";
  const url = headers.get("url") || "";
  const body = headers.get("body") || "";

  const userKey = state.auth.key;
  const userSecret = state.auth.secret;

  const stringToSign = `${method}${url}${body}${userSecret}`;
  const sign = md5(stringToSign);

  headers.set("Key", userKey);
  headers.set("Sign", sign);

  return headers;
};

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://no23.lavina.tech",
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    getBooks: builder.query<any, void>({
      query: () => ({ url: "/books", method: "GET" }),
    }),
    addBook: builder.mutation<any, { isbn: string }>({
      query: (book) => ({
        url: "/books",
        method: "POST",
        body: book,
      }),
    }),
    editBook: builder.mutation<any, { id: number; status: number }>({
      query: ({ id, status }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: { status },
      }),
    }),
    deleteBook: builder.mutation<any, { id: number }>({
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
