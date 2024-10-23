function ablakElo(){
    let overlay = document.getElementById("overlay");
    overlay.classList.add("active");
    let ablak = document.getElementById("ablak");
    ablak.classList.remove("hidden");
}

function ablakBezar(){
    let overlay = document.getElementById("overlay");
    overlay.classList.remove("active");
    let ablak = document.getElementById("ablak");
    ablak.classList.add("hidden");
}

function tovabbiHelyszin(){
    ablakBezar();
    window.location.href = "helyszinek.html"
}

function menu() {
    let menuAblak = document.getElementById("menu-ablak");
    let overlay = document.getElementById("overlay");
    
    if (menuAblak.classList.contains("hidden")) {
        menuAblak.classList.remove("hidden");
        overlay.classList.add("active");
    } 
    else {
        menuAblak.classList.add("hidden");
        overlay.classList.remove("active")
    }
}

function media() {
    window.location.href= "media.html"
}