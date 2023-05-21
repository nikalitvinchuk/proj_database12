const express = require('express');
const db = require('../db');
const tableRouter = express.Router();
tableRouter.get('/', (req, res) => {
    const sql = "SHOW TABLES";
    db.query(sql, (err, result) => {
        if (err) {
            return res.json({ success: false, error: err });
        }

        const tables = result.map((row) => row[`Tables_in_${PZTZ}`]);
        res.json({ tables });
        console.log('Odczytano tabele:', users);
    });
});

module.exports = tableRouter;