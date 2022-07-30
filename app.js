let gameBoard = document.getElementById("board");
let boxes = document.getElementsByClassName("box");
let announcer = document.getElementById("announcer");
let submit = document.getElementById("submit");
let playerInput = document.getElementById("playerInput");
let reset = document.getElementById("reset");
let p1 = document.getElementById("p1input");
let p2 = document.getElementById("p2input");
let playerSelect = document.getElementById("select");
let draw = 0;
let gameOver = false;

const gameState = {
  players: ["X", "O"],
  board: [null, null, null, null, null, null, null, null, null],
};

let winningCombonations = [
  ["0", "1", "2"],
  ["3", "4", "5"],
  ["6", "7", "8"],
  ["0", "3", "6"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["0", "4", "8"],
  ["2", "4", "6"],
];

let currentPlayer = gameState.players[0];

function displayNames() {
  if (p1.value && p2.value) {
    announcer.textContent = `${p1.value} is ${gameState.players[0]} & ${p2.value} is ${gameState.players[1]}. ${p1.value}(${gameState.players[0]}) goes first!`;
  }
}

function userInput() {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", function () {
      if (boxes[i].textContent === "" && !gameOver) {
        boxes[i].textContent = currentPlayer;
        gameState.board[i] = boxes[i].textContent;
        checkWin();
        draw++;
        checkDraw();
        nextPlayer();
        if (p2.value === "" || (p1.value === "" && !gameOver)) {
          let computerPlay = Math.floor(Math.random() * boxes.length);
          while (boxes[computerPlay].textContent !== "" && !gameOver) {
            computerPlay = Math.floor(Math.random() * boxes.length);
          }
          boxes[computerPlay].textContent = currentPlayer;
          gameState.board[computerPlay] = boxes[computerPlay].textContent;
          checkWin();
          draw++;
          checkDraw();
          nextPlayer();
        }
      }
    });
  }
}

function checkDraw() {
  if (draw === 9 && !gameOver) {
    gameOver = true;
    announcer.textContent = "It's a draw! Reset to play again.";
  }
}

function nextPlayer() {
  if (!gameOver) {
    gameState.players.reverse();
    currentPlayer = gameState.players[0];
    if (gameState.players[0] === "X") {
      announcer.textContent = `It's ${p1.value}(${gameState.players[0]})'s turn!`;
    } else if (gameState.players[0] === "O") {
      announcer.textContent = `It's ${p2.value}(${gameState.players[0]})'s turn!`;
    }
  }
}

function checkWin() {
  for (let i = 0; i < winningCombonations.length; i++) {
    let win = winningCombonations[i];
    let a = gameState.board[win[0]];
    let b = gameState.board[win[1]];
    let c = gameState.board[win[2]];
    if (a === null || b === null || c === null) {
      continue;
    } else if (a === b && b === c) {
      if (gameState.players[0] === "X") {
        announcer.textContent = `${p1.value}(${currentPlayer}) wins! Reset to play again.`;
        gameOver = true;
      } else {
        if (gameState.players[0] === "O") {
          announcer.textContent = `${p2.value}(${currentPlayer}) wins! Reset to play again.`;
          gameOver = true;
        }
      }
    }
  }
}

function resetGame() {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].textContent = "";
    gameState.board[i] = null;
    gameOver = false;
    draw = 0;
    boxes[i].classList.remove("X");
    boxes[i].classList.remove("O");
    gameState.players = ["X", "O"];
    currentPlayer = gameState.players[0];
    if (p1.value && p2.value) {
      announcer.textContent = `${p1.value} is ${gameState.players[0]} & ${p2.value} is ${gameState.players[1]}. ${p1.value}(${gameState.players[0]}) goes first!`;
    } else {
      announcer.textContent = "Player X goes first!";
    }
  }
}

reset.addEventListener("click", resetGame);

submit.addEventListener("click", displayNames);

function initializeGame() {
  userInput();
}

initializeGame();
