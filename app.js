const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));


let currentMission = 1;
let currentStoryTile = 0;

app.get('/story', (req, res) => {
    const missionId = req.query.missionId;
    const storyTileNumber = req.query.tileNumber;

    // Construct the path based on missionId and tile number
    const storyFilePath = path.join(__dirname, 'missions', `mission${missionId}`, `storyTile${storyTileNumber}.json`);
    
    fs.readFile(storyFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading story tile file');
        }
        const storyData = JSON.parse(data);
        res.json(storyData);
    });
});



app.get('/enemies', (req, res) => {
    const maxEnemies = 6;
    const numberOfEnemies = Math.max(2, Math.floor(Math.random() * maxEnemies) + 1);
    let enemies = [];
    for (let i = 0; i < numberOfEnemies; i++) {
        enemies.push(Math.floor(Math.random() * 5) + 2);
    }
    res.json({ enemies });
});


app.get('/punishment', (req, res) => {
    const punishments = [
        { 
            message: "Poison gas, everyone loses 3 health.",
            imageUrl: "/images/poisongas.png"
        },
        { 
            message: "Sprung trap, everyone loses 4 health.",
            imageUrl: "/images/trap.jpg"
        },
        { 
            message: "Acid burn, everyone loses 2 health.",
            imageUrl: "/images/acid.jpg"
        }
    ];
    const randomPunishment = punishments[Math.floor(Math.random() * punishments.length)];
    res.json({ 
        punishment: randomPunishment.message,
        imageUrl: randomPunishment.imageUrl
    });
});

app.get('/reward', (req, res) => {
    const rewards = [
        { 
            message: "You found the well of life, everyone gains 1 life.",
            imageUrl: "/images/gainlife.jpg"
        },
        { 
            message: "You found potions of healing, everyone is restored to full health.",
            imageUrl: "/images/bandaid.jpg"
        }
    ];
    const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
    res.json({ 
        reward: randomReward.message,
        imageUrl: randomReward.imageUrl
    });
});


app.get('/missions', (req, res) => {
    const missions = require('./missions/missions.json');
    res.json({ missions });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

app.get('/missions/:missionId', (req, res) => {
    const missionId = parseInt(req.params.missionId, 10);

    const missions = require('./missions/missions.json');
    const mission = missions.find(m => m.missionId === missionId);

    if (mission) {
        res.json(mission);
    } else {
        res.status(404).send('Mission not found');
    }
});

app.get('/obstacle', (req, res) => {
    // Read the 'obstacles' directory
    fs.readdir(path.join(__dirname, 'obstacles'), (err, files) => {
        if (err) {
            console.error("Error reading the obstacles directory:", err); // Log the error
            return res.status(500).send('Server Error');
        }

        // Choose a random file
        const randomFile = files[Math.floor(Math.random() * files.length)];

        // Read the random file's content
        fs.readFile(path.join(__dirname, 'obstacles', randomFile), 'utf8', (err, data) => {
            if (err) {
                console.error("Error reading the obstacle file:", err); // Log the error
                return res.status(500).send('Server Error');
            }
            
            res.json(JSON.parse(data));
        });
    });
});
