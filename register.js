const bcrypt = require('bcrypt');
const connection = require('./db');

const register = (req, res) => {
  const { imie, nazwisko, wiek, login, password } = req.body;
  const saltRounds = 2;

  // Hashowanie has³a przed zapisaniem do bazy danych
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }

    // Wstawianie nowego u¿ytkownika do bazy danych
    connection.query(
      'INSERT INTO users (imie, nazwisko, wiek, login, password) VALUES (?, ?, ?, ?, ?)',
      [imie, nazwisko, wiek, login, hash],
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
