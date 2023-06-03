const express = require('express');
const db = require('../db');
const session = require('express-session');

const profileRouter = express.Router();

// Obsługa żądania GET na endpoint '/'

profileRouter.get('/', (req, res) => {
  const userId = session[req.cookies.random_login_key].user_id;

  // Sprawdź, czy użytkownik jest uwierzytelniony

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Zapytanie do bazy danych

  const sql = "SELECT imie, nazwisko, wiek, email FROM users WHERE id = ?";
  db.query(sql, [userId], (error, results) => {
    if (error) {
      // Obsłuż błąd zapytania

      console.error(error);
      return res.status(500).json({ error: 'Błąd serwera' });
    }

    // Sprawdź, czy znaleziono użytkownika

    if (results.length === 0) {
      return res.status(404).json({ error: 'Użytkownik nie istnieje' });
    }

    // Pobierz dane użytkownika

    const { imie, nazwisko, email, wiek } = results[0];

    // Odpowiedz z danymi użytkownika

    res.json({
      firstName: imie,
      lastName: nazwisko,
      email,
      age: wiek
    });
  });
});

module.exports = profileRouter;
