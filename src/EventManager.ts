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
        this.updateFrequency = 50;
        this.gameTimer = null;
        this.currentState = State.Menu;

        document.addEventListener('keydown', (event:any) => {
            let keyName = event.key;
            // console.log('Событие keydown: ' + keyName);
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
                        this.mapManager.physicsManager.moveHero(DirectionMove.Jump, true);
                        break;
                    case "Escape":
                        console.log("Game paused");
                        gameManager.stopLevel();
                        this.currentState = State.Pause;
                        break;
                    case "ArrowLeft":
                        this.mapManager.physicsManager.moveHero(DirectionMove.Left, true);
                        break;
                    case "ArrowRight":
                        this.mapManager.physicsManager.moveHero(DirectionMove.Right, true);
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
        // event.preventDefault();
        });

        document.addEventListener('keyup', (event:any) => {
            let keyName = event.key;
            // console.log('Событие keyup: ' + keyName);
            switch(this.currentState){
                case State.Game:
                    switch (keyName){
                        case " ":
                            this.mapManager.physicsManager.moveHero(DirectionMove.Jump, false);
                            break;
                        case "ArrowLeft":
                            this.mapManager.physicsManager.moveHero(DirectionMove.Left, false);
                            break;
                        case "ArrowRight":
                            this.mapManager.physicsManager.moveHero(DirectionMove.Right, false);
                            break;   
                    }
                    break;
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