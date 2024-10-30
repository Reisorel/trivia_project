[Cliquez ici pour lancer une partie !](https://quiz-rock-a9f8a58b7c61.herokuapp.com/)

### Description :
Ce projet est une application React/Node, composée de 20 questions de type trivia / quiz.
Il vise à introduire :

L’utilisation de React pour une gestion optimisée par composants, offrant une interface modulaire et réactive.
Node.js comme serveur backend pour gérer les requêtes API et orchestrer les opérations de l’application.
Les media queries pour une interface adaptative sur tous les terminaux.
Le déploiement sur Heroku pour rendre l’application accessible en ligne.

### Fonctionnalités :
Interface utilisateur intuitive : Simple à naviguer, pensée pour différents types d’écrans.
Responsive : Conçue pour une utilisation fluide depuis desktop et mobile.
Questions de quiz variées : 20 questions de type trivia couvrant divers sujets.
Interaction dynamique : Gestion des interactions en temps réel avec React, permettant des mises à jour immédiates et fluides.
Serveur backend en Node.js : En charge des requêtes API pour centraliser et gérer la logique métier.
PostgreSQL : Base de données relationnelle pour le suivi des scores, accessible via une API REST.
Déploiement sur Heroku : Permettant un accès en ligne instantané et facilité.
Bundler Vite pour des performances optimisées : Utilisation de Vite pour accélérer le chargement et améliorer l’expérience utilisateur.

### Exemple de code :

// Méthode pour soumettre un score
exports.submitScore = async (req, res) => {
  try {
    const { name, score, quiz_date } = req.body;
    console.log('Received data:', req.body);

    const result = await pool.query(
      'SELECT COUNT(*) + 1 AS rank FROM scores WHERE score > $1',
      [score]
    );
    const rank = result.rows[0].rank;

    await pool.query(
      'INSERT INTO scores (name, score, quiz_date, rank) VALUES ($1, $2, $3, $4)',
      [name, score, quiz_date, rank]
    );

    res.json({ success: true, message: "Score backend enregistré avec succès!", rank: rank });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Erreur serveur lors de l'enregistrement des données" });
  }
};



