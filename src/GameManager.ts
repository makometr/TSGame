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
        this.soundManager = new SoundManager();
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
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `/data/level?number=${this.currentGameLevel}`, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send();
    
        xhr.onreadystatechange = () => {
            // console.log("Wait for respond from server to change book:", xhr.readyState);
            if (xhr.readyState != 4) return;        
            if (xhr.status != 200) {
                alert( 'Error: ' + (xhr.status ? xhr.statusText : 'server is not responding') );
                return;
            }
            else {
                console.log("Level data is succesfully loaded!");
                let serverAns = JSON.parse(xhr.responseText);
                console.log(serverAns);
                // todo interface for level data
            }
        };
    
    }

    gameStart(){
        this.isgameGoing = true;
        // todo
    }
}