//******************************//
//*                            *//
//*    Variable Declaration    *//
//*                            *//
//******************************//

//The whole gameBoard
const gameBoard = document.querySelector('.game-board');
//the click counter variable
let clickCounter = 0;


//******************************//
//*                            *//
//*          Listeners         *//
//*                            *//
//******************************//

// TODO: wait for click event on the GameBoard element and then flip the target card
gameBoard.addEventListener("click", function(evt) {
  //just flip a card if there are 0 or 1 card flipped
  if(clickCounter <= 1) {
    //save the parent element of the target to work with it
    let triggerParent = evt.target.parentElement;
    //if the parentElement class name is 'game-pieces', this means that card is not flipped yet
    if(triggerParent.className == 'game-pieces') {
      //fliped the parentElement of the target card and add 1 to the click variable cause there was 1 succesful click
      triggerParent.classList.toggle('flipped');
      clickCounter ++;
    }
  }
  // if clickCounter == 2 we need to hide the flipped cards since no match was found
  if(clickCounter === 2) {
    //set clickCounter to 5 to prevent any action when wait complete the setTimeout function
    clickCounter = 5;
    //look for all flipped not guessed cards and hide them changging the class of the element with a delay
    let flippedCards = document.querySelectorAll('.game-pieces.flipped:not(.guessed)');
    setTimeout(function (){
      flippedCards.forEach(function(currentValue) {
        currentValue.className = "game-pieces";
      });
      clickCounter = 0;
    }, 1200);
  }
});
