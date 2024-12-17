const express = require('express');
const router = express.Router();
const db = require('../database/db');


router.get('/authors', (req, res) => {
  const sql = 'SELECT * FROM authors';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ authors: rows });
  });
});



router.post('/authors', (req, res) => {
  const authors = req.body;

  if (!Array.isArray(authors)) {
    authors = [authors]; 
  }


  for (let i = 0; i < authors.length; i++) {
    if (!authors[i].name) {
      return res.status(400).json({ error: `Author at index ${i} is missing a name` });
    }
  }

  const sql = `INSERT INTO authors (Name) VALUES (?)`;


  const promises = authors.map(author => {
    return new Promise((resolve, reject) => {
      db.run(sql, [author.name], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.lastID);
      });
    });
  });

  Promise.all(promises)
    .then((ids) => {
      res.status(201).json({
        message: 'Author(s) added successfully',
        authorIds: ids,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;

