#!/bin/bash
tsc
mv src/app.js .
mv src/routes.js .

mv src/menu.js public

mv src/game.js public
mv src/MapManager.js public
mv src/SpriteManager.js public 


node app.js