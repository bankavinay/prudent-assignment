import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import BookCard from "../components/BookCard";
import ConfirmDialog from "../components/ConfirmationDialog";
import "../styles/searchResultsPage.css";

function SearchResultsPage() {
  const locationOf = useLocation();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const params = new URLSearchParams(locationOf.search);
  const query = params.get("query");

  const itemsPerPage = 6;

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    setError(null);

    axios
      .get(
        `http://localhost:5000/api/books?query=${query}&page=${currentPage}&limit=${itemsPerPage}`
      )
      .then((response) => {
        if (response.data.books) {
          setBooks(response.data.books);
          setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage));
        } else {
          setBooks([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching books. Please try again later.");
        setLoading(false);
      });
  }, [query, currentPage]);
  const handleDelete = (id) => {
    setBookToDelete(id);
    setIsDialogOpen(true);
  };

  const confirmDelete = () => {
    axios
      .delete(`http://localhost:5000/api/books/${bookToDelete}`)
      .then(() => {
        alert("Book deleted successfully");
        setBooks((prevBooks) =>
          prevBooks.filter((book) => book.BookID !== bookToDelete)
        );
        setIsDialogOpen(false);
      })
      .catch((error) => {
        alert("Error deleting book");
        console.error(error);
        setIsDialogOpen(false);
      });
  };
  const cancelDelete = () => {
    setIsDialogOpen(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="results-container">
      <h1>Search Results</h1>
      <div className="books-grid">
        {books.length > 0 ? (
          books.map((book) => (
            <BookCard key={book.BookID} book={book} onDelete={handleDelete} />
          ))
        ) : (
          <p>No books found for "{query}"</p>
        )}
      </div>

      <div className="pagination">
        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="pagination-button"
          >
            Previous
          </button>
        )}
        <span>
          Page {currentPage} of {totalPages}
        </span>
        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="pagination-button"
          >
            Next
          </button>
        )}
      </div>

      {isDialogOpen && (
        <ConfirmDialog
          message="Are you sure you want to delete this book?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}

export default SearchResultsPage;
