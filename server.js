const express = require('express');
const path = require('path');
const db = require('./db')
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');

// Konfiguruje parsowanie cia�a ��dania
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

// Import modu�u obs�ugi rejestracji
const Register = require('./register');
app.use('/register', Register);

// Obs�uga ��dania HTTP POST na endpoint '/login'
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Sprawdzenie, czy przes�ano nazw� u�ytkownika i has�o w ��daniu
    if (!username || !password) {
        res.json({ success: false }); // Je�li brakuje kt�rego� z p�l, wys�anie odpowiedzi z polem success ustawionym na false
        return;
    }

    // Przygotowanie zapytania SQL do pobrania u�ytkownika o danej nazwie z bazy danych
    const sql = `SELECT * FROM users WHERE login = ?`;
    db.query(sql, [username], (err, result) => {
        if (err) {
            res.json({ success: false, error: err }); // Wys�anie odpowiedzi z polem success ustawionym na false i polem error opisuj�cym b��d
            console.log("�le 2");
            return;
        }

        // Sprawdzenie, czy zapytanie zwr�ci�o wynik
        if (result.length === 0) {
            res.json({ success: false, message: 'Invalid username or password' }); // Je�li nie znaleziono u�ytkownika, wys�anie odpowiedzi z polem success ustawionym na false i polem message z opisem b��du
            console.log("�le 3");
            console.log(result);
            return;
        }

        // Por�wnanie has�a wpisanego przez u�ytkownika z zahaszowanym has�em z bazy danych
        const hash = result[0].password;
        bcrypt.compare(password, hash, (err, isValid) => {
            if (err) {
                res.json({ success: false, error: err }); // Wys�anie odpowiedzi z polem success ustawionym na false i polem error opisuj�cym b��d
                console.log("�le 1");
                return;
            }

            if (!isValid) {
                res.json({ success: false, message: 'Invalid username or password' }); // Je�li has�o jest nieprawid�owe, wys�anie odpowiedzi z polem success ustawionym na false i polem message z opisem b��du
                console.log("�le 3");
                return;
            }

            res.json({ success: true, message: 'Successful login' }); // Je�li has�o jest prawid�owe, wys�anie odpowiedzi z polem success ustawionym na true i polem message z informacj� o pomy�lnym logowaniu
            console.log("Dobrze");

            // Konfiguracja sesji
            app.use(session({
                secret: 'some secret key',
                resave: false,
                saveUninitialized: false,
                cookie: { maxAge: 60000 } // Czas trwania sesji w milisekundach
            }));
        });
    });
});



// Import modu�u obs�ugi logowania
//const Login = require('./log');
//app.use('/login', Login);

// uruchomienie serwera na porcie 3000
app.listen(5000, () => {
    console.log('Serwer uruchomiony na porcie 3000');
});
