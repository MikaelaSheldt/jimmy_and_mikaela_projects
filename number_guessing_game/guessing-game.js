/*

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

const guessObject = document.getElementById('guess');
const guessButtonObject = document.getElementById('guessButton');
const guessFormObject = document.getElementById('guessForm');
const guessListObject = document.getElementById('guessList');
const messageObject = document.getElementById('message');
const hintButtonObject = document.getElementById('hintButton');
const hintObject = document.getElementById('hint');
const playAgainButtonObject = document.getElementById('playAgainButton');


function generateWinningNumber() {
  return Math.floor(Math.random() *100) +1;
}

// Shuffle tests won't pass

class Game {
  constructor() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
  }
  difference() {
    return Math.abs(this.playersGuess - this.winningNumber);
  }
  playersGuessSubmission(guess) {
    this.playersGuess = guess;
    if (Number(guess)) {
      return this.checkGuess(guess);
    }
    else {
      this.pastGuesses.push(this.playersGuess)
      return "That's a stupid guess";
    }
  }
  checkGuess() {
    this.pastGuesses.push(this.playersGuess);
    if (this.playersGuess === this.winningNumber) {
      return 'Finally, good job.';
    }
    if (this.pastGuesses.length === 5) {
      return `You're a Loser. The Magic Number was ${game.winningNumber}.`
    }
    if (this.playersGuess < this.winningNumber) {
      return "Think Bigger";
    }
    if (this.playersGuess > this.winningNumber) {
      return 'Reign yourself in.';
    }
  }
}

function newGame() {
  return new Game();
}


let game = new Game();
let theSwitch = true;

guessButtonObject.addEventListener('click', () => {
  if (theSwitch) {
    let guess = Number(guessObject.value);
    let message = game.playersGuessSubmission(guess);
    messageObject.innerHTML = message;
    guessListObject.innerHTML += `  ${guessObject.value}  `;
    guessObject.value = '';
  }
  if (game.pastGuesses.length === 5) {
    theSwitch = false;
  }
  hintObject.innerHTML = '';
});

playAgainButtonObject.addEventListener('click', () => {
  game = new Game();
  messageObject.innerHTML = '';
  guessListObject.innerHTML = 'GUESSES: ';
  hintObject.innerHTML = '';
  theSwitch = true;
});

hintButtonObject.addEventListener('click', () => {
  let number = game.difference();
  if (number <=10) {
    hintObject.innerHTML = 'Sometimes the answer is right in front of you.';
  }
  else if (number <= 30) {
    hintObject.innerHTML = "You'll need to take bigger steps if you want to succeed.";
  }
  else {
    hintObject.innerHTML = "You are so far from your goal, only a miracle will save you.";
  }
});
