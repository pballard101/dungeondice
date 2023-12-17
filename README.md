# dungeondice
This repo is a small companion app to a game I started designing with my daughter. The game will be open source and free for folks to play and contribute too. It is meant to be fun, playful, and accesible for ages 5+.

The app is running at https://dungeondice.net if you want to play the game.

Some basic thoughts on this repo: The game is designed to have the browser store state. So if you refresh your broswer it will start over. The game is meant to be extensible where the obstacalTiles are not unique to a mission and rewards are not either. If you want to add more community obsticles its easy just copy a obsticaltile and iterate on the number.

Adding a mission:
    edition missions.json in missions folder
    create mission folder for your mission matching the json you created
    add story tiles json blobs for each story tile in your mission
    story tiles can reference functions that are being added to main.js. An exmaple of this can be seen in mission1 storytile2.json referencing a timer and passing a value for time. if you have a good idea that needs a timer use this game mechanic. I will be adding more and more and likely break these out to there own js.
    Any story tile can display things on the grid system. Example of this can be seen in mission1 storyTile3 for the final boss fight :) 
