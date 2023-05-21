const express = require('express');
const db = require('../db');
const baseRouter = express.Router();
baseRouter.get('/', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
        if (err) {
            return res.json({ success: false, error: err });
        }

        const users = result;
        res.json({ users });
        console.log('Odczytano u¿ytkowników:', users);
    });
});

module.exports = baseRouter;