const express = require('express');
const path = require('path');
const db = require('./db')
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');

// Konfiguruje parsowanie cia³a ¿¹dania
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

// Import modu³u obs³ugi rejestracji
const Register = require('./register');
app.use('/register', Register);

// Obs³uga ¿¹dania HTTP POST na endpoint '/login'
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Sprawdzenie, czy przes³ano nazwê u¿ytkownika i has³o w ¿¹daniu
    if (!username || !password) {
        res.json({ success: false }); // Jeœli brakuje któregoœ z pól, wys³anie odpowiedzi z polem success ustawionym na false
        return;
    }

    // Przygotowanie zapytania SQL do pobrania u¿ytkownika o danej nazwie z bazy danych
    const sql = `SELECT * FROM users WHERE login = ?`;
    db.query(sql, [username], (err, result) => {
        if (err) {
            res.json({ success: false, error: err }); // Wys³anie odpowiedzi z polem success ustawionym na false i polem error opisuj¹cym b³¹d
            console.log("le 2");
            return;
        }

        // Sprawdzenie, czy zapytanie zwróci³o wynik
        if (result.length === 0) {
            res.json({ success: false, message: 'Invalid username or password' }); // Jeœli nie znaleziono u¿ytkownika, wys³anie odpowiedzi z polem success ustawionym na false i polem message z opisem b³êdu
            console.log("le 3");
            console.log(result);
            return;
        }

        // Porównanie has³a wpisanego przez u¿ytkownika z zahaszowanym has³em z bazy danych
        const hash = result[0].password;
        bcrypt.compare(password, hash, (err, isValid) => {
            if (err) {
                res.json({ success: false, error: err }); // Wys³anie odpowiedzi z polem success ustawionym na false i polem error opisuj¹cym b³¹d
                console.log("le 1");
                return;
            }

            if (!isValid) {
                res.json({ success: false, message: 'Invalid username or password' }); // Jeœli has³o jest nieprawid³owe, wys³anie odpowiedzi z polem success ustawionym na false i polem message z opisem b³êdu
                console.log("le 3");
                return;
            }

            res.json({ success: true, message: 'Successful login' }); // Jeœli has³o jest prawid³owe, wys³anie odpowiedzi z polem success ustawionym na true i polem message z informacj¹ o pomyœlnym logowaniu
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



// Import modu³u obs³ugi logowania
//const Login = require('./log');
//app.use('/login', Login);

// uruchomienie serwera na porcie 3000
app.listen(5000, () => {
    console.log('Serwer uruchomiony na porcie 3000');
});
