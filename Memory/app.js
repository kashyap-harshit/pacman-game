/* Developed by
          Mizanali Panjwani */
          
document.addEventListener("DOMContentLoaded", function(){
  const grid = document.querySelector("#grid");
  var cardsChosenName = [];
  var cardsChosenId = [];
  var cardsWon = [];
  const scoreDisplay = document.getElementById("score");
  var timeLeft = 30;
  var timer = document.getElementById('timer');
  var timerId = setInterval(countdown, 1000);
  const cardsArray = [
    {
      name: "loganpaul",
      img: "img/loganpaul.jpg"
    },
    {
      name: "jakepaul",
      img: "img/jakepaul.jpg"
    },
    {
      name: "keemstar",
      img: "img/keemstar.jpg"
    },
    {
      name: "jack",
      img: "img/jack.jpg"
    },
    {
      name: "lillysingh",
      img: "img/lillysingh.jpg"
    },
    {
      name: "caseyneistat",
      img: "img/caseyneistat.png"
    },
    {
      name: "mrbeast",
      img: "img/mrbeast.jpg"
    },
    {
      name: "mkbhd",
      img: "img/mkbhd.jpg"
    },
    {
      name: "loganpaul",
      img: "img/loganpaul.jpg"
    },
    {
      name: "jakepaul",
      img: "img/jakepaul.jpg"
    },
    {
      name: "keemstar",
      img: "img/keemstar.jpg"
    },
    {
      name: "jack",
      img: "img/jack.jpg"
    },
    {
      name: "lillysingh",
      img: "img/lillysingh.jpg"
    },
    {
      name: "caseyneistat",
      img: "img/caseyneistat.png"
    },
    {
      name: "mrbeast",
      img: "img/mrbeast.jpg"
    },
    {
      name: "mkbhd",
      img: "img/mkbhd.jpg"
    }
  ];

  //shuffle our cardsArray
  cardsArray.sort(function() {
    return .5 - Math.random();
  });

  //create grid
  function createBoard(){
    cardsArray.forEach((item, i) => {
      var card = document.createElement("img");
      card.setAttribute("src", "img/youtubelogo.png");
      card.setAttribute("data-id", i);
      card.addEventListener("click", flipCard);
      grid.appendChild(card);
    });
  }

  //flip card
  function flipCard(){
    var cardId = this.getAttribute("data-id");
    cardsChosenName.push(cardsArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute("src", cardsArray[cardId].img);
    if(cardsChosenName.length  === 2){
      setTimeout(checkForMatch, 300);
    }
  }

  //check for matches
  function checkForMatch(){
    var cards = document.querySelectorAll("img"); //all loaded cards on the grid
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
    if(optionOneId === optionTwoId) {
      //same card clicked
      cards[optionOneId].setAttribute('src', 'img/youtubelogo.png');
      cards[optionTwoId].setAttribute('src', 'img/youtubelogo.png');
    }
    else if(cardsChosenName[0] === cardsChosenName[1]){
      //match found
      cards[optionOneId].removeEventListener('click', flipCard);
      cards[optionTwoId].removeEventListener('click', flipCard);
      cardsWon.push(cardsChosenName);
    }
    else {
      //wrong
      cards[optionOneId].setAttribute('src', "img/youtubelogo.png");
      cards[optionTwoId].setAttribute('src', "img/youtubelogo.png");
    }
    //reset arrays after checking match
    cardsChosenName = [];
    cardsChosenId = [];
    scoreDisplay.textContent = cardsWon.length;
    if(cardsWon.length === cardsArray.length/2){
      //game won
      alert("Hooray! YOU WON!");
      window.location.reload();
    }
  }

  createBoard();

  function countdown() {
    if (timeLeft == 0) {
      clearTimeout(timerId);
      timer.innerHTML = 0 + ' seconds remaining';
      alert("GAME OVER! Your score : " + scoreDisplay.textContent);
      window.location.reload();
    }
    else {
      timer.innerHTML = timeLeft + ' seconds remaining';
      timeLeft--;
    }
  }

});
