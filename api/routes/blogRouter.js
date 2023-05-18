const express = require('express');
const db = require('../db');

const blogRouter = express.Router();

blogRouter.get('/', (req, res) => {
  const query = 'SELECT * FROM blog';
  db.query(query, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error fetching posts from database' });
    }
    res.json(results);
  });
});

module.exports = blogRouter;
