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

function ablakElo1 (){
    let overlay = document.getElementById("overlay");
    overlay.classList.add("active");
    let ablak = document.getElementById("ablak");
    ablak.classList.remove("hidden");
    document.getElementById("ablak-helyszin").innerText = "Csillámzátony";
    document.getElementById("ablak-info").innerText = "Kristálytiszta víz, szivárványszínű korallok, és a mélyben csillogó tengeri csillagok.";
}

function ablakElo2(){
    let overlay = document.getElementById("overlay");
    overlay.classList.add("active");
    let ablak = document.getElementById("ablak");
    ablak.classList.remove("hidden");
    document.getElementById("ablak-helyszin").innerText = "Kagylókert";
    document.getElementById("ablak-info").innerText = "Egy korábbi helyszín, ahol az egész zátonyt hatalmas, gyöngyökkel teli kagylók borítják. Igazi paradicsom a nézőknek, és kiváló helyszín a korallhúzásra.";
}

function ablakElo3(){
    let overlay = document.getElementById("overlay");
    overlay.classList.add("active");
    let ablak = document.getElementById("ablak");
    ablak.classList.remove("hidden");
    document.getElementById("ablak-helyszin").innerText = "Áramlat-öböl";
    document.getElementById("ablak-info").innerText = "Ez a hely különösen jó a szörfös versenyekhez, mivel erős és kiszámíthatatlan áramlatok húzódnak rajta keresztül. Ideális a gyorsasági sportokhoz!";
}


function ablakBezar(){
    let overlay = document.getElementById("overlay");
    overlay.classList.remove("active");
    let ablak = document.getElementById("ablak");
    ablak.classList.add("hidden");
}