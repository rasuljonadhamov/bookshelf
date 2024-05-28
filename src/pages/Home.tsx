import React from "react";
import BookList from "../components/Books/BookList";
import AddBook from "../components/Books/AddBook";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between  mb-6">
        <h1 className="text-3xl font-bold text-center ">Bookshelf App</h1>
        <Link
          className="bg-green-400    px-4 py-2 text-white rounded-md hover:opacity-65"
          to={"/login"}
        >
          Login
        </Link>
      </div>
      <AddBook />
      <BookList />
    </div>
  );
};

export default Home;
