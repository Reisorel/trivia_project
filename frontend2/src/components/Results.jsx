import React from "react";

function Results({ score }) {

  console.log("Score:", score); // Log pour valider que le score est bien passé

  return (
    <div className="results">
      <h2>Résultats</h2>
      <p className="mark">Score : {score}/20</p>
      <p className="help">
        {score === 20
          ? "Félicitations, vous êtes un expert en festivals !"
          : score >= 15
          ? "Bravo, vous avez une bonne connaissance des festivals !"
          : "Vous pouvez encore améliorer vos connaissances !"}
      </p>
      <button onClick={() => window.location.reload()}>Recommencer 🔄</button>
    </div>
  );
}

export default Results;
