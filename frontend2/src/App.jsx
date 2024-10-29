import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import Header from './components/Header';
import QuizForm from './components/QuizForm';
import Results from './components/Results';
import HighScores from './components/HighScores';
import UserNameInput from './components/UserNameInput';

function App() {
  const [userName, setUserName] = useState('');
  const [score, setScore] = useState(null);
  const [results, setResults] = useState(null);
  const [highScores, setHighScores] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const resultsRef = useRef(null);

  useEffect(() => {
    fetchScores();
  }, []);

  const handleQuizSubmit = (quizResults, quizQuestions) => {
    const correctAnswers = quizResults.filter((result) => result === true).length;
    const totalQuestions = quizResults.length;
    const calculatedScore = (correctAnswers / totalQuestions) * 20;

    setScore(calculatedScore);
    setResults(quizResults);
    setQuestions(quizQuestions);
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (results && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [results]);

  const fetchScores = () => {
    fetch('/api/scores/ranking')
      .then(response => response.ok ? response.json() : Promise.reject("Erreur"))
      .then(data => setHighScores(data))
      .catch(error => console.error('Erreur lors du chargement des scores :', error));
  };

  return (
    <div className="App">
      <Header/>
      {!userName && <UserNameInput setUserName={setUserName} />}
      <QuizForm onSubmit={handleQuizSubmit} userName={userName} fetchScores={fetchScores} />

      {results && (
        <div ref={resultsRef}>
          <Results score={score} results={results} questions={questions} />
        </div>
      )}

      {isSubmitted && highScores.length > 0 && (
        <HighScores highScores={highScores} />
      )}
    </div>
  );
}

export default App;
