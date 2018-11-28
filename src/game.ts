class htmlElems {
    private ctx: any;
    
    constructor(){
        let canvas = <HTMLCanvasElement> document.getElementById("gameCanvas");
        this.ctx = canvas.getContext("2d");
    }

    getCanvas(){
        return this.ctx;
    }
}
var htmlPage:any;
var gameManager:GameManager;

window.onload = function(){
    console.log("Page loaded!");
    htmlPage = new htmlElems();
    gameManager = new GameManager();

}
