import React from 'react';

function ScoreTableRow({ score, rank }) {
  return (
    <tr>
      <td>{rank}</td>
      <td>{score.name}</td>
      <td>{score.score}</td>
      <td>{score.quiz_date}</td>
      <td>{score.id}</td>
    </tr>
  );
}

export default ScoreTableRow;
