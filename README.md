# DungeonDice: An Open Source Adventure Game

Welcome to **DungeonDice**, a delightful, open-source game designed to spark imagination and adventure. Created in collaboration with my daughter, this game is a testament to fun, creativity, and family bonding. It's perfect for players ages 5 and up, offering an accessible and entertaining experience for all.

## What you need to play!
You will need to have some dice: about 10 d6 and 3-4 d4 and a full set of d20 for special characters.<br>
You will need to either print or use some graph paper for 4x4 tiles. I have included some stl if you want to 3d print your doors (clips) and dungeon tiles for your game like I have mine. They are located in `/game_peices`.<br>
You need to read the rules which are in the companion app but also in this repo under `/public/rules.html` . <br>
The companion app is running and free for anyone to play at [DungeonDice.net](https://dungeondice.net). <br>
Get ready to explore, overcome obstacles, and collect rewards!

## About This Repository
This repository is more than just code; it's a portal to endless adventures. Here's what makes DungeonDice companion app:

- **Browser-Based State Management:** The game's state is stored in your browser. Refreshing the browser means restarting the adventure.
- **Extensibility and Creativity:** Both obstacle tiles and rewards are designed to be flexible and not mission-specific. This means the game can grow and evolve with community contributions.
- **Community Contributions:** Follow the fuide below to expand dungeon dice. Feel free to push a PR to me!

## How to Contribute

### Adding a Mission
1. **Edit Missions:** Start by editing `missions.json` in the missions folder.
2. **Create a Mission Folder:** Match the folder name to your JSON file.
3. **Story Tiles:** Add JSON blobs for each story tile in your mission.
4. **Leverage Game Mechanics:** Story tiles can invoke functions in `main.js`. For example, see how `mission1/storytile2.json` uses a timer. Feel free to use and expand upon these mechanics.
5. **Dynamic Grid System:** Any story tile can dynamically interact with the grid system. Check out `mission1/storyTile3` for an exciting boss fight example!

### Adding a Obstacal Tile
1. **Copy** an already existing obstacal tile from `obstacles/` and paste it in there itterating on the tile number
2. **Edit** the new obstacaltile with your obstacal
3. **DONE!**

## Join the Adventure
Your ideas, code, and stories can help DungeonDice grow. Join us in creating a world of fun, challenges, and endless adventure. Let's make DungeonDice a memorable journey for everyone!


### Running the companion app locally
1. install Node.js 
2. npm install
3. npm init app.js
4. open web browser to http://localhost:3000 to play 
