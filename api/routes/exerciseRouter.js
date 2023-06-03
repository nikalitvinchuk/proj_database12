const express = require('express');
const router = express.Router();
const db = require('../db');
const session = require('express-session');

// Funkcja generująca losową nazwę

function generateRandomName() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomName = '';

  // Generowanie losowej nazwy o długości 10

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomName += characters.charAt(randomIndex);
  }

  return randomName;
}

// Pobieranie listy zestawów ćwiczeń z bazy danych

router.get('/', (req, res) => {
  const userId = session[req.cookies.random_login_key].user_id;
  const sql = 'SELECT * FROM exercise_sets WHERE autor = '+userId;
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Błąd podczas pobierania listy zestawów ćwiczeń:', err);
      res.status(500).json({ error: 'Błąd podczas pobierania listy zestawów ćwiczeń.' });
    } else {
      res.json(result);
    }
  });
  
});


// Dodawanie zestawu ćwiczeń do bazy danych

router.post('/add', (req, res) => {
  var exerciseSet = req.body.exerciseSet;
  const userId = session[req.cookies.random_login_key].user_id;

  console.log(exerciseSet);

  // Sprawdź, czy przekazano dane zestawu ćwiczeń

  if (!exerciseSet) {
    res.status(400).json({ error: 'Nieprawidłowe dane zestawu ćwiczeń.' });
    return;
  }

  // Generuj losową nazwę dla zestawu ćwiczeń

  const exerciseSetName = generateRandomName();
  console.log('exerciseSetName:', exerciseSetName);

  // Dodaj rekord dla zestawu ćwiczeń w tabeli exercise_sets

  const exerciseSetSql = 'INSERT INTO exercise_sets (autor,nazwa) VALUES (?, ?)';
  db.query(exerciseSetSql, [userId, exerciseSetName], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Błąd podczas dodawania zestawu ćwiczeń.' });
      return;
    }

    const setId = result.insertId; // Id nowego rekordu w tabeli exercise_sets
    console.log('setId:', setId);

      //   // Dodaj ćwiczenia do zestawu ćwiczeń

    for (let i = 0; i < exerciseSet.length; i++) {
      const exercise = exerciseSet[i];
      const name = exercise.name;
      const reps = exercise.reps;
      const breakTime = exercise.break;
      const series = exercise.series;
      console.log(name, reps, breakTime, series);
      const exerciseSql = 'INSERT INTO exercises (id_set, name, reps, break, series) VALUES (?, ?, ?, ?, ?)';
      db.query(exerciseSql, [setId, name, reps, breakTime, series], (err, result) => {
        if (err) {
          res.status(500).json({ error: 'Błąd podczas dodawania ćwiczenia.' });
          return;
        }
      });
    }

  })



  //   res.status(200).json({ success: 'Zestaw ćwiczeń został dodany.' });
  // });
});

module.exports = router;
