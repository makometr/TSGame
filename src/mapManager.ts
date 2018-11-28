class MapManager {
    private spriteWidth:number; // in pixels
    private spriteManager:SpriteManager | null;
    
    private map: TileType[][];
    private mapSize : {
        x: number;
        y: number;
    };


    constructor(spr_man:SpriteManager){
        this.spriteManager = spr_man;
        this.spriteWidth = 25;
        this.map = [];
        this.mapSize = {x:0, y:0};

        for(var i: number = 0; i < this.mapSize.x; i++) {
            this.map[i] = [];
            for(var j: number = 0; j < this.mapSize.y; j++) {
                this.map[i][j] = TileType.Empty;
            }
        }
    }

    initByLevelData(data:LevelData){
        console.log("Map manager inited by data");
        this.mapSize = data.mapSize;
        this.map = data.fullMap;
    }

    drawCurrentMapState(){
        // console.log("Updatae mao!");
        let ctx = htmlPage.getCanvas();
        let curX:number = 0;
        let curY:number = 0;
        let step:number = this.spriteWidth;
        for (let i:number = 0; i < this.mapSize.y; i++, curY += step){
            for (let j:number = 0, curX = 0; j < this.mapSize.x; j++, curX += step){
                console.log("coord x y type", curX, curY, this.map[i][j]);
                this.drawTile(ctx, this.map[i][j], curX, curY);
            }
        }

    }

    drawTile(ctx:any, type:TileType, x:number, y:number){
        if (!this.spriteManager) return;
        ctx.drawImage(this.spriteManager.getTileSpriteType(type), x, y);
    }
}

