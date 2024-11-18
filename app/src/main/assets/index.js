function musicFnJavaScript(){
    var result = Dialog.playMusic("This was sent from JavaScript\n");
    var h1 = document.createElement("h1");
    h1.textContent = result;
    document.body.appendChild(h1);
}