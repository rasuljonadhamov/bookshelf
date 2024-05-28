import React, { useState } from "react";
import { useEditBookMutation } from "../../api/bookApi";

interface EditBookProps {
  id: number;
}

const EditBook: React.FC<EditBookProps> = ({ id }) => {
  const [status, setStatus] = useState(0);
  const [editBook, { isLoading }] = useEditBookMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editBook({ id, status }).unwrap();
    } catch (err) {
      console.error("Failed to edit the book: ", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          className="w-full px-3 py-2 border rounded-md"
          value={status}
          onChange={(e) => setStatus(Number(e.target.value))}
        >
          <option value={0}>New</option>
          <option value={1}>Reading</option>
          <option value={2}>Finished</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Edit Book
      </button>
    </form>
  );
};

export default EditBook;
