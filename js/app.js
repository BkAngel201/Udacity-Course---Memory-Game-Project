//******************************//
//*                            *//
//*    Variable Declaration    *//
//*                            *//
//******************************//

//The whole gameBoard
const gameBoard = document.querySelector('.game-board');
//the click counter variable
let clickCounter = 0;
//cardFigures array contain figure and order pairs
const cardFigures = [
  [1, "anchor"],
  [2, "anchor"],
  [3, "crow"],
  [4, "crow"],
  [5, "bomb"],
  [6, "bomb"],
  [7, "gem"],
  [8, "gem"],
  [9, "fighter-jet"],
  [10, "fighter-jet"],
  [11, "key"],
  [12, "key"],
  [13, "gamepad"],
  [14, "gamepad"],
  [15, "balance-scale"],
  [16, "balance-scale"]
];


//******************************//
//*                            *//
//*    Function Declaration    *//
//*                            *//
//******************************//

function refreshGameBoard(evt) {
  const codeFragment = document.createDocumentFragment();
  cardFigures.sort(function(a, b){return 0.5 - Math.random()});
  for (var i = 0; i < cardFigures.length; i++) {
    const newElement = document.createElement('div');
    newElement.setAttribute("class", "game-pieces-container");
    newElement.innerHTML = `
      <div class="game-pieces" style="order: ${cardFigures[i][0]}" data-piece="${cardFigures[i][1]}">
        <div class="piece-front">
        </div>
        <div class="piece-back">
            <i class="fas fa-${cardFigures[i][1]} fa-4x"></i>
        </div>
      </div>`;
    codeFragment.appendChild(newElement);
  }
  gameBoard.innerHTML = "";
  gameBoard.appendChild(codeFragment);
}

//******************************//
//*                            *//
//*          Listeners         *//
//*                            *//
//******************************//

// TODO: call for first time the refreshGameBoard function to fill the game board with the game-pieces
document.addEventListener("DOMContentLoaded", refreshGameBoard);

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
