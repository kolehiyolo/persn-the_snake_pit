// The state of this boolean determines if logging the key translations is permitted
// let enableLogTranslateKey = false;
let enableLogTranslateKey = false;

function logTranslateKey() {
    if (enableLogTranslateKey === false) {
        return false;
    }
    let logEvent;
    let activeUser = players[`player${active.id}`];
    switch (key.type) {
        case "misc":
            logEvent = `${activeUser.main.misc}`;
            break;
        case "skill":
            logEvent = `'${activeUser.main.skill}'`;
            break;
        case "direction":
            logEvent = `'${activeUser.main.direction}'`;
            break;
    }
    console.log(`--TK: Player ${active.id} -> ${key.type}: '${key.id}' = ${logEvent}`);
}

// This function does the following:
// On game-initialize.js, we set an event listener that looks for keypress
// Then, the key pressed is passed on to key.id
// Now, translateKey() converts the key.id into relevant game information
// We find which player controls matches with key.id
// Then, when we find a control key that matches with key.id, we determine the following:
// // Which player it's associated with (player1 or player2)
// // Which type it is (direction, ability, misc)
// // Which type value it is (ie direction.up, skill.skill1, misc.exit etc)
function translateKey() {
    key.valid = false;
    FindMatchingControls: {
        for (let i in players) {
            for (let j in players[i].controls) {
                for (let k in players[i].controls[j]) {
                    for (let l in players[i].controls[j][k]) {
                        if (key.id === players[i].controls[j][k][l]) {
                            key.valid = true;
                            key.type = k;
                            players[i].main[key.type] = l;
                            active.id = (i === `player1`) ? 1 : 2;
                            enemy.id = (active.id === 1) ? 2 : 1;
                            break FindMatchingControls;
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