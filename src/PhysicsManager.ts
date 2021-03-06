class PhysicsManager {
    private spriteWidth:number;
    private pixelsPerFrame: number;
    private mapSize : {
        x: number;
        y: number;
    }
    private tilesMap: TileType[][] = [];
    private playerModel?:Hero;

    private dx:number;
    private dy:number;

    // private TILE: number     = 25;
    // private METER: number    = this.TILE;
    // private GRAVITY: number  = 9.8 * 6; // default (exagerated) gravity
    // private MAXDX: number    = 15;      // default max horizontal speed (15 tiles per second)
    // private MAXDY: number    = 60;      // default max vertical speed   (60 tiles per second)
    // private ACCEL: number    = 1/2;     // default take 1/2 second to reach maxdx (horizontal acceleration)
    // private FRICTION: number = 1/6;     // default take 1/6 second to stop from maxdx (horizontal friction)
    // private IMPULSE: number  = 1500;    // default player wantsJump impulse

    // t2p(t:number){
    //     return t * this.TILE
    // }
    // p2t(p:number){
    //     return Math.floor(p/this.TILE);      
    // }
    // cell (x:number,y:number) {
    //     return this.tcell(this.p2t(x),this.p2t(y));    
    // }
    // tcell(tx:number,ty:number) {
    //     return cells[tx + (ty*MAP.tw)]
    // }
    private maxTileX = 0; // 9
    private maxTileY = 0; // 19
    private tilesDownToCheck:{x:number, y:number}[] = [];
    private tileX: number = 0;
    private tileY: number = 0;
    private isFalling: boolean = false;

    private wantsLeft:boolean = false;
    private wantsRight:boolean = false;
    private wantsJump:boolean = false;
    private ddy:number = 0;

    calculateTileCoord(){
        if (!this.playerModel) return;
        this.tileX =  Math.floor(this.playerModel.geometry.x / this.spriteWidth);
        this.tileY =  Math.floor(this.playerModel.geometry.y / this.spriteWidth);
    }

    getTilesDownToCheck(){
        if (!this.playerModel) return;
        this.tilesDownToCheck = [];
        if (this.tileY == this.maxTileY) return; // last floor, nothing to check down
        this.tilesDownToCheck.push({x:this.tileX, y: this.tileY+1});
        if (this.tileX == this.maxTileX) return; // last column, nothing to check wantsRight
        let tilePosition:number = this.playerModel.geometry.x % this.spriteWidth;
        // 0-4: 1 tile to check, 5-24: 2 tiles to check
        if (!(tilePosition >= 0 && tilePosition < 5))
            this.tilesDownToCheck.push({x:this.tileX+1, y: this.tileY+1});
    }

    checkTilesDown(){
        // if tiles down are "exist" falling cancelled
        let isGroundDown:boolean = false;
        this.tilesDownToCheck.forEach(tile => {
            if (this.tilesMap[tile.y][tile.x] != TileType.Empty)
                isGroundDown = true;
        });
        // isGroundDown ? console.log("Down ground!") : console.log("Down not ground!");
        isGroundDown ? this.isFalling = false : this.isFalling = true;
    }


    constructor() {
        this.spriteWidth = 25;
        this.pixelsPerFrame = 2;
        this.mapSize = {x:0, y:0};
        this.dx = 0;
        this.dy = 0;
    }

    initByLevelData(data:LevelData, hero:Hero){
        this.maxTileX = data.mapSize.x - 1;
        this.maxTileY = data.mapSize.y - 1;
        this.mapSize = {x: data.mapSize.x*this.spriteWidth, y: data.mapSize.y*this.spriteWidth };
        this.playerModel = hero;
        this.tilesMap = data.fullMap;
    }

    updateHeroCoordinate(){
        if (!this.playerModel) return;

        if (this.wantsLeft && this.dx < 0)
            this.dx -= 3;
        if (this.wantsLeft && this.dx > 0)
            this.dx -= 2;
        if (this.wantsLeft && this.dx == 0)
            this.dx -= 3;
        
        if (this.wantsRight && this.dx > 0)
            this.dx += 2;
        if (this.wantsRight && this.dx < 0)
            this.dx += 2;
        if (this.wantsRight && this.dx == 0)
            this.dx += 3;

        //  friction
        if (this.dx > 0) this.dx -= 1;
        if (this.dx < 0) this.dx += 1;

        // speed limit
        if (this.dx > 20) this.dx = 20;
        if (this.dx < -20) this.dx = -20;

        if (!this.isFalling){
            this.dy = 0;
            this.ddy = 0;
        }
        
        if (this.wantsJump && this.isFalling)
            this.wantsJump = false;
        
        if (this.wantsJump)
            this.dy = -16;
        
        
        this.ddy += 1;
        this.dy += this.ddy;
        
        if (!this.isFalling && this.dy > 0){
            this.dy = 0;
            this.playerModel.geometry.y = this.tileY * this.spriteWidth;
        }
    }
    
    updateHero(){
        if (!this.playerModel) return;
        
        this.calculateTileCoord();
        this.getTilesDownToCheck();
        this.checkTilesDown();
        
        
        this.updateHeroCoordinate();
        this.playerModel.geometry.x += this.dx;
        this.playerModel.geometry.y += this.dy;
        
        this.calculateTileCoord();
        this.getTilesDownToCheck();
        this.checkTilesDown();
        if (!this.isFalling && (this.playerModel.geometry.y % 25 != 0))
        this.playerModel.geometry.y -= this.playerModel.geometry.y % 25;
        
        this.checkBorders();
        console.log("X:", this.playerModel.geometry.x, "Y:", this.playerModel.geometry.y, "dX:", this.dx, "dy:", this.dy);
    }

    moveHero(direction:DirectionMove, isDown:boolean){
        if (direction == DirectionMove.Left) this.wantsLeft = isDown;
        if (direction == DirectionMove.Right) this.wantsRight = isDown;
        if (direction == DirectionMove.Jump) this.wantsJump = isDown;
    }
    
    checkBorders() {
        if (!this.playerModel) return;
        if (this.playerModel.geometry.x <= 0){
            this.playerModel.geometry.x = 0;
            this.dx = 0;
        }

        if (this.playerModel.geometry.x + this.playerModel.geometry.sizeX >= this.mapSize.x){
            this.playerModel.geometry.x = this.mapSize.x - this.playerModel.geometry.sizeX;
            this.dx = 0;
        }

        if (this.playerModel.geometry.y <= 0){
            this.playerModel.geometry.y = 0;
            this.dy = 0;
            this.ddy = 0;
        }

        if (this.playerModel.geometry.y + this.playerModel.geometry.sizeY >= this.mapSize.y){
            this.playerModel.geometry.y = this.mapSize.y - this.playerModel.geometry.sizeY;
            this.dy = 0;
            this.ddy = 0;
        }

    }
}