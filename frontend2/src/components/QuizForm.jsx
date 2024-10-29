import React, { useState } from 'react';

function QuizForm({ onSubmit, userName, fetchScores }) {
  const [answers, setAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [questionResults, setQuestionResults] = useState([]); // Pour stocker les résultats (vrai/faux) de chaque question

  const questions = [
    { id: 1, question: "En quelle année a eu lieu le premier festival de Woodstock ?", options: ["1969", "1974", "1971"], correctAnswer: "1969" },
    { id: 2, question: "Où se déroule le festival de Glastonbury ?", options: ["Irlande", "Ecosse", "Angleterre"], correctAnswer: "Angleterre" },
    { id: 3, question: "De quelle ville des Etats-Unis est originaire le festival Lollapalooza ?", options: ["San Francisco", "New York", "Chicago"], correctAnswer: "Chicago" }
  ];

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

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
      .then((response) => response.ok ? response.json() : Promise.reject("Erreur"))
      .then(data => {
        if (data.success) {
          console.log('Score sauvegardé');
          fetchScores();
        } else {
          console.error('Erreur lors de la sauvegarde du score :', data.error);
        }
      })
      .catch(error => console.error('Erreur lors de l\'envoi du score :', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isSubmitted) {
      const results = questions.map((question, index) => question.correctAnswer === answers[index]);
      const correctAnswers = results.filter(Boolean).length;
      const calculatedScore = (correctAnswers / results.length) * 20;

      setQuestionResults(results); // Met à jour les résultats par question (true ou false)
      onSubmit(results, questions);
      saveScore(calculatedScore);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="quiz-container">
      <form onSubmit={handleSubmit} className="quiz-form">
        {questions.map((q, index) => (
          <div
            key={q.id}
            className={`question-block ${isSubmitted ? (questionResults[index] ? 'correct' : 'incorrect') : ''}`}
          >
            <h4>{q.question}</h4>
            {q.options.map((option, i) => (
              <label key={i}>
                <input
                  type="radio"
                  name={`q${q.id}`}
                  value={option}
                  onChange={() => handleAnswerChange(index, option)}
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <button type="submit" disabled={isSubmitted}>Valider ✅</button>
        <div className='help'>
          <h2>Cliquez sur <span>valider</span> pour voir les <span>résultats.</span></h2>
        </div>
      </form>
    </div>
  );
}

export default QuizForm;
