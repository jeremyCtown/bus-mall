'use strict';

// array to store all Junk instances
Junk.allJunk = [];
var totalClicks = parseInt(0);
var studyOutput = document.getElementById('studyOutput');
var flag = false;

// make a constructor for Junk objects
function Junk(filepath, name){
  this.filepath = filepath;
  this.name = name;
  Junk.allJunk.push(this);
  this.shows = 0;
  this.clicks = 0;
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

// callback function for event listener to randomly display a goat image
function randomJunk1() {
  var imgEl = document.getElementById('junk-pic-1');
  imgEl.addEventListener('click', randomJunk1);
  var randomIndex = Math.floor(Math.random() * Junk.allJunk.length);
  imgEl.src = Junk.allJunk[randomIndex].filepath;
  Junk.allJunk[randomIndex].shows++;
  flag = true;
  imgEl.addEventListener('click', clickCounter);
  imgEl.addEventListener('click', refresh);

  console.log(Junk.allJunk[randomIndex].name);
}

function randomJunk2() {
  var imgEl = document.getElementById('junk-pic-2');
  imgEl.addEventListener('click', randomJunk2);
  var randomIndex = Math.floor(Math.random() * Junk.allJunk.length);
  imgEl.src = Junk.allJunk[randomIndex].filepath;
  Junk.allJunk[randomIndex].shows++;
  flag = true;
  imgEl.addEventListener('click', clickCounter);
  imgEl.addEventListener('click', refresh);

  console.log(Junk.allJunk[randomIndex].name);
}

function randomJunk3() {
  var imgEl = document.getElementById('junk-pic-3');
  imgEl.addEventListener('click', randomJunk3);
  var randomIndex = Math.floor(Math.random() * Junk.allJunk.length);
  imgEl.src = Junk.allJunk[randomIndex].filepath;
  Junk.allJunk[randomIndex].shows++;
  flag = true;
  imgEl.addEventListener('click', clickCounter);
  imgEl.addEventListener('click', refresh);

  console.log(Junk.allJunk[randomIndex].name);
}

// imgEl.addEventListener('click', clickCounter);

function clickCounter() {
  if (flag === true) {
    totalClicks++;
    flag = false;
    console.log('Total Clicks= ' + totalClicks);
  }
}

function tableRender() {
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = this.name;
  trEl.appendChild(tdEl);

  for (var i in Junk.allJunk) {
    tdEl = document.createElement('td');
    tdEl.textContent = this.counter[i];
    trEl.appendChild(tdEl);
  }
  tdEl = document.createElement('td');
  tdEl.textContent = totalClicks;
  trEl.appendChild(tdEl);

  studyOutput.appendChild(trEl);
}

if (totalClicks === 3) {
  tableRender();
}

function refresh() {
  randomJunk1();
  randomJunk2();
  randomJunk3();
}

// invoke the callback on page load to show a random baby goat
randomJunk1();
randomJunk2();
randomJunk3();