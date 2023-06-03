const express = require('express');
const db = require('../db');
const session = require('express-session');

const blogRouter = express.Router();

blogRouter.get('/', (req, res) => {
  // Zapytanie SQL pobierające posty z bazy danych wraz z informacjami o autorze
  const query = 'SELECT b.id, b.temat, b.tytul, b.tresc, CONCAT(u.imie," ",u.nazwisko) AS autor FROM blog b JOIN users u ON b.autor = u.id';
  
  db.query(query, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error fetching posts from database' });
    }
    res.json(results);
  });
});

blogRouter.post('/add_blog', (req, res) => {
  const { subject, title, content } = req.body;
  const autor = session[req.cookies.random_login_key].user_id;

  // Zapytanie SQL dodające nowy post do bazy danych
  const sql = `INSERT INTO blog (temat, tytul, tresc, autor) VALUES (?, ?, ?, ?)`;
  const values = [subject, title, content, autor];

  db.query(sql, values, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Błąd serwera' });
    }

    const lastInsertedId = result.insertId;

    // Zapytanie SQL pobierające dodany post wraz z informacjami o autorze
    const sqlGetBlog = `SELECT b.id, b.temat, b.tytul, b.tresc, CONCAT(u.imie, " ", u.nazwisko) AS autor FROM blog b JOIN users u ON b.autor = u.id WHERE b.id = ?`;

    db.query(sqlGetBlog, [lastInsertedId], (error, blog) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Błąd serwera' });
      }

      res.json(blog[0]);
    });
  });
});

module.exports = blogRouter;
