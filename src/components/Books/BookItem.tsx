import React, { useState } from "react";
import { useEditBookMutation, useDeleteBookMutation } from "../../api/bookApi";
import { useDispatch } from "react-redux";
import { editBook, deleteBook } from "../../features/bookSlice";

interface BookItemProps {
  book: {
    id: string;
    title: string;
    author: string;
  };
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [editBookMutation] = useEditBookMutation();
  const [deleteBookMutation] = useDeleteBookMutation();
  const dispatch = useDispatch();

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const updatedBook = await editBookMutation({
        id: book.id,
        title,
        author,
      }).unwrap();
      dispatch(editBook(updatedBook));
      setEditMode(false);
    } catch (err) {
      console.error("Failed to edit book: ", err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBookMutation({ id: book.id }).unwrap();
      dispatch(deleteBook(book.id));
    } catch (err) {
      console.error("Failed to delete book: ", err);
    }
  };

  return (
    <li className="flex items-center justify-between p-4 mb-2 bg-white rounded-md shadow-sm">
      {editMode ? (
        <>
          <input
            type="text"
            className="w-full px-2 py-1 border rounded-md mr-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="w-full px-2 py-1 border rounded-md mr-2"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <button
            onClick={handleSave}
            className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <span className="flex-1">
            {book.title} by {book.author}
          </span>
          <button
            onClick={handleEdit}
            className="px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 mr-2"
          >
            Edit
          </button>
        </>
      )}
      <button
        onClick={handleDelete}
        className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
      >
        Delete
      </button>
    </li>
  );
};

export default BookItem;
