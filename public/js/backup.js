async function fetchMissions() {
    const response = await fetch('/missions');
    const data = await response.json();
    const missionSelection = document.getElementById('missionSelection');
    missionSelection.innerHTML = data.missions.map(mission => `<button onclick="loadMission('${mission}')">${mission.replace(/_/g, ' ')}</button>`).join('');
}
async function loadMission(missionName) {
    console.log("loadMission function entered"); // Debugging line

    const response = await fetch(`/mission/${missionName}`);
    const data = await response.json();

    console.log("Fetched mission data: ", data); // Debugging line

    document.getElementById('missionDescription').innerText = data.missionProlog;
    document.getElementById('missionSelection').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block'; // Ensure that the gameContainer is displayed
}

async function drawCard() {
    try {
        const enemiesResponse = await fetch('/enemies');
        const enemiesData = await enemiesResponse.json();
        console.log("Enemies Data:", enemiesData); // Debugging line to see what data is received

        const grid = document.getElementById('gridContainer'); // Ensure this id matches the id in your HTML
        grid.innerHTML = '';

        enemiesData.enemies.forEach(enemy => {
            const enemyDiv = document.createElement('div');
            enemyDiv.innerText = enemy;
            grid.appendChild(enemyDiv);
        });

    } catch (error) {
        console.error("An error occurred while drawing a card:", error); // This will log any errors that occur during the fetch or DOM manipulation
    }
}


document.addEventListener('DOMContentLoaded', () => {
    fetchMissions();
});

