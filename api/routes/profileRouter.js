const express = require('express');
const db = require('../db');

const profileRouter = express.Router();

profileRouter.get('/', (req, res) => {
  const userId = req.session[req.cookies.random_login_key]?.user_id;
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const sql = `SELECT imie, nazwisko, email, wiek, login FROM users WHERE id_user = ${userId}`;
  db.query(sql, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Błąd serwera' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Użytkownik nie istnieje' });
    }

    const { imie, nazwisko, email, wiek, login } = results[0];

    res.json({
      firstName: imie,
      lastName: nazwisko,
      email,
      age: wiek,
      login
    });
  });
});

module.exports = profileRouter;
