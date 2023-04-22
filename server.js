const express = require('express');
const path = require('path');
const app = express();

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
