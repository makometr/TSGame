class PhysicsManager {
    private spriteWidth:number;
    private mapSize : {
        x: number;
        y: number;
    }
    private playerModel?:Hero;

    constructor() {
        this.spriteWidth = 25;
        this.mapSize = {x:0, y:0};
    }

    initByLevelData(data:LevelData, hero:Hero){
        this.mapSize = {x: data.mapSize.x*this.spriteWidth, y: data.mapSize.y*this.spriteWidth };
        this.playerModel = hero;

    }

    moveHero(direction:DirectionMove){
        if (!this.playerModel) return;
        this.playerModel.move(direction);
        this.checkBorders();
    }   
    
    checkBorders() {
        if (!this.playerModel) return;
        if (this.playerModel.geometry.x <= 0)
            this.playerModel.geometry.x = 0;

        if (this.playerModel.geometry.x + this.playerModel.geometry.sizeX >= this.mapSize.x)
            this.playerModel.geometry.x = this.mapSize.x - this.playerModel.geometry.sizeX;

        if (this.playerModel.geometry.y <= 0)
            this.playerModel.geometry.y = 0;

        if (this.playerModel.geometry.y + this.playerModel.geometry.sizeY >= this.mapSize.y)
            this.playerModel.geometry.y = this.mapSize.y - this.playerModel.geometry.sizeY;

    }
}