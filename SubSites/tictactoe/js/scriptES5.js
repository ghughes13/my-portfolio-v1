'use strict';

var board = document.getElementById('board');
var box = document.getElementsByClassName('box');
var boxes = document.getElementsByClassName('boxes')[0];
var start = document.getElementById('start');
var newGame = document.getElementById('newGame');
var finish = document.getElementById('finish');
var startButton = document.getElementById('startButton');
var firstPlayer = document.getElementById('player1');
var secondPlayer = document.getElementById('player2');
var defaultDisplay = finish.style.display;
var message = document.getElementsByClassName('message')[0];
var turns = 0;
var gameover = false;
var letter = null;
var name1 = document.getElementById('name1');
var name1Place = document.getElementById('namePlace1');
var name2 = document.getElementById('name2');
var name2Place = document.getElementById('namePlace2');
var name1Value = "";
var name2Value = "";

var winConditions = [['1-3', '2-2', '3-1'], //diagonal
['1-1', '2-2', '3-3'], //diagonal
['1-1', '2-1', '3-1'], //vertical top
['1-2', '2-2', '3-2'], //vertical Mid
['1-3', '2-3', '3-3'], //vertical Right
['1-1', '1-2', '1-3'], //horizontal top
['2-1', '2-2', '2-3'], //horizontal Mid
['3-1', '3-2', '3-3'] //horizontal low
];

var gameBoard = ['1-1', '1-2', '1-3', '2-1', '2-2', '2-3', '3-1', '3-1', '3-3'];

//Hides parts of HTML that shouldnt be displayed at start
board.style.display = 'none';
finish.style.display = 'none';

name1.addEventListener('keyup', function () {
  name1Value = name1.value;
});

name2.addEventListener('keyup', function () {
  name2Value = name2.value;
});

//starts game when startbutton is clicked
startButton.addEventListener('click', function () {
  if (name1Value == "" || name2Value == "") {
    alert('Please enter 2 names');
  } else {
    board.style.display = defaultDisplay;
    start.style.display = 'none';
    finish.style.display = 'none';
    firstPlayer.setAttribute('class', 'players active');
    name1Place.innerHTML = name1Value;
    name2Place.innerHTML = name2Value;
  }
});

//Resets game when newGame button is clicked
newGame.addEventListener('click', function () {
  board.style.display = defaultDisplay;
  start.style.display = 'none';
  finish.style.display = 'none';
  firstPlayer.setAttribute('class', 'players active');
  for (var i = 0; i < box.length; i++) {
    box[i].setAttribute('class', 'box');
    box[i].style.backgroundImage = 'none';
  }
  turns = 0;
  gameover = false;
  nextTurn();
  event.path[0].style.backgroundImage = 'none';
});

//Listens for players move, calls checkWin, CheckDraw, and nextTurn
boxes.addEventListener('click', function (event) {
  var whosTurn = null;
  if (event.path[0].classList.contains('box-filled-1') || event.path[0].classList.contains('box-filled-2')) {
    return;
  };
  turns += 1;
  if (player1.isTurn == true) {
    event.path[0].setAttribute('class', 'box box-filled-1');
    whosTurn = 'box-filled-1';
  } else {
    event.path[0].setAttribute('class', 'box box-filled-2');
    whosTurn = 'box-filled-2';
  }
  if (checkWin(whosTurn)) {
    return;
  } else if (turns >= 9 && gameover == false) {
    drawGame();
  }
  nextTurn();
});

//Adds background image
boxes.addEventListener('mouseover', function (event) {
  if (event.path[0].classList.contains('box-filled-1') || event.path[0].classList.contains('box-filled-2')) {
    return;
  };
  if (player1.isTurn == true) {
    letter = 'o';
  } else {
    letter = 'x';
  }
  event.path[0].style.backgroundImage = "url('img/" + letter + ".svg')";
});

//Removes background image
boxes.addEventListener('mouseout', function (event) {
  if (event.path[0].classList.contains('box-filled-1') || event.path[0].classList.contains('box-filled-2')) {
    return;
  };
  event.path[0].style.backgroundImage = 'none';
});

//Changes players turn
var nextTurn = function nextTurn() {
  if (player1.isTurn == true) {
    player1.isTurn = false;
    player2.isTurn = true;
    firstPlayer.setAttribute('class', 'players');
    secondPlayer.setAttribute('class', 'players active');
    // computerMove();
  } else {
    player1.isTurn = true;
    player2.isTurn = false;
    firstPlayer.setAttribute('class', 'players active');
    secondPlayer.setAttribute('class', 'players');
  }
};

//if game is a draw, displays appropriate screen
var drawGame = function drawGame() {
  board.style.display = 'none';
  finish.style.display = defaultDisplay;
  message.innerHTML = "It's A Tie!!";
  finish.setAttribute('class', 'screen screen-win screen-win-tie');
};

//Check if a winning line has been made
var checkWin = function checkWin(whosTurn) {
  var here = null;
  winConditions.forEach(function (condition) {
    here = true;
    condition.forEach(function (block) {
      if (document.getElementById(block).classList.contains(whosTurn)) {} else {
        here = false;
      }
    });
    if (here == true) {
      if (whosTurn == 'box-filled-1') {
        message.innerHTML = name1Value + ' Won!!';
        finish.setAttribute('class', 'screen screen-win screen-win-one');
        board.style.display = 'none';
        finish.style.display = defaultDisplay;
        gameover = true;
      } else {
        message.innerHTML = name2Value + ' Won!!';
        finish.setAttribute('class', 'screen screen-win screen-win-two');
        board.style.display = 'none';
        finish.style.display = defaultDisplay;
        gameover = true;
      };
    };
  });
  return here;
};

// //AI (or part of the program that plays in random places)
// let computerMove = () => {
//   for(let i = 0; i < gameBoard.length; i++) {
//     move = document.getElementById(gameBoard[i])
//     if(move.classList.contains('box-filled-1') || move.classList.contains('box-filled-2')){
//       console.log('NextMove');
//   } else {
//     event.path[0].setAttribute('class', 'box box-filled-2')
//     whosTurn = 'box-filled-2';
//   }
//   if(checkWin(whosTurn)) {
//     return;
//   } else if(turns >= 9 && gameover == false) {
//     drawGame();
//   }
//   nextTurn();
// }
// };
