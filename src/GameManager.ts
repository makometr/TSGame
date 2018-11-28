// class config {

// }

class GameManager {
    private mapManager: MapManager;
    private spriteManager: SpriteManager;
    private soundManager: SoundManager;
    private eventManager: EventManager;

    private currentGameLevel: number;
    private isGameGoing: boolean;
    private currentGameLevelData: LevelData | null;

    constructor(){
        console.log("game manager init!");
        this.currentGameLevel = 1;
        this.isGameGoing = false;
        this.currentGameLevelData = null;

        this.spriteManager = new SpriteManager("img",
                        ["bkg.png"],
                        ["empty.png", "dirt.png", "stone.png", "brick.png"],
                        ["diamond.png"]);
        this.soundManager = new SoundManager();
        this.mapManager = new MapManager(this.spriteManager);
        this.eventManager = new EventManager();

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
        let loadLevelTimer = setTimeout(() => {
            console.log("Try to load level data in mapManager");
            this.loadLevelDataInMapManager(loadLevelTimer);
        }, 50);

        let loadImgTimer = setTimeout(() => {
            console.log("Try to draw hello window!");
            this.drawHelloLevelScreen(loadImgTimer);
        }, 50);
        // smth else - ?
    }

    loadLevelDataInMapManager(timer: NodeJS.Timeout){
        if (!this.currentGameLevelData)
            return;
        this.mapManager.initByLevelData(this.currentGameLevelData);
        clearTimeout(timer);
    }

    drawHelloLevelScreen(timer: NodeJS.Timeout){
        // draw screen on canvas with some level_number, button "start" and sprite on bckg before each level
        if (!this.spriteManager.isLoaded)
            return;
        let ctx = htmlPage.getCanvas();
        ctx.drawImage(this.spriteManager.getHelloWindowBackgroundImage(), 0,0);
        ctx.font = "bold 25px sans-serif";
        ctx.fillText(`Level ${this.currentGameLevel}`, 145, 165);
        clearTimeout(timer);
    }

    loadCurrentLevelData(){
        // load data for current level
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `/data/level?number=${this.currentGameLevel}`, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send();
    
        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) return;        
            if (xhr.status != 200) {
                alert( 'Error: ' + (xhr.status ? xhr.statusText : 'server is not responding') );
                return;
            }
            else {
                console.log("Level data is succesfully loaded!");
                this.currentGameLevelData = JSON.parse(xhr.responseText);
                console.log(this.currentGameLevelData);
            }
        };
    
    }

    startLevel(){
        console.log("Level started!");
        this.isGameGoing = true;
        this.eventManager.startGameTimer();

    }

    updateGame(){
        this.mapManager.drawCurrentMapState();
        // ...
    }

    stopLevel(){
        this.eventManager.stopGameTimer();
    }
}