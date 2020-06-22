/* Developed by
          Mizanali Panjwani */

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById("grid");
  const scoreDisplay = document.getElementById("score");
  const resultDisplay = document.getElementById("result");
  const highScoreDisplay = document.getElementById("high-score");
  const squares = [];
  const width = 4;
  let score = 0;
  let highscore = localStorage.getItem('highscore');
  highScoreDisplay.innerHTML = highscore;

  //create board by adding 16 squares with 0 in them
  function createBoard() {
    for(let i=0; i<width*width; i++){
      const square = document.createElement("div");
      square.innerHTML = 0;
      grid.appendChild(square);
      squares.push(square);
    }
    generate();
    generate();
  }

  createBoard();

  //generate number 2 at a random square containing 0
  function generate(){
    let randomNumber = Math.floor(Math.random()*squares.length);
    if(squares[randomNumber].innerHTML == 0) {
      squares[randomNumber].innerHTML = 2;
      gameOver();
    }
    else{
      generate();
    }
  }


  //move right
  function moveRight(){
    for(let i=0; i<width*width; i++) {
      if(i % width === 0){ //0, 4, 8, 12 (first square of each row only)
        let first = squares[i].innerHTML;
        let second = squares[i+1].innerHTML;
        let third = squares[i+2].innerHTML;
        let fourth = squares[i+3].innerHTML;
        let thisRow = [parseInt(first), parseInt(second), parseInt(third), parseInt(fourth)];
        let thisRowFiltered = thisRow.filter(num => num); //this will return only non-zero elements from thisRow and store them in thisRowFiltered
        let numberOfZeroes = width - thisRowFiltered.length; //number of zeroes in the row
        let zeroesArray = Array(numberOfZeroes).fill(0); //Array(zeroes) makes an array of length 'numberOfZeroes' and then we fill it with the number 0
        let newRow = zeroesArray.concat(thisRowFiltered); //new array with all zeroes at the beginning
        squares[i].innerHTML = newRow[0];
        squares[i+1].innerHTML = newRow[1];
        squares[i+2].innerHTML = newRow[2];
        squares[i+3].innerHTML = newRow[3];
      }
    }
  }

  //move left
  function moveLeft(){
    for(let i=0; i<width*width; i++) {
      if(i % width === 0){ //0, 4, 8, 12 (first square of each row only)
        let first = squares[i].innerHTML;
        let second = squares[i+1].innerHTML;
        let third = squares[i+2].innerHTML;
        let fourth = squares[i+3].innerHTML;
        let thisRow = [parseInt(first), parseInt(second), parseInt(third), parseInt(fourth)];
        let thisRowFiltered = thisRow.filter(num => num); //this will return only non-zero elements from thisRow and store them in thisRowFiltered
        let numberOfZeroes = width - thisRowFiltered.length; //number of zeroes in the row
        let zeroesArray = Array(numberOfZeroes).fill(0); //Array(zeroes) makes an array of length 'numberOfZeroes' and then we fill it with the number 0
        let newRow = thisRowFiltered.concat(zeroesArray); //new array with all zeroes at the end
        squares[i].innerHTML = newRow[0];
        squares[i+1].innerHTML = newRow[1];
        squares[i+2].innerHTML = newRow[2];
        squares[i+3].innerHTML = newRow[3];
      }
    }
  }

  //move down
  function moveDown(){
    for(let i=0; i<width; i++) {
        let first = squares[i].innerHTML;
        let second = squares[i+width].innerHTML;
        let third = squares[i+2*width].innerHTML;
        let fourth = squares[i+3*width].innerHTML;
        let thisColumn = [parseInt(first), parseInt(second), parseInt(third), parseInt(fourth)];
        let thisColumnFiltered = thisColumn.filter(num => num); //this will return only non-zero elements from thisColumn and store them in thisColumnFiltered
        let numberOfZeroes = width - thisColumnFiltered.length; //number of zeroes in the column
        let zeroesArray = Array(numberOfZeroes).fill(0); //Array(zeroes) makes an array of length 'numberOfZeroes' and then we fill it with the number 0
        let newColumn = zeroesArray.concat(thisColumnFiltered);
        squares[i].innerHTML = newColumn[0];
        squares[i+width].innerHTML = newColumn[1];
        squares[i+2*width].innerHTML = newColumn[2];
        squares[i+3*width].innerHTML = newColumn[3];
    }
  }

  //move up
  function moveUp(){
    for(let i=0; i<width; i++) {
        let first = squares[i].innerHTML;
        let second = squares[i+width].innerHTML;
        let third = squares[i+2*width].innerHTML;
        let fourth = squares[i+3*width].innerHTML;
        let thisColumn = [parseInt(first), parseInt(second), parseInt(third), parseInt(fourth)];
        let thisColumnFiltered = thisColumn.filter(num => num); //this will return only non-zero elements from thisColumn and store them in thisColumnFiltered
        let numberOfZeroes = width - thisColumnFiltered.length; //number of zeroes in the column
        let zeroesArray = Array(numberOfZeroes).fill(0); //Array(zeroes) makes an array of length 'numberOfZeroes' and then we fill it with the number 0
        let newColumn = thisColumnFiltered.concat(zeroesArray);
        squares[i].innerHTML = newColumn[0];
        squares[i+width].innerHTML = newColumn[1];
        squares[i+2*width].innerHTML = newColumn[2];
        squares[i+3*width].innerHTML = newColumn[3];
    }
  }

  function combineRow(){
    for(let i=0; i<width*width-1; i++){
      if(squares[i].innerHTML === squares[i+1].innerHTML) {
        let combinedTotal = parseInt(squares[i+1].innerHTML) + parseInt(squares[i].innerHTML);
        squares[i].innerHTML = 0;
        squares[i+1].innerHTML = combinedTotal;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
        if(score>highscore) {
          highscore = score;
        }
        highScoreDisplay.innerHTML = highscore;
      }
    }
    checkForWin();
  }

  function combineColumn(){
    for(let i=0; i<12; i++){
      if(squares[i].innerHTML === squares[i+width].innerHTML) {
        let combinedTotal = parseInt(squares[i+width].innerHTML) + parseInt(squares[i].innerHTML);
        squares[i].innerHTML = 0;
        squares[i+width].innerHTML = combinedTotal;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
        if(score>highscore) {
          highscore = score;
        }
        highScoreDisplay.innerHTML = highscore;
      }
    }
    checkForWin();
  }

  //keypress functions
  document.addEventListener("keyup", gameplayControls);

  function gameplayControls(event){
    if(event.keyCode === 39){
      moveRight();
      combineRow();
      moveRight();
      generate();
    }
    else if(event.keyCode === 37){
      moveLeft();
      combineRow();
      moveLeft();
      generate();
    }
    else if(event.keyCode === 40){
      moveDown();
      combineColumn();
      moveDown();
      generate();
    }
    else if(event.keyCode === 38){
      moveUp();
      combineColumn();
      moveUp();
      generate();
    }
  }


  //check for win
  function checkForWin(){
    squares.forEach((item, i) => {
      if(item.innerHTML == 2048){
        resultDisplay.innerHTML = "YOU WON!";
        localStorage.setItem('highscore', highscore);
        document.removeEventListener("keyup", gameplayControls);
        clearInterval(colorsInterval);
        addColors();
      }
    });
  }

  //check for gameOver
  function gameOver(){
    let zeroes = 0;
    squares.forEach((item, i) => {
      if(item.innerHTML == 0) {
        zeroes++;
      }
    });
    if(zeroes === 0){
      resultDisplay.innerHTML = "GAME OVER";
      localStorage.setItem('highscore', highscore);
      document.removeEventListener("keyup", gameplayControls);
      clearInterval(colorsInterval);
      addColors();
    }
  }

  //add colors
  function addColors() {
    for (let i=0; i<squares.length; i++) {
      if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#afa192'
      else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = '#eee4da'
      else if (squares[i].innerHTML  == 4) squares[i].style.backgroundColor = '#ede0c8'
      else if (squares[i].innerHTML  == 8) squares[i].style.backgroundColor = '#f2b179'
      else if (squares[i].innerHTML  == 16) squares[i].style.backgroundColor = '#ffcea4'
      else if (squares[i].innerHTML  == 32) squares[i].style.backgroundColor = '#e8c064'
      else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = '#ffab6e'
      else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = '#fd9982'
      else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = '#ead79c'
      else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor = '#76daff'
      else if (squares[i].innerHTML == 1024) squares[i].style.backgroundColor = '#beeaa5'
      else if (squares[i].innerHTML == 2048) squares[i].style.backgroundColor = '#d7d4f0'
    }
  }
  addColors()

  var colorsInterval = setInterval(addColors, 50)

});
