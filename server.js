// importe le module Express. Framework web minimaliste pour JS
const express = require('express');
// importe le module path qui fournit l'utilitaire permettant de travailler avec les chemins de fichiers et répertoires
const path = require('path');
// Importer le pool depuis db.js
const pool = require('./db');
// Initialise une nouvelle instance de l'application JS.
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware configuré pour servir des fichiers statiques depuis le répértoire racine
app.use(express.static(path.join(__dirname)));
// Middleware pour lire les fichiers jsons
app.use(express.json());

app.post('/submit-score', async (req, res) => {
  try {
    const { name, score, quiz_date } = req.body;
    console.log('Received data:', req.body); // Vérifiez ce qui est reçu


    // Calculer le rang du nouveau score en fonction des scores déjà enregistrés
    const result = await pool.query(
      'SELECT COUNT(*) + 1 AS rank FROM scores WHERE score > $1',
      [score]
    );
    const rank = result.rows[0].rank;

    // Insérer le nouveau score avec le rang calculé dans la base de données
    await pool.query(
      'INSERT INTO scores (name, score, quiz_date, rank) VALUES ($1, $2, $3, $4)',
      [name, score, quiz_date, rank]
    );

    res.json({ success: true, message: "Score backend enregistré avec succès!", rank: rank });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Erreur serveur lors de l'enregistrement des données" });
  }
});

// Route pour vérifier la maj de la BBD sans classement - fonctionne
app.get('/scores', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM scores');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Route pour récupérer l'ensemble des scores avec classement
app.get('/ranking', async (req, res) => {
  try {
    const scoresResult = await pool.query('SELECT * FROM scores ORDER BY score DESC, quiz_date DESC');
    const scores = scoresResult.rows;
    // console.log('Scores récupérés:', scores);

    for (let i = 0; i < scores.length; i++) {
      const rank = i + 1;
      scores[i].rank = rank;
      scores[i].quiz_date = new Date(scores[i].quiz_date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }
      // console.log(`Attribuer rang ${rank} à l'utilisateur ${scores[i].id}`);

    const updatePromises = scores.map(score =>
      pool.query('UPDATE scores SET rank = $1 WHERE id = $2', [score.rank, score.id])
    );
    await Promise.all(updatePromises);

    res.json(scores);
  } catch (error) {
    console.error('Erreur lors de la récupération des scores :', error);
    res.status(500).json({ success: false, error: "Erreur serveur lors de la récupération des scores" });
  }
});

// For all GET requests, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
