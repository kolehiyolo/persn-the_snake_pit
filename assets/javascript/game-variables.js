let player;
let controls;
let activePlayer;
let enemyPlayer;

let food1;
let food2;
let food3;
let superFood;

function setPlayers() {
    player = {
        p1: {
            main: {
                id: 1,
                name: undefined,
                direction: undefined,
                ability: undefined,
                misc: undefined,
            },

            choose: {
                snake: undefined,
                position: [undefined, undefined],
                ready: false,
                clicked: false,
            },

            arena: {
                snake: undefined,
                position: [undefined],
                direction: undefined,
            }
        }
    }
    player.p2 = JSON.parse(JSON.stringify(player.p1));
    player.p2.main.id = 2;
    player.p1.main.name = "Tristan";
    player.p2.main.name = "Theolo";

    activePlayer = JSON.parse(JSON.stringify(player.p1));
    activePlayer.main.id = undefined;
    activePlayer.main.name = undefined;
    enemyPlayer = JSON.parse(JSON.stringify(activePlayer));
}

function setPlayerRoles() {
    let activeID = activePlayer.main.id;
    let enemyID;
    if (activeID === 1) {
        enemyID = 2;
    } else {
        enemyID = 1;
    }

    activePlayer.main = JSON.parse(JSON.stringify(player[`p${activeID}`].main));
    activePlayer[gameState] = JSON.parse(JSON.stringify(player[`p${activeID}`][gameState]));

    enemyPlayer.main = JSON.parse(JSON.stringify(player[`p${enemyID}`].main));
    enemyPlayer[gameState] = JSON.parse(JSON.stringify(player[`p${enemyID}`][gameState]));
}

function setPlayerValues() {
    let activeID = activePlayer.main.id;
    let enemyID;
    if (activeID === 1) {
        enemyID = 2;
    } else {
        enemyID = 1;
    }

    player[`p${activeID}`].main = JSON.parse(JSON.stringify(activePlayer.main));
    player[`p${activeID}`][gameState] = JSON.parse(JSON.stringify(activePlayer[gameState]));

    player[`p${enemyID}`].main = JSON.parse(JSON.stringify(enemyPlayer.main));
    player[`p${enemyID}`][gameState] = JSON.parse(JSON.stringify(enemyPlayer[gameState]));    
}

function setControls() {
    controls = {
        p1: {
            // Here are the Primary Controls for Player 1
            main: {
                direction: {
                    up: "w",
                    down: "s",
                    left: "a",
                    right: "d",
                },
                ability: {
                    strike: "c",
                    ability1: "v",
                    ability2: "b",
                },
                misc: {
                    aux: " ",
                    exit: "t",
                }
            },
        },
        // Here are the Primary Controls for Player 2
        p2: {
            main: {
                direction: {
                    up: "i",
                    down: "k",
                    left: "j",
                    right: "l",
                },
                ability: {
                    strike: "[",
                    ability1: "]",
                    ability2: "\\",
                },
                misc: {
                    aux: "Enter",
                    exit: "8",
                }
            }
        }
    }

    controls.p1.alt = JSON.parse(JSON.stringify(controls.p1.main));
    controls.p2.alt = JSON.parse(JSON.stringify(controls.p2.main));

    // Now we define the Alternative Controls for each player
    for (let i = 1; i <= 2; i++) {
        for (let j in controls[`p${i}`].main) {
            for (let k in controls[`p${i}`].main[j]) {
                controls[`p${i}`].alt[j][k] = controls[`p${i}`].main[j][k].toUpperCase();
            }
        }
    }
}

setPlayers();
setControls();