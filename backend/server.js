require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const scoreRoutes = require('./scoreRoutes');
console.log('Routes pour les scores chargées.');


const cors = require('cors');


// Middleware pour parser le JSON
app.use(express.json());

// Cors pour autoriser les requêtes depuis le serveur
app.use(cors());

// Servir les fichiers statiques du dossier 'dist' (où Vite génère le frontend)
app.use(express.static(path.join(__dirname, 'dist')));

// Utiliser les routes définies dans scoreRoutes
app.use('/api/scores', scoreRoutes);

// Route pour servir l'application front-end
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html')); // Assurez-vous que le build produit cet index.html
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🏄🏻‍♂️`);
  console.log(`Access by clicking on http://localhost:${PORT}`);
});
