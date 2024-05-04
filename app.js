/* Developed by
          Mizanali Panjwani */
/* THIS IS THE BETA VERSION OF THE GAME:
                               THE GHOSTS MOVE RANDOMLY ACROSS THE BOARD
                               IN THE STABLE RELEASE OF THE GAME THEY WILL CHASE THE PAC-MAN */


document.addEventListener('DOMContentLoaded', () => {
  let gameStarted = false;
  let paused = false;
  let playerName;
  let highscore1 = localStorage.getItem("highscore1");
  let highscore2 = localStorage.getItem("highscore2");
  let highscore3 = localStorage.getItem("highscore3");
  const grid = document.getElementById("grid");
  const scoreDisplay = document.getElementById("score");
  const resultDisplay = document.getElementById("result");
  const meta = document.getElementById("meta");
  const pFirst = document.getElementById("p-first");
  const pSecond = document.getElementById("p-second");
  const pThird = document.getElementById("p-third");
  const sFirst = document.getElementById("s-first");
  const sSecond = document.getElementById("s-second");
  const sThird = document.getElementById("s-third");
  const instruct = document.querySelector(".instruct");
  const squares = [];
  const width = 28;
  let score = 0;
  let pacmanCurrentIndex = 490;

  let sfx = {

    eat: new Howl({
      src: "assets/sounds/eat.mp3",
      volume: 5
    }),
    transport: new Howl({
      src: "assets/sounds/transport.mp3",
      // volume: 0.30 

    }),
    energy: new Howl({
      src: "assets/sounds/energy.mp3",
      volume: 2
    }),
    kill: new Howl({
      src: "assets/sounds/kill.wav",

    }),
    bgm: new Howl({
      src: "assets/sounds/bgm.mp3",
      loop: true,
      volume: 0.5
    }),
    pause: new Howl({
      src: "assets/sounds/pause.wav",
      volume: 0.5
    }),
    gameover: new Howl({
      src: "assets/sounds/gameover.wav",
      volume: 0.35
    })
  }

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

  //function to load the top scorers - HK
  function topScorers() {
    highscore1 = localStorage.getItem("highscore1");
    highscore2 = localStorage.getItem("highscore2");
    highscore3 = localStorage.getItem("highscore3");
    let highscoreArray;
    try {
      if (highscore1.split(",")[1]) {
        highscoreArray = highscore1.split(",");
        pFirst.innerHTML = highscoreArray[0];
        sFirst.innerHTML = highscoreArray[1];
  
  
      }
      else {
        localStorage.setItem("highscore1", ".,0") //in the gameover function I am slicing it up so to make sense there this had to be saved like this - HK
        highscore1 = localStorage.getItem("highscore1");
      }
      if (highscore2.split(",")[1]) {
        highscoreArray = highscore2.split(",");
        pSecond.innerHTML = highscoreArray[0];
        sSecond.innerHTML = highscoreArray[1];
  
      }
      else {
        localStorage.setItem("highscore2", ".,0")
        highscore2 = localStorage.getItem("highscore2");
      }
      if (highscore3.split(",")[1]) {
        highscoreArray = highscore3.split(",");
        pThird.innerHTML = highscoreArray[0];
        sThird.innerHTML = highscoreArray[1];
  
      }
      else {
        localStorage.setItem("highscore3", ".,0")
        highscore3 = localStorage.getItem("highscore3");
      }
      
    } catch (error) {
      
    }


  }

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
  topScorers();

  //draw pac-man
  squares[pacmanCurrentIndex].classList.add("pac-man");

  //move pac-man using keyboard

  document.addEventListener("keydown", redirection); //since i have to cancel out the keydown event listener when game over so wrote a separate function consisting all the functions - HK
  function allKeydown(event) {
    redirection(event);

    movePacMan(event);
  }

  function redirection(event) {
    if (gameStarted) {
      if (event.ctrlKey && event.key === 'r') {
        event.preventDefault();

      }
    }
    if (event.keyCode === 32) {
      event.preventDefault()
      if (paused) {
        grid.scrollIntoView();
        sfx.bgm.play();
        //call moveGhost function for each ghost by sending each ghost as parameter
        ghosts.forEach((item, i) => {
          moveGhost(item);
        });
        document.addEventListener("keydown", movePacMan);
        paused = false;
        gameStarted = true;
      } else if (gameStarted) {
        //chill
      } else {//this is gonna happen for the first time // redirecting to the game window - HK


        event.preventDefault();
        if (!sfx.bgm.playing()) {
          sfx.bgm.play();
        }
        grid.scrollIntoView();
        // window.location.reload();

        //call moveGhost function for each ghost by sending each ghost as parameter
        ghosts.forEach((item, i) => {
          squares[item.currentIndex].classList.remove("ghost", item.color, "dizzy", `dizzy-${item.color}`);
          //draw ghosts on the board
          item.currentIndex = item.startIndex;
          squares[item.currentIndex].classList.add(item.color);
          squares[item.currentIndex].classList.add("ghost");
          moveGhost(item);
        });
        score = 0;
        //draw pac-man
        squares[pacmanCurrentIndex].classList.remove("pac-man");
        pacmanCurrentIndex = 490;
        squares[pacmanCurrentIndex].classList.add("pac-man");
        scoreDisplay.innerHTML = 0;
        document.addEventListener("keydown", movePacMan);
        gameStarted = true;
      }
    }


    else if (event.keyCode === 27) {
      if (gameStarted) {

        event.preventDefault();
        sfx.bgm.pause();
        sfx.pause.play();
        meta.scrollIntoView();
        ghosts.forEach((item, i) => {
          clearInterval(item.timerId);
        });
        paused = true;
        gameStarted = false;
        resultDisplay.innerHTML = "PAUSED";
        instruct.innerHTML = "Press Space Bar To Continue";
        document.removeEventListener("keydown", movePacMan)
      }
    }
  }

  function movePacMan(event) {

    squares[pacmanCurrentIndex].classList.remove("pac-man");
    if (event.keyCode === 37) { //left
      if (pacmanCurrentIndex % width != 0 && !squares[pacmanCurrentIndex - 1].classList.contains("wall") && !squares[pacmanCurrentIndex - 1].classList.contains("ghost-lair")) {
        pacmanCurrentIndex -= 1;
      }
      //factor in left exit
      if (pacmanCurrentIndex - 1 === 363) {
        if (sfx.transport.playing()) {
          sfx.transport.stop();
          sfx.transport.play();
        } else {
          sfx.transport.play();
        }
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
        if (sfx.transport.playing()) {
          sfx.transport.stop();
          sfx.transport.play();
        } else {
          sfx.transport.play();
        }
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

    checkWin();
    checkLose();

  }

  function checkDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains("dot")) {
      score += 10;
      scoreDisplay.innerHTML = score;
      squares[pacmanCurrentIndex].classList.remove("dot");
      if (sfx.eat.playing()) {
        sfx.eat.stop();
        sfx.eat.play();
      } else {
        sfx.eat.play();
      }
    }
  }

  function checkEnergizerEaten() {
    if (squares[pacmanCurrentIndex].classList.contains("energizer")) {
      if (sfx.energy.playing()) {
        sfx.energy.stop();
        sfx.energy.play();
      } else {
        sfx.energy.play();
      }
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
      }, 2000); //changed the time period of their freezing - HK
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
  const ghosts = [ //added more ghosts - HK
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



  //move the ghost sent as parameter at it's respective speed
  function moveGhost(ghost) {

    const directions = [-1, -width, 1, width];
    let randomDir = directions[Math.floor(Math.random() * directions.length)];
    ghost.timerId = setInterval(function () {
      if (!ghost.isDizzy) { //if dizzy don't move - HK


        //first check if it is in the lair only if that is so then try to move up
        if (squares[ghost.currentIndex].classList.contains("ghost-lair")) {
          if (!squares[ghost.currentIndex - width].classList.contains("wall") && !squares[ghost.currentIndex - width].classList.contains("ghost")) {
            squares[ghost.currentIndex].classList.remove("ghost", ghost.color, "dizzy", `dizzy-${ghost.color}`);
            ghost.currentIndex += -width;
            squares[ghost.currentIndex].classList.add("ghost", ghost.color);
          }
        }
        else {

          //check if random direction selected does not have a wall or another ghost in it
          if (!squares[ghost.currentIndex + randomDir].classList.contains("wall") && !squares[ghost.currentIndex + randomDir].classList.contains("ghost") && !squares[ghost.currentIndex + randomDir].classList.contains("ghost-lair")) {
            squares[ghost.currentIndex].classList.remove("ghost", ghost.color, "dizzy", `dizzy-${ghost.color}`);

            ghost.currentIndex += randomDir;
            squares[ghost.currentIndex].classList.add("ghost", ghost.color);
          }
          //else re-assign the random direction
          else {
            randomDir = directions[Math.floor(Math.random() * directions.length)];
          }
        }
      }
      //if the ghost was dizzy before moving, keep it dizzy
      if (ghost.isDizzy === true) {
        // console.log(squares[ghost.currentIndex]);
        squares[ghost.currentIndex].classList.add("dizzy");
        squares[ghost.currentIndex].classList.add(`dizzy-${ghost.color}`);
      }
      //if pac-man eats the ghost while it's dizzy
      if (ghost.isDizzy === true && squares[ghost.currentIndex].classList.contains("pac-man")) {
        if (sfx.kill.playing()) {
          sfx.kill.stop();
          sfx.kill.play();
        } else {
          sfx.kill.play();
        }
        squares[ghost.currentIndex].classList.remove("ghost", ghost.color, "dizzy", `dizzy-${ghost.color}`);
        ghost.currentIndex = ghost.startIndex;
        squares[ghost.currentIndex].classList.add("ghost", ghost.color);
      }

      checkLose();


    }, ghost.speed);
  }
  function checkNullString(str) {
    if (!str) {
      playerName = "no_name"
    }
  }

  function gameOver(mess) { //added this common gameover function for winning and losing - HK

    ghosts.forEach((item, i) => {
      clearInterval(item.timerId);
    });
    document.removeEventListener("keydown", movePacMan)
    sfx.bgm.stop()
    sfx.gameover.play()
    resultDisplay.innerHTML = mess;
    instruct.innerHTML = "Press Space Bar To <br>Start A New Game"

    meta.scrollIntoView();
    if (score === 0) {

    }
    else if (score >= highscore1.split(",")[1]) {

      playerName = prompt("You have beat the highest score, enter your name : ");
      checkNullString(playerName)
      localStorage.setItem("highscore1", `${playerName},${score}`)

    } else if (score >= highscore2.split(",")[1]) {
      playerName = prompt("You have beat the second highest score, enter your name : ");
      checkNullString(playerName)
      localStorage.setItem("highscore2", `${playerName},${score}`)
    } else if (score >= highscore3.split(",")[1]) {
      playerName = prompt("You have beat the third highest score, enter your name : ");
      checkNullString(playerName)
      localStorage.setItem("highscore3", `${playerName},${score}`)
    }
    topScorers();
    // window.location.reload();
    gameStarted = false;

  }
  function checkLose() {
    if (squares[pacmanCurrentIndex].classList.contains("ghost") && !squares[pacmanCurrentIndex].classList.contains("dizzy")) {
      gameOver("GAME OVER");
    }
  }

  function checkWin() {
    if (score >= 2420) {
      gameOver("YOU WIN");
    }
  }
});
