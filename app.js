'use strict';

//global variables
var junkNames = [];
var skipCounter = 0;
var junkClicks = [];
var junkViews = [];
var userName;
console.log(junkClicks);

//variables that have data pushed to them
Junk.allJunk = [];
Junk.totalClicks = 0;
Junk.lastShown = [];

//retrieves elements from the main document(index.html)
var sectionEl = document.getElementById('junk-pics');
var buttonEl = document.getElementById('button');

//creates the prompt when the user initially visits the page
function getUserName() {
  if(localStorage.userName) {
    alert('Thanks for coming back ' + localStorage.userName + '! Let\'s get started.');
    userName = localStorage.userName;
  } else {
    userName = prompt('Thank you for participating in our study! Please enter your name');
    console.log(userName);
    if(userName === '') {
      userName = 'AAAHHHH!!!!!';
      console.log('NO NAME GIVEN');
    }
    alert('Alright ' + userName + ', let\'s get started!');
  }
}

//arrays to store chart variables and update localStorage
function pullLocalStorage() {
  if(localStorage.chartClicks && localStorage.chartViews) {
    junkClicks = JSON.parse(localStorage.getItem('chartClicks'));
    junkViews = JSON.parse(localStorage.getItem('chartViews'));
  } else {
    junkClicks = [];
    junkViews = [];
  }
}

// constructor function
function Junk(filepath, name) {
  this.filepath = filepath;
  this.name = name;
  this.shows = 0;
  this.clicks = 0;
  Junk.allJunk.push(this);
  junkNames.push(this.name);
}

//assigns variables to image elements from the main page (index.html)
var leftEl = document.getElementById('left');
var centerEl = document.getElementById('center');
var rightEl = document.getElementById('right');

// determines what 3 random photos will appear on the site
function randomJunk() {
  //random number generators
  var randomLeft = Math.floor(Math.random() * Junk.allJunk.length);
  var randomCenter = Math.floor(Math.random() * Junk.allJunk.length);
  var randomRight = Math.floor(Math.random() * Junk.allJunk.length);

  //ensures photos are not the same as each other or previous photos
  while(randomLeft === randomRight
    || randomLeft === randomCenter
    || randomCenter === randomRight
    || Junk.lastShown.includes(randomLeft)
    || Junk.lastShown.includes(randomCenter)
    || Junk.lastShown.includes(randomRight)) {
    console.log ('DOUBLES!');
    randomLeft = Math.floor(Math.random() * Junk.allJunk.length);
    randomCenter = Math.floor(Math.random() * Junk.allJunk.length);
    randomRight = Math.floor(Math.random() * Junk.allJunk.length);
  }
  //assigns randomly generated instance filepath to src attribute and name to alt attribute
  leftEl.src = Junk.allJunk[randomLeft].filepath;
  leftEl.alt = Junk.allJunk[randomLeft].name;

  centerEl.src = Junk.allJunk[randomCenter].filepath;
  centerEl.alt = Junk.allJunk[randomCenter].name;

  rightEl.src = Junk.allJunk[randomRight].filepath;
  rightEl.alt = Junk.allJunk[randomRight].name;

  //adds to number of times an image is shown to related property
  Junk.allJunk[randomLeft].shows++;
  Junk.allJunk[randomCenter].shows++;
  Junk.allJunk[randomRight].shows++;

  //generates an array to log which images are currently being shown
  Junk.lastShown[0] = randomLeft;
  Junk.lastShown[1] = randomCenter;
  Junk.lastShown[2] = randomRight;
}

//generates an event that registers number of clicks and displays table and chart when limit is hit
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
    removePhotos();
    alert('Thanks for your help, ' + userName + '! Click Ok to see your results');
    refreshButton();
    updateClicks();
    updateShows();
    storeUserData();
    createChart();
    Junk.totalClicks = 0;
  } else {
    randomJunk();
  }
}

//event listener to recognize validated clicks on images
sectionEl.addEventListener('click', handleClicks);

//hides 3 images after 25 clicks
function removePhotos() {
  leftEl.src = '';
  leftEl.alt = '';
  centerEl.src = '';
  centerEl.alt = '';
  rightEl.src = '';
  rightEl.alt = '';
}

//switches skipButton to refreshButton
function refreshButton() {
  buttonEl.textContent = 'Let\'s do it again!';
  buttonEl.style.backgroundColor = 'green';
  buttonEl.addEventListener('click', clickRefreshButton);
}

//refreshButton functionality
function clickRefreshButton() {
  buttonEl.removeEventListener('click', refreshButton);
  randomJunk();
  sectionEl.addEventListener('click', handleClicks);
  skipButton();
  location.reload();
}

// adds to total number of clicks per item
function updateClicks () {
  for(var i in Junk.allJunk) {
    if(localStorage.chartClicks) {
      junkClicks[i] += Junk.allJunk[i].clicks;
    } else {
      junkClicks[i] = Junk.allJunk[i].clicks;
    }
  }
}

// adds to the total number of times each iten is displayed
function updateShows () {
  for(var i in Junk.allJunk) {
    if(localStorage.chartViews) {
      junkViews[i] += Junk.allJunk[i].shows;
    } else {
      junkViews[i] = Junk.allJunk[i].shows;
    }
  }
}

//stores user data AFTER survey complete
function storeUserData() {
  localStorage.userName = userName;
  localStorage.chartClicks = JSON.stringify(junkClicks);
  localStorage.chartViews = JSON.stringify(junkViews);
}

//renders a chart that is displayed after 25 clicks, uses library 'chartJS'
function createChart () {
  var h2El = document.getElementById('table-header');
  h2El.textContent = userName + '\'s Results';

  var context = document.getElementById('results-chart').getContext('2d');

  var junkVotes = {
    label: 'Clicks per Item',
    data: junkClicks,
    backgroundColor: 'rgba(0, 99, 132, 0.6)',
    borderWidth: 0
  };

  var junkShows = {
    label: 'Views per Item',
    data: junkViews,
    backgroundColor: 'rgba(99, 132, 0, 0.6)',
    borderWidth: 0
  };

  var junkData = {
    labels: junkNames,
    datasets: [junkVotes, junkShows]
  };

  var chartOptions = {
    responsive: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
      }]
    }
  };

  var junkChart = new Chart(context, { //eslint-disable-line
    type: 'bar',
    data: junkData,
    options: chartOptions
  });
  document.getElementById('results-chart').style.backgroundColor = 'white';
}

//creates skip button option
function skipButton() {
  buttonEl.addEventListener('click', clickSkipButton);
  buttonEl.textContent = 'These suck. Skip \'em!';
  buttonEl.style.backgroundColor = 'rgb(135, 161, 182);';
}

//skipButton functionality
function clickSkipButton() {
  skipCounter++;
  randomJunk();
  console.log('SKIPPED! Skip Count =' + skipCounter + '. Item #s skipped: ' + Junk.lastShown);
}

//object instances of the constructor
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

//renders name prompt and initial 3 images on page load


pullLocalStorage();
getUserName();
skipButton();
randomJunk();