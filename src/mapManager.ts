class MapManager {
    private map: TileType[][];
    private mapSize : {
        x: number;
        y: number;
    };


    constructor(){
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
        console.log("Updatae mao!");

    }
}

