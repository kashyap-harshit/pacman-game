/* Developed by
          Mizanali Panjwani */

const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
var scoreDisplay = document.querySelector('#score');
var timeLeft = 30;
var timer = document.getElementById('timer');
var score = 0;
var sec;
var easyButton = document.getElementById("easybtn");
var mediumButton = document.getElementById("mediumbtn");
var startButton = document.getElementById("start");
var hardButton = document.getElementById("hardbtn");
var timerId = null;
const grid = document.getElementById('grid');

if(hardButton.classList.contains("selected")) { //check if on hard mode
  sec = 200;
}
else if(mediumButton.classList.contains("selected")){ //else on medium mode
  sec = 5000;
}
else { //else on easy mode
  sec = 750;
}

//pick random square
function randomSquare(){
  squares.forEach((item, i) => {
    item.classList.remove('mole');
  });
  let randomSquare = squares[Math.floor(Math.random()*9)];
  randomSquare.classList.add('mole');
  //assign the ID of randomSquare to hitPosition for us to use later
  hitPosition = randomSquare.id;
}

//add event listener and check if right square hit
squares.forEach((item, i) => {
  item.addEventListener('mouseup', function(){
    if(item.id === hitPosition){
      //hit!
      score++;
      scoreDisplay.textContent = score;
      item.classList.remove('mole');
    }
  });
});

//move mole to randomly selected square
function moveMole() {
  timerId = setInterval(randomSquare, sec);
}

startButton.addEventListener("click", function(){
  timerId = setInterval(countdown, 1000);
  easyButton.classList.add("disabled");
  hardButton.classList.add("disabled");
  mediumButton.classList.add("disabled");
  startButton.classList.add("disabled");
  moveMole();
});

easyButton.addEventListener("click", function(){
  easyButton.classList.add("selected");
  hardButton.classList.remove("selected");
  mediumButton.classList.remove("selected");
  sec = 750;
});

mediumButton.addEventListener("click", function(){
  mediumButton.classList.add("selected");
  hardButton.classList.remove("selected");
  easyButton.classList.remove("selected");
  sec = 500;
});

hardButton.addEventListener("click", function(){
  easyButton.classList.remove("selected");
  hardButton.classList.add("selected");
  mediumButton.classList.remove("selected");
  sec = 200;
});

function countdown() {
  if (timeLeft === 0) {
    clearInterval(timerId);
    timer.innerHTML = 'GAME OVER!';
    grid.classList.add('disabled');
  }
  else {
    timer.innerHTML = timeLeft + ' seconds remaining';
    timeLeft--;
  }
}
