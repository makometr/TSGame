class SpriteManager {
    private images : HTMLImageElement[];
    private imageNames: string[];
    private picturesLoaded: number;
    private picturesNumber: number;

    constructor() {
        console.log("Sprite manager init!");
        this.imageNames = ["img", "empty.png", "dirt.png", "stone.png", "brick.png", "bkg.png"];
        this.picturesLoaded = 0;
        let folderName = this.imageNames[0];
        this.picturesNumber = this.imageNames.length-1;
        this.images = [];

        for (let i:number = 0; i < this.picturesNumber; i++){
            this.images[i] = new Image();
            this.images[i].src = `${folderName}/${this.imageNames[i+1]}`;
            this.images[i].onload = (() => {
                this.picturesLoaded++;
                console.log("End loading img", this.images[i], this.picturesLoaded);
            });

        }
    }

    isLoaded():boolean{
        return this.picturesLoaded == this.picturesNumber ? true : false;
    }

    loadData(){
        console.log("data Sprite loaded!");
    }

    getHelloWindowBackgroundImage(){
        return this.images[4];
    }

    getTileSpriteType(type:TileType){
        switch (type){
            case TileType.Empty: return this.images[0];
            case TileType.Dirt:  return this.images[1];
            case TileType.Stone:  return this.images[2];
            case TileType.Brick:  return this.images[3];
        }
    }
}