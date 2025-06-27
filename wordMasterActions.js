document.querySelector('.letterBox').addEventListener('input', function() {
    const letterBox = this;
    if (letterBox.textContent.length > 1) {
        letterBox.textContent = letterBox.textContent.charAt(0);
    }
});