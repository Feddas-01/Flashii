function abrirPopup(){
    document.getElementById("overlay").style.display = "flex";
}

function fecharPopup(){
    document.getElementById("overlay").style.display = "none";

    document.addEventListener("click", (event) => {
    if (!overlay.contains(event.target)) {
        overlay.style.display = "none"; 
    }
});
}