const express = require('express');
const router = express.Router();
const scoreController = require('../backend/controllers/scoreController');

// Définir les routes et les associer aux méthodes du contrôleur
router.post('/submit', scoreController.submitScore);
router.get('/ranking', scoreController.getRanking);

module.exports = router;


