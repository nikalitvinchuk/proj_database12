const bcrypt = require('bcrypt');
const db = require('../db');

const register = (req, res) => {
  const { imie, nazwisko, wiek, email, login, password } = req.body;
  const saltRounds = 2;

  // Hashowanie hasła przed zapisaniem do bazy danych
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }

    // Wstawianie nowego użytkownika do bazy danych
    db.query(
      'INSERT INTO users (imie, nazwisko, wiek, email, login, password) VALUES (?, ?, ?, ?, ?, ?)',
      [imie, nazwisko, wiek, email, login, hash],
      (error, results) => {
        if (error) {
          console.log(error);
          res.sendStatus(500);
          return;
        }

        console.log(results);
        res.sendStatus(200);
      }
    );
  });
};

module.exports = register;
