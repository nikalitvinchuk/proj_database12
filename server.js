const express = require('express');
const path = require('path');
const db = require('./db')
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');

// Nawi¹zanie po³¹czenia z baz¹ danych
db.connect((error) => {
    if (error) {
        console.error('B³¹d po³¹czenia z baz¹ danych:', error);
    } else {
        console.log('Po³¹czono z baz¹ danych.');
    }
});

// Konfiguruje parsowanie cia³a ¿¹dania
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser('mysecretkey'));

app.use(cors({
    origin: ["http://localhost:5000"],
    methods: ["GET", "POST"],
    credentials: true
}));

// Konfiguracja sesji
app.use(
    session({
        key: "userid",
        secret: 'mysecretkey',
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 120,
        }
    })
);

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
        return res.json({ success: false }); // Jeœli brakuje któregoœ z pól, wys³anie odpowiedzi z polem success ustawionym na false
    }

    // Przygotowanie zapytania SQL do pobrania u¿ytkownika o danej nazwie z bazy danych
    const sql = `SELECT * FROM users WHERE login = ?`;
    db.query(sql, [username], (err, result) => {
        if (err) {
            return res.json({ success: false, error: err }); // Wys³anie odpowiedzi z polem success ustawionym na false i polem error opisuj¹cym b³¹d
        }

        // Sprawdzenie, czy zapytanie zwróci³o wynik
        if (result.length === 0) {
            return res.json({ success: false, message: 'Invalid username or password' }); // Jeœli zapytanie nie zwróci³o wyniku, wys³anie odpowiedzi z polem success ustawionym na false i polem message z komunikatem o b³êdzie logowania
        }

        // Porównanie has³a z baz¹ danych z has³em przes³anym w ¿¹daniu
        const user = result[0];
        bcrypt.compare(password, user.password, (error, match) => {
            if (error) {
                return res.json({ success: false, error: error });
            }
            if (!match) {
                return res.json({ success: false, message: 'Invalid username or password' });
            }

            // Zalogowanie u¿ytkownika - ustawienie klucza sesji na jego identyfikatorze
            req.session.userid = user.id_user;

            console.log(req.session.userId);

            // Utworzenie ciasteczka z identyfikatorem u¿ytkownika
            res.cookie('userid', user.id_user);

            res.json({ success: true });
        });
    });
});


app.get('/session', (req, res) => {
    const userid = req.session.userid;
    console.log(userid);
    if (userid) {
        return res.json({ loggedIn: true, userId });
    } else {
        return res.json({ loggedIn: false });
    }
});



// Start serwera nas³uchuj¹cego na porcie 5000
app.listen(5000, () => {
    console.log('Serwer zosta³ uruchomiony na porcie 5000.');
});