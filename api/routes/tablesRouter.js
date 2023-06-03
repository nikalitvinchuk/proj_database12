const express = require('express');
const db = require('../db');
const tablesRouter = express.Router();

// Obsługa żądania GET na endpoint '/'

tablesRouter.get('/', (req, res) => {
  const sql = "SHOW TABLES";

  // Wykonaj zapytanie do bazy danych

  db.query(sql, (err, result) => {
    if (err) {
      // Obsłuż błąd zapytania

      return res.json({ success: false, error: err });
    }

    // Przetwórz wynik zapytania

    const tables = result.map((row) => row[`Tables_in_${PZTZ}`]);

    // Odpowiedz z listą nazw tabel

    res.json({ tables });

    // Wyświetl nazwy tabel w konsoli

    console.log('Odczytano tabele:', users);
  });
});

module.exports = tablesRouter;
