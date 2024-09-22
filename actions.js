let colors = ["red", "blue", "green", "yellow", "orange", "purple"];
var answer = new Array();
var guesses = new Array(); //may not need this
var numGuesses = 0; //max of 10 guesses

//values to be used for the specific box
var cSet = 1;
var parentNode = document.getElementById('colorSet' + cSet);

//The following 4 lines were replaced with the 4 lines below it (Seems tob e working)
// var c1 = document.getElementById('c1');
// var c2 = document.getElementById('c2');
// var c3 = document.getElementById('c3');
// var c4 = document.getElementById('c4');

var c1 = parentNode.querySelector('#c1');
var c2 = parentNode.querySelector('#c2');
var c3 = parentNode.querySelector('#c3');
var c4 = parentNode.querySelector('#c4');


var guessButton = document.getElementById('guess');
var newGameButton = document.getElementById('newGame');

// Currently working
function newGame() {
    //create answer combination
    var i = 0;
    while (i < 4) {
        answer[i] = colors[Math.floor(Math.random() * colors.length)];
        i++;
    }

    //set color boxes as colors[0] ('red')
    c1.style.backgroundColor = colors[0];
    c2.style.backgroundColor = colors[0];
    c3.style.backgroundColor = colors[0];
    c4.style.backgroundColor = colors[0];

    //clear guesses array
    guesses = [];

    //reset numGuesses
    numGuesses = 0;

    //replace 'New Game button with 'Guess' button
    newGameButton.style.display = 'none';
    guessButton.style.display = 'flex';


    alert("New Game Started! Make your first guess!");
}

//used to check if clicked I guess...
c1.addEventListener('click', changeColor);
c2.addEventListener('click', changeColor);
c3.addEventListener('click', changeColor);
c4.addEventListener('click', changeColor);


// Currently working
function changeColor() {
    // 'this' refers to the box that was clicked
    var boxColor = this.style.backgroundColor;
    var colorIndex = colors.indexOf(boxColor);

    if (colorIndex != 5) {
        this.style.backgroundColor = colors[colorIndex + 1];
    }
    else {
        this.style.backgroundColor = colors[0];
    }
}


// Issues are occuring
function guess() {
    //attempting to disable the buttons after guess
    c1.disabled = true;
    c2.disabled = true;
    c3.disabled = true;
    c4.disabled = true;

    var guess = [c1.style.backgroundColor, c2.style.backgroundColor, c3.style.backgroundColor, c4.style.backgroundColor];
    guesses[numGuesses] = guess;
    numGuesses++;

    var guessed = new Array();  //array to hold used colors

    var correct = 0;
    var misplaced = 0;
    var incorrect = 4;

    // alert('Guess: ' + guess + '\nAnswer: ' + answer);


    //collects all correct guesses
    for (var i = 0; i < 4; i++) {
        if (guess[i] == answer[i]) {
            guessed[i] = guess[i];
            correct++;
            incorrect--;
        }
    }

    //check for misplaced
    for (var i = 0; i < 4; i++) {
        //check to see if value has already been checked
        if (!(guessed[i] == guess[i])) {
            //get current color count in answer
            var colorCount = answer.filter(function (value) {
                return value === guess[i];
            })

            //get current color count in guessed
            var guessedCount = guessed.filter(function (value) {
                return value === guess[i];
            })

            //check if color is in answer and puts in guessed array to avoid duplicates
            if (colorCount.length > guessedCount.length) {
                guessed[i] = guess[i];
                misplaced++;
                incorrect--;
            }
        }
    }

    alert("Correct: " + correct + " Misplaced: " + misplaced + " Incorrect: " + incorrect);

    //reset copyAnswer
    for (var i = 0; i < 4; i++) {
        guessed[i] = '';
    }

    //check if guess is correct
    if (correct == 4) {
        alert("You win!");
        newGameButton.style.display = 'flex';
        guessButton.style.display = 'none';
    }

    //check if max number of guesses has been reached
    if (numGuesses == 10) {
        alert("You lose! The correct answer was: " + answer);
        newGameButton.style.display = 'flex';
        guessButton.style.display = 'none';
    }



    // //adds results of guess to 'Guesses' table
    // var parentNode = document.getElementById('colorSet');
    // var clone = parentNode.cloneNode(true); //copys the parentNode and all of its children

    // for(var i = 0; i < 4; i++) {
    //     var colorID = 'c' + i;
    //     var button = document.getElementById(colorID);
    //     var div = document.createElement('div');
    //     div.innerHTML = button.innerHTML;

    //     //alter id to avoid alterations
    //     div.id = 'd' + i;
    //     //copy color over
    //     div.style.backgroundColor = button.style.backgroundColor;
    //     guessButton.parentNode.replaceChild(div, button);

    // }
    // alert("Testing");

    cSet++;
    //enable the next set of buttons for next cSet
    parentNode = document.getElementById('colorSet' + cSet);
    c1 = parentNode.querySelector('#c1');
    c2 = parentNode.querySelector('#c2');
    c3 = parentNode.querySelector('#c3');
    c4 = parentNode.querySelector('#c4');

    //set color boxes as colors[0] ('red')
    c1.style.backgroundColor = colors[0];
    c2.style.backgroundColor = colors[0];
    c3.style.backgroundColor = colors[0];
    c4.style.backgroundColor = colors[0];

    //used to check if clicked I guess...
    c1.addEventListener('click', changeColor);
    c2.addEventListener('click', changeColor);
    c3.addEventListener('click', changeColor);
    c4.addEventListener('click', changeColor);

    c1.disabled = false;
    c2.disabled = false;
    c3.disabled = false;
    c4.disabled = false;
} 