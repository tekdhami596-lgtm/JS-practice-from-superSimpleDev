const score = JSON.parse(localStorage.getItem("score"));

if (score === null)
  [
    (score = {
      wins: 0,
      lossses: 0,
      ties: 0,
    }),
  ];

updateScoreElement();

let isAutoPlaying = false;

let intervalId;
// const autoplay=()=>{

// }
function autoplay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("rock");
});

document.querySelector('.js-paper-button').addEventListener('click',()=>{
   playGame('paper');
});

document.querySelector('.js-scissor-button').addEventListener('click',()=>{
   playGame('scissors');
});

document.body.addEventListener('keydown', (event) =>{
if(event.key==='r'){
   playGame('rock');
} else if(event.key==='p'){
  playGame('paper')
} else if(event.key==='s'){
playGame('scissors')
}
})

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";
  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You loose";
    } else if (computerMove === "paper") {
      result = "You win";
    } else if (computerMove === "scissors") {
      result = "Tie";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win";
    } else if (computerMove === "paper") {
      result = "Tie";
    } else if (computerMove === "scissors") {
      result = "You loose";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie";
    } else if (computerMove === "paper") {
      result = "You loose";
    } else if (computerMove === "scissors") {
      result = "You win";
    }
  }
  if (result === "You win") {
    score.wins += 1;
  } else if (result === "You loose") {
    score.looses += 1;
  } else if (result === "Tie") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(".js-moves").innerHTML = ` You 
    <img src="rock-paper-scissor emoji/${playerMove}-emoji.png" class="move-icon">
    <img src="rock-paper-scissor emoji/${computerMove}-emoji.png" class="move-icon">
    computer`;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `wins:${score.wins}, Losses: ${score.looses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}
