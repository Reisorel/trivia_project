document.addEventListener("DOMContentLoaded", () => {
  let userName = "";

  while (!userName || !userName.trim()) {
    userName = prompt("Entrez votre pseudo !");
    if (!userName || !userName.trim()) {
      alert("Vous avez bien un nom tout de même ?!");
    }
  }

  // Stocker le nom de l'utilisateur dans une variable globale
  window.userName = userName.trim();
  console.log(window.userName);
});

const responses = [
  "a", "c", "c", "a", "b",
  "c", "a", "a", "a", "b",
  "c", "a", "b", "c", "a",
  "a", "a", "b", "b", "a"
];
const emojis = ["✔️", "✨", "👀", "😭", "👎"];

const form = document.querySelector(".quiz-form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const results = [];

  const radioButtons = document.querySelectorAll("input[type='radio']:checked");

  radioButtons.forEach((radioButton, index) => {
    if (radioButton.value === responses[index]) {
      results.push(true);
    } else {
      results.push(false);
    }
  });

  showResults(results);
  addColors(results);
}

const titleResult = document.querySelector('.results h2');
const markResult = document.querySelector('.mark');
const helpResult = document.querySelector('.help');
const backButton = document.querySelector('.back');
const highscores = document.querySelector('.highscores');
const highscoresBody = document.querySelector('.highscores tbody');

backButton.addEventListener('click', () => {
  window.scrollTo(0, 0);
  location.reload();
});

function showResults(results) {
  const errorsNumber = results.filter(el => el === false).length;
  const score = 20 - errorsNumber;

  switch (score) {
    case 20:
      titleResult.textContent = `🏆 Bravo, tu es un spécialiste des fastivals ! 🏆`;
      helpResult.style.display = "block";
      helpResult.textContent = "Grands événements et petites anecdotes n'ont aucun secret pour toi !";
      markResult.style.display = "block";
      markResult.innerHTML = `Score : <span>${score}/ 20</span>`;
      backButton.style.display = "block";
      backButton.textContent = "Recommencer 🔄";
      break;
    case 19:
    case 18:
    case 17:
    case 16:
    case 15:
      titleResult.textContent = `🥈 Super, tu possèdes un bonne connaissance des festivals! 🥈`;
      helpResult.style.display = "block";
      helpResult.textContent = "Tu aimes la culture festivalière, mais il te manque encore quelques détails !";
      markResult.style.display = "block";
      markResult.innerHTML = `Score : <span>${score}/ 20</span>`;
      backButton.style.display = "block";
      backButton.textContent = "Recommencer 🔄";
      break;
    case 14:
    case 13:
    case 12:
    case 11:
    case 10:
      titleResult.textContent = `🥉 Tu aimes les festivals...mais tu peux t'améliorer ! 🥉`;
      helpResult.style.display = "block";
      helpResult.textContent = "La culture du festoche ne t'es pas étrangère, mais il faut encore un peu bosser pour être au top !";
      markResult.style.display = "block";
      markResult.innerHTML = `Score : <span>${score}/ 20</span>`;
      backButton.style.display = "block";
      backButton.textContent = "Recommencer 🔄";
      break;
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
      titleResult.textContent = `😅 Hum, tu devrais aller à plus de festivals si tu veux t'améliorer !😅`;
      helpResult.style.display = "block";
      helpResult.textContent = "Il ne faut pas se décourager, tu peux t'améliorer sur les festivals";
      markResult.style.display = "block";
      markResult.innerHTML = `Score : <span>${score}/ 20</span>`;
      backButton.style.display = "block";
      backButton.textContent = "Recommencer 🔄";
      break;
    default:
      titleResult.textContent = `❌ Toi l'été c'est plutôt rando non ? ! ❌`;
      helpResult.style.display = "block";
      helpResult.textContent = "Il semble que tu aies besoin d'aller un peu plus en festival !'.";
      markResult.style.display = "block";
      markResult.innerHTML = `Score : <span>${score}/ 20</span>`;
      backButton.style.display = "block";
      backButton.textContent = "Recommencer 🔄";
      break;
  }
  sendScoreToServer(score);
}

function sendScoreToServer(score) {
  console.log('Score before sending:', score); // log pour vérifier le score côté front
  const currentDate = new Date().toISOString().split('T')[0];
  console.log('Formatted Date:', currentDate); // log pour vérifier le format de la date

  fetch('/api/scores/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: window.userName,
      score: score,
      quiz_date: currentDate
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Score saved front:', data);
    // Appeler showHighScores pour mettre à jour le tableau des scores
    showHighScores();
  })
  .catch(error => console.error('Erreur lors de l\'envoi du score:', error));
}

const questions = document.querySelectorAll(".question-block");

function addColors(results) {
  results.forEach((response, index) => {
    if (results[index]) {
      questions[index].style.backgroundImage = "linear-gradient(to right, #a8ff78, #78ffd6)";
    } else {
      questions[index].style.backgroundImage = "linear-gradient(to right, #f5567b, #fd674c)";
    }
  });
}

const radioInputs = document.querySelectorAll("input[type='radio']");

radioInputs.forEach(radioInput => radioInput.addEventListener('input', resetColor));

function resetColor(e) {
  const index = e.target.getAttribute("name").slice(1) - 1;
  const parentQuestionBlock = questions[index];

  parentQuestionBlock.style.backgroundColor = "#f1f1f1";
  parentQuestionBlock.style.backgroundImage = "none";
}

function ranking() {
  fetch('/api/scores/ranking')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des scores');
      }
      return response.json();
    })
    .then(data => {
      console.log('Scores récupérés :', data);
    })
    .catch(error => {
      console.error(error);
    });
}

function showHighScores() {
  // Afficher le conteneur des high scores
  highscores.style.display = "block";
  console.log('Fetching high scores...');

  // Récupérer les données du backend
  fetch('/api/scores/ranking')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des scores');
      }
      return response.json();
    })
    .then(data => {
      console.log('Scores récupérés :', data); // Vérifiez les scores récupérés

      // Vider le contenu précédent du tableau
      highscoresBody.innerHTML = '';

      // Ajouter les nouvelles lignes de scores
      data.forEach(score => {
        const row = document.createElement('tr');
        let medal = '';

        if (score.rank === 1) {
          medal = '🥇'; // Médaille d'or
        } else if (score.rank === 2) {
          medal = '🥈'; // Médaille d'argent
        } else if (score.rank === 3) {
          medal = '🥉'; // Médaille de bronze
        }

        row.innerHTML = `
          <td>${medal || score.rank}</td>
          <td>${score.name}</td>
          <td>${score.score}</td>
          <td>${score.quiz_date}</td>
          <td>${score.id}</td>
        `;
        highscoresBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Erreur:', error);
    });
}
