#!/bin/bash
tsc
mv src/app.js .
mv src/routes.js .
mv src/menu.js public 


node app.js