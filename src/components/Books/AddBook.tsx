import React, { useState } from "react";
import { useAddBookMutation } from "../../api/authApi";

const AddBook: React.FC = () => {
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [pages, setPages] = useState("");
  const [addBook, { isLoading, error }] = useAddBookMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const book = { isbn, title, author, published, pages };
      await addBook(book).unwrap();
    } catch (err) {
      console.error("Failed to add the book: ", err);
    }
  };

  return (
    <div className="p-4 mb-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold text-center">Add Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            ISBN
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />
        </div>
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
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Published Year
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={published}
            onChange={(e) => setPublished(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Pages
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          disabled={isLoading}
        >
          Add Book
        </button>
        {error && (
          <p className="mt-2 text-red-500">
            Failed to add the book. Please try again.
          </p>
        )}
      </form>
    </div>
  );
};

export default AddBook;
