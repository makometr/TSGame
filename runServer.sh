#!/bin/bash
tsc
mv src/app.js .
mv src/routes.js .
mv src/LevelsStorageManager.js .

mv src/menu.js public

mv src/game.js public
mv src/MapManager.js public
mv src/SpriteManager.js public
mv src/GameManager.js public
mv src/SoundManager.js public



node app.js