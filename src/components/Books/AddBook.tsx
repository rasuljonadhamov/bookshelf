import React, { useState } from "react";
import { useAddBookMutation } from "../../api/bookApi";
import { useDispatch } from "react-redux";
import { addBook } from "../../features/bookSlice";

const AddBook: React.FC = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [addBookMutation] = useAddBookMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newBook = await addBookMutation({ title, author }).unwrap();
      console.log(newBook + "qqa");

      dispatch(addBook(newBook));
      setTitle("");
      setAuthor("");
    } catch (err) {
      console.error("Failed to add book: ", err);
    }
  };

  return (
    <div className="p-4 mb-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold text-center">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
