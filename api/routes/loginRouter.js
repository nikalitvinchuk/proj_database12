const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const session = require('express-session');

// Funkcja generująca losowy ciąg znaków

function generateRandomString() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  // Generowanie losowego ciągu znaków o długości 25

  for (let i = 0; i < 25; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

const loginRouter = express.Router();

// Obsługa żądania POST na endpoint '/'

loginRouter.post('/', (req, res) => {
  const { username, password } = req.body;

  // Sprawdź, czy przekazano nazwę użytkownika i hasło

  if (!username || !password) {
    return res.json({ success: false });
  }

  // Zapytanie do bazy danych

  const sql = `SELECT * FROM users WHERE login = ?`;
  db.query(sql, [username], (err, result) => {
    if (err) {
      // Obsłuż błąd zapytania

      return res.json({ success: false, error: err });
    }

    // Sprawdź, czy znaleziono użytkownika

    if (result.length === 0) {
      return res.json({ success: false, message: 'Invalid username or password' });
    }

    // Porównaj hasło z zaszyfrowanym hasłem w bazie danych

    const user = result[0];
    bcrypt.compare(password, user.password, (error, match) => {
      if (error) {
        // Obsłuż błąd porównania haseł

        return res.json({ success: false, error: error });
      }
      if (!match) {
        // Hasło nie pasuje do zaszyfrowanego hasła w bazie danych

        return res.json({ success: false, message: 'Invalid username or password' });
      }

      // Generuj losowy klucz sesji

      var key = generateRandomString()

      // Ustawienie klucza sesji oraz identyfikatora użytkownika

      res.cookie('random_login_key', key);
      session[key] = {
        user_id: user.id,
      }

      console.log(session[key])

      // Ustawienie informacji o uprawnieniach użytkownika

      session.isAdmin = user.isAdmin;

      // Udzielenie odpowiedzi z sukcesem

      res.json({ success: true });
      console.log('isAdmin:', user.isAdmin);
    });
  });
});

module.exports = loginRouter;
