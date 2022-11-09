let meldung = document.getElementById("meldung");
let scoreElementPlayer = document.getElementById("scorePlayer");
let scoreElementComp = document.getElementById("scoreComp");
let rundenText = document.getElementById("rundenText");
let roundInputs = document.getElementById("roundInputs");
let scorePlayer = 0;
let scoreComp = 0;
let auswahlPlayer = 0;
let rounds = 0;
let roundValue = 0;

// Anzahl Rundenindex ermitteln
function getRoundInput() {
    let inputRounds = document.querySelectorAll('[name="round"]')
    for (let r of inputRounds) {
        if (r.checked) {
            return (r.value);
        }
    };
};

// Spielfunktion
function game(auswahl) {
    if (roundValue == 0) {
        if (getRoundInput()) {
            roundValue = getRoundInput();
            roundInputs.classList.add("d-none");
        }
        else {
            alert("Bitte wähle die Rundenzahl aus!");
        }
    }
    if (roundValue > 0) {
        rounds++;
        if (rounds <= roundValue) {
            auswahlPlayer = auswahl;
            scoreZaehler();
            rundenText.innerHTML = rounds + "/" + roundValue;
            if (rounds == roundValue) {
                winnerText();
            }
        }
    }
}

// Spielrunde; wer hat gewonnen

    // unentschieden = 0
    // player = 1
    // comp = 2

function gameRound (player) {
    // Auswahl Comp
    let comp = Math.ceil(Math.random()* 3);
    let gewinn;
    if (player == comp) {
        //unentschieden
        gewinn = 0;
        meldung.innerHTML = "Unentschieden, keiner gewinnt";
    }
    if (player == 1 && comp == 2) {
        // Stein -> Papier = Papier
        gewinn = 2;
        meldung.innerHTML = "Player wählt Stein, Comp wählt Papier. Comp gewinnt.";
    }
    if (player == 1 && comp == 3){
        // Stein -> Schere = Stein
        gewinn = 1;
        meldung.innerHTML = "Player wählt Stein, Comp wählt Schere. Player gewinnt.";
    }
    if (player == 2 && comp == 1) {
        // Papier -> Stein = Papier
        gewinn = 1;
        meldung.innerHTML = "Player wählt Papier, Comp wählt Stein. Player gewinnt.";
    }
    if (player == 2 && comp == 3) {
        // Papier -> Schere = Schere
        gewinn = 2;
        meldung.innerHTML = "Player wählt Papier, Comp wählt Schere. Comp gewinnt.";
    }
    if (player == 3 && comp == 1) {
        // Schere -> Stein = Stein
        gewinn = 2;
        meldung.innerHTML = "Player wählt Schere, Comp wählt Stein. Comp gewinnt.";
    }
    if (player == 3 && comp == 2) {
        // Schere -> Papier = Schere
        gewinn = 1;
        meldung.innerHTML = "Player wählt Schere, Comp wählt Papier. Player gewinnt.";
    }
    return gewinn;
}   

// Punkte hochzählen
function scoreZaehler() {
    switch (gameRound(auswahlPlayer)) {
        case 1: 
            scorePlayer ++;
            scoreElementPlayer.innerHTML = scorePlayer;

            break;
        case 2: 
            scoreComp ++;
            scoreElementComp.innerHTML = scoreComp;
    }
}

// Gewinnmeldung
function winnerText() {
    if (scorePlayer > scoreComp) {
        meldung.innerHTML = "Player gewinnt!";
    } 
    if (scorePlayer < scoreComp) {
        meldung.innerHTML = "Comp gewinnt!";
    }
    if (scorePlayer == scoreComp) {
        meldung.innerHTML = "Unentschieden";
    }
};

// Auswahl Player => Spielablauf
document.getElementById("rock").addEventListener("click", function (e) {
   game(1);
});
document.getElementById("paper").addEventListener("click", function (e) {
    game(2);
});

document.getElementById("scissors").addEventListener("click", function (e) {
    game(3);
});