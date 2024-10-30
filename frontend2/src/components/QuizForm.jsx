import React, { useState } from 'react';

function QuizForm({ onSubmit, userName, fetchScores }) {
  const [answers, setAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [questionResults, setQuestionResults] = useState([]); // Pour stocker les résultats (vrai/faux) de chaque question

  const questions = [
    { id: 1, question: "En quelle année a eu lieu le premier festival de Woodstock ?", options: ["1969", "1974", "1971"], correctAnswer: "1969" },
    { id: 2, question: "Où se déroule le festival de Glastonbury ?", options: ["Irlande", "Écosse", "Angleterre"], correctAnswer: "Angleterre" },
    { id: 3, question: "Quel rappeur est surnommé 'Slim Shady' ?", options: ["Jay-Z", "Nas", "Eminem"], correctAnswer: "Eminem" },
    { id: 4, question: "Quelle chanteuse est connue pour le hit 'Like a Virgin' ?", options: ["Madonna", "Cher", "Whitney Houston"], correctAnswer: "Madonna" },
    { id: 5, question: "Quel groupe a popularisé le titre 'Hotel California' ?", options: ["The Eagles", "Fleetwood Mac", "The Rolling Stones"], correctAnswer: "The Eagles" },
    { id: 6, question: "Quel DJ est célèbre pour la chanson 'Wake Me Up' ?", options: ["Calvin Harris", "David Guetta", "Avicii"], correctAnswer: "Avicii" },
    { id: 7, question: "Dans quelle ville se tient le festival Coachella ?", options: ["Los Angeles", "Palm Springs", "Indio"], correctAnswer: "Indio" },
    { id: 8, question: "Quel groupe a sorti l’album 'Nevermind' en 1991 ?", options: ["Nirvana", "Pearl Jam", "Soundgarden"], correctAnswer: "Nirvana" },
    { id: 9, question: "Quel est le titre du premier album de Michael Jackson ?", options: ["Bad", "Off the Wall", "Thriller"], correctAnswer: "Off the Wall" },
    { id: 10, question: "Quel genre musical est associé à la ville de Détroit ?", options: ["Jazz", "Blues", "Motown"], correctAnswer: "Motown" },
    { id: 11, question: "Quel artiste est connu pour la chanson 'Purple Rain' ?", options: ["Prince", "David Bowie", "Freddie Mercury"], correctAnswer: "Prince" },
    { id: 12, question: "De quel pays est originaire le groupe AC/DC ?", options: ["États-Unis", "Australie", "Angleterre"], correctAnswer: "Australie" },
    { id: 13, question: "Quelle radio française est célèbre pour ses concerts 'Planète Rap' ?", options: ["Skyrock", "NRJ", "Fun Radio"], correctAnswer: "Skyrock" },
    { id: 14, question: "Quel groupe a sorti 'Another Brick in the Wall' ?", options: ["The Beatles", "Pink Floyd", "The Doors"], correctAnswer: "Pink Floyd" },
    { id: 15, question: "Qui est la chanteuse principale du groupe No Doubt ?", options: ["Madonna", "Gwen Stefani", "Shirley Manson"], correctAnswer: "Gwen Stefani" },
    { id: 16, question: "Quel artiste a sorti l'album 'To Pimp a Butterfly' ?", options: ["Drake", "Kendrick Lamar", "J. Cole"], correctAnswer: "Kendrick Lamar" },
    { id: 17, question: "Quel groupe a chanté 'Bohemian Rhapsody' ?", options: ["Queen", "Led Zeppelin", "The Who"], correctAnswer: "Queen" },
    { id: 18, question: "De quelle nationalité est le groupe Kraftwerk, pionnier de la musique électronique ?", options: ["Allemande", "Française", "Suédoise"], correctAnswer: "Allemande" },
    { id: 19, question: "Quel groupe de rock a sorti l’album 'Abbey Road' ?", options: ["The Rolling Stones", "The Beatles", "The Kinks"], correctAnswer: "The Beatles" },
    { id: 20, question: "Quel artiste est connu pour le titre 'Gin & Juice' ?", options: ["50 Cent", "Eminem", "Snoop Dogg"], correctAnswer: "Snoop Dog" }
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
        <div className='guiding'>
          <h2>Cliquez sur <span>valider</span> pour voir les <span>résultats.</span></h2>
        </div>
      </form>
    </div>
  );
}

export default QuizForm;
