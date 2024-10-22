import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import Header from './components/Header';
import QuizForm from './components/QuizForm';
import Results from './components/Results';
import HighScores from './components/HighScores';

function App() {
  const [userName, setUserName] = useState('');
  const [score, setScore] = useState(null);
  const [results, setResults] = useState(null); // Pour stocker les résultats
  const [highScores, setHighScores] = useState([]); // Pour stocker les high scores
  const hasAskedUserName = useRef(false); // Utilisation de useRef pour éviter la répétition

  // Charger les scores lors du démarrage de l'application
  useEffect(() => {
    fetch('/api/scores/ranking')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des scores');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Scores chargés depuis le backend :', data);
        setHighScores(data);
      })
      .catch((error) => console.error('Erreur lors du chargement des scores :', error));
  }, []);

  // Demande le nom de l'utilisateur une seule fois
  useEffect(() => {
    if (!hasAskedUserName.current) {
      let user = '';
      while (!user || !user.trim()) {
        const userResponse = confirm("Entrez votre pseudo ! Cliquez sur 'Annuler' pour quitter.");
        if (userResponse === false) {
          alert("Vous avez annulé l'entrée du pseudo.");
          return;
        }
        user = prompt("Entrez votre pseudo !");
        if (!user || !user.trim()) {
          alert("Vous avez bien un nom tout de même ?!");
        }
      }
      setUserName(user.trim());
      alert(`Bienvenue, ${user.trim()}!`);
      hasAskedUserName.current = true; // Marque que le prompt a déjà été exécuté
    }
  }, []);

  // Fonction pour gérer la soumission du formulaire de quiz
  const handleQuizSubmit = (quizResults) => {
    const correctAnswers = quizResults.filter((result) => result === true).length;
    const totalQuestions = quizResults.length;
    const calculatedScore = (correctAnswers / totalQuestions) * 20;
    setScore(calculatedScore); // Met à jour le score
    setResults(quizResults); // Met à jour les résultats du quiz

    saveScore(calculatedScore); // Sauvegarde le score dans le backend
  };

  // Fonction pour sauvegarder le score dans le backend
  const saveScore = (userScore) => {
    const currentDate = new Date().toISOString().split('T')[0];
    fetch('/api/scores/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userName,
        score: userScore,
        quiz_date: currentDate,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de l\'envoi du score');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Score sauvegardé côté frontend:', data);
        if (data.success) {
          // Ajouter le score soumis à la liste des scores
          setHighScores((prevScores) => [...prevScores, data]);
        } else {
          console.error('Erreur lors de la sauvegarde du score :', data.error);
        }
      })
      .catch((error) => console.error('Erreur lors de l\'envoi du score :', error));
  };

  return (
    <div className="App">
      <Header />
      {results ? (
        <Results score={score} /> // Affiche les résultats si le quiz est terminé
      ) : (
        <QuizForm onSubmit={handleQuizSubmit} /> // Affiche le formulaire de quiz
      )}

      {/* Affiche les high scores s'ils sont chargés */}
      {highScores.length > 0 && (
        <HighScores highScores={highScores} />
      )}
    </div>
  );
}

export default App;
