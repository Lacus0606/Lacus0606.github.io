function windowPopUp(){
    let overlay = document.getElementById("overlay");
    overlay.classList.add("active");
    let window = document.getElementById("window");
    window.classList.remove("hidden");
}

function closeWindow(){
    let overlay = document.getElementById("overlay");
    overlay.classList.remove("active");
    let window = document.getElementById("window");
    window.classList.add("hidden");
}