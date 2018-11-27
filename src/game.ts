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

window.onload = function(){
    console.log("Page loaded!");
    let gameManager = new GameManager();
    htmlPage = new htmlElems();

}
