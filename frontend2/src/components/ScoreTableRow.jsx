import React from 'react';

function ScoreTableRow({ score, rank }) {
  console.log('ScoreTableRow rendu avec score :', score, 'et rank :', rank);

  // Choix de la médaille en fonction du rang
  const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '';

  return (
    <tr>
      <td>{medal || rank}</td> {/* Affiche la médaille ou le rang */}
      <td>{score.name}</td>
      <td>{score.score}</td>
      <td>{score.quiz_date}</td>
      <td>{score.id}</td>
    </tr>
  );
}

export default ScoreTableRow;
