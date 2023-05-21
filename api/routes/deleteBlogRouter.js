const express = require('express');
const db = require('../db');

const deleteBlogRouter = express.Router();

deleteBlogRouter.delete('/:id', (req, res) => {
  const blogId = req.params.id;
  
  const sql = `DELETE FROM blog WHERE id = ${blogId}`;
  
  db.query(sql, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Błąd serwera' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Blog nie istnieje' });
    }
    
    res.json({ message: 'Blog został pomyślnie usunięty' });
  });
});

module.exports = deleteBlogRouter;