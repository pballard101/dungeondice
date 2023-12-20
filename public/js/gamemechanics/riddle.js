export function handleRiddleMechanic(data) {
    document.getElementById('riddleText').innerText = data.riddleText;
    document.getElementById('riddleAnswer').value = '';
    document.getElementById('riddleContainer').style.display = 'block';
    window.currentTile = data; // Storing the entire data object as the current tile
}

window.submitRiddleAnswer = function() {
    const answerInput = document.getElementById('riddleAnswer');
    const playerAnswer = answerInput.value;
    const feedbackElement = document.getElementById('riddleFeedback');

    if (playerAnswer.toLowerCase() === window.currentTile.riddleAnswer.toLowerCase()) {
        feedbackElement.innerText = window.currentTile.riddleSuccess;
        // Additional code to handle a correct answer
    } else {
        window.currentTile.riddleMaxGuesses--;
        if (window.currentTile.riddleMaxGuesses <= 0) {
            feedbackElement.innerText = window.currentTile.riddleFailure;
            // Additional code to handle failure (e.g., showing the correct answer or changing game state)
        } else {
            feedbackElement.innerText = `Incorrect. You have ${window.currentTile.riddleMaxGuesses} guesses remaining.`;
            // Optionally, prompt for another guess
        }
    }
};

