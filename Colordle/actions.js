const popupButton = document.getElementById('popupButton');
const popupModal = document.getElementById('popupModal');
const closeModal = document.getElementById('closeModal');

// Open the modal
popupButton.addEventListener('click', () => {
    popupModal.style.display = 'block';
});

// Close the modal
closeModal.addEventListener('click', () => {
    popupModal.style.display = 'none';
});

// Close the modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === popupModal) {
        popupModal.style.display = 'none';
    }
});

let colors = ["white", "red", "blue", "green", "yellow", "orange", "purple"];
var answer = new Array();
var guesses = new Array(); //may not need this
var numGuesses = 0; //max of 10 guesses
var easy = false;
var hard = false;
var blind = false;

//values to be used for the specific box
var cSet = 1;
var parentNode = document.getElementById('colorSet' + cSet);
var resultNode = document.getElementById('result' + cSet);

//The below values reference the color buttons based on the parentNode
var c1 = parentNode.querySelector('#c1');
var c2 = parentNode.querySelector('#c2');
var c3 = parentNode.querySelector('#c3');
var c4 = parentNode.querySelector('#c4');

//results value (r1 = correct, r2 = misplaced, r3 = incorrect)
var r1 = resultNode.querySelector('#r1');
var r2 = resultNode.querySelector('#r2');
var r3 = resultNode.querySelector('#r3');


var guessButton = document.getElementById('guess' + cSet);
var newGameButton = document.getElementById('newGame');

//option in settings to remove duplicates
function easyMode() {
    alert("Easy Mode Activated: No Duplicate Colors");
    if (easy == false) {
        easy = true;
    }
    else {
        easy = false;
    }
}

//option in settings to add more colors and limit view of guesses
function hardMode() {
    //add 2 more colors
    alert("Hard Mode Activated: 8 colors & limited view");
    if (hard == false) {
        hard = true;
    }
    else {
        hard = false;
    }
    setColor();
}   

//option in settings to change colors for color blind
function colorBlindMode() {
    alert("Color Blind Mode Activated: Colors have been changed");
    if (blind == false) {
        blind = true;
    }
    else {
        blind = false;
    }
    setColor();
}

function setColor(){
    if(hard == true && blind == true){
        colors = ["white", "blue", "yellow", "black", "orange", "pink", "purple", "magenta", "brown"];
    }
    else if(hard == true && blind == false){
        colors = ["white", "red", "blue", "green", "yellow", "orange", "purple", "black", "pink"];
    }
    else if(hard == false && blind == true){
        colors = ["white", "blue", "yellow", "black", "orange", "pink", "purple"];
    }
    else{
        colors = ["white", "red", "blue", "green", "yellow", "orange", "purple"];
    }
}

//disables buttons after guess
function disableButtons() {
    c1.disabled = true;
    c2.disabled = true;
    c3.disabled = true;
    c4.disabled = true;
    guessButton.disabled = true;
}

//enables buttons after guess
function enableButtons() {
    c1.disabled = false;
    c2.disabled = false;
    c3.disabled = false;
    c4.disabled = false;
    guessButton.disabled = false;
}

//changes the set of color boxes and results
function changeSets(value) {
    parentNode = document.getElementById('colorSet' + value);
    c1 = parentNode.querySelector('#c1');
    c2 = parentNode.querySelector('#c2');
    c3 = parentNode.querySelector('#c3');
    c4 = parentNode.querySelector('#c4');


    resultNode = document.getElementById('result' + value);
    r1 = resultNode.querySelector('#r1');
    r2 = resultNode.querySelector('#r2');
    r3 = resultNode.querySelector('#r3');
    guessButton = resultNode.querySelector('#guess' + value);
}

function createCombo() {
    var i = 0;
    const validColors = colors.filter(color => color && color.toLowerCase() !== "white"); // Filter out "white" and blanks

    if (easy == false) {
        // Create answer combination without avoiding duplicates
        while (i < 4) {
            answer[i] = validColors[Math.floor(Math.random() * validColors.length)];
            i++;
        }
    } else {
        // Create answer combination while avoiding duplicates
        while (i < 4) {
            var randomColor = validColors[Math.floor(Math.random() * validColors.length)];
            if (!answer.includes(randomColor)) {
                answer[i] = randomColor;
                i++;
            }
        }
    }
}

//clears a color and text box
function clearPreviousGuessResults() {
    r1.textContent = '';
    r2.textContent = '';
    r3.textContent = '';

    c1.style.backgroundColor = 'rgb(209, 217, 221)';
    c2.style.backgroundColor = 'rgb(209, 217, 221)';
    c3.style.backgroundColor = 'rgb(209, 217, 221)';
    c4.style.backgroundColor = 'rgb(209, 217, 221)';
}

// resets to a new game
function newGame() {

    //sets buttons back to default settings
    while (cSet > 1) {

        disableButtons();

        clearPreviousGuessResults();

        cSet--;

        changeSets(cSet);
    }

    clearPreviousGuessResults();
    enableButtons();

    //create new answer combination
    createCombo();




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

    if (colorIndex != colors.length - 1) {
        this.style.backgroundColor = colors[colorIndex + 1];
    }
    else {
        this.style.backgroundColor = colors[0];
    }
}


// Issues are occuring
function guess() {
    //disable the buttons after guess
    disableButtons();

    guessButton.style.display = 'none';

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

    //reset copyAnswer
    for (var i = 0; i < 4; i++) {
        guessed[i] = '';
    }

    //check if guess is correct
    if (correct == 4) {
        alert("You win!");
        newGameButton.style.display = 'flex';
        guessButton.style.display = 'none';
        return; //avoids it continuing (hopefully)
    }

    //check if max number of guesses has been reached
    if (numGuesses >= 10) {
        alert("You lose! The correct answer was: " + answer);
        newGameButton.style.display = 'flex';
        guessButton.style.display = 'none';
    }


    //display results
    r1.textContent = correct;
    r2.textContent = misplaced;
    r3.textContent = incorrect;

    cSet++;
    //limit view of guesses if hard mode is active
    if(hard == true && cSet >= 4){
        changeSets(cSet - 3);
        disableButtons();
        clearPreviousGuessResults();
    }

    //enable the next set of buttons for next cSet
    changeSets(cSet);

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

    enableButtons();

    //make next guessButton display
    guessButton.style.display = 'flex';
} 