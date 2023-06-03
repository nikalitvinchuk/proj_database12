const express = require("express");
const db = require("../db");
const baseRouter = express.Router();

baseRouter.get("/", (req, res) => {
  const sqlTables = "SHOW TABLES";

  db.query(sqlTables, (err, result) => {
    if (err) {
      return res.json({ success: false, error: err });
    }

    const tables = result.map(
      table => table[`Tables_in_${db.config.database}`]
    );

    res.json({ tables });
  });
});

baseRouter.get("/:table", (req, res) => {
  const selectedTable = req.params.table;
  const sqlTableData = `SELECT * FROM ${selectedTable}`;

        db.query(sqlUsers, (err, result) => {
            if (err) {
                return res.json({ success: false, error: err });
            }

            const users = result;
            res.json({ tables, users });
            console.log('Odczytano u�ytkownik�w:');
        });
    });
});

module.exports = baseRouter;
