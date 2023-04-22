const express = require('express');
const path = require('path');
const app = express();

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
