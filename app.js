"use strict";

let globalScores, roundScores, activePlayer, gameplaying;
const diceE1 = document.querySelector(".dice");
const scoresOO = document.getElementById("score-0");
const scoresO1 = document.getElementById("score-1");
const currentOO = document.getElementById("current-0");
const currentO1 = document.getElementById("current-1");

const init = function () {
  globalScores = [0, 0];
  roundScores = 0;
  activePlayer = 0;
  gameplaying = true;

  //all scores back to zero
  scoresOO.textContent = 0;
  scoresO1.textContent = 0;
  currentOO.textContent = 0;
  currentO1.textContent = 0;

  //dice disappears
  diceE1.style.display = "none";

  document.querySelector(".player-1").classList.remove("player--winner");
  document.querySelector(".player-1").classList.remove("player1-active");
  document.querySelector(".player-0").classList.remove("player--winner");
  document.querySelector(".player-0").classList.add("player1-active");
  document.querySelector(`#name-0`).textContent = "PLAYER 1";
  document.querySelector(`#name-1`).textContent = "PLAYER 2";
  // change Winner back to player
};

init();

const switchPlayer = function () {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScores = 0;

  document.querySelector("#current-0").textContent = "0";
  document.querySelector("#current-1").textContent = "0";

  document.querySelector(".player1").classList.toggle("player1-active");
  document.querySelector(".player2").classList.toggle("player1-active");
};

document.querySelector(".btn--roll").addEventListener("click", function () {
  if (gameplaying) {
    // 1 random number
    let dice = Math.floor(Math.random() * 6) + 1;

    // 2 display the result
    diceE1.style.display = "block";
    diceE1.src = `dice-${dice}.png`;

    // 3 update the roundScore
    if (dice > 1) {
      roundScores += dice;
      document.getElementById(`current-${activePlayer}`).textContent =
        roundScores;
    } else {
      switchPlayer();
    }
  }
});

document.querySelector(".btn--hold").addEventListener("click", function () {
  if (gameplaying) {
    //update roundscores to  score
    globalScores[activePlayer] += roundScores;

    document.querySelector("#score-" + activePlayer).textContent =
      globalScores[activePlayer];
    // check which player wins the game
    if (globalScores[activePlayer] >= 100) {
      document.querySelector(`#name-${activePlayer}`).textContent = "WINNER!";
      diceE1.style.display = "none";
      document
        .querySelector(".player-" + activePlayer)
        .classList.add("player--winner");
      gameplaying = false;
    } else {
      //next player
      switchPlayer();
    }
  }
});

document.querySelector(".btn--new").addEventListener("click", init);
