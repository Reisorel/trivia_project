[Cliquez ici pour lancer une partie !](https://quiz-rock-a9f8a58b7c61.herokuapp.com/)

### Description :
Ce projet est une simple page web comportant 20 questions type trivia / quizZ.
Ce projet vise à approfondir :
La maitrise des sélécteurs, des boucles et les interactions JS / DOM.
Egalement une introduction à Node pour pouvoir lancer la page web depuis Heroku.

### Fonctionnalités:

- **Interface utilisateur intuitive** : Conçue pour être facile à naviguer
-**Responsive** : Conçue pour être utilisée depuis desktop ou mobile.
- **Questions de quiz variées** : Comprend 20 questions de type trivia couvrant divers sujets.
- **Interaction dynamique** : Utilisation de JavaScript pour gérer les interactions en temps réel avec le DOM.
- **Gestion des événements** : Implémentation de sélecteurs et de boucles pour un contrôle précis des événements utilisateur.
- **Backend en Node.js** : Introduction à Node.js pour servir la page web et gérer les requêtes.
- **Déploiement sur Heroku** : Déployé sur Heroku pour un accès facile et instantané en ligne.

### Exemple de code :

```javascript
function showResults(results) {
  const errorsNumber = results.filter(el => el === false).length;

  switch (errorsNumber) {
    case 0:
      titleResult.textContent = `🏆 Bravo, tu es un spécialiste du ROCK ! 🏆`;
      helpResult.style.display = "block";
      helpResult.textContent = "Grands moments et petites anecdotes n'ont aucun secret pour toi !";
      markResult.style.display = "block";
      markResult.innerHTML = `Score : <span>${20 - errorsNumber}/ 20</span>`;
      backButton.style.display = "block";
      backButton.textContent = "Recommencer 🔄";
      break;
    // Filtre permettant de gérer le cas ou l'utilisateur fait un sans faute au quizz (0 erreurs)
  }
}
