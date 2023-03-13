var score = 0;
var highScore = 0
var a, b, equation, answer;
var timeLeft = 10;
var timerInterval;

$(document).ready(function() {
  $('#score').append(`<h2>Score: ${score}</h2>`);
  $('#time-left').append(`<h2>Time Left: ${timeLeft}</h2>`);
});

$(document).on('keyup', function(e) {
  if (e.keyCode === 13) {
    checkAnswer();
  } else {
    return;
  } 
});

//starts the game
let startGame = function() {
  createQuestion();
  console.log('startGame() called');
  timerInterval = setInterval(function() {
    timeLeft --;
    updateScore();
    if (timeLeft === 0) {
      checkHighScore();
      clearInterval(timerInterval);
      $('#equation-goes-here').empty();
      $('#equation-goes-here').append(`<h2>Game Over</h2><h3>Current Highscore :${highScore}</h3><button onclick="restartGame()" id="restart">Restart</button>`);
      $('#answer').val('');
    }
  }, 1000);
}

//restarts the game
let restartGame = function() {
  score = 0;
  timeLeft = 10;
  startGame();
}

//check for highscore
let checkHighScore = function() {
  if (score > highScore) {
    highScore = score;
  }
}

//creates the question
let createQuestion = function() {
  a = Math.floor(Math.random() * 10);
  b = Math.floor(Math.random() * 10);
  var equationType = Math.floor(Math.random() * 4);
  switch (equationType) {
    case 0: 
      equation = a + " + " + b + " = ?";
      answer = a + b;
      break;
    case 1:
      equation = a + " - " + b + " = ?";
      answer = a - b;
      if (answer < 1) {
        createQuestion();
      }
      break;
    case 2:
      equation = a + " * " + b + " = ?";
      answer = a * b;
      if (answer < 1) {
        createQuestion();
      }
      break;
    case 3:
      equation = a + " / " + b + " = ?";
      answer = a / b;
      if (answer % 1 !== 0) {
        createQuestion();
      }
      break;
  }
  $('#equation-goes-here').empty();
  $('#equation-goes-here').append(`<h2>${equation}</h2>`);
  $('#answer').val('');
}

//checks if the answer is correct
let checkAnswer = function() {
  console.log('checkAnswer() called');
  let playerAnswer = $('#answer').val();
  console.log(playerAnswer);
  console.log(answer);
  if (answer == playerAnswer) {
    score += 10;
    timeLeft ++;
    console.log('correct answer');
    updateScore();
    createQuestion();
  } else {
    console.log('wrong answer');
  }
}

//updates the player score
let updateScore = function() {
  $('#score').empty();
  $('#score').append(`<h2>Score: ${score}</h2>`);
  $('#time-left').empty();
  $('#time-left').append(`<h2>Time Left: ${timeLeft}</h2>`);
}