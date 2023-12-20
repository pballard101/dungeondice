export function handleTimerMechanic(durationInSeconds) {
    const timerDisplay = document.getElementById('timerDisplay');
    console.log("Timer mechanic found. Duration:", durationInSeconds);

    const startTimerButton = document.getElementById('startTimerButton');
    startTimerButton.style.display = 'block'; 
    startTimerButton.onclick = function() {
        console.log('start button pressed');
        // First hide the start button
        startTimerButton.style.display = 'none'; 

        // Start the countdown lead-in
        startCountdownLeadIn(timerDisplay, durationInSeconds);
    };
}

function startCountdownLeadIn(displayElement, duration) {
    let countdown = 5;  // 5 seconds lead-in countdown
    displayElement.innerText = 'Get ready... ' + countdown;
    console.log('Lead-in started:', countdown); // Log the start
    
    const countdownInterval = setInterval(function() {
        countdown--;
        console.log('Countdown:', countdown); // Log each decrement

        if (countdown >= 0) {
            displayElement.innerText = 'Get ready... ' + countdown;
        } else {
            clearInterval(countdownInterval);
            console.log('Lead-in finished, starting main timer'); // Log end of lead-in
            // Start the main timer after the countdown lead-in completes
            startMainTimer(duration, displayElement);
        }
    }, 1000);
}

function startMainTimer(duration, displayElement, buttonElement) {
    console.log('starting main time');
    let remainingTime = duration;
    displayElement.innerText = remainingTime;
    const interval = setInterval(function() {
        remainingTime--;
        displayElement.innerText = remainingTime;

        if (remainingTime <= 0) {
            clearInterval(interval);
            displayElement.innerText = 'Time\'s up!';
            if(buttonElement) { 
                buttonElement.style.display = 'none';
            }
        }
    }, 1000);

    if(buttonElement) {
        buttonElement.style.display = 'none'; 
    }
}
