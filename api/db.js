const mysql = require('mysql');

// Konfiguracja połączenia z bazą danych
const db = mysql.createConnection({
    user: "admin",
    host: "database-1.cjjgvpiu0phh.eu-central-1.rds.amazonaws.com",
    password: "12345678",
    database: "PZTZ",
    port: 3308
});
;
module.exports = db