const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const session = require('express-session');

function generateRandomString() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < 25; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

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

      var key = generateRandomString()

            res.cookie('random_login_key', key);
            session[key] = {
                user_id: user.id_user,
            }
            
        console.log(session[key])
        session.isAdmin = user.isAdmin;

        res.json({ success: true });
        console.log('isAdmin:', user.isAdmin);
    });
  });
});

module.exports = loginRouter;
