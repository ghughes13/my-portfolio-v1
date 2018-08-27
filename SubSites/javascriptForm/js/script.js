//variables
let name = document.getElementById('name');
let otherJobRole = document.getElementById('other');
let defaultDisplay = otherJobRole.style.display;
let title = document.getElementById("title");
let design = document.getElementById('design');
let colorsSection = document.getElementById('colors-js-puns');
let color = document.getElementById('color');
let creditCard = document.getElementById('credit-card');
let paypal = document.getElementById('paypal');
let bitcoin = document.getElementById('bitcoin');
let payment = document.getElementById('payment');
let activities = document.getElementsByClassName('activities')[0];
let email = document.getElementById('mail');
let ccNum = document.getElementById('cc-num');
let zip = document.getElementById('zip');
let cvv = document.getElementById('cvv');
let expMonth = document.getElementById('exp-month');
let expYear = document.getElementById('exp-year');
var times = [];
let submitButton = document.querySelector('button');
let form = document.querySelector('form');
let activitiesFirstLabel = activities.childNodes[3];
let container = document.getElementById('container');
let nameErrorNAN = document.createElement('p');
nameErrorNAN.innerHTML = "Name can not contain numbers";
nameErrorNAN.setAttribute('id', 'error');
nameErrorNAN.style.display = 'none';
let errorBox = document.createElement('div');
errorBox.setAttribute('id', 'errorBox');
let checkboxErrorP = document.createElement('p');
checkboxErrorP.innerHTML = "- You must select at least one activity";
checkboxErrorP.setAttribute('id', 'error');
checkboxErrorP.style.display = 'none';
let emailErrorP = document.createElement('p');
emailErrorP.innerHTML = "- Email must include an @ sign";
emailErrorP.setAttribute('id', 'error');
emailErrorP.style.display = 'none';
let nameErrorP = document.createElement('p');
nameErrorP.innerHTML = "- Please enter a name";
nameErrorP.setAttribute('id', 'error');
nameErrorP.style.display = 'none';
let ccNumErrorP = document.createElement('p');
ccNumErrorP.innerHTML = "- CC Number must be between 13 and 16 digits";
ccNumErrorP.setAttribute('id', 'error');
ccNumErrorP.style.display = 'none';
let ccZipErrorP = document.createElement('p');
ccZipErrorP.innerHTML = "- Zip must be 5 digits";
ccZipErrorP.setAttribute('id', 'error');
ccZipErrorP.style.display = 'none';
let ccCVVErrorP = document.createElement('p');
ccCVVErrorP.innerHTML = "- CVV must be 3 digits";
ccCVVErrorP.setAttribute('id', 'error');
ccCVVErrorP.style.display = 'none';
let ccNumberError = document.createElement('p');
ccNumberError.innerHTML = "- CC Number, Zip, and CVV must only contain numbers";
ccNumberError.setAttribute('id', 'error');
ccNumberError.style.display = 'none';
let ccNumValid = false;
let ccZipValid = false;
let ccCVVValid = false;


container.insertBefore(errorBox, form);
document.getElementById('name').focus();
errorBox.appendChild(nameErrorNAN);
errorBox.appendChild(nameErrorP);
errorBox.appendChild(emailErrorP);
errorBox.appendChild(checkboxErrorP);
errorBox.appendChild(ccNumErrorP);
errorBox.appendChild(ccZipErrorP);
errorBox.appendChild(ccCVVErrorP);
errorBox.appendChild(ccNumberError);

//Hides HTML elements that shouldn't be displayed yet
otherJobRole.style.display = 'none';
paypal.style.display = 'none';
bitcoin.style.display = 'none';
colorsSection.style.display = 'none';

//Displays additional field if "other" is selected for a job
title.addEventListener('click', () => {
  if(title.value === "other") {
    otherJobRole.style.display = defaultDisplay;
  } else {
    otherJobRole.style.display = 'none';
  }
});

//Handles the color display based on chosed design
design.addEventListener('click', () => {
  if(design.value === 'js puns') {
    colorsSection.style.display = defaultDisplay;
    for(let i = 3; i < color.options.length; i++) {
      color.options[i].style.display = 'none';
    };
    for(let i = 0; i < 3; i++) {
      color.options[i].style.display = defaultDisplay;
    };
  } else if(design.value === 'heart js') {
    colorsSection.style.display = defaultDisplay;
    for(let i = 0; i < 3; i++) {
      color.options[i].style.display = 'none';
    };
    for(let i = 3; i < color.options.length; i++) {
      color.options[i].style.display = defaultDisplay;
    };
  } else {
    colorsSection.style.display = 'none';
    };
});

