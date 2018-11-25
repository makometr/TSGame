enum TileType {
    Empty = 0, Dirt, Stone, Lava
}

export class mapManager {
    private map: TileType[][];
    mapSize : {
        x: number;
        y: number;
    };


    constructor(){
        this.map = [];

        for(var i: number = 0; i < this.mapSize.x; i++) {
            this.map[i] = [];
            for(var j: number = 0; j < this.mapSize.y; j++) {
                this.map[i][j] = TileType.Empty;
            }
        }
        console.log(this.map);
    }

}

