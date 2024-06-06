// importe le module Express. Framework web minimaliste pour JS
const express = require('express');
// importe le module path qui fournit l'utilitaire permettant de travailler avec les chemins de fichiers et répertoires
const path = require('path');
// Destructuration de l'objet exporté par le module "pg". Déstructuation extrait la classe "Pool"
const { Pool } = require('pg');
// Initialise une nouvelle instance de l'application JS.
const app = express();
const PORT = process.env.PORT || 5000;

// initialisation de la DB :
const pool = new Pool({
  user: 'lerosier',
  host: 'localhost',
  database: 'quiz_rock',
  password: 'Hola1992!',
  port: 5432,
});

// Middleware configuré pour servir des fichiers statiques depuis le répértoire racine
app.use(express.static(path.join(__dirname)));
// Middleware pour lire les fichiers jsons
app.use(express.json());


app.post('/submit-score', async (req, res) => {
  try {
    const { name, score, quiz_date } = req.body;

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

// Route pour vérifier qui est dans la BDD - cela fonctionne
app.get('/scores', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM scores');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Route pour récupérer l'ensemble des scores/name/date par date asendante
app.get('/ranking', async (req, res) => {
  try {
    // Effectuer une requête à la base de données pour récupérer tous les scores, triés par score décroissant
    const scores = await pool.query('SELECT * FROM scores ORDER BY rank ASC');

    // Recalculer le rang dynamiquement en fonction des scores récupérés
    for (let i = 0; i < scores.rows.length; i++) {
      const rank = i + 1;
      await pool.query('UPDATE scores SET rank = $1 WHERE id = $2', [rank, scores.rows[i].id]);
      scores.rows[i].rank = rank; // Mettre à jour la propriété rank dans l'objet retourné
    }

    // Renvoyer les scores recalculés et mis à jour au client sous forme de réponse JSON
    res.json(scores.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des scores :', error);
    res.status(500).json({ success: false, error: "Erreur serveur lors de la récupération des scores" });
  }
});

// For all GET requests, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
