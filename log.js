const express = require('express');
const session = require('express-session');
const db = require('./db');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();

const logApp = () => {
    // Konfiguracja sesji
    app.use(session({
        secret: 'some secret key',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000 } // Czas trwania sesji w milisekundach
    }));

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Obs≥uga øπdania HTTP POST na endpoint '/login'
    app.post('/login', (req, res) => {
        const { username, password } = req.body;

        // Sprawdzenie, czy przes≥ano nazwÍ uøytkownika i has≥o w øπdaniu
        if (!username || !password) {
            res.json({ success: false }); // Jeúli brakuje ktÛregoú z pÛl, wys≥anie odpowiedzi z polem success ustawionym na false
            return;
        }

        // Zahaszowanie has≥a
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                res.json({ success: false, error: err }); // Wys≥anie odpowiedzi z polem success ustawionym na false i polem error opisujπcym b≥πd
                console.log("èle 1");
                return;
            }

            // Przygotowanie zapytania SQL do pobrania uøytkownika o danej nazwie i haúle z bazy danych
            const sql = `SELECT * FROM users WHERE login = ? AND password = ?`;
            db.query(sql, [username, hash], (err, result) => {
                if (err) {
                    res.json({ success: false, error: err }); // Wys≥anie odpowiedzi z polem success ustawionym na false i polem error opisujπcym b≥πd
                    console.log("èle 2");
                    return;
                }

                // Sprawdzenie, czy zapytanie zwrÛci≥o wynik
                if (result.length === 0) {
                    res.json({ success: false, message: 'Invalid username or password' }); // Jeúli nie znaleziono uøytkownika, wys≥anie odpowiedzi z polem success ustawionym na false i polem message z opisem b≥Ídu
                    console.log("èle 3");
                    return;
                }

                res.json({ success: true, message: 'Successful login' }); // Jeúli znaleziono uøytkownika, wys≥anie odpowiedzi z polem success ustawionym na true i polem message z informacjπ o pomyúlnym logowaniu
                console.log("Dobrze");
            });
        });
    });
};

module.exports = logApp;
