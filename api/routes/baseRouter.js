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

  db.query(sqlTableData, (err, result) => {
    if (err) {
      return res.json({ success: false, error: err });
    }

    const tableData = result;
    console.log("baseTable - odczyt");

    res.json({ tableData });
  });
});

module.exports = baseRouter;
