const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');

const loginRouter = express.Router();

loginRouter.post('/', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ success: false });
  }

  const sql = `SELECT * FROM users WHERE login = ?`;
  db.query(sql, [username], (err, result) => {
    if (err) {
      return res.json({ success: false, error: err });
    }

    if (result.length === 0) {
      return res.json({ success: false, message: 'Invalid username or password' });
    }

    const user = result[0];
    bcrypt.compare(password, user.password, (error, match) => {
      if (error) {
        return res.json({ success: false, error: error });
      }
      if (!match) {
        return res.json({ success: false, message: 'Invalid username or password' });
      }

      // ... res.cookie, session, etc.

      res.json({ success: true });
    });
  });
});

module.exports = loginRouter;