//Array of objects containing the events, their time, and cost
let activitiesDict = [
  {
    associate: document.getElementsByName('all')[0],
    name: 'main',
    // time: 'none',
    cost: 200
  },
  {
    associate: document.getElementsByName('js-frameworks')[0],
    name: 'js-frameworks',
    time: 'Tuesday 9am-12pm',
    cost: 100
  },
  {
    associate: document.getElementsByName('js-libs')[0],
    name: 'js-libs',
    time: 'Tuesday 1pm-4pm',
    cost: 100
  },
  {
    associate: document.getElementsByName('express')[0],
    name: 'express',
    time: 'Tuesday 9am-12pm',
    cost: 100
  },
  {
    associate: document.getElementsByName('node')[0],
    name: 'node',
    time: 'Tuesday 1pm-4pm',
    cost: 100
  },
  {
    associate: document.getElementsByName('build-tools')[0],
    name: 'build-tools',
    // time: 'Wednesday 9am-12pm',
    cost: 100
  },
  {
    associate: document.getElementsByName('npm')[0],
    name: 'npm',
    // time: 'Wednesday 1pm-4pm',
    cost: 100
  },
];

//Checks for conflicting times and disables events you wouldn't be able to attend
activities.addEventListener('click', (event) => {
  let cost = 0;
  let timeToSplice = null;
  let elementName = ""

  //gets the name of the activity that was clicked
  if(event.path[0].tagName == "LABEL") {
    return;
  } else {
    elementName = event.path[0].name;
  }

  //if element unchecked, find the time to remove from times and re-enable elements
  //that corrospond with that time
  if (event.target.checked == false){
    for(var i = 0; i < activities.childElementCount-2; i++) {
      if(elementName == activitiesDict[i].name){
        timeToSplice = activitiesDict[i].time;
        break;
      }
    }
    for(var i = 0; i < activities.childElementCount-2; i++) {
      if(activitiesDict[i].time == timeToSplice) {
        activitiesDict[i].associate.disabled = false;
        activitiesDict[i].associate.parentElement.style.color = "black";
      }
    }
  }

  //Removes a time from times array so activities with that time will be re-enabled
  if(timeToSplice != null) {
    let index = times.indexOf(timeToSplice);
    if(times.length == 1) {
      times = [];
    } else if(index == times.length-1) {
      times.splice(index);
    } else {
      times.splice(index, index+1);
    }
  }

  //Adds a time to the time array, letting us know what we need to disable for next step
  for(var i = 0; i < activities.childElementCount-2; i++) {
    if(activitiesDict[i].associate.checked == true) {
      cost += activitiesDict[i].cost;
      if (activitiesDict[i].time)
      if (times.indexOf(activitiesDict[i].time) == -1){
        times.push(activitiesDict[i].time);
      }
    }
  };

  //Disables elements that are unclicked but have a conflicting time with an activity
  //that is clicked.
   if(event.target.checked) {
      for(var i = 0; i < activities.childElementCount-2; i++) {
        for(var x = 0; x < times.length; x++) {
          if(activitiesDict[i].time === times[x] && activitiesDict[i].associate.checked == false) {
            activitiesDict[i].associate.disabled = true;
            activitiesDict[i].associate.parentElement.style.color = 'rgb(152, 152, 152)';
          }
        }
      }
    }
  let DisplayCost = document.getElementById('displayCost');
  DisplayCost.innerHTML = "Total Cost: $" + cost;
  cost = 0;
  validateCheckbox();
});

//Displays CC, paypal, or bitcoin payment info and adds or removes validation if needed
payment.addEventListener('click', () => {
  if(payment.value === 'credit card') {
    paypal.style.display = 'none';
    creditCard.style.display = defaultDisplay;
    addRequired();
    bitcoin.style.display = 'none';
  } else if(payment.value === 'paypal') {
    removeRequired();
    paypal.style.display = defaultDisplay;
    creditCard.style.display = 'none';
    bitcoin.style.display = 'none';
    let ccNumValid = true;
    let ccZipValid = true;
    let ccCVVValid = true;
  } else if(payment.value === 'bitcoin') {
    removeRequired();
    paypal.style.display = 'none';
    creditCard.style.display = 'none';
    bitcoin.style.display = defaultDisplay;
    let ccNumValid = true;
    let ccZipValid = true;
    let ccCVVValid = true;
  };
});

