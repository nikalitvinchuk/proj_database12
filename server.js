const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');

// Konfiguruje parsowanie cia³a ¿¹dania
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Konfiguracja po³¹czenia z baz¹ danych
const db = mysql.createConnection({
    user: "admin",
    host: "database.cygpzv8ws2xs.eu-central-1.rds.amazonaws.com",
    password: "12345678",
    database: "PZTZ",
    port: 3307
});

// Nawi¹zanie po³¹czenia z baz¹ danych
db.connect((error) => {
    if (error) {
        console.error('B³¹d po³¹czenia z baz¹ danych:', error);
    } else {
        console.log('Po³¹czono z baz¹ danych.');
    }
});

// ustawienie katalogu, w którym znajduj¹ siê pliki statyczne
app.use(express.static(path.join(__dirname, 'build')));

// endpoint do obs³ugi strony g³ównej
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

// Obs³uga ¿¹dania HTTP POST na endpoint '/login'
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Sprawdzenie, czy przes³ano nazwê u¿ytkownika i has³o w ¿¹daniu
    if (!username || !password) {
        res.json({ success: false }); // Jeœli brakuje któregoœ z pól, wys³anie odpowiedzi z polem success ustawionym na false
        return;
    }

    // Przygotowanie zapytania SQL do pobrania u¿ytkownika o danej nazwie i haœle z bazy danych
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            res.json({ success: false, error: err }); // Wys³anie odpowiedzi z polem success ustawionym na false i polem error opisuj¹cym b³¹d
            return;
        }

        // Sprawdzenie, czy zapytanie zwróci³o wynik
        if (result.length === 0) {
            res.json({ success: false, message: 'Invalid username or password' }); // Jeœli nie znaleziono u¿ytkownika, wys³anie odpowiedzi z polem success ustawionym na false i polem message z opisem b³êdu
            return;
        }

        res.json({ success: true, message: 'Successful login' }); // Jeœli znaleziono u¿ytkownika, wys³anie odpowiedzi z polem success ustawionym na true i polem message z informacj¹ o pomyœlnym logowaniu
    });
});

// uruchomienie serwera na porcie 3000
app.listen(3000, () => {
    console.log('Serwer uruchomiony na porcie 3000');
});
