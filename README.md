# DungeonDice: An Open Source Adventure Game

Welcome to **DungeonDice**, a delightful, open-source game designed to spark imagination and adventure. Created in collaboration with my daughter, this game is a testament to fun, creativity, and family bonding. It's perfect for players aged 5 and above, offering an accessible and entertaining experience for all.

## Play Now!
Dive into the adventure at [DungeonDice.net](https://dungeondice.net). Get ready to explore, overcome obstacles, and collect rewards!

## About This Repository
This repository is more than just code; it's a portal to endless adventures. Here's what makes DungeonDice special:

- **Browser-Based State Management:** The game's state is stored in your browser. Refreshing the browser means restarting the adventure, adding an element of excitement and unpredictability.
- **Extensibility and Creativity:** Both obstacle tiles and rewards are designed to be flexible and not mission-specific. This means the game can grow and evolve with community contributions.
- **Community Contributions:** Adding new obstacles is straightforward. Clone an obstacle tile, make your modifications, and voila – you've contributed to the DungeonDice universe!

## How to Contribute

### Adding a Mission
1. **Edit Missions:** Start by editing `missions.json` in the missions folder.
2. **Create a Mission Folder:** Match the folder name to your JSON file.
3. **Story Tiles:** Add JSON blobs for each story tile in your mission.
4. **Leverage Game Mechanics:** Story tiles can invoke functions in `main.js`. For example, see how `mission1/storytile2.json` uses a timer. Feel free to use and expand upon these mechanics.
5. **Dynamic Grid System:** Any story tile can dynamically interact with the grid system. Check out `mission1/storyTile3` for an exciting boss fight example!

## Join the Adventure
Your ideas, code, and stories can help DungeonDice grow. Join us in creating a world of fun, challenges, and endless adventure. Let's make DungeonDice a memorable journey for everyone!


## Running the Game
Install Node.js 
npm install
npm init app.js
