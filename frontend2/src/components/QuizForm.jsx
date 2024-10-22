import React, { useState } from 'react';

function QuizForm({ onSubmit }) {
  const [answers, setAnswers] = useState([]);

  // Liste des questions avec les bonnes réponses
  const questions = [
    { id: 1, question: "En quelle année a eu lieu le premier festival de Woodstock ?", options: ["1969", "1974", "1971"], correctAnswer: "1969" },
    { id: 2, question: "Où se déroule le festival de Glastonbury ?", options: ["Irlande", "Ecosse", "Angleterre"], correctAnswer: "Angleterre" },
    { id: 3, question: "De quelle ville des Etats-Unis est originaire le festival Lollapalooza ?", options: ["San Francisco", "New York", "Chicago"], correctAnswer: "Chicago" }
    // Ajoute ici d'autres questions avec les bonnes réponses
  ];

  // Fonction pour mettre à jour les réponses de l'utilisateur
  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  // Gère la soumission du quiz et vérifie les réponses
  const handleSubmit = (e) => {
    e.preventDefault();

    const results = questions.map((question, index) => {
      return question.correctAnswer === answers[index]; // Compare la réponse de l'utilisateur avec la bonne réponse
    });

    onSubmit(results); // Transmet les résultats (true ou false pour chaque question) au composant parent
  };

  return (
    <form onSubmit={handleSubmit} className="quiz-form">
      {questions.map((q, index) => (
        <div key={q.id} className="question-block">
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
      <button type="submit">Valider ✅</button>
    </form>
  );
}

export default QuizForm;
