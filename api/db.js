const mysql = require('mysql');

// Konfiguracja połączenia z bazą danych
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "pztz",
    port: "3306"
});
;
module.exports = db