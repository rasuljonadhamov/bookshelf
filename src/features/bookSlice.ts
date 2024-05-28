import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface Book {
  id: string;
  title: string;
  author: string;
}

interface BookState {
  books: Book[];
}

const initialState: BookState = {
  books: [],
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks(state, action: PayloadAction<Book[]>) {
      state.books = action.payload;
    },
    addBook(state, action: PayloadAction<Book>) {
      state.books.push(action.payload);
    },
    editBook(state, action: PayloadAction<Book>) {
      const index = state.books.findIndex(
        (book) => book.id === action.payload.id
      );
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
    deleteBook(state, action: PayloadAction<string>) {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
  },
});

export const { setBooks, addBook, editBook, deleteBook } = bookSlice.actions;

export const selectBooks = (state: RootState) => state.books.books;

export default bookSlice.reducer;
