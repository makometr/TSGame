class SpriteManager {
    private images : HTMLImageElement[];
    private imageNames: string[];
    private picturesLoaded: number;
    private picturesNumber: number;

    constructor() {
        console.log("Sprite manager init!");
        this.picturesLoaded = 0;
        this.picturesNumber = 1;
        this.images = [];
        this.imageNames = ["img", "bkg.png"];
        let folderName = this.imageNames[0];

        for (let i:number = 0; i < this.picturesNumber; i++){
            this.images[i] = new Image();
            this.images[i].src = `${folderName}/${this.imageNames[i+1]}`;
            console.log("sas", this.images[i].src);
            this.images[i].onload = (() => {
                this.picturesLoaded++;
                console.log("End", this.images[i], this.picturesLoaded);
            });

        }
        // while (this.picturesLoaded != this.picturesNumber){
        //     console.log("sas");
        // };
    }

    isLoaded():boolean{
        return this.picturesLoaded == this.picturesNumber ? true : false;
    }

    loadData(){
        console.log("data Sprite loaded!");
    }

    gethelloWindowBackgroundImage(){
        return this.images[0];
    }
}