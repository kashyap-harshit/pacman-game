/* Developed by
          Mizanali Panjwani */

document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll("#grid div");
  const scoreDisplay = document.getElementById("score");
  const muteButton = document.getElementById("mute-btn");
  var width = 15;
  var currentShooterIndex = 202;
  var invaderStartingIndex = 0;
  var invadersShot = [];
  var score = 0;
  var direction = 1;
  var invaderIntervalId;

  //load audio
  const explosion = new Audio();
  explosion.src = "audio/explosion.wav";
  const invaderKilled = new Audio();
  invaderKilled.src = "audio/invaderkilled.wav";
  const shootAudio = new Audio();
  shootAudio.src = "audio/shoot.wav";
  const bgMusic = new Audio();
  bgMusic.src = "audio/spaceinvaders1.mpeg";
  bgMusic.play();

  //config mute button
  muteButton.addEventListener("click", function(){
    this.classList.toggle("selected");
    if(this.classList.contains("selected")) {
      bgMusic.pause();
    }
    else{
      bgMusic.play();
    }
    this.blur();
  });

  //draw invaders
  const invaderPositions = [0,1,2,3,4,5,6,7,8,9,15,16,17,18,19,20,21,22,23,24,30,31,32,33,34,35,36,37,38,39];
  invaderPositions.forEach((item, i) => {
    squares[invaderStartingIndex + item].classList.add("invader");
  });

  //draw shooter
  squares[currentShooterIndex].classList.add("shooter");

  //move shooter on arrow key press
  document.addEventListener("keydown", function(event){
    squares[currentShooterIndex].classList.remove("shooter");
    if(event.keyCode === 37 && currentShooterIndex>195){
      currentShooterIndex -= 1;
    }
    else if(event.keyCode === 39 && currentShooterIndex<209){
      currentShooterIndex += 1;
    }
    squares[currentShooterIndex].classList.add("shooter");
  });

  //move invaders
  function moveInvaders(){
    //create booleans denoting whether the invaders are touching either edges
    const isTouchingLeftEdge = invaderPositions[0] % width === 0;
    const isTouchingRightEdge = invaderPositions[invaderPositions.length - 1] % width === width - 1;
    if((isTouchingLeftEdge && direction === -1) || (isTouchingRightEdge && direction === 1)){ //if the invaders are moving either right or left and start touching either edge
      direction = width; //go down a row (15 squares ahead)
    }
    else if (direction === width) { //if already going down
      if (isTouchingLeftEdge){ //going down while touching left edge
        direction = 1; //go right
      }
      else { //going down while touching right edge
        direction = -1; //go left
      }
    }
    //erase all invaders
    invaderPositions.forEach((item, i) => {
      squares[item].classList.remove("invader");
    });
    //change invaderPositions array according to direction set above
    invaderPositions.forEach((item, i) => {
      invaderPositions[i] += direction;
    });
    //redraw invaders at new positions
    invaderPositions.forEach((item, i) => {
      if (!invadersShot.includes(i)){ //do not redraw shot down invaders
        squares[item].classList.add("invader");
      }
    });
    //check if game over
    //case 1: invaders have touched shooter
    if(squares[currentShooterIndex].classList.contains("invader", "shooter")) {
      squares[currentShooterIndex].classList.add("boom");
      explosion.play();
      scoreDisplay.innerHTML = "GAME OVER. SCORE: " + score;
      clearInterval(invaderIntervalId);
    }
    //case 2: invaders did not touch shooter but reached the last row
    invaderPositions.forEach((item, i) => {
      if(item > squares.length - width - 1) {
        scoreDisplay.innerHTML = "GAME OVER. SCORE: " + score;
        clearInterval(invaderIntervalId);
      }
    });
    //check victory
    if(invadersShot.length === invaderPositions.length) {
      scoreDisplay.innerHTML = "YOU WIN! SCORE: " + score;
      clearInterval(invaderIntervalId);
    }
  }

  //call moveInvaders function every 500ms
  invaderIntervalId = setInterval(moveInvaders, 500);

  //shoot laser
  function shoot(){
    var laserIntervalId;
    var currentLaserIndex = currentShooterIndex;
    //move laser upwards from shooter
    function moveLaser(){
      squares[currentLaserIndex].classList.remove("laser");
      currentLaserIndex -= 15; //move laser one row up
      squares[currentLaserIndex].classList.add("laser");
      //check if laser reached invader
      if(squares[currentLaserIndex].classList.contains("invader")){
        squares[currentLaserIndex].classList.remove("invader");
        squares[currentLaserIndex].classList.remove("laser");
        squares[currentLaserIndex].classList.add("boom");
        invaderKilled.play();
        //remove boom after 250ms
        setTimeout(function(){
          squares[currentLaserIndex].classList.remove("boom");
        }, 130);
        clearInterval(laserIntervalId);
        invadersShot.push(invaderPositions.indexOf(currentLaserIndex)); //add the invader present at square number 'currentLaserIndex' to invadersShot array
        score++;
        scoreDisplay.innerHTML = "SCORE: " + score;
      }
      //remove laser if reaches first row
      if(currentLaserIndex<width) {
        clearInterval(laserIntervalId);
        squares[currentLaserIndex].classList.remove("laser");
      }
    }
    //call moveLaser function every 100ms
    laserIntervalId = setInterval(moveLaser, 100);
  }

  //call shoot function if spacebar pressed
  document.addEventListener("keydown", function(event) {
    if(event.keyCode === 32) {
      shootAudio.play();
      shoot();
    }
  });
});
