import React from "react";
import BookList from "../components/Books/BookList";
import AddBook from "../components/Books/AddBook";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Bookshelf App</h1>
      <AddBook />
      <BookList />
    </div>
  );
};

export default Home;
