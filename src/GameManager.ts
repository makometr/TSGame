class GameManager {
    private mapManager: MapManager;
    private spriteManager: SpriteManager;
    private soundManager: SoundManager;

    private currentGameLevel: number;
    private isgameGoing: boolean;

    constructor(){
        console.log("game manager init!");
        this.currentGameLevel = 1;
        this.isgameGoing = false;

        this.spriteManager = new SpriteManager();
        this.soundManager = new SpriteManager();
        this.mapManager = new MapManager();

        this.loadInitData();
        this.startLevelRender();
        
    }

    loadInitData(){
        // load data which will be using for all game-continue once
        this.spriteManager.loadData();
        this.soundManager.loadData();
    }

    startLevelRender(){
        // load resources for current level
        // must be called before level began
        this.loadCurrentLevelData();
        this.drawHelloLevelScreen();
        // smth else - ?
    }

    drawHelloLevelScreen(){
        // draw screen on canvas with some level_number, button "start" and sprite on bckg before each level

    }

    loadCurrentLevelData(){
        // load data for current level
    }

    gameStart(){
        this.isgameGoing = true;
        // todo
    }
}