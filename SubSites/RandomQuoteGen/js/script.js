// FSJS - Random Quote Generator

//Gets new quote after 30 seconds
var newQuoteTime = setInterval(printQuote, 30000);


//Array Object containing quote data
let quoteArray = [
  {
    quote: "\"It isn't sufficient just to want - you've got to ask yourself what you are going to do to get the things you want.\"",
    source:"- Richard D. Rosen",
    tag: "Planning"
  },
  {
    quote:   "\"Doing what you like is freedom. Liking what you do is happiness.\"",
    source: "- Frank Tyger",
    tag: "Motivation"
  },
  {
    quote:   "\"Failure cannot cope with persistence.\"",
    source: "- Napoleon Hill",
    tag: "Business"
  },
  {
    quote: "\"Success is not counted by how high you have climbed but by how many people you brought with you.\"",
    source:   "- Wil Rose",
    tag: "Motivation"
  },
  {
    quote:  "\"If a book about failures doesn’t sell, is it a success?\"",
    source:   "- Jerry Seinfeld",
    tag:"Humor"
  },
  {
    quote: "\"A lie gets halfway around the world before the truth has a chance to get its pants on.\"",
    source: "- Winston S. Churchill",
    tag: "Humor"
  },
];

//Array of colors for background color change
let backgroundColors = [
  "#72C9A9",
  "#F25D30",
  "#b6c917",
  "#48eb34",
  "#94C5E8",
  "#FF3DA4",
  "#FF0C10",
  "#10f2eb",
  "#514fbd",
  "#59D689"
];

//Function that gets a random quote, who said it, tag, and new color
function getRandomQuote(array) {
  let quoteNumber = Math.floor(Math.random()*array.length);
  let quoteToPrint = quoteArray[quoteNumber].quote;
  let attributionToPrint = quoteArray[quoteNumber].source;
  let backgroundColor = backgroundColors[Math.floor(Math.random()*backgroundColors.length)];
  let tagToUse = quoteArray[quoteNumber].tag;
  return([quoteToPrint, attributionToPrint, backgroundColor, tagToUse]);
};

//Function what writes new info to page and changes background color
function printQuote(quoteToPrint, attributionToPrint, backgroundColor, tagToUse){
  let thingsToPrint = getRandomQuote(quoteArray);
  document.getElementById("quotearea").innerHTML = `
    <h1 id="quote"> ${thingsToPrint[0]}</h1>
    <div class="text">
      <h5 id="source"> ${thingsToPrint[1]}<span id="tag"> (${thingsToPrint[3]})</span></h5>
    </div> `
  document.body.style.backgroundColor = thingsToPrint[2];
}

//Listens for click event on button to generate new quote
document.getElementById('loadQuote').addEventListener("click", printQuote, false);
