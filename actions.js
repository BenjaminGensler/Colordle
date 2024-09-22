let colors = [ "red", "blue", "green", "yellow", "orange", "purple" ];
var answer = new Array();
var guesses = new Array(); //may not need this
var numGuesses = 0; //max of 10 guesses

var c1 = document.getElementById('c1');
var c2 = document.getElementById('c2');
var c3 = document.getElementById('c3');
var c4 = document.getElementById('c4');
var guessButton = document.getElementById('guess');
var newGameButton = document.getElementById('newGame');

// Currently working
function newGame(){
    //create answer combination
    var i = 0;
    while(i < 4){
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
function changeColor(){
    // 'this' refers to the box that was clicked
    var boxColor = this.style.backgroundColor;
    var colorIndex = colors.indexOf(boxColor);

    if(colorIndex != 5){
        this.style.backgroundColor = colors[colorIndex + 1];
    }
    else{
        this.style.backgroundColor = colors[0];
    }
}

//var copyAnswer = answer;

function guess(){
    var guess = [c1.style.backgroundColor, c2.style.backgroundColor, c3.style.backgroundColor, c4.style.backgroundColor];
    guesses[numGuesses] = guess;
    numGuesses++;
    
    var copyAnswer = answer;

    var correct = 0;
    var misplaced = 0;
    var incorrect = 4;

    //check if guess is correct
    if(guess == answer){
        alert("You win!");
        newGameButton.style.display = 'flex';
        guessButton.style.display = 'none';
    }
    else{

        //collects all correct guesses
        for(var i = 0; i < 4; i++){
            if(guess[i] == copyAnswer[i]){
                copyAnswer[i] = '';
                correct++;
                incorrect--;
            }
        }

        //checc for misplaced
        for(var i = 0; i < 4; i++){
            if(copyAnswer.includes(guess[i])){
                copyAnswer[copyAnswer.indexOf(guess[i])] = '';
                misplaced++;
                incorrect--;
            }
        }

        alert("Correct: " + correct + " Misplaced: " + misplaced + " Incorrect: " + incorrect);

        //reset copyAnswer
        for(var i = 0; i < 4; i++){
            copyAnswer[i] = answer[i];
        }
    }

    //check if max number of guesses has been reached
    if(numGuesses == 10){
        alert("You lose! The correct answer was: " + answer);
        newGameButton.style.display = 'flex';
        guessButton.style.display = 'none';
    }
}