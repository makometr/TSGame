class EventManager {
    private updateFrequency: number;
    private gameTimer: NodeJS.Timeout | null;

    constructor(){
        console.log("event manager init!");
        this.updateFrequency = 30;
        this.gameTimer = null;

        document.addEventListener('keydown', (event:any) => {
            let keyName = event.key;
            console.log('Событие keydown: ' + keyName);
        
            switch (keyName){
                    case "Enter":
                        console.log("Enter pressed");
                        gameManager.startLevel();
                        break;
                    case "Escape":
                        console.log("Esc Pressed");
                        gameManager.stopLevel();
                        break;
                    case "ArrowLeft":
                        gameManager.moveHero(DirectionMove.Left);
                        break;
                    case "ArrowRight":
                        gameManager.moveHero(DirectionMove.Right);
                        break;
                    case "ArrowDown":
                    case "ArrowUp":    
                        break;
                //     ActiveFigure.moveLeft();
                //     ActiveFigure.moveRight();
                //     break;
                //     doStep();
                //     resetTimer();
                //     break;
                //     ActiveFigure.rotate();
                //     break;
            }
            // updateGame();
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