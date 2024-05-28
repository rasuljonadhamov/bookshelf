import React from "react";
import { useGetBooksQuery } from "../../api/bookApi";
import EditBook from "./EditBook";
import DeleteBook from "./DeleteBook";

const BookList: React.FC = () => {
  const { data, error, isLoading } = useGetBooksQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load books.</p>;

  return (
    <div className="space-y-4">
      {data?.data?.map((book: any) => (
        <div
          key={book.book.id}
          className="p-4 mb-4 bg-white rounded-md shadow-md"
        >
          <h3 className="text-xl font-bold">{book.book.title}</h3>
          <p>Author: {book.book.author}</p>
          <p>Published: {book.book.published}</p>
          <p>Pages: {book.book.pages}</p>
          <p>Status: {book.status}</p>
          <EditBook id={book.book.id} />
          <DeleteBook id={book.book.id} />
        </div>
      ))}
    </div>
  );
};

export default BookList;
