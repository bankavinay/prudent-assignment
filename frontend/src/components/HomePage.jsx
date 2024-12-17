import React, { useState } from "react";

import "./Navbar";
import "../styles/HomePage.css";

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");

  const handleSearch = () => {
    window.location.href = `/search?query=${searchQuery}&genre=${genre}&author=${author}`;
  };

  return (
    <div className="home-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <div className="filters">
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="filter-select"
          >
            <option value="">Select Genre</option>
            <option value="fiction">Fiction</option>
            <option value="nonfiction">Non-fiction</option>
          </select>
          <select
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="filter-select"
          >
            <option value="">Select Author</option>
            <option value="author1">Author 1</option>
            <option value="author2">Author 2</option>
          </select>
        </div>
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}

export default HomePage;
