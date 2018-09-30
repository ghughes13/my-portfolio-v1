//////Variables//////

const start = document.querySelector('.btn__reset');
let overlay = document.getElementById('overlay');
let phrases = ['Showmethecode', 'Focusandwin', 'Nevergiveup', 'Yesyoucan', 'Seizetheday'];
let lives = 5;
let triesList = document.getElementsByClassName('tries');
const ul = document.getElementById("phrase").firstElementChild;
const mainHead = document.getElementById("title");
const lostTxt = document.createTextNode("You lost. Try again?");
const winTxt = document.createTextNode("You Win! Play again?");

//////Functions//////

//Gets random phrase
function randomPhrase() {
  return phrases[Math.floor(Math.random() * phrases.length)];
};

//gets split phrase and adds letters as <li> to HTML with class 'letter'
function addPhraseToDisplay() {
  let phrase = randomPhrase();
  for (let i = 0; i < phrase.length; i++) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(phrase[i]));
    if (phrase[i] !== " ") {
      li.setAttribute("class", "letter");
    };
    ul.appendChild(li);
  };
};

//Checks the button(guess) the user clicked to see if its in the phrase
function checkLetter(guess) {
  let correctLetter = null;
  let liList = document.getElementsByClassName('letter');
  //compares user guess to letters in phrase
  for (let i = 0; i < liList.length; i++) {
    if (liList[i].innerHTML.toUpperCase() === guess.toUpperCase()) {
      let correct = liList[i].innerHTML;
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
  let liList = document.getElementsByClassName('letter');
  for (let i = 0; i < liList.length; i++) {
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
  let buttons = document.querySelectorAll("BUTTON");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].removeAttribute('disabled');
    buttons[i].setAttribute('class', ' ');
  };
  //resets lives
  for (let i = 0; i < triesList.length; i++) {
    triesList[i].firstChild.src = 'images/liveHeart.png';
  };
};

//////Event Handlers//////

//starts game when start button is clicked
start.addEventListener('click', e => {
  overlay.style.display = 'none';
  addPhraseToDisplay();
});

//checks letter guessed, disables it, removes a life if wrong, calls checkWin
document.addEventListener('click', e => {
  if (event.target.tagName == 'BUTTON') {
    e.target.setAttribute('class', 'chosen');
    e.target.setAttribute('disabled', 'true');
    let guess = event.target.innerHTML;
    let letterfound = checkLetter(guess);
    //checks to see if we lose a life
    if (letterfound == null) {
      lives -= 1;
      triesList[lives].firstChild.src = 'images/lostHeart.png';
    };
    checkWin();
  };
});
