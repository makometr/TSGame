abstract class Entity  {
    geometry: Properties2D;

    constructor(geom:Properties2D){
        this.geometry = geom;
    }

    checkOverlap(geomChecked:Properties2D): boolean {
        if (geomChecked.x+geomChecked.sizeX >= this.geometry.x)
            if (geomChecked.y+geomChecked.sizeY >= this.geometry.y)
                return true;
        return false;
        // TODO TESTS доделать beta 0.1
    }
}

class BonusEntity extends Entity {
    type:BonusType;

    constructor(entType:BonusType, x_coord:number, y_coord:number) {
        super({x: x_coord, y: y_coord, sizeX: 10, sizeY: 15});
        this.type = entType;
    }
}

class Hero {
    geometry: Properties2D;
    speedX: number;
    speedY: number;

    constructor(geom:Properties2D){
        this.geometry = geom;
        this.speedX = 0;
        this.speedY = 0;
    }

    move(direction:DirectionMove){
        if (direction == DirectionMove.Left)
            this.geometry.x -= 5;
        if (direction == DirectionMove.Right)
            this.geometry.x += 5;

    }
}

class MapManager {
    private spriteWidth:number; // in pixels
    private spriteManager:SpriteManager | null; // may be do public?
    
    playerModel: Hero;
    private map: TileType[][];
    private bonuses: BonusEntity[];
    private mapSize : {
        x: number;
        y: number;
    };

    private mapSizeInPixels : {
        x: number;
        y: number;
    }


    constructor(spr_man:SpriteManager){
        this.spriteManager = spr_man;
        this.spriteWidth = 25;

        this.map = [];
        this.bonuses = [];
        this.mapSize = {x:0, y:0};
        this.playerModel = new Hero({x:0, y:0, sizeX:20, sizeY:25}); // костыль

        for (var i: number = 0; i < this.mapSize.x; i++) {
            this.map[i] = [];
            for(var j: number = 0; j < this.mapSize.y; j++) {
                this.map[i][j] = TileType.Empty;
            }
        }
        this.mapSizeInPixels = {x:0, y:0};
    }

    initByLevelData(data:LevelData){
        console.log("Map manager inited by data");
        this.mapSize = data.mapSize;
        this.map = data.fullMap;

        data.Bonuses.forEach(bonus => {
            let x_coord_bonus: number = bonus.coord.x * this.spriteWidth;
            let y_coord_bonus: number = bonus.coord.y * this.spriteWidth;
            let newBonus = new BonusEntity(bonus.type, x_coord_bonus, y_coord_bonus);
            this.bonuses.push(newBonus);
        });
        this.mapSizeInPixels = {x: data.mapSize.x*this.spriteWidth, y: data.mapSize.y*this.spriteWidth };

        this.playerModel = new Hero({x:data.startPosition.x, y:data.startPosition.y, sizeX:20, sizeY:25});
    }

    drawCurrentMapState(){
        // this.drawBackground();
        this.drawTiles();
        this.drawBonuses();
        this.drawHero();
    }

    drawImg(sprite:HTMLImageElement, x:number, y:number){
        let ctx = htmlPage.getCanvas();
        ctx.drawImage(sprite, x, y);
    }

    drawTiles(){
        if (!this.spriteManager) return;
        let curX:number = 0;
        let curY:number = 0;
        let step:number = this.spriteWidth;
        for (let i:number = 0; i < this.mapSize.y; i++, curY += step){
            for (let j:number = 0, curX = 0; j < this.mapSize.x; j++, curX += step){
                // console.log("coord x y type", curX, curY, this.map[i][j]);
                // this.drawTile(ctx, this.map[i][j], curX, curY);
                this.drawImg(this.spriteManager.getTileSpriteType(this.map[i][j]), curX, curY);
            }
        }
    }

    drawBonuses(){
        let ctx = htmlPage.getCanvas();
        let curX:number = 0;
        let curY:number = 0;
        let step:number = this.spriteWidth;
        this.bonuses.forEach(bonus => {
            if (!this.spriteManager) return;
            this.drawImg(this.spriteManager.getBonusSpriteType(bonus.type), bonus.geometry.x, bonus.geometry.y);
        });
    }

    drawHero(){
        if (!this.spriteManager) return;
        this.drawImg(this.spriteManager.getHeroSprite(), this.playerModel.geometry.x, this.playerModel.geometry.y);
    }

    moveHero(direction:DirectionMove){
        this.playerModel.move(direction);
        this.checkBorders();

    }   
    
    checkBorders() {
        if (this.playerModel.geometry.x <= 0)
            this.playerModel.geometry.x = 0;

        if (this.playerModel.geometry.x + this.playerModel.geometry.sizeX >= this.mapSizeInPixels.x)
            this.playerModel.geometry.x = this.mapSizeInPixels.x - this.playerModel.geometry.sizeX;

        if (this.playerModel.geometry.y <= 0)
            this.playerModel.geometry.y = 0;

        if (this.playerModel.geometry.y + this.playerModel.geometry.sizeY >= this.mapSizeInPixels.y)
            this.playerModel.geometry.y = this.mapSizeInPixels.y - this.playerModel.geometry.sizeY;

    }
}

