//******************************//
//*                            *//
//*    Variable Declaration    *//
//*                            *//
//******************************//

//The whole gameBoard
const gameBoard = document.querySelector('.game-board');
//the element who will contain the time counter
const timerCounterElement = document.getElementById("timerCounter");
//the element who will store all the moves in the actual game
const moveCounterElement = document.getElementById("moveContainer");
//the element who will store the stars for the rating
const starsRatingElement = document.getElementById("starsRating");
//the modal element that will popup when the game is finished
const modalWinnerElement = document.getElementById("modalWinner");
//the modal element that will popup to show the leaderboard
const modalLeaderboardElement = document.getElementById("modalLeaderboard");
//this element will close the leader board modal
const leaderboardCloseButtonElement = document.getElementById("leaderboardCloseButton");
//this element allows the user start new game from the winning modal
const resetGameButtonElement = document.getElementById("resetGameButton");
//this element allows the user start new game from the winning modal
const resetInGameButtonElement = document.getElementById("resetInGameButton");
//this element allows the user see the leaderboard
const leaderboardButtonElement = document.getElementById("leaderboardButton");

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


// the click counter for the actual gamepad
let completeMovesCounter = 0;
//the click counter variable in the aactual search
let clickCounter = 0;

//previousCardFlipped store the data-piece value from the first card flipped in the actual search
let previousCardFlipped = "";
//guessedCorreclty store the amount of pairs guessed
let guessedCorreclty = 0;

//timerCounter will store the interval function who will run when the game is on
let timerCounter;
//Timer variable who store seconds and minutes
let timerSeconds = 0;
let timerMinutes = 0;



//******************************//
//*                            *//
//*        Game Options        *//
//*                            *//
//******************************//

//the moves needed to get the stars
let threeStars = 16;
let twoStars = 30;


//******************************//
//*                            *//
//*    Function Declaration    *//
//*                            *//
//******************************//

function leaderboardHTMLUpdate(leaderboardData) {
  //innerHTML will store all the HTML structure for the leaderboard table
  let innerHTML = "";
  for (let currentKeyValue in leaderboardData) {
    //depending on what key itis, is the amount of stars it show
    if (currentKeyValue === "threeStars") {
      innerHTML += `<i class="fas fa-star fa-2x" id="firstStar"></i><i class="fas fa-star fa-2x" id="secondStar"></i><i class="fas fa-star fa-2x" id="thirdStar"></i>`;
    } else if (currentKeyValue === "twoStars") {
      innerHTML += `<i class="fas fa-star fa-2x" id="firstStar"></i><i class="fas fa-star fa-2x" id="secondStar"></i><i class="far fa-star fa-2x" id="thirdStar"></i>`;
    } else {
      innerHTML += `<i class="fas fa-star fa-2x" id="firstStar"></i><i class="far fa-star fa-2x" id="secondStar"></i><i class="far fa-star fa-2x" id="thirdStar"></i>`;
    }
    //adding header of the list
    innerHTML += `
    <div class="score-rating-header">
      <div class="name-column">
        Player Name
      </div>
      <div class="time-column">
        Player Time
      </div>
    </div>
    <div class="score-rating-body">`;
    //adding the value of the list
    leaderboardData[currentKeyValue].forEach(function(currentValueInside) {
      innerHTML += `<div class="player-row">
        <div class="name-column">
          ${currentValueInside[0]}
        </div>
        <div class="time-column">
          ${currentValueInside[1]}
        </div>
      </div>`;
    });
      innerHTML += `</div>`;
  }
  //printing the HTML on innerHTML to the element
  modalLeaderboardElement.querySelector(".list-container").innerHTML = innerHTML;
  //save the content of the new JSON for the leaderboard Data
  localStorage.setItem("leaderboardData", JSON.stringify(leaderboardData));
  //Showing the modal with the leaderboard
  modalLeaderboardElement.classList.add("active");
}

