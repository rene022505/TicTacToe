const zeile = ["t", "m", "b"];
const spalte = ["l", "c", "r"];
const gewinner = document.getElementById("gewinner-screen");
const nope = document.getElementById("nope");
const text = document.getElementsByClassName("text")[0];
const button = document.getElementsByClassName("button")[0];

let count = 0;

let felder = {};

let spieler = true;

/*

    ! Aufbau
    ? div-name: div, kreuz(0)/kreis(1)
    
*/

const allesNeu = () => {
    for (z of zeile) {
        for (s of spalte) {
            felder[z + s] = [document.getElementsByClassName(z + s), -1];
        }
    }
};

allesNeu();

for (const i in felder) {
    const feld = felder[i][0][0];

    feld.addEventListener("click", function() {
        if (felder[feld.className][1] === -1 && spieler === true) {
            kreuz(feld);
            if (gewonnen() === 0) {
                klassenZeug();
                text.innerHTML = "Kreuz hat gewonnen";
            }
            spieler = false;
            count++;
        } else if (felder[feld.className][1] === -1 && spieler === false) {
            kreis(feld);
            if (gewonnen() === 1) {
                klassenZeug();
                text.innerHTML = "Kreis hat gewonnen";
            }
            spieler = true;
            count++;
        }
        if (gewonnen() === -1 && count === 9) {
            klassenZeug();
            text.innerHTML = "Unentschieden";
        }
    });
}

const kreuz = feld => {
    let bild = document.createElement("IMG");
    bild.src = "./Bilder/times-solid.png";
    bild.classList.add("bild");

    feld.appendChild(bild);
    felder[feld.className][1] = 0;
};

const kreis = feld => {
    let bild = document.createElement("IMG");
    bild.src = "./Bilder/circle-regular.png";
    bild.classList.add("bild");

    feld.appendChild(bild);
    felder[feld.className][1] = 1;
};

const welcherSpieler = spieler => {
    for (var i = 0; i < 3; i++) {
        if (
            felder[zeile[i] + spalte[0]][1] === spieler &&
            felder[zeile[i] + spalte[1]][1] === spieler &&
            felder[zeile[i] + spalte[2]][1] === spieler
        ) {
            return true;
        }
    }
    for (var i = 0; i < 3; i++) {
        if (
            felder[zeile[0] + spalte[i]][1] === spieler &&
            felder[zeile[1] + spalte[i]][1] === spieler &&
            felder[zeile[2] + spalte[i]][1] === spieler
        ) {
            return true;
        }
    }
    if (
        (felder["tl"][1] === spieler &&
            felder["mc"][1] === spieler &&
            felder["br"][1] === spieler) ||
        (felder["tr"][1] === spieler &&
            felder["mc"][1] === spieler &&
            felder["bl"][1] === spieler)
    ) {
        return true;
    }
};

const gewonnen = () => {
    if (welcherSpieler(1)) {
        return 1;
    } else if (welcherSpieler(0)) {
        return 0;
    } else {
        return -1;
    }
};

button.addEventListener("click", () => {
    allesNeu();
    for (const i in felder) {
        const feld = felder[i][0][0];
        if (feld.childNodes[0] !== undefined) {
            feld.removeChild(feld.childNodes[0]);
        }
        gewinner.classList.remove("gewinner-screen-on");
        gewinner.classList.add("gewinner-screen-off");
        nope.classList.remove("nope-on");
        nope.classList.add("nope-off");
        count = 0;
        spieler = true;
    }
});

const klassenZeug = () => {
    gewinner.classList.add("gewinner-screen-on");
    gewinner.classList.remove("gewinner-screen-off");
    nope.classList.add("nope-on");
    nope.classList.remove("nope-off");
};
