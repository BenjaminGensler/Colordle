const letterBoxes = document.querySelectorAll('.letterBox');

letterBoxes.forEach((letterBox, index) => {
    letterBox.addEventListener('input', function() {
        // Limit to one character
        if (this.textContent.length > 1) {
            this.textContent = this.textContent.charAt(0);
        }

         // Update the typed word display
        setTypedWord(getCurrentWord());
        
        // Move to next letterBox if a character was entered
        if (this.textContent.length === 1 && index < letterBoxes.length - 1) {
            letterBoxes[index + 1].focus();
        }
    });
    
    // Handle backspace to move to previous box
    letterBox.addEventListener('keydown', function(e) {
        if (e.key === 'Backspace' && this.textContent.length === 0 && index > 0) {
            letterBoxes[index - 1].focus();
        }
    });

    //Handle delete to move to next box
    letterBox.addEventListener('keydown', function(e) {
        if (e.key === 'Delete' && this.textContent.length === 0 && index < letterBoxes.length - 1) {
            letterBoxes[index + 1].focus();
        }
    });
});

//Get the current word from letterBoxes
export function getCurrentWord() {
    let word = '';
    letterBoxes.forEach(letterBox => {
        word += letterBox.textContent || ' ';
    });
    return word;
}

// Set typedWord <p> element text content
export function setTypedWord(word) {
    const typedWordElement = document.querySelector('.typedWord');
    if (typedWordElement) {
        typedWordElement.textContent = word;
    }
}