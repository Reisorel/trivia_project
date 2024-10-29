import React from "react";

function Results({ score }) {
  const getTitleAndHelpMessage = (score) => {
    switch (true) {
      case score === 20:
        return {
          title: "🏆 Bravo, tu es un spécialiste des festivals ! 🏆",
          help: "Grands événements et petites anecdotes n'ont aucun secret pour toi !",
        };
      case score >= 15:
        return {
          title: "🥈 Super, tu possèdes une bonne connaissance des festivals! 🥈",
          help: "Tu aimes la culture festivalière, mais il te manque encore quelques détails !",
        };
      case score >= 10:
        return {
          title: "🥉 Tu aimes les festivals... mais tu peux t'améliorer ! 🥉",
          help: "La culture du festoche ne t'est pas étrangère, mais il faut encore un peu bosser pour être au top !",
        };
      case score >= 5:
        return {
          title: "😅 Hum, tu devrais aller à plus de festivals si tu veux t'améliorer ! 😅",
          help: "Il ne faut pas se décourager, tu peux t'améliorer sur les festivals.",
        };
      default:
        return {
          title: "❌ Toi l'été c'est plutôt rando non ? ❌",
          help: "Il semble que tu aies besoin d'aller un peu plus en festival !",
        };
    }
  };

  const { title, help } = getTitleAndHelpMessage(score);

  return (
    <div className="results">
      <h2>{title}</h2>
      <p className="mark">Score : <span>{score}/20</span></p>
      <p className="help">{help}</p>
      <button className="back" onClick={() => window.location.reload()}>Recommencer 🔄</button>
    </div>
  );
}

export default Results;

