import React, { useEffect } from "react";
import { useGetBooksQuery } from "../../api/bookApi";
import { useDispatch, useSelector } from "react-redux";
import { setBooks, selectBooks } from "../../features/bookSlice";
import BookItem from "./BookItem";

const BookList: React.FC = () => {
  const dispatch = useDispatch();
  const { data: books, error, isLoading } = useGetBooksQuery();
  const bookList = useSelector(selectBooks);

  useEffect(() => {
    if (books) {
      dispatch(setBooks(books));
    }
  }, [books, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading books</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-center">Book List</h2>
      <ul>
        {bookList.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </ul>
    </div>
  );
};

export default BookList;
