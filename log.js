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

    // Obs�uga ��dania HTTP POST na endpoint '/login'
    app.post('/login', (req, res) => {
        const { username, password } = req.body;

        // Sprawdzenie, czy przes�ano nazw� u�ytkownika i has�o w ��daniu
        if (!username || !password) {
            res.json({ success: false }); // Je�li brakuje kt�rego� z p�l, wys�anie odpowiedzi z polem success ustawionym na false
            return;
        }

        // Zahaszowanie has�a
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                res.json({ success: false, error: err }); // Wys�anie odpowiedzi z polem success ustawionym na false i polem error opisuj�cym b��d
                console.log("�le 1");
                return;
            }

            // Przygotowanie zapytania SQL do pobrania u�ytkownika o danej nazwie i ha�le z bazy danych
            const sql = `SELECT * FROM users WHERE login = ? AND password = ?`;
            db.query(sql, [username, hash], (err, result) => {
                if (err) {
                    res.json({ success: false, error: err }); // Wys�anie odpowiedzi z polem success ustawionym na false i polem error opisuj�cym b��d
                    console.log("�le 2");
                    return;
                }

                // Sprawdzenie, czy zapytanie zwr�ci�o wynik
                if (result.length === 0) {
                    res.json({ success: false, message: 'Invalid username or password' }); // Je�li nie znaleziono u�ytkownika, wys�anie odpowiedzi z polem success ustawionym na false i polem message z opisem b��du
                    console.log("�le 3");
                    return;
                }

                res.json({ success: true, message: 'Successful login' }); // Je�li znaleziono u�ytkownika, wys�anie odpowiedzi z polem success ustawionym na true i polem message z informacj� o pomy�lnym logowaniu
                console.log("Dobrze");
            });
        });
    });
};

module.exports = logApp;
