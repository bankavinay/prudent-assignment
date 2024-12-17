const express = require('express');
const router = express.Router();
const db = require('../database/db');



router.get('/genres', (req, res) => {
  const sql = 'SELECT * FROM genres';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ genres: rows });
  });
});




router.post('/genres', (req, res) => {
  const genres = req.body;

  if (!Array.isArray(genres)) {
    return res.status(400).json({ error: 'Request body must be an array of genres' });
  }

  const sql = `INSERT INTO genres (Name, Description) VALUES (?, ?)`;

  
  const insertGenre = (genre, callback) => {
    db.run(sql, [genre.name, genre.description], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, this.lastID); 
    });
  };

  let insertedGenres = [];
  let errorOccurred = false;

  genres.forEach((genre, index) => {
    if (errorOccurred) return;

    if (!genre.name || !genre.description) {
      errorOccurred = true;
      return res.status(400).json({ error: `Missing name or description for genre at index ${index}` });
    }

    insertGenre(genre, (err, genreId) => {
      if (err) {
        errorOccurred = true;
        return res.status(500).json({ error: err.message });
      }
      insertedGenres.push({ genreId, name: genre.name });
      if (insertedGenres.length === genres.length) {
        res.status(201).json({ message: 'Genres added successfully', genres: insertedGenres });
      }
    });
  });
});

module.exports = router;





