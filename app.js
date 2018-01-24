'use strict';

var userName = 0;

function getUserName() {
  userName = prompt('Thank you for participating in our study! Please enter your name');
  console.log(userName);
  if(userName === '') {
    userName = 'AAAHHHH!!!!!';
    console.log('NO NAME GIVEN');
  }
}

// array to store all Junk instances
Junk.allJunk = [];

//keep track of all clicks
Junk.totalClicks = 0;

//track previously displayed junk
Junk.lastShown = [];

//access the section element from the DOM
var sectionEl = document.getElementById('junk-pics');

//access ul element from DOM
var ulEl = document.getElementById('junk-results');

// make a constructor for Junk objects
function Junk(filepath, name) {
  this.filepath = filepath;
  this.name = name;
  this.shows = 0;
  this.clicks = 0;
  Junk.allJunk.push(this);
}

// create instances of Junk
new Junk('images/bag.jpg', 'bag');
new Junk('images/banana.jpg', 'banana');
new Junk('images/bathroom.jpg', 'bathroom');
new Junk('images/boots.jpg', 'boots');
new Junk('images/breakfast.jpg', 'breakfast');
new Junk('images/bubblegum.jpg', 'bubblegum');
new Junk('images/chair.jpg', 'chair');
new Junk('images/cthulhu.jpg', 'cthulhu');
new Junk('images/dog-duck.jpg', 'dog-duck');
new Junk('images/dragon.jpg', 'dragon');
new Junk('images/pen.jpg', 'pen');
new Junk('images/pet-sweep.jpg', 'pet-sweep');
new Junk('images/scissors.jpg', 'scissors');
new Junk('images/shark.jpg', 'shark');
new Junk('images/sweep.png', 'sweep');
new Junk('images/tauntaun.jpg', 'tauntaun');
new Junk('images/unicorn.jpg', 'unicorn');
new Junk('images/usb.gif', 'usb');
new Junk('images/water-can.jpg', 'water-can');
new Junk('images/wine-glass.jpg', 'wine-glass');

//assign elements to IDs
var leftEl = document.getElementById('left');
var centerEl = document.getElementById('center');
var rightEl = document.getElementById('right');

//randomly display a picture
function randomJunk() {
  var randomLeft = Math.floor(Math.random() * Junk.allJunk.length);
  var randomCenter = Math.floor(Math.random() * Junk.allJunk.length);
  var randomRight = Math.floor(Math.random() * Junk.allJunk.length);

  while(randomLeft === randomRight || randomLeft === randomCenter || randomCenter === randomRight || Junk.lastShown.includes(randomLeft) || Junk.lastShown.includes(randomCenter) || Junk.lastShown.includes(randomRight)) {
    console.log ('DOUBLES!');
    randomLeft = Math.floor(Math.random() * Junk.allJunk.length);
    randomCenter = Math.floor(Math.random() * Junk.allJunk.length);
    randomRight = Math.floor(Math.random() * Junk.allJunk.length);
  }

  leftEl.src = Junk.allJunk[randomLeft].filepath;
  leftEl.alt = Junk.allJunk[randomLeft].name;

  centerEl.src = Junk.allJunk[randomCenter].filepath;
  centerEl.alt = Junk.allJunk[randomCenter].name;

  rightEl.src = Junk.allJunk[randomRight].filepath;
  rightEl.alt = Junk.allJunk[randomRight].name;

  Junk.allJunk[randomLeft].shows++;
  Junk.allJunk[randomCenter].shows++;
  Junk.allJunk[randomRight].shows++;

  Junk.lastShown[0] = randomLeft;
  Junk.lastShown[1] = randomCenter;
  Junk.lastShown[2] = randomRight;
}

// define handleClicks function
function handleClicks(e) {
  Junk.totalClicks++;
  console.log(e.target.alt);

  for(var i in Junk.allJunk) {
    if(e.target.alt === Junk.allJunk[i].name) {
      Junk.allJunk[i].clicks++;
    }
  }
  if(Junk.totalClicks > 24) {
    sectionEl.removeEventListener('click', handleClicks);
    alert('Thanks for your help, ' + userName + '! Click Ok to see your results');
    showResults();
  } else {
    randomJunk();
  }
}

//display results
function showResults() {
  ulEl.textContent = userName + '\'s Results';
  for (var i in Junk.allJunk) {
    var liEl = document.createElement('li');
    liEl.textContent = Junk.allJunk[i].name + ', shown: ' + Junk.allJunk[i].shows + ', clicked: ' + Junk.allJunk[i].clicks;
    ulEl.appendChild(liEl);
  }
}

sectionEl.addEventListener('click', handleClicks);

//render 3 images on page load
getUserName();
randomJunk();