function startGame(){
    console.log("game started!");
    let inputElem: HTMLInputElement = document.getElementById("inputName") as HTMLInputElement;
    let name: string = inputElem.value;
    if (name == ""){
        alert("Имя должно быть!");
        return;
    }
    console.log(name);
    window.location.href = "/game";
}