import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book, onDelete }) => {
  return (
    <div className="book-card">
      <h3>{book.Title}</h3>
      <p>{book.Author}</p>
      <p>{book.Genre}</p>
      <p>{book.Pages} pages</p>
      <Link to={`/book/${book.BookID}`} className="view-details-link">
        View Details
      </Link>
      <Link to={`/edit/${book.BookID}`} className="edit-link">
        Edit
      </Link>
      <button onClick={() => onDelete(book.BookID)} className="delete-button">
        Delete
      </button>
    </div>
  );
};

export default BookCard;
