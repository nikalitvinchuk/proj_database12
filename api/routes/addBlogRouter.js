const express = require('express');
const db = require('../db');

const addBlogRouter = express.Router();

addBlogRouter.post('/', (req, res) => {
  const { title, content, author } = req.body;

  const sql = `INSERT INTO blog (title, content, author) VALUES ('${title}', '${content}', '${author}')`;

  db.query(sql, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Błąd serwera' });
    }

    const newBlogId = result.insertId;
    res.json({ message: 'Blog został pomyślnie dodany', blogId: newBlogId });
  });
});

module.exports = addBlogRouter;
