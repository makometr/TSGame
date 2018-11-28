enum State {
    Menu, Game, Pause
}

class EventManager {
    private mapManager: MapManager;
    private updateFrequency: number;
    private gameTimer: NodeJS.Timeout | null;
    private currentState: State;

    constructor(map_man:MapManager){
        console.log("event manager init!");
        this.mapManager = map_man;
        this.updateFrequency = 30;
        this.gameTimer = null;
        this.currentState = State.Menu;

        document.addEventListener('keydown', (event:any) => {
            let keyName = event.key;
            console.log('Событие keydown: ' + keyName);
        switch(this.currentState){
            case State.Menu:
                switch (keyName){
                    case "Enter":
                        console.log("Level start!");
                        gameManager.startLevel();
                        this.currentState = State.Game;
                        break;
                }
                break;

            case State.Game:
                switch (keyName){
                    case " ":
                        console.log("Space pressed");
                        // this.mapManager.physicsManager.jumpHero();
                        break;
                    case "Escape":
                        console.log("Game paused");
                        gameManager.stopLevel();
                        this.currentState = State.Pause;
                        break;
                    case "ArrowLeft":
                        gameManager.moveHero(DirectionMove.Left);
                        break;
                    case "ArrowRight":
                        gameManager.moveHero(DirectionMove.Right);
                        break;   
                }
                break;
            
            case State.Pause:
                switch (keyName){
                    case "Escape":
                        console.log("Game unpaused");
                        gameManager.startLevel();
                        this.currentState = State.Game;
                        break;
                }
                break;
        }
            
        });
    }

    startGameTimer(){
        this.gameTimer = setInterval(() => {
            gameManager.updateGame();        
        }, this.updateFrequency);
    };

    stopGameTimer(){
        if (this.gameTimer)
            clearInterval(this.gameTimer);
    }
}