const gameBoard = document.querySelector('.game-board');

let clickCounter = 0;


gameBoard.addEventListener("click", function(evt) {

  if(clickCounter <= 1) {
    let triggerParent = evt.target.parentElement;

    if(triggerParent.className == 'game-pieces') {
      triggerParent.classList.toggle('flipped');
      console.log("Inicio-" + clickCounter);
      clickCounter ++;
      console.log("Resultado-" + clickCounter);
    }
  }
  if(clickCounter === 2) {
    clickCounter = 5;
    let flippedCards = document.querySelectorAll('.game-pieces.flipped:not(.guessed)');
    setTimeout(function (){
      flippedCards.forEach(function(currentValue) {
        currentValue.className = "game-pieces";
      });
      clickCounter = 0;
      console.log("Final-" + clickCounter);
    }, 1200);
  }
});
