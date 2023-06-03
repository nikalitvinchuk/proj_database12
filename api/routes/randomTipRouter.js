const express = require('express');
const db = require('../db');
const session = require('express-session');

const randomTipRouter = express.Router();

// Obsługa żądania GET na endpoint '/'

randomTipRouter.get('/', (req, res) => {
  const sql = 'SELECT tresc FROM tips ORDER BY RAND() LIMIT 1';

  // Wykonaj zapytanie do bazy danych

  db.query(sql, (error, result) => {
    if (error) {
      // Obsłuż błąd zapytania

      res.status(500).json({ error: "Server error" });
      console.log('Nie wylosowano');
    } else {
      // Przetwórz wynik zapytania

      const randomTip = result[0].tresc;

      // Odpowiedz z wylosowaną wskazówką

      res.json({ tresc: randomTip });
      console.log('Wylosowano wskazówkę');

      // Aktualizuj sesję użytkownika

      if (req.session && req.session.tip) {
        req.session.tip = randomTip;
        req.session.cookie.expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
      }
    }
  });
});

module.exports = randomTipRouter;
