import React from 'react';
import ScoreTableRow from './ScoreTableRow';

function HighScores({ highScores }) {  return (
    <div className="highscores">
      <h2>🏆 HIGHSCORES 🏆</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th>Date</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {highScores.map((score, index) => (
            <ScoreTableRow key={index} score={score} rank={score.rank} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HighScores;
