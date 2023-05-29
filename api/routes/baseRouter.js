const express = require('express');
const db = require('../db');
const baseRouter = express.Router();

baseRouter.get('/', (req, res) => {
    const sqlTables = "SHOW TABLES";
    const sqlUsers = "SELECT * FROM users";

    db.query(sqlTables, (err, result) => {
        if (err) {
            return res.json({ success: false, error: err });
        }

        const tables = result.map((table) => table[`Tables_in_${db.config.database}`]);

        db.query(sqlUsers, (err, result) => {
            if (err) {
                return res.json({ success: false, error: err });
            }

            const users = result;
            res.json({ tables, users });
            console.log('Odczytano u¿ytkowników:');
        });
    });
});

module.exports = baseRouter;