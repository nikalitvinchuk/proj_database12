const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();

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

// uruchomienie serwera na porcie 3000
app.listen(3000, () => {
    console.log('Serwer uruchomiony na porcie 3000');
});
