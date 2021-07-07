// The state of this boolean determines if logging the key translations is permitted
var enableLogTranslateKey = false;

function logTranslateKey() {
    var logEvent;
    if (keyType != undefined && enableLogTranslateKey === true) {
        switch (keyType) {
            case "misc":
                switch (activePlayer.activeMisc) {
                    case "aux":
                        logEvent = "'Aux'";
                        break;
                    case "exit":
                        logEvent = "'Exit'";
                        break;
                }
                break;
            case "ability":
                switch (activePlayer.activeAbility) {
                    case 0:
                        logEvent = "'Strike'";
                        break;
                    case 1:
                    case 2:
                        logEvent = "'Ability '" + activePlayer.activeAbility + "'";
                        break;
                }
                break;
            case "direction":
                logEvent = "'" + activePlayer.direction + "'";
                break;
        }
        console.log("--TK: Player " + activePlayer.playerNumber + " -> " + keyType + ":'" + key + "' = " + logEvent);
    }
}

function translateKey(key) {
    let keyIsValid = false;
    // These commands are triggered when any of the players press their Aux or Exit key
    checkControls: {
        for (let i in controls) {
            for (let j in controls[i]) {
                for (let k in controls[i][j]) {
                    for (let l in controls[i][j][k]) {
                        if (key === controls[i][j][k][l]) {
                            // console.log(`FOUND IT!`);
                            keyIsValid = true;

                            activePlayer.main.id = parseInt(i[1]);
                            keyType = k;

                            player[i].main[keyType] = l;
                            // console.log(`activePlayer.${keyType} = ${players[`${i}`].main[keyType]}`);
                            break checkControls;
                        }
                    }
                }
            }
        }
    }

    // Then, once the activePlayer has been set, we complete the activePlayer and set the enemyPlayer
    if (keyIsValid === true) {
        setPlayerRoles();
        // console.log(`activePlayer.main.id = ${activePlayer.main.id}`);
        // console.log(`activePlayer.main.name = ${activePlayer.main.name}`);
        // console.log(`activePlayer.main.direction = ${activePlayer.main.direction}`);
        // console.log(`activePlayer.main.ability = ${activePlayer.main.ability}`);
        // console.log(`activePlayer.main.misc = ${activePlayer.main.misc}`);
        // console.log(`\n`); 

        // Finally, we log the entire translation
        logTranslateKey();
    }
}