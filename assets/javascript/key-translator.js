// The state of this boolean determines if logging the key translations is permitted
// let enableLogTranslateKey = false;
let enableLogTranslateKey = false;

function logTranslateKey() {
    let logEvent;
    let activePlayer = player[`p${active.id}`];
    if (key.type != undefined && enableLogTranslateKey === true) {
        switch (key.type) {
            case "misc":
                switch (activePlayer.main.misc) {
                    case "aux":
                        logEvent = `'Aux'`;
                        break;
                    case "exit":
                        logEvent = `'Exit'`;
                        break;
                }
                break;
            case "ability":
                switch (activePlayer.main.ability) {
                    case 0:
                        logEvent = `'Strike'`;
                        break;
                    case 1:
                    case 2:
                        logEvent = `'Ability ${activePlayer.main.ability}'`;
                        break;
                }
                break;
            case "direction":
                logEvent = `'${activePlayer.main.direction}'`;
                break;
        }
        console.log(`--TK: Player ${active.id} -> ${key.type}: '${key.id}' = ${logEvent}`);
    }
}

function translateKey() {
    key.valid = false;
    checkControls: {
        for (let i in controls) {
            for (let j in controls[i]) {
                for (let k in controls[i][j]) {
                    for (let l in controls[i][j][k]) {
                        if (key.id === controls[i][j][k][l]) {
                            key.valid = true;
                            key.type = k;
                            player[i].main[key.type] = l;
                            active.id = parseInt(i[1]);
                            enemy.id = (active.id === 1) ? 2 : 1;
                            activePlayer = player[`p${active.id}`];
                            enemyPlayer = player[`p${enemy.id}`];
                            break checkControls;
                        }
                    }
                }
            }
        }
    }
    // Finally, we log the entire translation
    if (key.valid === true) {
        logTranslateKey();
    }
}