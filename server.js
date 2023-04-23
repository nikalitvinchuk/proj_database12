const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');

// Konfiguruje parsowanie cia�a ��dania
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Konfiguracja po��czenia z baz� danych
const db = mysql.createConnection({
    user: "admin",
    host: "database.cygpzv8ws2xs.eu-central-1.rds.amazonaws.com",
    password: "12345678",
    database: "PZTZ",
    port: 3307
});

// Nawi�zanie po��czenia z baz� danych
db.connect((error) => {
    if (error) {
        console.error('B��d po��czenia z baz� danych:', error);
    } else {
        console.log('Po��czono z baz� danych.');
    }
});

// ustawienie katalogu, w kt�rym znajduj� si� pliki statyczne
app.use(express.static(path.join(__dirname, 'build')));

// endpoint do obs�ugi strony g��wnej
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

// Obs�uga ��dania HTTP POST na endpoint '/login'
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Sprawdzenie, czy przes�ano nazw� u�ytkownika i has�o w ��daniu
    if (!username || !password) {
        res.json({ success: false }); // Je�li brakuje kt�rego� z p�l, wys�anie odpowiedzi z polem success ustawionym na false
        return;
    }

    // Przygotowanie zapytania SQL do pobrania u�ytkownika o danej nazwie i ha�le z bazy danych
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            res.json({ success: false, error: err }); // Wys�anie odpowiedzi z polem success ustawionym na false i polem error opisuj�cym b��d
            return;
        }

        // Sprawdzenie, czy zapytanie zwr�ci�o wynik
        if (result.length === 0) {
            res.json({ success: false, message: 'Invalid username or password' }); // Je�li nie znaleziono u�ytkownika, wys�anie odpowiedzi z polem success ustawionym na false i polem message z opisem b��du
            return;
        }

        res.json({ success: true, message: 'Successful login' }); // Je�li znaleziono u�ytkownika, wys�anie odpowiedzi z polem success ustawionym na true i polem message z informacj� o pomy�lnym logowaniu
    });
});

// uruchomienie serwera na porcie 3000
app.listen(3000, () => {
    console.log('Serwer uruchomiony na porcie 3000');
});
