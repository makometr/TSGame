function startGame(){
    console.log("game started!");
    let inputElem: HTMLInputElement = document.getElementById("inputName") as HTMLInputElement;
    let name: string = inputElem.value;
    console.log(name);
}