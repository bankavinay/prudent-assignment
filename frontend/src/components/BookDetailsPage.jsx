import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BookDetailsPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching book details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="book-details">
      {book ? (
        <>
          <h2>{book.Title}</h2>
          <p>Author: {book.Author}</p>
          <p>Genre: {book.Genre}</p>
          <p>Pages: {book.Pages}</p>
          <p>Published Date: {book.PublishedDate}</p>
          <p>Description: {book.Description}</p>
        </>
      ) : (
        <p>Book not found</p>
      )}
    </div>
  );
}

export default BookDetailsPage;
