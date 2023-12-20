import { handleTimerMechanic } from './gamemechanics/timer.js';
import { handleRiddleMechanic } from './gamemechanics/riddle.js';

let tilesDrawn = 0;
let currentMission = null;
let currentStoryTile = 0;
let cardDrawHistory = {};
let cardDrawCounter = 0;
let totalStoryTiles = 0;
let isGameOver = false;

const cardGap = {
    'reward': 10,
    'punishment': 10,
    'obstacle': 10
};

document.addEventListener('DOMContentLoaded', () => {
    fetchMissions();
});

async function fetchMissions() {
    const response = await fetch('/missions');
    const data = await response.json();
    const missionSelection = document.getElementById('missionSelection');
    missionSelection.innerHTML = data.missions.map((mission, index) =>
        `<button id="missionButton${index}">${mission.missionName.replace(/_/g, ' ')}</button>`
    ).join('');

    // Attach event listeners to the buttons
    data.missions.forEach((mission, index) => {
        document.getElementById(`missionButton${index}`).addEventListener('click', () => loadMission(mission.missionId, mission.missionName));
    });
}

function loadMission(missionId, missionName) {
    currentMission = missionId;
    document.getElementById('missionTitle').innerText = missionName.replace(/_/g, ' ');

    fetch(`/missions/${missionId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('missionDescription').innerText = data.prologue;
            totalStoryTiles = data.totalStoryTiles;
        })
        .catch(err => {
            console.error("Error fetching prologue:", err);
        });

    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('missionSelection').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    currentStoryTile = 0;

    const drawCardButton = document.getElementById('drawCardButton');
    drawCardButton.innerText = 'Draw Card';
    drawCardButton.onclick = drawCard;
    const timerContainer = document.getElementById('timerContainer');
    timerContainer.style.display = 'none';
    document.getElementById('riddleContainer').style.display = 'none';
}

window.loadMission = loadMission;

function clearPreviousContent() {
    const gridContainer = document.getElementById('gridContainer');
    gridContainer.innerHTML = '';
    const messageContainer = document.getElementById('message');
    messageContainer.innerHTML = '';
    const timerDisplay = document.getElementById('timerDisplay');
    timerDisplay.innerText = '';
    const startTimerButton = document.getElementById('startTimerButton');
    startTimerButton.style.display = 'none';
    // Hide timer by default in the clear function
    const timerContainer = document.getElementById('timerContainer');
    timerContainer.style.display = 'none';
}

function drawCard() {
    if (isGameOver) {
        finishGame();
        return;
    }

    clearPreviousContent();
    document.getElementById('missionDescription').innerText = '';

    if (tilesDrawn >= 8) {
        drawStoryCard();
        tilesDrawn = 0;
    } else {
        const cardType = getRandomCardType();
        cardDrawCounter++;
        switch (cardType) {
            case 'enemy':
                drawEnemyCard();
                break;
            case 'punishment':
                drawPunishmentCard();
                break;
            case 'reward':
                drawRewardCard();
                break;
            case 'obstacle':
                drawObstacleCard();
                break;
            default:
                console.error("Unsupported card type:", cardType);
                break;
        }
        tilesDrawn++;
    }

    if (currentStoryTile >= totalStoryTiles) {
        isGameOver = true;
        const drawCardButton = document.getElementById('drawCardButton');
        drawCardButton.innerText = 'Finish Game';
    }
}

function finishGame() {
    // Hide game container and reset mission data
    document.getElementById('gameContainer').style.display = 'none';
    currentMission = null;
    currentStoryTile = 0;
    tilesDrawn = 0;
    cardDrawCounter = 0;
    cardDrawHistory = {};

    // Reset message and grid tiles
    const messageContainer = document.getElementById('message');
    messageContainer.innerText = ''; // Reset message to empty string

    const gridContainer = document.getElementById('gridContainer');
    gridContainer.innerHTML = ''; // Clear the grid tiles

    isGameOver = false;

    // Show start screen and mission selection
    document.getElementById('startScreen').style.display = 'block';
    document.getElementById('missionSelection').style.display = 'block';
}


function getRandomCardType() {
    const cardTypes = ['enemy', 'punishment', 'reward', 'obstacle'];
    let availableCardTypes = [...cardTypes];
    cardTypes.forEach(type => {
        if (cardDrawHistory[type] !== undefined && (cardDrawCounter - cardDrawHistory[type]) < cardGap[type]) {
            availableCardTypes = availableCardTypes.filter(card => card !== type);
        }
    });
    const randomType = availableCardTypes[Math.floor(Math.random() * availableCardTypes.length)];
    if (randomType !== 'enemy') {
        cardDrawHistory[randomType] = cardDrawCounter;
    }
    return randomType;
}

function drawObstacleCard() {
    fetch('/obstacle')
        .then(response => response.json())
        .then(data => {
            const { description, grid, game_mechanic_type, timer_length } = data;
            const messageContainer = document.getElementById('message');
            messageContainer.innerText = description;

            // Handling the game mechanic if it's a timer
            if (game_mechanic_type === "timer" && timer_length) {
                handleTimerMechanic(timer_length);
            }

            const gridContainer = document.getElementById('gridContainer');
            gridContainer.innerHTML = '';
            grid.forEach(row => {
                row.forEach(cell => {
                    const div = document.createElement('div');
                    div.innerText = cell;  // Always assign the cell value
                    div.className = 'gridCell';  // Always assign the generic gridCell class
                    gridContainer.appendChild(div);
                });
            });
        })
        .catch(err => {
            console.error("Failed to fetch obstacle:", err);
        });
}

function drawEnemyCard() {
    fetch('/enemies')
        .then(response => response.json())
        .then(data => {
            const grid = document.getElementById('gridContainer');
            grid.innerHTML = '';
            let positions = new Array(16).fill(null);
            data.enemies.forEach(enemy => {
                let position;
                do {
                    position = Math.floor(Math.random() * 16);
                } while (positions[position] !== null);
                positions[position] = enemy;
            });
            positions.forEach(position => {
                const div = document.createElement('div');
                div.className = position === null ? 'gridCell' : 'enemy-tile';
                div.innerText = position !== null ? position : '';
                grid.appendChild(div);
            });
        });
}

function drawPunishmentCard() {
    fetch('/punishment')
        .then(response => response.json())
        .then(data => {
            const messageContainer = document.getElementById('message');
            messageContainer.innerText = data.punishment;
            
            const imgContainer = document.createElement('img');
            imgContainer.src = data.imageUrl;
            imgContainer.alt = "Punishment Image";
            imgContainer.width = 200; // or any desired width
            messageContainer.appendChild(imgContainer);
        });
}

function drawRewardCard() {
    fetch('/reward')
        .then(response => response.json())
        .then(data => {
            const messageContainer = document.getElementById('message');
            messageContainer.innerText = data.reward;

            const imgContainer = document.createElement('img');
            imgContainer.src = data.imageUrl;
            imgContainer.alt = "Reward Image";
            imgContainer.width = 200; // or any desired width
            messageContainer.appendChild(imgContainer);
        });
}
function drawStoryCard() {
    currentStoryTile++;

    fetch(`/story?missionId=${currentMission}&tileNumber=${currentStoryTile}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const messageContainer = document.getElementById('message');
            messageContainer.innerText = data.description;

            // Handle the grid rendering
            const gridContainer = document.getElementById('gridContainer');
            gridContainer.innerHTML = '';
            data.grid.forEach(row => {
                row.forEach(cell => {
                    const div = document.createElement('div');
                    div.innerText = cell;  // Always assign the cell value
                    div.className = 'gridCell';  // Always assign the generic gridCell class
                    gridContainer.appendChild(div);
                });
            });

            // Retrieve the timerContainer and riddleContainer
            const timerContainer = document.getElementById('timerContainer');
            const riddleContainer = document.getElementById('riddleContainer');
            
            // Check the game mechanic type
            if (data.game_mechanic_type === "timer" && data.timer_length) {
                timerContainer.style.display = 'block';  // Show the timer container
                handleTimerMechanic(data.timer_length); // Use the handleTimerMechanic function
            } else {
                timerContainer.style.display = 'none';  // Hide the timer container
            }

            if (data.game_mechanic_type === 'riddle') {
                handleRiddleMechanic(data); // Call handleRiddleMechanic with the tile data
            } else {
                riddleContainer.style.display = 'none'; // Hide the riddle container
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}


function openRules() {
    window.open('rules.html', 'Rules', 'width=500,height=500');
}

document.getElementById('rules-icon').addEventListener('click', openRules);




