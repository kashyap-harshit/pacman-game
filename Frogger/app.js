/* Developed by
          Mizanali Panjwani */

document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll("#grid div");
  const resultDisplay = document.getElementById("result");
  const startButton = document.getElementById("start-btn");
  const carsLeft = document.querySelectorAll(".car-left");
  const carsRight = document.querySelectorAll(".car-right");
  const logsLeft = document.querySelectorAll(".log-left");
  const logsRight = document.querySelectorAll(".log-right");
  var carsId;
  var logsId;
  const width = 9;
  var currentIndex = 76;
  var timeLeft = 15;
  var timer = document.getElementById('timer');
  var gameplayIntervalId;
  var countdownIntervalId;

  //start the game
  startButton.addEventListener("click", function(){
    this.classList.add("disabled");
    gameplayIntervalId = setInterval(gamePlay, 1000);
    countdownIntervalId = setInterval(countdown, 1000);
    document.addEventListener("keydown", moveFrog);
  });

  function countdown() {
    if (timeLeft == 0) {
      timer.innerHTML = 0 + ' seconds remaining';
      resultDisplay.innerHTML = "TIME UP! GAME OVER.";
      clearInterval(gameplayIntervalId);
      clearInterval(countdownIntervalId);
      document.removeEventListener("keydown", moveFrog);
    }
    else {
      timer.innerHTML = timeLeft + ' seconds remaining';
      timeLeft--;
    }
  }

  //draw frog
  squares[currentIndex].classList.add("frog");

  //move frog
  function moveFrog(event){
    squares[currentIndex].classList.remove("frog");
    if(event.keyCode === 65 && currentIndex % width != 0) { //left
      currentIndex -= 1;
    }
    else if(event.keyCode === 87 && currentIndex - width >= 0) { //up
      currentIndex -= width;
    }
    else if(event.keyCode === 68 && currentIndex % width < width - 1) { //right
      currentIndex += 1;
    }
    else if(event.keyCode === 83 && currentIndex + width < width * width) { //down
      currentIndex += width;
    }
    squares[currentIndex].classList.add("frog");
    //check if won
    won();
    //check if lost
    lost();
  }

  //move cars
  function moveCars(){
    carsLeft.forEach((carLeft, i) => {
      if(carLeft.classList.contains("c1")) {
        carLeft.classList.remove("c1");
        carLeft.classList.add("c2");
      }
      else if(carLeft.classList.contains("c2")) {
        carLeft.classList.remove("c2");
        carLeft.classList.add("c3");
      }
      else if(carLeft.classList.contains("c3")) {
        carLeft.classList.remove("c3");
        carLeft.classList.add("c1");
      }
    });
    carsRight.forEach((carRight, i) => {
      if(carRight.classList.contains("c1")) {
        carRight.classList.remove("c1");
        carRight.classList.add("c3");
      }
      else if(carRight.classList.contains("c2")) {
        carRight.classList.remove("c2");
        carRight.classList.add("c1");
      }
      else if(carRight.classList.contains("c3")) {
        carRight.classList.remove("c3");
        carRight.classList.add("c2");
      }
    });
  }

  //move logs
  function moveLogs(){
    logsLeft.forEach((logLeft, i) => {
      if(logLeft.classList.contains("l1")) {
        logLeft.classList.remove("l1");
        logLeft.classList.add("l2");
      }
      else if(logLeft.classList.contains("l2")) {
        logLeft.classList.remove("l2");
        logLeft.classList.add("l3");
      }
      else if(logLeft.classList.contains("l3")) {
        logLeft.classList.remove("l3");
        logLeft.classList.add("l4");
      }
      else if(logLeft.classList.contains("l4")) {
        logLeft.classList.remove("l4");
        logLeft.classList.add("l5");
      }
      else if(logLeft.classList.contains("l5")) {
        logLeft.classList.remove("l5");
        logLeft.classList.add("l1");
      }
    });
    logsRight.forEach((logRight, i) => {
      if(logRight.classList.contains("l1")) {
        logRight.classList.remove("l1");
        logRight.classList.add("l5");
      }
      else if(logRight.classList.contains("l2")) {
        logRight.classList.remove("l2");
        logRight.classList.add("l1");
      }
      else if(logRight.classList.contains("l3")) {
        logRight.classList.remove("l3");
        logRight.classList.add("l2");
      }
      else if(logRight.classList.contains("l4")) {
        logRight.classList.remove("l4");
        logRight.classList.add("l3");
      }
      else if(logRight.classList.contains("l5")) {
        logRight.classList.remove("l5");
        logRight.classList.add("l4");
      }
    });
  }

  //move frog with logs
  function moveFrogWithLogLeft(){
    if(currentIndex>=27 && currentIndex<35) {
      squares[currentIndex].classList.remove("frog");
      currentIndex += 1;
      squares[currentIndex].classList.add("frog");
    }
  }
  function moveFrogWithLogRight(){
    if(currentIndex>18 && currentIndex<=26) {
      squares[currentIndex].classList.remove("frog");
      currentIndex -= 1;
      squares[currentIndex].classList.add("frog");
    }
  }

  //check if player won
  function won() {
    if(currentIndex <= width) {
      resultDisplay.innerHTML = "YOU WON! HURRAY!";
      document.removeEventListener("keydown", moveFrog);
      clearInterval(gameplayIntervalId);
      clearInterval(countdownIntervalId);
    }
  }

  //check if player lost
  function lost() {
    if(squares[currentIndex].classList.contains("c1") || squares[currentIndex].classList.contains("l4") || squares[currentIndex].classList.contains("l5")) {
      resultDisplay.innerHTML = "YOU LOST! GAME OVER.";
      document.removeEventListener("keydown", moveFrog);
      clearInterval(gameplayIntervalId);
      clearInterval(countdownIntervalId);
    }
  }

  //start moving everything
  function gamePlay(){
    moveCars();
    moveLogs();
    moveFrogWithLogLeft();
    moveFrogWithLogRight();
    lost();
  }
});
