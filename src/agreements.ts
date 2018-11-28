enum TileType {
    Empty = 0, Dirt, Stone, Brick
}

enum BonusType {
    Diamond = 0, Iron, Gold
}

interface Properties2D {
    x:number;
    y:number;
    sizeX: number;
    sizeY: number;
}

interface LevelData {
    fullMap: TileType[][];
    Bonuses: {
        type: BonusType;
        coord: {
            x: number;
            y: number;
        }
    }[];
    mapSize : {
        x: number;
        y: number;
    };
    // startPosition : {
    //     x: number;
    //     y: number;
    // }; 
    // finishPosition : {
    //     x: number;
    //     y: number;
    // };
    
    // todo doors and levers
}