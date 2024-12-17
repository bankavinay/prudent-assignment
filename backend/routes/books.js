const express = require('express');
const router = express.Router();
const db = require('../database/db');



router.get('/books', (req, res) => {
  const { query, page = 1, limit = 6 } = req.query;  
  if (!query) {
    return res.status(400).json({ error: 'Search query is required.' });
  }
  const offset = (page - 1) * limit;
  const sql = `
    SELECT books.BookID, books.Title, books.Pages, books.PublishedDate, 
           authors.Name AS Author, genres.Name AS Genre
    FROM books
    JOIN authors ON books.AuthorID = authors.AuthorID
    JOIN genres ON books.GenreID = genres.GenreID
    WHERE books.Title LIKE ? OR authors.Name LIKE ? OR genres.Name LIKE ?
    LIMIT ? OFFSET ?
  `;
  const searchTerm = `%${query}%`;
  db.all(sql, [searchTerm, searchTerm, searchTerm, limit, offset], (err, rows) => {
    if (err) {
      console.error("Error executing SQL query:", err);  
      return res.status(500).json({ error: err.message });
    }

    const countSql = `
      SELECT COUNT(*) AS totalCount
      FROM books
      JOIN authors ON books.AuthorID = authors.AuthorID
      JOIN genres ON books.GenreID = genres.GenreID
      WHERE books.Title LIKE ? OR authors.Name LIKE ? OR genres.Name LIKE ?
    `;

    db.get(countSql, [searchTerm, searchTerm, searchTerm], (err, countRow) => {
      if (err) {
        console.error("Error fetching total count:", err);
        return res.status(500).json({ error: err.message });
      }
      res.json({
        books: rows,
        totalCount: countRow.totalCount,  
        totalPages: Math.ceil(countRow.totalCount / limit),  
        currentPage: parseInt(page), 
      });
    });
  });
});

router.post('/books', (req, res) => {
  
  const books = Array.isArray(req.body) ? req.body : [req.body];
  for (let book of books) {
    if (!book.Title || !book.AuthorID || !book.GenreID || !book.Pages || !book.PublishedDate) {
      return res.status(400).json({ error: 'Invalid input. All fields are required.' });
    }
  }

  const sql = `INSERT INTO books (Title, AuthorID, GenreID, Pages, PublishedDate) 
               VALUES (?, ?, ?, ?, ?)`; 

  db.serialize(() => {
    db.run('BEGIN TRANSACTION');
    const insertPromises = books.map((book) => {
      const { Title, AuthorID, GenreID, Pages, PublishedDate } = book;

      return new Promise((resolve, reject) => {
        db.run(sql, [Title, AuthorID, GenreID, Pages, PublishedDate], function (err) {
          if (err) {
            return reject(err); 
          }
          resolve(); 
        });
      });
    });
    Promise.all(insertPromises)
      .then(() => {
        db.run('COMMIT', function (err) {
          if (err) {
            db.run('ROLLBACK');
            return res.status(500).json({ error: 'Failed to commit transaction' });
          }
          res.status(201).json({
            message: 'Books added successfully',
            booksCount: books.length
          });
        });
      })
      .catch((err) => {
        db.run('ROLLBACK');
        res.status(500).json({ error: err.message });
      });
  });
});


router.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const { Title, AuthorID, GenreID, Pages, PublishedDate } = req.body;
  if (!Title || !AuthorID || !GenreID || !Pages || !PublishedDate) {
    return res.status(400).json({ message: 'Please fill in all fields.' });
  }
  const sql = `UPDATE books SET Title = ?, AuthorID = ?, GenreID = ?, Pages = ?, PublishedDate = ? WHERE BookID = ?`;
  db.run(sql, [Title, AuthorID, GenreID, Pages, PublishedDate, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book updated successfully' });
  });
});

router.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM books WHERE BookID = ?`;
  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  });
});

// router.get('/books/:id', (req, res) => {
//   const { id } = req.params;
//   const sql = `
//     SELECT books.BookID, books.Title, books.Pages, books.PublishedDate, 
//            authors.Name AS Author, genres.Name AS Genre, books.Description
//     FROM books
//     JOIN authors ON books.AuthorID = authors.AuthorID
//     JOIN genres ON books.GenreID = genres.GenreID
//     WHERE books.BookID = ?
//   `;
//   db.get(sql, [id], (err, row) => {
//     if (err) {
//       console.error('Error fetching book details:', err);
//       return res.status(500).json({ error: err.message });
//     }

//     if (!row) {
//       return res.status(404).json({ message: 'Book not found' });
//     }
//     res.json(row);
//   });
// });





module.exports = router;
