enum TileType {
    Empty = 0, Dirt, Stone, Brick
}

enum StaticMapObject {
    Diamond, Iron, Gold
}

interface LevelData {
    fullMap: TileType[][];
    // Objects: {
    //     type: StaticMapObject;
    //     coordinate: {
    //         x: number;
    //         y: number;
    //     }
    // }[];
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