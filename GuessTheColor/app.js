var colors = generateRandomColors(6);
var squares = document.querySelectorAll(".square");
var targetColor = colors[Math.floor(Math.random()*colors.length)];
var colorDisplay = document.getElementById("colorDisplay");
colorDisplay.textContent = targetColor;
var message = document.getElementById("message");
var title = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var easyButton = document.getElementById("easybtn");
var hardButton = document.getElementById("hardbtn");

for(var i=0; i<squares.length; i++) {
  //load initial colors
  squares[i].style.backgroundColor = colors[i];
  //add click listeners to squares
  squares[i].addEventListener("click", function(){
    if(this.style.backgroundColor === targetColor) {
      //right
      message.textContent = "CORRECT!";
      for(var j=0; j<squares.length; j++) {
        squares[j].style.backgroundColor = targetColor;
      }
      title.style.backgroundColor = targetColor;
      resetButton.textContent = "PLAY AGAIN";
    }
    else {
      //wrong
      this.style.backgroundColor = "#232323";
      message.textContent = "TRY AGAIN!";
    }
  });
}

function generateRandomColors(num) {
  var arr = [];
  for(var i=0; i<num; i++) {
    arr[i] = randomRGB();
  }
  return arr;
}

function randomRGB() {
  var red = Math.floor(Math.random()*255+1);
  var green = Math.floor(Math.random()*255+1);
  var blue = Math.floor(Math.random()*255+1);
  return "rgb(" + red + ", " + green + ", " + blue + ")";
}

resetButton.addEventListener("click", function(){
  if(hardButton.classList.contains("selected")) { //check if on hard mode
    colors = generateRandomColors(6);
  }
  else { //else on easy mode
    colors = generateRandomColors(3);
  }
  targetColor = colors[Math.floor(Math.random()*colors.length)];
  colorDisplay.textContent = targetColor;
  for(var i=0; i<squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
  }
  title.style.backgroundColor = "#9CC0E7";
  message.textContent = "";
  this.textContent = "SHUFFLE";
});

easyButton.addEventListener("click", function(){
  easyButton.classList.add("selected");
  hardButton.classList.remove("selected");
  colors = generateRandomColors(3);
  targetColor = colors[Math.floor(Math.random()*colors.length)];
  colorDisplay.textContent = targetColor;
  for(var i=0; i<squares.length; i++) {
    if(i<colors.length) {
      squares[i].style.backgroundColor = colors[i];
    }
    else {
      squares[i].style.display = "none";
    }
  }
});

hardButton.addEventListener("click", function(){
  easyButton.classList.remove("selected");
  hardButton.classList.add("selected");
  colors = generateRandomColors(6);
  targetColor = colors[Math.floor(Math.random()*colors.length)];
  colorDisplay.textContent = targetColor;
  for(var i=0; i<squares.length; i++) {
      squares[i].style.backgroundColor = colors[i];
      squares[i].style.display = "block";
  }
});
