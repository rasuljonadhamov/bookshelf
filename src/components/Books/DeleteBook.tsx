import React from "react";
import { useDeleteBookMutation } from "../../api/bookApi";

interface DeleteBookProps {
  id: number;
}

const DeleteBook: React.FC<DeleteBookProps> = ({ id }) => {
  const [deleteBook, { isLoading }] = useDeleteBookMutation();

  const handleDelete = async () => {
    try {
      await deleteBook({ id }).unwrap();
    } catch (err) {
      console.error("Failed to delete the book: ", err);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
    >
      Delete Book
    </button>
  );
};

export default DeleteBook;