function leaderboardCheck() {
  let leaderboardGlobalScore;
  //if not data is store in localstorabe then the variable leaderboardData will get an initial set of value
  if(localStorage.getItem("leaderboardData") === null) {
    leaderboardGlobalScore = {
      threeStars : [
        ["--", "--:--"],
        ["--", "--:--"],
        ["--", "--:--"]
      ],
      twoStars : [
        ["--", "--:--"],
        ["--", "--:--"],
        ["--", "--:--"]
      ],
      oneStars :[
        ["--", "--:--"],
        ["--", "--:--"],
        ["--", "--:--"]
      ]
    };
    //teh info is on plain text since localStorage dont allow save objets, thats why we need convert the text to a json format
  } else {
    leaderboardGlobalScore = JSON.parse(localStorage.getItem("leaderboardData"));
  }
  //total time converterd to seconds
  let gameTotalTime = (timerMinutes * 60) + timerSeconds;
  //this variable will be true when the position of the new time is found to avoid unnesesary comparisons
  let found = false
  // person will store the name of the new record player
  let person;
  //there are three if one for every posibility, three two or one star and match it with it corresponding set of value
  if (completeMovesCounter <= threeStars) {
    //run through the array of values
    leaderboardGlobalScore.threeStars.forEach(function(currentValue, currentIndex, currentObject) {
      if (found === false) {
        if (currentValue[1] == "--:--") {
          person = prompt(`Your score is one of the best of our Leaderboard!!!!
What is the name for which you want to be known?`);
          found = true;
          //added the new value in the position of the actual set of value
          currentObject.splice(currentIndex, 0, [person, gameTotalTime]);
          //delete the last value of this set to just have 3 at the end
          leaderboardGlobalScore.threeStars.splice(-1,1);
        } else if (currentValue[1] >= gameTotalTime) {
          person = prompt(`Your score is one of the best of our Leaderboard!!!!
What is the name for which you want to be known?`);
          found = true;
          currentObject.splice(currentIndex, 0, [person, gameTotalTime]);
          //delete the last value of this set to just have 3 at the end
          leaderboardGlobalScore.threeStars.splice(-1,1);
        }
      }

    });
  } else if (completeMovesCounter <= twoStars) {
    leaderboardGlobalScore.twoStars.forEach(function(currentValue, currentIndex, currentObject) {
      if (found === false) {
        if (currentValue[1] == "--:--") {
          person = prompt(`Your score is one of the best of our Leaderboard!!!!
What is the name for which you want to be known?`);
          found = true;
          currentObject.splice(currentIndex, 0, [person, gameTotalTime]);
          leaderboardGlobalScore.twoStars.splice(-1,1);
        } else if (currentValue[1] >= gameTotalTime) {
          person = prompt(`Your score is one of the best of our Leaderboard!!!!
What is the name for which you want to be known?`);
          found = true;
          currentObject.splice(currentIndex, 0, [person, gameTotalTime]);
          leaderboardGlobalScore.twoStars.splice(-1,1);
        }
      }

    });
  } else {
    leaderboardGlobalScore.oneStars.forEach(function(currentValue, currentIndex, currentObject) {
      if (found === false) {
        if (currentValue[1] == "--:--") {
          person = prompt(`Your score is one of the best of our Leaderboard!!!!
What is the name for which you want to be known?`);
          found = true;
          currentObject.splice(currentIndex, 0, [person, gameTotalTime]);
          leaderboardGlobalScore.oneStars.splice(-1,1);
        } else if (currentValue[1] >= gameTotalTime) {
          person = prompt(`Your score is one of the best of our Leaderboard!!!!
What is the name for which you want to be known?`);
          found = true;
          currentObject.splice(currentIndex, 0, [person, gameTotalTime]);
          leaderboardGlobalScore.oneStars.splice(-1,1);
        }
      }

    });
  }
  //update the leaderboard with the new values after the reorder
  leaderboardHTMLUpdate(leaderboardGlobalScore);
}

