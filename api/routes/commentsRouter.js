const express = require('express');
const db = require('../db');
const session = require('express-session');

const commentsRouter = express.Router();

// Endpoint do pobierania komentarzy dla danego postu
commentsRouter.get('/comments', (req, res) => {
  const id_blog = req.query.postId;
  const sql = `SELECT c.id_blog, c.tresc, c.autor, CONCAT(u.imie," ",u.nazwisko) AS autor FROM comments c JOIN users u ON u.id=c.autor WHERE id_blog = ?`;

  db.query(sql, [id_blog], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Błąd serwera' });
    }

    res.json(results);
  });
});

// Endpoint do dodawania nowego komentarza
commentsRouter.post('/comments', (req, res) => {
  const { postId, comment } = req.body;
  const sql = `INSERT INTO comments (id_blog, tresc, autor) VALUES (?, ?, ?)`;
  const values = [postId, comment, session[req.cookies.random_login_key].user_id];

  db.query(sql, values, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Błąd serwera' });
    }

    const commentId = results.insertId;
    const sqlGetComment = `SELECT * FROM comments WHERE id = ?`;

    db.query(sqlGetComment, [commentId], (error, comment) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Błąd serwera' });
      }

      res.json(comment[0]);
    });
  });
});

module.exports = commentsRouter;
