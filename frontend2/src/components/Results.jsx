import React from "react";

function Results({ score }) {
  const getTitleAndHelpMessage = (score) => {
    switch (true) {
      case score === 20:
        return {
          title: "🏆 Bravo, tu es un fin mélomane! 🏆",
          help: "Tu possède une excellente culture musicale sur de nombreux styles !",
        };
      case score >= 15:
        return {
          title: "🥈 Super, tu possèdes une bonne connaissance musicale 🥈",
          help: "Tu connais beaucoup de choses, mais il te manque encore quelques détails !",
        };
      case score >= 10:
        return {
          title: "🥉 Tu connais la musique... mais tu peux t'améliorer ! 🥉",
          help: "La musique contemporaine ne t'est pas étrangère, mais il faut encore un peu bosser pour être au top !",
        };
      case score >= 5:
        return {
          title: "😅 Hum, tu devrais écouter un peu plus la radio si tu veux t'améliorer ! 😅",
          help: "Il ne faut pas se décourager, tu peux t'améliorer la culture musicale !.",
        };
      default:
        return {
          title: "❌ Toi le matin c'est plutôt les infos ? ❌",
          help: "N'hésite pas à écouter la radio un peu plus !",
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
