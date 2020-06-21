/* Developed by
          Mizanali Panjwani */

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById("grid");
  const width = 8;
  const squares = [];
  const candyColors = ['url(img/candies/red-candy.png)',
                       'url(img/candies/yellow-candy.png)',
                       'url(img/candies/orange-candy.png)',
                       'url(img/candies/purple-candy.png)',
                       'url(img/candies/green-candy.png)',
                       'url(img/candies/blue-candy.png)'];
  let score = 0;
  const scoreDisplay = document.getElementById("score");
  let movesRemaining = 30;
  const movesDisplay = document.getElementById("moves");

  //load audio
  const deliciousSound = new Audio();
  deliciousSound.src = "audio/delicious.wav";
  const divineSound = new Audio();
  divineSound.src = "audio/divine.wav";
  const sweetSound = new Audio();
  sweetSound.src = "audio/sweet.wav";
  const tastySound = new Audio();
  tastySound.src = "audio/tasty.wav";
  const negativeSwitchSound = new Audio();
  negativeSwitchSound.src = "audio/negative_switch_sound1.wav";
  const gameOverSound = new Audio();
  gameOverSound.src = "audio/level_failed1.wav";
  const threeSound = new Audio();
  threeSound.src = "audio/three.wav";
  const fourSound = new Audio();
  fourSound.src = "audio/four.wav";
  const fiveSound = new Audio();
  fiveSound.src = "audio/five.wav";
  const allAboardSound = new Audio();
  allAboardSound.src = "audio/all_aboard1.wav";
  const dialogueSounds = [deliciousSound, divineSound, sweetSound, tastySound];

  //create board and add squares in it
  function createBoard() {
    for(let i=0; i<64; i++){
      const square = document.createElement("div");
      let randomColor = Math.floor(Math.random()*candyColors.length);
      square.style.backgroundImage = candyColors[randomColor];
      square.setAttribute("draggable", true);
      square.setAttribute("id", i);
      grid.appendChild(square);
      squares.push(square);
    }
    allAboardSound.play();
  }

  createBoard();

  //add drag functions to candies
  squares.forEach(square => square.addEventListener('dragstart', dragStart))
  squares.forEach(square => square.addEventListener('dragend', dragEnd))
  squares.forEach(square => square.addEventListener('dragover', dragOver))
  squares.forEach(square => square.addEventListener('dragenter', dragEnter))
  squares.forEach(square => square.addEventListener('drageleave', dragLeave))
  squares.forEach(square => square.addEventListener('drop', dragDrop))

  //keep candies falling to the bottom
  function gravitateCandies(){
    for(let i=0; i<55; i++) {
      if(squares[i+width].style.backgroundImage === ""){
        squares[i+width].style.backgroundImage = squares[i].style.backgroundImage;
        squares[i].style.backgroundImage = "";
      }
    }
  }

  let colorBeingDragged;
  let idBeingDragged;
  let colorBeingReplaced;
  let idBeingReplaced;

  function dragStart(){
    colorBeingDragged = this.style.backgroundImage;
    idBeingDragged = parseInt(this.id);
  }
  function dragOver(event){
    event.preventDefault();
  }
  function dragEnter(event){
    event.preventDefault();
  }
  function dragLeave(){
  }
  function dragDrop(){
    //swap the candies
    colorBeingReplaced = this.style.backgroundImage;
    idBeingReplaced = parseInt(this.id);
    squares[idBeingDragged].style.backgroundImage = colorBeingReplaced;
    squares[idBeingReplaced].style.backgroundImage = colorBeingDragged;
  }
  function dragEnd(){
    let validMoves = [idBeingDragged-1, idBeingDragged+1, idBeingDragged-width, idBeingReplaced+width];
    let validMove = validMoves.includes(idBeingReplaced);
    //check if candies swapped was valid
    if(idBeingReplaced && validMove){
      let scoredRowOfFive = checkRowForFive();
      let scoredColumnOfFive = checkColumnForFive();
      let scoredRowOfFour = checkRowForFour();
      let scoredColumnOfFour = checkColumnForFour();
      let scoredRowOfThree = checkRowForThree();
      let scoredColumnOfThree = checkColumnForThree();
      //check if any combo was scored
      if(scoredRowOfFive || scoredColumnOfFive || scoredRowOfFour || scoredColumnOfFour || scoredRowOfThree || scoredColumnOfThree){
        idBeingReplaced = null;
        const randomDialogueSound = dialogueSounds[Math.floor(Math.random() * dialogueSounds.length)];
        randomDialogueSound.play();
        movesRemaining--;
        movesDisplay.innerHTML = movesRemaining;
        if(movesRemaining === 0){
          gameOverSound.play();
          grid.style.pointerEvents = "none";
        }
      }
      //if no combo scored swap back to original candies
      else if(!scoredRowOfFive && !scoredColumnOfFive && !scoredRowOfFour && !scoredColumnOfFour && !scoredRowOfThree && !scoredColumnOfThree){
        negativeSwitchSound.play();
        squares[idBeingDragged].style.backgroundImage = colorBeingDragged;
        squares[idBeingReplaced].style.backgroundImage = colorBeingReplaced;
      }
    }
    //if move not valid swap back to original candies
    else if(idBeingReplaced && !validMove){
      squares[idBeingDragged].style.backgroundImage = colorBeingDragged;
      squares[idBeingReplaced].style.backgroundImage = colorBeingReplaced;
    }
    else{
      squares[idBeingDragged].style.backgroundImage = colorBeingDragged;
    }
  }

  //checking for matches
  //row of five
  function checkRowForFive(){
    for(let i=0; i<59; i++) {
      let rowOfFive = [i, i+1, i+2, i+3, i+4];
      let firstColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";
      const notValid = [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55];
      if(notValid.includes(i)) {
        continue;
      }
      if(rowOfFive.every(function(item){return(squares[item].style.backgroundImage === firstColor && !isBlank)})) {
        score += 5;
        fiveSound.play();
        scoreDisplay.innerHTML = score;
        rowOfFive.forEach((item, i) => {
          squares[item].style.backgroundImage = "";
        });
        return true;
      }
    }
    return false;
  }
  //column of five
  function checkColumnForFive(){
    for(let i=0; i<31; i++) {
      let columnOfFive = [i, i+width, i+2*width, i+3*width, i+4*width];
      let firstColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";
      if(columnOfFive.every(function(item){return(squares[item].style.backgroundImage === firstColor && !isBlank)})) {
        score += 5;
        fiveSound.play();
        scoreDisplay.innerHTML = score;
        columnOfFive.forEach((item, i) => {
          squares[item].style.backgroundImage = "";
        });
        return true;
      }
    }
    return false;
  }
  //row of four
  function checkRowForFour(){
    for(let i=0; i<60; i++) {
      let rowOfFour = [i, i+1, i+2, i+3];
      let firstColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55];
      if(notValid.includes(i)) {
        continue;
      }
      if(rowOfFour.every(function(item){return(squares[item].style.backgroundImage === firstColor && !isBlank)})) {
        score += 4;
        fourSound.play();
        scoreDisplay.innerHTML = score;
        rowOfFour.forEach((item, i) => {
          squares[item].style.backgroundImage = "";
        });
        return true;
      }
    }
    return false;
  }
  //column of four
  function checkColumnForFour(){
    for(let i=0; i<39; i++) {
      let columnOfFour = [i, i+width, i+2*width, i+3*width];
      let firstColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";
      if(columnOfFour.every(function(item){return(squares[item].style.backgroundImage === firstColor && !isBlank)})) {
        score += 4;
        fourSound.play();
        scoreDisplay.innerHTML = score;
        columnOfFour.forEach((item, i) => {
          squares[item].style.backgroundImage = "";
        });
        return true;
      }
    }
    return false;
  }
  //row of three
  function checkRowForThree(){
    for(let i=0; i<61; i++) {
      let rowOfThree = [i, i+1, i+2];
      let firstColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
      if(notValid.includes(i)) {
        continue;
      }
      if(rowOfThree.every(function(item){return(squares[item].style.backgroundImage === firstColor && !isBlank)})) {
        score += 3;
        threeSound.play();
        scoreDisplay.innerHTML = score;
        rowOfThree.forEach((item, i) => {
          squares[item].style.backgroundImage = "";
        });
        return true;
      }
    }
    return false;
  }
  //column of three
  function checkColumnForThree(){
    for(let i=0; i<47; i++) {
      let columnOfThree = [i, i+width, i+2*width];
      let firstColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";
      if(columnOfThree.every(function(item){return(squares[item].style.backgroundImage === firstColor && !isBlank)})) {
        score += 3;
        threeSound.play();
        scoreDisplay.innerHTML = score;
        columnOfThree.forEach((item, i) => {
          squares[item].style.backgroundImage = "";
        });
        return true;
      }
    }
    return false;
  }

  window.setInterval(function(){
    for(let i=0; i<8; i++){
      if(squares[i].style.backgroundImage === ""){
        let randomColor = Math.floor(Math.random()*candyColors.length);
        squares[i].style.backgroundImage = candyColors[randomColor];
      }
    }
    gravitateCandies();
    checkRowForFive();
    checkColumnForFive();
    checkRowForFour();
    checkColumnForFour();
    checkRowForThree();
    checkColumnForThree();
  }, 100);
  
});