function refreshGameBoard(evt) {
  //set the timeInterval to stop cause we need start a new one
  clearInterval(timerCounter);
  //crewate a documentFragment to store the html that will going in the board
  const codeFragment = document.createDocumentFragment();
  //sort randomly the order of the cards (idea from stackoverflow)
  cardFigures.sort(function(a, b){return 0.5 - Math.random()});
  //run through all the array and create all the cards
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
      //add every single card element to the document fragment
    codeFragment.appendChild(newElement);
  }
  //set all default HTML inside the Elements
  gameBoard.innerHTML = "";
  gameBoard.appendChild(codeFragment);
  starsRatingElement.innerHTML = `
  <i class="fas fa-star fa-2x" id="firstStar"></i>
  <i class="fas fa-star fa-2x" id="secondStar"></i>
  <i class="fas fa-star fa-2x" id="thirdStar"></i>`;

  timerCounterElement.textContent = "00:00";

  moveCounterElement.textContent = "moves: 0";

  modalWinnerElement.className = "modal";

  //set all the variables to initials values
  completeMovesCounter = 0;
  previousCardFlipped = "";
  guessedCorreclty = 0;
  clickCounter = 0;
  timerSeconds = 0;
  timerMinutes = 0;

  timerCounter = setInterval(function() {
    //if second are less than 58 seconds grow, but if are 59 then next second make minutes to grow and seconds to reset to 0,
    if(timerSeconds <= 58) {
      timerSeconds ++;
    } else {
      timerMinutes ++;
      timerSeconds = 0;
    }
    //print the mm:ss format of the actual time
    timerCounterElement.textContent = ("0" + timerMinutes).slice(-2) + ":" + ("0" + timerSeconds).slice(-2);
  }, 1000);
}

function starsRating() {
  completeMovesCounter ++;
  moveCounterElement.textContent = "Moves: " + completeMovesCounter;
   if(completeMovesCounter === twoStars + 1) {
    document.getElementById("secondStar").className = "far fa-star";
  } else if(completeMovesCounter === threeStars + 1) {
    document.getElementById("thirdStar").className = "far fa-star";
  }
}



//******************************//
//*                            *//
//*          Listeners         *//
//*                            *//
//******************************//

// TODO: call for first time the refreshGameBoard function to fill the game board with the game-pieces
document.addEventListener("DOMContentLoaded", refreshGameBoard);

// TODO: call the refreshGameBoard function to restart the game on winning modal
resetGameButtonElement.addEventListener("click", refreshGameBoard);

// TODO: call the refreshGameBoard function to restart the game on actual game
resetInGameButtonElement.addEventListener("click", refreshGameBoard);

// TODO: show the modal with the leaderboard
leaderboardButtonElement.addEventListener("click", function() {
  modalLeaderboardElement.classList.add("active");
});

// TODO: close the modal with the leaderboardButton
leaderboardCloseButtonElement.addEventListener("click", function() {
  modalLeaderboardElement.className = "modal";
});


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
      //check if this is the first click of the actual search and save the data-piece value into previousCardFlipped
      if(clickCounter === 1) {
        previousCardFlipped = triggerParent.getAttribute("data-piece");
      } else {
        //if it is not the first click it means this is the second one and then we need to see if the previous and the actual data-piece are the same
        if(previousCardFlipped === triggerParent.getAttribute("data-piece")) {
          //clickCounter = 5 to prevent any actiuon until the settimeout function finish
          clickCounter = 5;
          //add the class guessed to those flipped card without the guessed class
          let guessedCards = document.querySelectorAll('.game-pieces.flipped:not(.guessed)');
          setTimeout(function(){
            //since this convination is correct guessedcorrectly add 1
            guessedCorreclty ++;
            guessedCards.forEach(function(currentValue) {
              currentValue.classList.add("guessed");
            });
            //set clickCounter to 0 to restart the counter and begin another search
            clickCounter = 0;
            //update the star rating and moves
            starsRating();
            //when guessedCorrectly is equal to the maximun pair possible the game is over
            if(guessedCorreclty === 8) {
              clearInterval(timerCounter);
              modalWinnerElement.classList.add("active");
              modalWinnerElement.querySelector("#yourTime").textContent = "Your Time: " + ("0" + timerMinutes).slice(-2) + ":" + ("0" + timerSeconds).slice(-2);
              modalWinnerElement.querySelector("#yourMoves").textContent = "Your Moves: " + completeMovesCounter;
              modalWinnerElement.querySelector(".star-rating-container").innerHTML = starsRatingElement.innerHTML;
              leaderboardCheck();
            }
          },500);
        } else {
          //clickCounter = 5 to prevent any actiuon until the settimeout function finish
          clickCounter = 5;
          //add the class wrong to the cards who are flipped
          let wrongCards = document.querySelectorAll('.game-pieces.flipped:not(.guessed)');
          setTimeout(function(){
            wrongCards.forEach(function(currentValue) {
              currentValue.classList.add("wrong");
            });
            //update the star rating and moves
            starsRating();
          },300);
          //set clickCounter to 2 to let the next step flipped back the cards
          clickCounter = 2;
        }
      }
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
    }, 900);
  }
});
