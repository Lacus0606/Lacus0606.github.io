const etelek = [["Margareta", "Pizza", 28, 1900, "paradicsomos alap, sajt"],
["Margareta", "Pizza", 32, 2400, "paradicsomos alap, sajt"],
["Margareta", "Pizza", 45, 5200, "paradicsomos alap, sajt"],
["Salami", "Pizza", 28, 2100, "paradicsomos alap, szalámi, paradicsom, sajt"],
["Salami", "Pizza", 32, 2600, "paradicsomos alap, szalámi, paradicsom, sajt"],
["Salami", "Pizza", 45, 5500, "paradicsomos alap, szalámi, paradicsom, sajt"],
["Songoku", "Pizza", 28, 2200, "paradicsomos alap, sonka, gomba, kukorica, sajt"],
["Songoku", "Pizza", 32, 2700, "paradicsomos alap, sonka, gomba, kukorica, sajt"],
["Songoku", "Pizza", 45, 5700, "paradicsomos alap, sonka, gomba, kukorica, sajt"],
["Bologna", "Pizza", 28, 2400, "bolognai ragus alap, sajt"],
["Bologna", "Pizza", 32, 3000, "bolognai ragus alap, sajt"],
["Bologna", "Pizza", 45, 6000, "bolognai ragus alap, sajt"],
["Napoli", "Pizza", 28, 2600, "paradicsomos alap, csirkemell, paradicsom, lilahagyma, sajt"],
["Napoli", "Pizza", 32, 3200, "paradicsomos alap, csirkemell, paradicsom, lilahagyma, sajt"],
["Napoli", "Pizza", 45, 6200, "paradicsomos alap, csirkemell, paradicsom, lilahagyma, sajt"],
["Sima hamburger", "Hamburger", "" , 1550, "zsemle, alap öntet, húspogácsa, saláta, uborka"],
["Sajtburger", "Hamburger", "" , 1700, "zsemle, alap öntet, csirke húspogácsa, saláta, uborka"],
["Csirkeburger", "Hamburger", "" , 1750, "zsemle, alap öntet, húspogácsa, saláta, uborka"],
["Zöldséges hamburger", "Hamburger", "" , 1650, "zsemle, alap öntet, húspogácsa, saláta, uborka, paradicsom, hagyma"],
["Vega hamburger", "Hamburger", "" , 1750, "zsemle, alap öntet, vega húspogácsa, saláta, uborka, paradicsom, hagyma"]];



function ablakElo(Nev, Meret, Osszetevok, Ar){
    let ablakJelen = document.getElementById("ablak");
    ablakJelen.classList.remove("hidden");
    let overlay = document.getElementById("overlay");
    overlay.classList.add("active");
    sessionStorage.setItem("etelekNev", Nev);
    sessionStorage.setItem("etelekMeret", Meret);
    sessionStorage.setItem("etelekAr", Ar);
    if (Meret!="") {
        document.getElementById("etelNev").innerText = Nev + "(" + Meret + ")";
    }
    else {
        document.getElementById("etelNev").innerText = Nev;
    }
    document.getElementById("etelOsszetevok").innerText = "-" + Osszetevok;
    document.getElementById("etelAr").innerText = Ar + " Ft/db";
}

function ablakBezar(){
    let ablakBezar = document.getElementById("ablak");
    ablakBezar.classList.add("hidden");
    let overlay= document.getElementById("overlay");
    overlay.classList.remove("active");
}

function addToCart(nev, meret, ar){
    let kosar = JSON.parse(sessionStorage.getItem("kosar")) || [];
    kosar.push({
        nev: nev,
        ar: Number(ar),
        meret: meret,
    })
    sessionStorage.setItem("kosar", JSON.stringify(kosar));
}
function kosarTablazat(){
    const kosarTable = document.getElementById("kosarTartalom");
    const osszesito = document.getElementById("osszesito");
    const kosarUres = document.getElementById("kosarUres");
    
    let kosar = JSON.parse(sessionStorage.getItem("kosar")) || [];
    sessionStorage.setItem("kosarszam", kosar.length);
    document.getElementById("kosarSzam").innerText = sessionStorage.getItem("kosarszam");
    

    if(kosar.length>0){
        let szum=500;
        kosar.forEach(item => {
            const row = document.createElement("tr");
    
            const column1 = document.createElement("td");
            if (item.meret!="") {
                column1.innerText = item.nev + " (" + item.meret + " cm)";
            }
            else { 
                column1.innerText = item.nev;
            }
            const column2 = document.createElement("td");
            column2.innerText = item.ar + " Ft"


            szum = szum + 200 + item.ar;
            row.append(column1,column2);
            kosarTable.append(row);
    
        });
    document.getElementById("kosar").classList.remove("hidden");
    document.getElementById("kosarTorol").classList.remove("hidden");
    kosarUres.classList.add("hidden");
    document.getElementById("kosarSzum").innerText = szum + " Ft";
    osszesito.classList.remove("hidden");
    }
}
kosarTablazat();
function kosarbaTesz(){
    ablakBezar();
    addToCart(sessionStorage.getItem("etelekNev"), sessionStorage.getItem("etelekMeret"), sessionStorage.getItem("etelekAr"));
    let kosar = JSON.parse(sessionStorage.getItem("kosar")) || [];
    sessionStorage.setItem("kosarszam", kosar.length);
    document.getElementById("kosarSzam").innerText = sessionStorage.getItem("kosarszam");
}


document.getElementById("kosarTorol").addEventListener("click", function(){
    sessionStorage.clear();   
    document.getElementById("kosar").classList.add("hidden");
    document.getElementById("osszesito").classList.add("hidden");
    const kosarSzamElem = document.getElementById("kosarSzam");
    kosarSzamElem.innerText = 0;
    document.getElementById("kosarUres").classList.remove("hidden");
    document.getElementById("kosarUres").innerText = "A kosár még üres. Kérjük válasszon a kínálatunkból!"
    document.getElementById("kosarTorol").classList.add("hidden");
    
    const kosarTable = document.getElementById("kosarTartalom");
    while(kosarTable.hasChildNodes){
        kosarTable.removeChild(kosarTable.firstChild)
    }
   
})