//Adds credit card info validation
function addRequired() {
  // ccNum.required = true;
  ccNum.minLength = 13
  ccNum.maxLength = 16
  // zip.required = true;
  zip.minLength = 5;
  zip.maxLength = 5;
  // cvv.required = true;
  cvv.minLength = 3;
  cvv.maxLength = 3;
  expMonth.required = true;
  expYear.required = true;
  let ccNumValid = false;
  let ccZipValid = false;
  let ccCVVValid = false;
};

  //validate CC Num
  ccNum.setCustomValidity('CC must only contain numbers');
  ccNum.addEventListener('keyup', (event) => {
    let ccNumValue = event.target.value;
    for(let n = 0; n < ccNumValue.length; n+=1) {
      if(isNaN(ccNumValue[n])) {
        ccNumberError.style.display = defaultDisplay;
        ccNumValid = false;
        ccNum.setCustomValidity('CC must only contain numbers');
        return;
      }
    }
    if(ccNum.value.length < 13 || ccNum.value.length > 16) {
      ccNum.setCustomValidity('CC number must be between 13 and 16 digits.');
      ccNumErrorP.style.display = defaultDisplay;
    } else {
      ccNum.setCustomValidity('');
      ccNumValid = true;
      ccNumErrorP.style.display = 'none';
      ccPartValid()
    };
  });


  //Validate Zip
  zip.setCustomValidity('CC must only contain numbers');
  zip.addEventListener('keyup', (event) => {
    let zipValue = event.target.value;
    for(let n = 0; n < zipValue.length; n+=1) {
      if(isNaN(zipValue[n])) {
        ccNumberError.style.display = defaultDisplay;
        ccZipValid = false;
        zip.setCustomValidity('CC must only contain numbers');
        return;
      }
    }
    if(zip.value.length != 5) {
      zip.setCustomValidity('Zip must be exactly 5 digits.');
      ccZipErrorP.style.display = defaultDisplay;
    } else {
      zip.setCustomValidity('');
      ccZipValid = true;
      ccZipErrorP.style.display = 'none';
      ccPartValid()
    }
  });



  //Validate CVV
  cvv.setCustomValidity('CVV must only contain numbers');
  cvv.addEventListener('keyup', (event) => {
    let cvvValue = event.target.value;
    for(let n = 0; n < cvvValue.length; n+=1) {
      if(isNaN(cvvValue[n])) {
        ccNumberError.style.display = defaultDisplay;
        ccCVVValid = false;
        cvv.setCustomValidity('CVV must only contain numbers');
        return;
      }
    }
    if(cvv.value.length != 3) {
      cvv.setCustomValidity('CVV must be exactly 3 digits.');
      ccCVVErrorP.style.display = defaultDisplay;
    } else {
      cvv.setCustomValidity('');
      ccCVVValid = true;
      ccCVVErrorP.style.display = 'none';
      ccPartValid();
    }
  });


function ccPartValid() {
  if(ccCVVValid && ccNumValid && ccZipValid) {
    ccNumberError.style.display = 'none';
  }
};

//Removes credit card vaildation
function removeRequired() {
  ccNum.required = false;
  zip.required = false;
  cvv.required = false;
  expMonth.required = false;
  expYear.required = false;
  ccNum.value = "";
  zip.value = "";
  cvv.value = "";
  expMonth.value = "";
  expYear.value = "";
  ccNum.setCustomValidity('');
  zip.setCustomValidity('');
  cvv.setCustomValidity('');
  ccNumErrorP.style.display = 'none';
  ccCVVErrorP.style.display = 'none';
  ccZipErrorP.style.display = 'none';
  ccNumberError.style.display = 'none';
};

//Validate checkboxes and returns false if no boxes are checked
function validateCheckbox() {
  let atLeastOneChecked = false;
  for(var i = 0; i < activitiesDict.length; i++) {
    if(activitiesDict[i].associate.checked) {
      atLeastOneChecked = true;
    }
  }
  if(atLeastOneChecked == false) {
    checkboxErrorP.style.display = defaultDisplay;
  } else {
    checkboxErrorP.style.display = 'none';
  }
  return atLeastOneChecked;
};

//Returns true if there is an @ in email value and letters after
let emailValid = false;
email.setCustomValidity('Please enter a valid email with an @ sign');
email.addEventListener('keyup', (event) => {
  email.minLength = 3
  let emailValue = event.target.value;
  for(let i = 0; i < emailValue.length; i++) {
    if(emailValue[i] == '@'){
      emailValid = true;
      emailErrorP.style.display = 'none';
      email.setCustomValidity('');
      return;
    } else {
      emailErrorP.style.display = defaultDisplay;
    }
 }
});


//Validates Name
name.setCustomValidity('Name must be at least 1 letter long');
let nameValid = false;
name.addEventListener('keyup', (event) => {
  name.minLength = 1
  let nameValue = event.target.value;
  for(let n = 0; n < nameValue.length; n+=1) {
    if(isNaN(nameValue[n]) == false) {
      nameErrorNAN.style.display = defaultDisplay;
      nameValid = false;
      name.setCustomValidity('Name must not contain numbers');
      return;
    }
  }
  if(nameValue.length > 0){
    nameValid = true;
    nameErrorP.style.display = 'none';
    nameErrorNAN.style.display = 'none';
    name.setCustomValidity('');
    return;
  } else {

    nameErrorP.style.display = defaultDisplay;
    }
});

function displayErrors() {
  displayBeforeThis = form.firstChild;
  form.insertBefore(checkboxErrorP, displayBeforeThis);
  checkboxErrorP.style.display = defaultDisplay;
}

function checkForm() {
  if(emailValid && validateCheckbox() && nameValid && CCValid && ccCVVValid && ccZipValid && ccNumValid) {
    return true;
  } else {
    if(emailValid != true) {
      emailErrorP.style.display = defaultDisplay;
    }
    if(validateCheckbox() != true) {
      checkboxErrorP.style.display = defaultDisplay;
    }
    if(nameValid != true) {
      nameErrorP.style.display = defaultDisplay;
    }
    if(ccNumValid != true) {
      ccNumErrorP.style.display = defaultDisplay;
    }
    if(ccZipValid != true) {
      ccZipErrorP.style.display = defaultDisplay;
    }
    if(ccCVVValid != true) {
      ccCVVErrorP.style.display = defaultDisplay;
    }
    return false;
  }
};


addRequired();
