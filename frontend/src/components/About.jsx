import React from 'react';
import '../styles/About.css'; 

function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Our Book Management System</h1>
        <p>
          A simple and powerful tool to help you organize and manage your book collection.
        </p>
      </div>
      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            The goal of our Book Management System is to provide an intuitive platform for individuals, libraries, and organizations to manage and organize their book collections. Whether you're a reader, collector, or library manager, our platform is designed to help you stay organized and make book management easier.
          </p>
        </section>

        <section className="about-section">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>Easy-to-use interface for quick navigation</li>
            <li>Powerful search feature to find books by title, author, or genre</li>
            <li>Ability to add, update, and delete book records</li>
            <li>Detailed information about each book, including title, author, genre, and more</li>
            <li>Responsive design that works on both desktop and mobile devices</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Features</h2>
          <div className="feature-list">
            <div className="feature-item">
              <h3>Organized Book Records</h3>
              <p>Store and manage detailed book information such as title, author, genre, pages, and publication date.</p>
            </div>
            <div className="feature-item">
              <h3>Advanced Search</h3>
              <p>Search your collection by title, genre, or author with ease to quickly find any book in your library.</p>
            </div>
            <div className="feature-item">
              <h3>Easy Editing</h3>
              <p>Update or delete book details whenever necessary. Your collection stays up-to-date with minimal effort.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
