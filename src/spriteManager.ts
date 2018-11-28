class SpriteManager {
    private images : HTMLImageElement[];
    private tileSprites : HTMLImageElement[];
    private bonusSprites : HTMLImageElement[];

    private imageNames: string[];
    private tileNames: string[];
    private bonusNames: string[];
    private spritesLoaded: number;
    private spritesNumber: number;

    constructor(folder:string, imageNams: string[], tileNums:string[], bonusNums:string[]) {
        console.log("Sprite manager init!");
        let folderName = folder;
        this.imageNames = imageNams;
        this.tileNames = tileNums;
        this.bonusNames = bonusNums;

        this.spritesLoaded = 0;
        this.spritesNumber = this.imageNames.length + this.tileNames.length + this.bonusNames.length;
        this.images = [];
        this.tileSprites = [];
        this.bonusSprites = [];

        for (let i:number = 0; i < this.imageNames.length; i++){
            this.images[i] = new Image();
            this.images[i].src = `${folderName}/${this.imageNames[i]}`;
            this.images[i].onload = (() => {
                this.spritesLoaded++;
                console.log("End loading img", this.images[i], this.spritesLoaded);
            });
        };
        for (let i:number = 0; i < this.tileNames.length; i++){
            this.tileSprites[i] = new Image();
            this.tileSprites[i].src = `${folderName}/${this.tileNames[i]}`;
            this.tileSprites[i].onload = (() => {
                this.spritesLoaded++;
                console.log("End loading img", this.tileSprites[i], this.spritesLoaded);
            });
        };
        for (let i:number = 0; i < this.spritesNumber; i++){
            this.bonusSprites[i] = new Image();
            this.bonusSprites[i].src = `${folderName}/${this.bonusNames[i]}`;
            this.bonusSprites[i].onload = (() => {
                this.spritesLoaded++;
                console.log("End loading img", this.bonusSprites[i], this.spritesLoaded);
            });
        };
    }

    isLoaded():boolean{
        return this.spritesLoaded == this.spritesNumber ? true : false;
    }

    loadData(){
        console.log("data Sprite loaded!");
    }

    getHelloWindowBackgroundImage(){
        return this.images[0];
    }

    getHeroSprite(){
        return this.images[1];
    }

    getTileSpriteType(type:TileType){
        switch (type){
            case TileType.Empty: return this.tileSprites[0];
            case TileType.Dirt:  return this.tileSprites[1];
            case TileType.Stone:  return this.tileSprites[2];
            case TileType.Brick:  return this.tileSprites[3];
        }
    };

    getBonusSpriteType(type:BonusType){
        switch (type){
            case BonusType.Diamond: return this.bonusSprites[0];
            case BonusType.Ruby: return this.bonusSprites[1];
            case BonusType.Sapphire: return this.bonusSprites[2];
        }
    }
}