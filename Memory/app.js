document.addEventListener("DOMContentLoaded", function(){
  const grid = document.querySelector("#grid");
  var cardsChosen = [];
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

  //check for matches
  function checkForMatch(){
    var cards = document.querySelectorAll("img"); //all loaded cards
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
    if(optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'img/youtubelogo.png');
      cards[optionTwoId].setAttribute('src', 'img/youtubelogo.png');
    }
    else if(cardsChosen[0] === cardsChosen[1]){
      cards[optionOneId].removeEventListener('click', flipCard);
      cards[optionTwoId].removeEventListener('click', flipCard);
      cardsWon.push(cardsChosen);
    }
    else {
      cards[optionOneId].setAttribute('src', "img/youtubelogo.png");
      cards[optionTwoId].setAttribute('src', "img/youtubelogo.png");
    }
    cardsChosen = [];
    cardsChosenId = [];
    scoreDisplay.textContent = cardsWon.length;
    if(cardsWon.length === cardsArray.length/2){
      alert("YOU WON!");
    }
  }

  //flip card
  function flipCard(){
    var cardId = this.getAttribute("data-id");
    cardsChosen.push(cardsArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute("src", cardsArray[cardId].img);
    if(cardsChosen.length  === 2){
      setTimeout(checkForMatch, 300);
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
