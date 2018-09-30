'use strict';

var gallery = document.getElementById('gallery');
var defaultDisplay = gallery.style.display;
var usersOnPage = [];

//Pulls data from the "Random User Generator API"
$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=US',
  dataType: 'json',
  success: function success(data) {
    data.results.forEach(function (person) {
      addToGallery(person);
    });
  }
});

//This section adds the ajax data to the page in the proper format.
var addToGallery = function addToGallery(person) {
  var userPic = person.picture.large;
  var userName = person.name.first + " " + person.name.last;
  var userEmail = person.email;
  var userCityState = person.location.city + ", " + person.location.state;
  var galleryTemplate = '<div class="card-img-container">\n          <img class="card-img" src="' + userPic + '" alt="profile picture">\n      </div>\n      <div class="card-info-container"><h3 id="name" class="card-name cap">' + userName + '</h3>\n          <p class="card-text">' + userEmail + '</p>\n          <p class="card-text cap">' + userCityState + '</p>\n      </div>';
  var cardDiv = document.createElement("div");
  cardDiv.setAttribute('class', 'card');
  cardDiv.setAttribute('id', userName + " card");
  cardDiv.innerHTML = galleryTemplate;
  gallery.appendChild(cardDiv);
  makeModal(userPic, userName, userEmail, person);

  //If a card is clicked, displays that cards modal (Pop up with more info on employee)
  cardDiv.addEventListener('click', function(e) {
    for (var i = 0; i < e.composedPath.length; i++) {
      if (e.composedPath[i].classList.contains('card')) {
        var selectedCard = e.composedPath[i].lastChild.firstChild.innerHTML;
        var findCard = document.getElementById(selectedCard);
        findCard.style.display = defaultDisplay;
        findCard.setAttribute('class', 'modal-container active');
        break;
      };
    }
  });
}; //end of addToGallery


//This section makes the modal element and adds functionality to the buttons on it
var makeModal = function makeModal(userPic, userName, userEmail, person) {
  usersOnPage.push(userName);
  var userCity = person.location.city;
  var userNumber = person.cell;
  var fullAddress = person.location.street + ", " + person.location.city + ", " + person.location.state + " " + person.location.postcode;
  var userBirthday1 = person.dob.date;
  var userBirthday = userBirthday1.substring(0, 10);
  var modalContent = '<div class="modal"><button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>\n          <div class="modal-info-container">\n              <img class="modal-img" src="' + userPic + '" alt="profile picture">\n              <h3 id="name" class="modal-name cap">' + userName + '</h3>\n              <p class="modal-text">' + userEmail + '</p>\n              <p class="modal-text cap">' + userCity + '</p>\n              <hr>\n              <p class="modal-text">' + userNumber + '</p>\n              <p class="modal-text">' + fullAddress + '</p>\n              <p class="modal-text">Birthday: ' + userBirthday + '</p>\n          </div>\n      </div>\n\n      <div class="modal-btn-container">\n          <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>\n          <button type="button" id="modal-next" class="modal-next btn">Next</button>\n      </div>';
  var modalCard = document.createElement('div');
  modalCard.setAttribute('class', 'modal-container');
  modalCard.setAttribute('id', userName);
  modalCard.style.display = 'none';
  modalCard.innerHTML = modalContent;
  document.body.appendChild(modalCard);

  //Hides the modal if the X button is clicked
  var xButton = modalCard.firstChild.firstChild;
  xButton.addEventListener('click', function () {
    modalCard.style.display = 'none';
  });

  //Moved to next modal/employee if next button is clicked
  var prevButton = modalCard.lastChild.children[0];
  prevButton.addEventListener('click', function () {
    var currentCard = prevButton.parentNode.parentNode.id;
    prevButton.parentNode.parentNode.style.display = 'none';
    for (var i = 0; i < 12; i++) {
      if (usersOnPage.indexOf(currentCard) == 0) {
        var prevName = usersOnPage[11];
        var prevCard = document.getElementById(prevName);
        prevCard.style.display = defaultDisplay;
      } else if (usersOnPage[i] == currentCard) {
        var _prevName = usersOnPage[i - 1];
        var _prevCard = document.getElementById(_prevName);
        _prevCard.style.display = defaultDisplay;
      }
    }
  });

  //Moved to next modal/employee if next button is clicked
  var nextButton = modalCard.lastChild.children[1];
  nextButton.addEventListener('click', function () {
    var currentCard = nextButton.parentNode.parentNode.id;
    nextButton.parentNode.parentNode.style.display = 'none';
    for (var i = 0; i < 12; i++) {
      if (usersOnPage.indexOf(currentCard) == 11) {
        var nextName = usersOnPage[0];
        var nextCard = document.getElementById(nextName);
        nextCard.style.display = defaultDisplay;
      } else if (usersOnPage[i] == currentCard) {
        var _nextName = usersOnPage[i + 1];
        var _nextCard = document.getElementById(_nextName);
        _nextCard.style.display = defaultDisplay;
      }
    }
  });
}; //end of makeModal


//Adds a search bar
var searchBar = function searchBar() {
  var divToAddFormTo = document.getElementById('formplace');
  var searchHTML = '<form action="#" method="get" preventDefault>\n          <input type="search" id="search-input" class="search-input" placeholder="Search...">\n          <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">\n      </form> ';
  divToAddFormTo.innerHTML = searchHTML;

  //Adds search functionality
  var searchBar = divToAddFormTo.firstElementChild.firstElementChild;
  searchBar.addEventListener('keyup', function (e) {
    var cards = document.getElementsByClassName('card');
    for (var i = 0; i < 12; i++) {
      cards[i].style.display = 'none';
    };
    for (var _i = 0; _i < 12; _i++) {
      console.log(searchBar.value);
      if (usersOnPage[_i].includes(searchBar.value)) {
        console.log(usersOnPage[_i]);
        var userToShow = document.getElementById(usersOnPage[_i] + " card");
        userToShow.style.display = defaultDisplay;
      }
    };
    if (searchBar.value.length == 0) {
      for (var _i2 = 0; _i2 < 12; _i2++) {
        cards[_i2].style.display = defaultDisplay;
      };
    }
  });
}; //end of searchBar


searchBar();
