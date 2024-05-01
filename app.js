/* Developed by
          Mizanali Panjwani */
/* THIS IS THE BETA VERSION OF THE GAME:
                               THE GHOSTS MOVE RANDOMLY ACROSS THE BOARD
                               IN THE STABLE RELEASE OF THE GAME THEY WILL CHASE THE PAC-MAN */

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById("grid");
  const scoreDisplay = document.getElementById("score");
  const resultDisplay = document.getElementById("result");
  const squares = [];
  const width = 28;
  let score = 0;
  let pacmanCurrentIndex = 490;

  const layout = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 2, 2, 2, 2, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  // 0 - dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - energizer
  // 4 - empty

  //draw board and fill it with squares according to layout array
  function createBoard() {
    for (let i = 0; i < layout.length; i++) {
      const square = document.createElement("div");
      grid.appendChild(square);
      squares.push(square);

      if (layout[i] === 0) {
        squares[i].classList.add("dot");
      }
      else if (layout[i] === 1) {
        squares[i].classList.add("wall");
      }
      else if (layout[i] === 2) {
        squares[i].classList.add("ghost-lair");
      }
      else if (layout[i] === 3) {
        squares[i].classList.add("energizer");
      }
    }
  }

  createBoard();

  //draw pac-man
  squares[pacmanCurrentIndex].classList.add("pac-man");

  //move pac-man using keyboard

  document.addEventListener("keydown", movePacMan);

  function movePacMan(event) {
    squares[pacmanCurrentIndex].classList.remove("pac-man");
    if (event.keyCode === 37) { //left
      if (pacmanCurrentIndex % width != 0 && !squares[pacmanCurrentIndex - 1].classList.contains("wall") && !squares[pacmanCurrentIndex - 1].classList.contains("ghost-lair")) {
        pacmanCurrentIndex -= 1;
      }
      //factor in left exit
      if (pacmanCurrentIndex - 1 === 363) {
        pacmanCurrentIndex = 391;
      }
    }
    else if (event.keyCode === 38) { //up
      event.preventDefault()

      if (pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex - width].classList.contains("wall") && !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair")) {
        pacmanCurrentIndex -= width;
      }
    }
    else if (event.keyCode === 39) { //right
      if (pacmanCurrentIndex % width < width - 1 && !squares[pacmanCurrentIndex + 1].classList.contains("wall") && !squares[pacmanCurrentIndex + 1].classList.contains("ghost-lair")) {
        pacmanCurrentIndex += 1;
      }
      //factor in right exit
      if (pacmanCurrentIndex + 1 === 392) {
        pacmanCurrentIndex = 364;
      }
    }
    else if (event.keyCode === 40) { //down
      event.preventDefault()
      if (pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex + width].classList.contains("wall") && !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair")) {
        pacmanCurrentIndex += width;
      }
    }
    squares[pacmanCurrentIndex].classList.add("pac-man");
    //check for following functions after each movement
    checkDotEaten();
    checkEnergizerEaten();
    gameOver();
    checkWin();

  }

  function checkDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains("dot")) {
      score += 10;
      scoreDisplay.innerHTML = score;
      squares[pacmanCurrentIndex].classList.remove("dot");
    }
  }

  function checkEnergizerEaten() {
    if (squares[pacmanCurrentIndex].classList.contains("energizer")) {
      squares[pacmanCurrentIndex].classList.remove("energizer")
      score += 20;
      scoreDisplay.innerHTML = score;
      //make all ghosts dizzy and then restore them back to normal after ten seconds
      ghosts.forEach((item, i) => {
        item.isDizzy = true;
      });
      setTimeout(function () {
        ghosts.forEach((item, i) => {
          item.isDizzy = false;
        });
      }, 3000); //changed the time period of their freezing HK
    }
  }

  //the Ghost class
  class Ghost {
    constructor(color, startIndex, speed) {
      this.color = color;
      this.startIndex = startIndex;
      this.speed = speed;
      this.currentIndex = startIndex;
      this.timerId = NaN;
      this.isDizzy = false;
    }
  }

  //create array of Ghost objects
  const ghosts = [ //added more ghosts HK
    new Ghost("red", 348, 500),
    new Ghost("red", 376, 500),
    new Ghost("cyan", 351, 350),
    new Ghost("cyan", 379, 350),
    new Ghost("orange", 378, 250),
    new Ghost("orange", 377, 250),
  ];

  //draw ghosts on the board
  ghosts.forEach((item, i) => {
    squares[item.currentIndex].classList.add(item.color);
    squares[item.currentIndex].classList.add("ghost");
  });

  //call moveGhost function for each ghost by sending each ghost as parameter
  ghosts.forEach((item, i) => {
    moveGhost(item);
  });

  //move the ghost sent as parameter at it's respective speed
  function moveGhost(ghost) {
    const directions = [-1, -width, 1, width];
    let randomDir = directions[Math.floor(Math.random() * directions.length)];
    ghost.timerId = setInterval(function () {
      //check if random direction selected does not have a wall or another ghost in it
      if (!squares[ghost.currentIndex + randomDir].classList.contains("wall") && !squares[ghost.currentIndex + randomDir].classList.contains("ghost")) {
        squares[ghost.currentIndex].classList.remove("ghost", ghost.color, "dizzy", `dizzy-${ghost.color}`);
        if(ghost.isDizzy){ //if dizzy don't move HK

        }else{

          ghost.currentIndex += randomDir;
          squares[ghost.currentIndex].classList.add("ghost", ghost.color);
        }
      }
      //else re-assign the random direction
      else {
        randomDir = directions[Math.floor(Math.random() * directions.length)];
      }
      //if the ghost was dizzy before moving, keep it dizzy
      if (ghost.isDizzy === true) {
        console.log(squares[ghost.currentIndex]);
        squares[ghost.currentIndex].classList.add("dizzy");
        squares[ghost.currentIndex].classList.add(`dizzy-${ghost.color}`);
      }
      //if pac-man eats the ghost while it's dizzy
      if (ghost.isDizzy === true && squares[ghost.currentIndex].classList.contains("pac-man")) {
        squares[ghost.currentIndex].classList.remove("ghost", ghost.color, "dizzy", `dizzy-${ghost.color}`);
        ghost.currentIndex = ghost.startIndex;
        squares[ghost.currentIndex].classList.add("ghost", ghost.color);
        score += 100;
        scoreDisplay.innerHTML = score;
      }
      //check for gameover
      gameOver();
    }, ghost.speed);
  }

  function gameOver() {
    if (squares[pacmanCurrentIndex].classList.contains("ghost") && !squares[pacmanCurrentIndex].classList.contains("dizzy")) {
      ghosts.forEach((item, i) => {
        clearInterval(item.timerId);
      });
      document.removeEventListener("keydown", movePacMan);
      resultDisplay.innerHTML = "GAME OVER";
    }
  }

  function checkWin() {
    if (score >= 2420) {
      ghosts.forEach((item, i) => {
        clearInterval(item.timerId);
      });
      document.removeEventListener("keydown", movePacMan);
      resultDisplay.innerHTML = "YOU WON!";
    }
  }
});
