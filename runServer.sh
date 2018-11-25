#!/bin/bash
tsc
mv src/app.js .
mv src/routes.js .

mv src/menu.js public

mv src/game.js public
mv src/mapManager.js public
mv src/spriteManager.js public 


node app.js