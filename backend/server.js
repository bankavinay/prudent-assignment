 require('dotenv').config();  
  const express = require('express');
  const cors = require('cors'); 
  const booksRouter = require('./routes/books');
  const genresRouter = require('./routes/genres');
  const authorsRouter = require('./routes/authors');
  
  const app = express();
  const port = process.env.PORT || 5000; 
  app.use(cors());  
  app.use(express.json()); 
  app.get('/', (req, res) => {
    res.send('Server is up and running!');
  });
  app.use('/api', booksRouter);
  app.use('/api', genresRouter);
  app.use('/api', authorsRouter);
  app.listen(port, () => {
    console.log(`Server running on ${port}`);
  });
  





