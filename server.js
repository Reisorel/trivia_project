require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const scoreRoutes = require('./src/routes/scoreRoutes');

// Middleware pour parser le JSON
app.use(express.json());

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Utiliser les routes définies dans scoreRoutes
app.use('/api/scores', scoreRoutes);

// Route pour servir l'application front-end
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
