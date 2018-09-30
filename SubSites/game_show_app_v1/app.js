'use strict';

//////Variables//////

var start = document.querySelector('.btn__reset');
var overlay = document.getElementById('overlay');
var phrases = ['Showmethecode', 'Focusandwin', 'Nevergiveup', 'Yesyoucan', 'Seizetheday'];
var lives = 5;
var triesList = document.getElementsByClassName('tries');
var ul = document.getElementById("phrase").firstElementChild;
var mainHead = document.getElementById("title");
var lostTxt = document.createTextNode("You lost. Try again?");
var winTxt = document.createTextNode("You Win! Play again?");

//////Functions//////

//Gets random phrase
function randomPhrase() {
  return phrases[Math.floor(Math.random() * phrases.length)];
};

//gets split phrase and adds letters as <li> to HTML with class 'letter'
function addPhraseToDisplay() {
  var phrase = randomPhrase();
  for (var i = 0; i < phrase.length; i++) {
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(phrase[i]));
    if (phrase[i] !== " ") {
      li.setAttribute("class", "letter");
    };
    ul.appendChild(li);
  };
};

//Checks the button(guess) the user clicked to see if its in the phrase
function checkLetter(guess) {
  var correctLetter = null;
  var liList = document.getElementsByClassName('letter');
  //compares user guess to letters in phrase
  for (var i = 0; i < liList.length; i++) {
    if (liList[i].innerHTML.toUpperCase() === guess.toUpperCase()) {
      var correct = liList[i].innerHTML;
      liList[i].setAttribute("class", "letter show");
      correctLetter = liList[i].innerHTML;
    };
  };
  //if guess was in phrase return letter
  if (correctLetter != null) {
    return correctLetter;
  };
  //if guess was not in phrase return null
  return null;
};

//check to see if we're out of lives or have won
function checkWin() {
  //Checks if we lost
  if (lives == 0) {
    overlay.setAttribute('class', 'lose');
    overlay.style.display = 'flex';
    mainHead.firstChild.nodeValue = "You Lose. Try again?";
    reset();
    return;
  };
  //Checks if we can keep playing
  var liList = document.getElementsByClassName('letter');
  for (var i = 0; i < liList.length; i++) {
    if (liList[i].classList.contains('show') === false) {
      return;
    };
  };
  //Chekcs if we win
  overlay.setAttribute('class', 'win');
  mainHead.firstChild.nodeValue = "You Won!! Play again?";
  reset();
  overlay.style.display = 'flex';
};

//Resets the game board if the player wins or loses
function reset() {
  //resets lives and removes li
  lives = 5;
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  };
  //resets onscreen keyboard
  var buttons = document.querySelectorAll("BUTTON");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].removeAttribute('disabled');
    buttons[i].setAttribute('class', ' ');
  };
  //resets lives
  for (var _i = 0; _i < triesList.length; _i++) {
    triesList[_i].firstChild.src = 'images/liveHeart.png';
  };
};

//////Event Handlers//////

//starts game when start button is clicked
start.addEventListener('click', function (e) {
  overlay.style.display = 'none';
  addPhraseToDisplay();
});

//checks letter guessed, disables it, removes a life if wrong, calls checkWin
document.addEventListener('click', function (e) {
  if (event.target.tagName == 'BUTTON') {
    e.target.setAttribute('class', 'chosen');
    e.target.setAttribute('disabled', 'true');
    var guess = event.target.innerHTML;
    var letterfound = checkLetter(guess);
    //checks to see if we lose a life
    if (letterfound == null) {
      lives -= 1;
      triesList[lives].firstChild.src = 'images/lostHeart.png';
    };
    checkWin();
  };
});
