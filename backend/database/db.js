
const sqlite3 = require('sqlite3').verbose();
const path = require('path');


const dbPath = path.resolve(__dirname, 'books.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening the database:', err);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`
      CREATE TABLE IF NOT EXISTS genres (
        GenreID INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT NOT NULL,
        Description TEXT
      )
    `, (err) => {
      if (err) {
        console.error('Error creating genres table:', err);
      }
    });

    db.run(`
      CREATE TABLE IF NOT EXISTS authors (
        AuthorID INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT NOT NULL
      )
    `, (err) => {
      if (err) {
        console.error('Error creating authors table:', err);
      }
    });
    db.run(`
      CREATE TABLE IF NOT EXISTS books (
        BookID INTEGER PRIMARY KEY AUTOINCREMENT,
        Title TEXT NOT NULL,
        AuthorID INTEGER,
        GenreID INTEGER,
        Pages INTEGER,
        PublishedDate TEXT,
        FOREIGN KEY (AuthorID) REFERENCES authors(AuthorID),
        FOREIGN KEY (GenreID) REFERENCES genres(GenreID)
      )
    `, (err) => {
      if (err) {
        console.error('Error creating books table:', err);
      }
    });
  }
});

module.exports = db;
