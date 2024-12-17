import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/AddEditBookPage.css";

const AddEditBookPage = ({ isEdit }) => {
  const [book, setBook] = useState({
    Title: "",
    AuthorID: "",
    GenreID: "",
    Pages: "",
    PublishedDate: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const authors = [
    { AuthorID: "1", Name: "Author 1" },
    { AuthorID: "2", Name: "Author 2" },
  ];

  const genres = [
    { GenreID: "1", Name: "Fiction" },
    { GenreID: "2", Name: "Non-fiction" },
  ];

  useEffect(() => {
    if (isEdit && id) {
      setIsLoading(true);
      axios
        .get(`http://localhost:5000/api/books/${id}`)
        .then((bookResponse) => {
          setBook(bookResponse.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching book:", error);
          setError("Error fetching book.");
          setIsLoading(false);
        });
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !book.Title ||
      !book.AuthorID ||
      !book.GenreID ||
      !book.Pages ||
      !book.PublishedDate
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const dataToSend = {
      Title: book.Title,
      AuthorID: book.AuthorID,
      GenreID: book.GenreID,
      Pages: book.Pages,
      PublishedDate: book.PublishedDate,
    };

    setIsLoading(true);
    const url = isEdit
      ? `http://localhost:5000/api/books/${id}`
      : "http://localhost:5000/api/books";
    const method = isEdit ? "put" : "post";

    axios({
      method: method,
      url: url,
      data: dataToSend,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        alert(isEdit ? "Book updated successfully" : "Book added successfully");
        setIsLoading(false);

        navigate("/");
      })
      .catch((error) => {
        console.error(
          "Error saving book:",
          error.response ? error.response.data : error.message
        );
        alert(
          "Error saving book: " +
            (error.response ? error.response.data : error.message)
        );
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-form-container">
      <h2>{isEdit ? "Edit Book" : "Add New Book"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Title">Title</label>
          <input
            type="text"
            id="Title"
            name="Title"
            value={book.Title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="AuthorID">Author</label>
          <select
            id="AuthorID"
            name="AuthorID"
            value={book.AuthorID}
            onChange={handleChange}
            required
          >
            <option value="1">Author 1</option>
            <option value="2">Author 2</option>
          </select>
        </div>

        <div>
          <label htmlFor="GenreID">Genre</label>
          <select
            id="GenreID"
            name="GenreID"
            value={book.GenreID}
            onChange={handleChange}
            required
          >
            <option value="1">Fiction</option>
            <option value="2">Non-fiction</option>
          </select>
        </div>

        <div>
          <label htmlFor="Pages">Pages</label>
          <input
            type="number"
            id="Pages"
            name="Pages"
            value={book.Pages}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="PublishedDate">Published Date</label>
          <input
            type="date"
            id="PublishedDate"
            name="PublishedDate"
            value={book.PublishedDate}
            onChange={handleChange}
            required
          />
        </div>

        <button className="add-book" type="submit">
          {isEdit ? "Update Book" : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddEditBookPage;
