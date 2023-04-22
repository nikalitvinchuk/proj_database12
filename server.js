const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();

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

// uruchomienie serwera na porcie 3000
app.listen(3000, () => {
    console.log('Serwer uruchomiony na porcie 3000');
});
