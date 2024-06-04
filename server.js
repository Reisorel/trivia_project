// importe le module Express. Framework web minimaliste pour JS
const express = require('express');
// importe le module path qui fournit l'utilitaire permettant de travailler avec les chemins de fichiers et répertoires
const path = require('path');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 5000;

const pool = new Pool({
  user: 'lerosier',
  host: 'localhost',
  database: 'quiz_rock',
  password: 'Hola1992!',
  port: 5432,
});

// Middleware configuré pour servri des fichiers statiques depuis el répértoire racine
app.use(express.static(path.join(__dirname)));
// Middleware pour lire les fichiers jsons
app.use(express.json());


// Route pour inscire les noms dans la BDD
app.post('/username', async (req, res) => {
  try {
    const { name } = req.body;
    await pool.query('INSERT INTO scores (name) VALUES ($1)', [name]);
    res.json({ success: true, message: "Nom d'utilisateur ajouté avec succès" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Erreur serveur" });
  }
});

// Route pour vérifier qui est dans la BDD
app.get('/scores', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM scores');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// For all GET requests, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
