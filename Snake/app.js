/* Developed by
          Mizanali Panjwani */

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//create unit
const square = 32;

//load images
const board = new Image();
board.src = "img/board.png";
const foodImg = new Image();
foodImg.src = "img/food.png";

//load audio
const upAudio = new Audio();
upAudio.src = "audio/up.mp3";
const leftAudio = new Audio();
leftAudio.src = "audio/left.mp3";
const downAudio = new Audio();
downAudio.src = "audio/down.mp3";
const rightAudio = new Audio();
rightAudio.src = "audio/right.mp3";
const deadAudio = new Audio();
deadAudio.src = "audio/dead.mp3";
const eatAudio = new Audio();
eatAudio.src = "audio/eat.mp3";

//create snake array with fixed starting position
//the array is of objects holding an x and a y co-ordinate
let snake = [];
snake[0] = {
  x: 9*square,
  y: 10*square
};

//randomize position of food
let foodPos = {
  x: Math.floor(Math.random()*17+1) * square,
  y: Math.floor(Math.random()*15+3) * square
};

let score = 0;

//control snake
let dir;
document.addEventListener("keydown", function(event){
  if(event.keyCode == 68 && dir!="left"){ //right
    rightAudio.play();
    dir = "right";
  }
  else if(event.keyCode == 65 && dir!="right"){ //left
    leftAudio.play();
    dir = "left";
  }
  else if(event.keyCode == 87 && dir!="down"){ //up
    upAudio.play();
    dir = "up";
  }
  else if(event.keyCode == 83 && dir!="up"){ //down
    downAudio.play();
    dir = "down";
  }
});

//check collision between snake's head and body
function collision(head, snakeArr){
  for (var i = 1; i < snakeArr.length; i++) {
    if(head.x === snakeArr[i].x  && head.y === snakeArr[i].y){
      return true;
    }
  }
  return false;
}

//draw everything on canvas
function draw(){
  //draw board at (0,0)
  ctx.drawImage(board, 0, 0);

  //iterate through snake array and draw the snake's body
  snake.forEach((item, i) => {
    if(i===0) {
      ctx.fillStyle = "green";
    }
    else {
      ctx.fillStyle = "white";
    }
    ctx.fillRect(item.x, item.y, square, square);
    ctx.strokeStyle = "red";
    ctx.strokeRect(item.x, item.y, square, square);
  });

  //draw food at randomized position
  ctx.drawImage(foodImg, foodPos.x, foodPos.y);

  //old head position
  let snakeHeadX = snake[0].x;
  let snakeHeadY = snake[0].y;

  //check direction in which snake is going and add one square unit to old head
  if(dir == "right"){
    snakeHeadX += square;
  }
  else if(dir == "left"){
    snakeHeadX -= square;
  }
  else if(dir == "up"){
    snakeHeadY -= square;
  }
  else if(dir == "down"){
    snakeHeadY += square;
  }

  //check if snake eats food
  if(snakeHeadX === foodPos.x && snakeHeadY === foodPos.y){
    //increase score and keep the tail
    eatAudio.play();
    score++;
    foodPos = {
      x: Math.floor(Math.random()*17+1) * square,
      y: Math.floor(Math.random()*15+3) * square
    };
  }
  else{
    //remove the tail
    snake.pop();
  }

  //add new head to incremented head position
  let newHead = {
    x: snakeHeadX,
    y: snakeHeadY
  };
  snake.unshift(newHead);

  //gameover
  if(snakeHeadX<square || snakeHeadX>17*square || snakeHeadY<3*square || snakeHeadY>17*square || collision(newHead, snake)){
    deadAudio.play();
    clearInterval(game);
  }

  //draw score
  ctx.fillStyle = "white";
  ctx.font = "45px verdana";
  ctx.fillText(score, 2*square, 1.6*square);
}

//call draw function every 100 ms
let game = setInterval(draw, 100);
