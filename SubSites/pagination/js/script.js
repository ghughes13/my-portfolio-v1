/////////////////////////////////////////////////////////////////////
//Treehouse Techdegree: FSJS project 2 - List Filter and Pagination//
/////////////////////////////////////////////////////////////////////

/////////////////////
//Initial Variables//
/////////////////////
let students = document.getElementsByClassName('student-item');
let displayState = students[0].style.display;

let page = document.getElementById('main');
let pageNumbers = document.createElement('ul');
pageNumbers.setAttribute('class', 'pagination');
pageNumbers.setAttribute('id', 'pagination');

window.display = [];
/////////////////////////////
//Generate Search Elements///
/////////////////////////////
let form = document.createElement('form');
form.setAttribute('class', 'student-search');

let searchBox = document.createElement('input');
searchBox.setAttribute('type','text');
searchBox.setAttribute('placeholder','Search for students...');

let searchButton = document.createElement('button');
searchButton.innerHTML = "Search";
let searchFor = 'search(searchBox.value)';
searchButton.setAttribute('onClick', searchFor)

form.appendChild(searchBox);
form.appendChild(searchButton);

let addSearchBox = document.getElementById('page-header');
let addit = addSearchBox.appendChild(form);

let noneFound = document.createElement('p');
noneFound.innerHTML = "No Matches Found";
noneFound.style.display = 'none';
let pagination = document.querySelector('ul');
pagination.appendChild(noneFound);


//////////////
//Functions///
//////////////

//Determines number of page #'s needed
function pagesNeeded(count){
  let pagesToCreate = Math.floor(count/10);
  if(count%10 != 0) {
    pagesToCreate += 1;
  };
  return pagesToCreate;
};

//Gets the range of names to display ('Names 0-10 or Names 30-40')
function displayRange(goToPage, dataSet) {
  if(dataSet === "disp") {
    var data = window.display;
  } else {
    var data = students;
  }
  if(goToPage == 1) {
    let min = 0;
    let max = 10;
    showHide(min, max, data);
  } else {
    let stringify = goToPage.toString() + "0";
    let min = parseInt(stringify) - 10;
    let max = parseInt(stringify);
    showHide(min, max, data)
  };
};

//Hides all students then displayes appropriate students
function showHide(min, max, data) {
  for(let i = 0; i < data.length; i++) {
    data[i].style.display = 'none';
  }
  for(let i = min; i < max; i++) {
    data[i].style.display = displayState;
  }
};


//Creates Pagination Links (Page numbers at bottom of screen);
function addPaginationLinks(studentLength , dataSet) {
  let paginationLinks = document.getElementById('pagination');
  if(paginationLinks != null) {
    paginationLinks.innerHTML = " ";
    page.removeChild(paginationLinks);
    // return;
  };
  let pagesToCreate = pagesNeeded(studentLength);
  for(let i = 1; i < pagesToCreate + 1; i+=1) {
    let numberToAdd = document.createElement('li');
    let pageNumberLink = document.createElement('a');
    pageNumberLink.innerHTML = i;
    let displayCall = 'displayRange(' + i + ',' + '\'' + dataSet + '\'' + ')';
    pageNumberLink.setAttribute('onClick', displayCall)
    pageNumberLink.setAttribute('href', '#')
    numberToAdd.appendChild(pageNumberLink);
    let pageNumber = pageNumbers.appendChild(numberToAdd);
  }
  page.appendChild(pageNumbers);
  displayRange(1, dataSet);
};

//Lets you search for students by name or email
function search(searchFor) {
  window.display = [];
  noneFound.style.display = 'none';
  if(searchFor === '') {
    addPaginationLinks(students.length, 'stud');
    return;
  }
  let showing = 0;
  let names = document.getElementsByTagName('h3');
  let emails = document.getElementsByClassName('email');
  for(let i = 0; i < names.length; i++) {
    if(names[i].innerHTML.includes(searchFor) || emails[i].innerHTML.includes(searchFor)) {
      names[i].parentNode.parentNode.style.display = displayState;
      showing+=1;;
      let pushToDisplay = window.display.push(names[i].parentNode.parentNode) ;
    } else {
      names[i].parentNode.parentNode.style.display = 'none';
    }
  }
  if(showing == 0) {
    noneFound.style.display = displayState;
    window.display = [];
    let paginationLinks = document.getElementById('pagination');
    if(paginationLinks != null) {
      paginationLinks.innerHTML = " ";
      page.removeChild(paginationLinks);
      return
    }
  } else {
    addPaginationLinks(showing, 'disp');
  };
};

function addNew(display) {
  let newUl = document.createElement('ul');
  newUl.setAttribute('class','student-list');
  page.insertBefore(newUl, pageNumbers);
  for(let i = 0; i < display.length; i++) {
    newUl.appendChild(display[i]);
  }
  if(display.length > 10) {
    addPaginationLinks(display.length/10, 'disp');
    return;
  }
};

//Adds pagination links and sets default view to 10 people
addPaginationLinks(students.length, 'stud');
displayRange(1, 'stud');
