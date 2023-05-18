const express = require('express');
const db = require('../db');

const randomTipRouter = express.Router();

randomTipRouter.get('/', (req, res) => {
  const sql = 'SELECT tresc FROM tips ORDER BY RAND() LIMIT 1';
    db.query(sql, (error, result) => {
        if (error) {
            res.status(500).json({ error: "Server error" });
            console.log('Nie wylosowano');
        } else {
            const randomTip = result[0].tresc;
            res.json({ tresc: randomTip });
            console.log('Wylosowano wskazówkę');

            if (req.session && req.session.tip) {
                req.session.tip = randomTip;
                req.session.cookie.expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
            }
        }
    });
});

module.exports = randomTipRouter;
