document.addEventListener("DOMContentLoaded", () => {
  let userName = "";

  while (!userName || !userName.trim()) {
    userName = prompt("Entrez votre pseudo !");
    if (!userName || !userName.trim()) {
      alert("Vous avez bien un nom tout de même ?!");
    }
  }

  console.log(userName.trim());
  fetch('/username', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: userName.trim() })
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Erreur :', error));
});

const responses =
  [
    "a", "c", "c", "a", "b",
    "c", "a", "a", "a", "b",
    "c", "a", "b", "c", "a",
    "a", "a", "b", "b", "a"
  ];
const emojis = ["✔️", "✨", "👀", "😭", "👎"];

const form = document.querySelector(".quiz-form");
form.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
  e.preventDefault()

  const results = [];

  const radioButtons = document.querySelectorAll("input[type='radio']:checked")

  radioButtons.forEach((radioButton, index) => {
    if (radioButton.value === responses[index]) {
      results.push(true)
    } else {
      results.push(false);
    }
  })

  showResults(results);
  addColors(results);
}

const titleResult = document.querySelector('.results h2')
const markResult = document.querySelector('.mark')
const helpResult = document.querySelector('.help')
const backButton = document.querySelector('.back')

backButton.addEventListener('click', () => {
  window.scrollTo(0, 0);
  location.reload();
});

function showResults(results) {
  const errorsNumber = results.filter(el => el === false).length;
  const score = 20 - errorsNumber;

  switch (score) {
    case 20:
      titleResult.textContent = `🏆 Bravo, tu es un spécialiste du ROCK ! 🏆`;
      helpResult.style.display = "block";
      helpResult.textContent = "Grands moments et petites anecdotes n'ont aucun secret pour toi !";
      markResult.style.display = "block";
      markResult.innerHTML = `Score : <span>${20 - errorsNumber}/ 20</span>`;
      backButton.style.display = "block"
      backButton.textContent = "Recommencer 🔄"
      break;
    case 19:
    case 18:
    case 17:
    case 16:
    case 15:
      titleResult.textContent = `🥈 Super, tu possèdes un bonne connaissance du ROCK! 🥈`;
      helpResult.style.display = "block";
      helpResult.textContent = "Tu aimes la culture rock, mais il te manque encore quelques détails !";
      markResult.style.display = "block";
      markResult.innerHTML = `Score : <span>${20 - errorsNumber}/ 20</span>`;
      backButton.style.display = "block"
      backButton.textContent = "Recommencer 🔄"
      break;
    case 14:
    case 13:
    case 12:
    case 11:
    case 10:
      titleResult.textContent = `🥈 Tu aimes le rock...mais tu peux t'améliorer ! 🥈`;
      helpResult.style.display = "block";
      helpResult.textContent = "La culture du rock ne t'es pas étrangère, mais il faut encore un peu bosser pour être au top !";
      markResult.style.display = "block";
      markResult.innerHTML = `Score : <span>${20 - errorsNumber}/ 20</span>`;
      backButton.style.display = "block"
      backButton.textContent = "Recommencer 🔄"
      break;
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
      titleResult.textContent = `😅 Hum, tu devrais écouter plus de rock si tu veux t'améliorer !😅`;
      helpResult.style.display = "block";
      helpResult.textContent = "Il ne faut pas se décourager, tu peux t'améliorer sur le ROCK";
      markResult.style.display = "block";
      markResult.innerHTML = `Score : <span>${20 - errorsNumber}/ 20</span>`;
      backButton.style.display = "block"
      backButton.textContent = "Recommencer 🔄"
      break;
    default:
      titleResult.textContent = `❌ Besoin de réviser tes connaissances sur le ROCK ! ❌`;
      helpResult.style.display = "block";
      helpResult.textContent = "Il semble que tu aies besoin de revoir certains aspects du rock.";
      markResult.style.display = "block";
      markResult.innerHTML = `Score : <span>${20 - errorsNumber}/ 20</span>`;
      backButton.style.display = "block"
      backButton.textContent = "Recommencer 🔄"
      break;
  }
}

const questions = document.querySelectorAll(".question-block");
function addColors(results) {
  results.forEach((response, index) => {
    if (results[index]) {
      questions[index].style.backgroundImage = "linear-gradient(to right, #a8ff78, #78ffd6)"
    } else {
      questions[index].style.backgroundImage = "linear-gradient(to right, #f5567b, #fd674c)"
    }
  })
}

const radioInputs = document.querySelectorAll("input[type='radio']")

radioInputs.forEach(radioInput => radioInput.addEventListener('input', resetColor))

function resetColor(e) {
  const index = e.target.getAttribute("name").slice(1) - 1;
  const parentQuestionBlock = questions[index];

  parentQuestionBlock.style.backgroundColor = "#f1f1f1";
  parentQuestionBlock.style.backgroundImage = "none";
}
