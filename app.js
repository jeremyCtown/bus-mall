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

Junk.allJunk = [];
Junk.totalClicks = 0;
Junk.lastShown = [];

var sectionEl = document.getElementById('junk-pics');
var junkResults = document.getElementById('junk-results');

//arrays to store chart elements
var junkNames = [];
var junkClicks = [];
var junkViews = [];

function Junk(filepath, name) {
  this.filepath = filepath;
  this.name = name;
  this.shows = 0;
  this.clicks = 0;
  Junk.allJunk.push(this);
  junkNames.push(this.name);
}

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

var leftEl = document.getElementById('left');
var centerEl = document.getElementById('center');
var rightEl = document.getElementById('right');

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
    updateClicks();
    updateShows();
    showResults();
    createChart();
  } else {
    randomJunk();
  }
}

function removePhotos() {
  leftEl.src = null;
  leftEl.alt = '';
  centerEl.src = null;
  centerEl.alt = '';
  rightEl.src = null;
  rightEl.alt = '';
}

function showResults() {
  junkResults.textContent = userName + '\'s Results';

  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = 'Item';
  trEl.appendChild(thEl);

  for (var i in Junk.allJunk) {
    thEl = document.createElement('th');
    thEl.textContent = Junk.allJunk[i].name;
    trEl.appendChild(thEl);
  }

  junkResults.appendChild(trEl);

  trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = 'Views';
  trEl.appendChild(tdEl);
  for (i in Junk.allJunk) {
    tdEl = document.createElement('td');
    tdEl.textContent = Junk.allJunk[i].shows;
    trEl.appendChild(tdEl);
  }

  junkResults.appendChild(trEl);

  trEl = document.createElement('tr');
  tdEl = document.createElement('td');
  tdEl.textContent = 'Clicks';
  trEl.appendChild(tdEl);
  for (i in Junk.allJunk) {
    tdEl = document.createElement('td');
    tdEl.textContent = Junk.allJunk[i].clicks;
    trEl.appendChild(tdEl);
  }

  junkResults.appendChild(trEl);
}

function updateClicks () {
  for(var i in Junk.allJunk) {
    junkClicks[i] = Junk.allJunk[i].clicks;
  }
}

function updateShows () {
  for(var i in Junk.allJunk) {
    junkViews[i] = Junk.allJunk[i].shows;
  }
}

function createChart () {
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

  var junkChart = new Chart(context, {
    type: 'bar',
    data: junkData,
    options: chartOptions
  });
  document.getElementById('results-chart').style.backgroundColor = 'white';
}

sectionEl.addEventListener('click', handleClicks);

getUserName();
randomJunk();