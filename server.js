const express = require('express');
const path = require('path');
const db = require('./db')
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const AWS = require('aws-sdk');

// Nawi�zanie po��czenia z baz� danych
db.connect((error) => {
    if (error) {
        console.error('B��d po��czenia z baz� danych:', error);
    } else {
        console.log('Po��czono z baz� danych.');
    }
});

// Konfiguruje parsowanie cia�a ��dania
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
            expires: 5,
        }
    })
);

// ustawienie katalogu, w kt�rym znajduj� si� pliki statyczne
app.use(express.static(path.join(__dirname, 'build')));

// endpoint do obs�ugi strony g��wnej
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

// Import modu�u obs�ugi rejestracji
const Register = require('./register');
app.use('/register', Register);

function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < 25; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
}

// Obs�uga ��dania HTTP POST na endpoint '/login'
app.post('/login', (req, res) => {

    const { username, password } = req.body;
    // Sprawdzenie, czy przes�ano nazw� u�ytkownika i has�o w ��daniu
    if (!username || !password) {
        return res.json({ success: false }); // Je�li brakuje kt�rego� z p�l, wys�anie odpowiedzi z polem success ustawionym na false
    }

    // Przygotowanie zapytania SQL do pobrania u�ytkownika o danej nazwie z bazy danych
    const sql = `SELECT * FROM users WHERE login = ?`;
    db.query(sql, [username], (err, result) => {
        if (err) {
            return res.json({ success: false, error: err }); // Wys�anie odpowiedzi z polem success ustawionym na false i polem error opisuj�cym b��d
        }

        // Sprawdzenie, czy zapytanie zwr�ci�o wynik
        if (result.length === 0) {
            return res.json({ success: false, message: 'Invalid username or password' }); // Je�li zapytanie nie zwr�ci�o wyniku, wys�anie odpowiedzi z polem success ustawionym na false i polem message z komunikatem o b��dzie logowania
        }

        // Por�wnanie has�a z baz� danych z has�em przes�anym w ��daniu
        const user = result[0];
        bcrypt.compare(password, user.password, (error, match) => {
            if (error) {
                return res.json({ success: false, error: error });
            }
            if (!match) {
                return res.json({ success: false, message: 'Invalid username or password' });
            }

            var key = generateRandomString()

            res.cookie('random_login_key', key);
            session[key] = {
                user_id: user.id_user,
            }

            console.log(session[key])

            res.json({ success: true });
        });
    });
});


app.get('/session', (req, res) => {
    if (session[req.cookies.random_login_key]) {
        return res.json({ loggedIn: true });
    } else {
        return res.json({ loggedIn: false });
    }
});

app.get('/logout', (req, res) => {
    delete session[req.cookies.random_login_key];
    res.clearCookie('random_login_key');
    res.json(true);
});


app.get('/user', (req, res) => {
    const userId = session[req.cookies.random_login_key].user_id;
    const sql = `SELECT imie, nazwisko, email, wiek, login FROM users WHERE id_user = ${userId}`;

    db.query(sql, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Błąd serwera' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Użytkownik nie istnieje' });
        }

        const { imie, nazwisko, email, wiek, login } = results[0];

        res.json({
            firstName: imie,
            lastName: nazwisko,
            email,
            age: wiek,
            login
        });
    });
});


app.get('/blog', (req, res) => {
    const query = "SELECT * FROM blog";
    db.query(query, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: "Error fetching posts from database" });
        }
        res.json(results);
    });
});


AWS.config.update({
    accessKeyId: 'AKIAS7YEJWSUTXUVUWGB',
    secretAccessKey: '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',
    region: 'eu-central-1'
});
const ses = new AWS.SES({ apiVersion: '2010-12-01' });
app.post('/email', (req, res) => {
    const { title, email, message } = req.body;

    const params = {
        Destination: {
            ToAddresses: ['michal.m1234@interia.pl']
        },
        Message: {
            Body: {
                Text: {
                    Charset: "UTF-8",
                    Data: `Autor: ${email}, Wiadomość: ${message}`
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: `${title}`
            }
        },
        Source: 'mmordarski@int.pl',
    };

    ses.sendEmail(params, (err, data) => {
        if (err) {
            console.log(err, err.stack);
            res.status(500).send('Error sending email');
        } else {
            console.log(data);
            res.send('Email sent successfully');
        }
    });
});



// Start serwera nas�uchuj�cego na porcie 5000
app.listen(5000, () => {
    console.log('Serwer zosta� uruchomiony na porcie 5000.');
});