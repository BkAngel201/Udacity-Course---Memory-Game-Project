const gameBoard = document.querySelector('.game-board');

let clickCounter = 0;


gameBoard.addEventListener("click", function(evt) {
  let clickedCard;
  let triggerParent = evt.target.parentElement;
  if(triggerParent.className == "piece-back") {
    clickedCard = triggerParent.parentElement;
  } else {
    clickedCard = triggerParent;
  }
  if(clickedCard.className == 'game-pieces') {
    clickedCard.classList.toggle('flipped');
    clickCounter++;
  }

  if(clickCounter === 2) {
    clickCounter = 0;
    let flippedCards = document.querySelectorAll('.game-pieces.flipped:not(.guessed)');
    setInterval(function (){
      flippedCards.forEach(function(currentValue) {
        currentValue.className = "game-pieces";
      });
    }, 2000);
    console.log(flippedCards);
  }

});
