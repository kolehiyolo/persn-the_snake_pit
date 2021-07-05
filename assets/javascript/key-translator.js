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
        console.log("--TK: Player " + activePlayer.playerNumber + " -> "+keyType+":'" + key + "' = " + logEvent);
    }
}

function translateKey(key) {
    // These commands are triggered when any of the players press their Aux or Exit keys
    if (
        key === p1Controls.aux || key === p1Controls.auxAlt ||
        key === p1Controls.exit || key === p1Controls.exitAlt ||
        key === p2Controls.aux || key === p2Controls.auxAlt ||
        key === p2Controls.exit || key === p2Controls.exitAlt
    ) {
        keyType = "misc";
        keyToMisc(key);
    }

    // These commands are triggered when any of the players press any of their ability keys
    else if (
        key === p1Controls.strike || key === p1Controls.strikeAlt ||
        key === p1Controls.ability1 || key === p1Controls.ability1Alt ||
        key === p1Controls.ability2 || key === p1Controls.ability2Alt ||
        key === p2Controls.strike || key === p2Controls.strikeAlt ||
        key === p2Controls.ability1 || key === p2Controls.ability1Alt ||
        key === p2Controls.ability2 || key === p2Controls.ability2Alt
    ) {
        keyType = "ability";
        keyToAbility(key);
    }

    // These commands are triggered when any of the players press any of their directional keys
    else if (
        key === p1Controls.up || key === p1Controls.upAlt ||
        key === p1Controls.down || key === p1Controls.downAlt ||
        key === p1Controls.left || key === p1Controls.leftAlt ||
        key === p1Controls.right || key === p1Controls.rightAlt ||
        key === p2Controls.up || key === p2Controls.upAlt ||
        key === p2Controls.down || key === p2Controls.downAlt ||
        key === p2Controls.left || key === p2Controls.leftAlt ||
        key === p2Controls.right || key === p2Controls.rightAlt
    ) {
        keyType = "direction";
        keyToDirection(key);
    }

    // Otherwise, the keyType has to be cleared
    else {
        keyType = undefined;
    }

    // Then, once the activePlayer has been set, we complete the activePlayer and set the enemyPlayer
    setActivePlayer();
    setEnemyPlayer();

    // Finally, we log the entire translation
    logTranslateKey();
}

// This function converts any aux key into valuable info
function keyToMisc(key) {
    // This determines which player pressed the aux key
    switch (key) {
        case p1Controls.aux:
        case p1Controls.auxAlt:
            activePlayer.playerNumber = 1;
            player1.activeMisc = "aux";
            break;
        case p1Controls.exit:
        case p1Controls.exitAlt:
            activePlayer.playerNumber = 1;
            player1.activeMisc = "exit";
            break;
    }

    switch (key) {
        case p2Controls.aux:
        case p2Controls.auxAlt:
            activePlayer.playerNumber = 2;
            player2.activeMisc = "aux";
            break;
        case p2Controls.exit:
        case p2Controls.exitAlt:
            activePlayer.playerNumber = 2;
            player2.activeMisc = "exit";
            break;

    }
}

// This function converts any ability key into valuable info
function keyToAbility(key) {
    // This determines if Player 1 pressed the ability key and which ability they want
    switch (key) {
        case p1Controls.strike:
        case p1Controls.strikeAlt:
            activePlayer.playerNumber = 1;
            player1.activeAbility = 0;

            break;
        case p1Controls.ability1:
        case p1Controls.ability1Alt:
            activePlayer.playerNumber = 1;
            player1.activeAbility = 1;
            break;
        case p1Controls.ability2:
        case p1Controls.ability2Alt:
            activePlayer.playerNumber = 1;
            player1.activeAbility = 2;
            break;
    }

    // This determines if Player 2 pressed the ability key and which ability they want
    switch (key) {
        case p2Controls.strike:
        case p2Controls.strikeAlt:
            activePlayer.playerNumber = 2;
            player2.activeAbility = 0;
            break;
        case p2Controls.ability1:
        case p2Controls.ability1Alt:
            activePlayer.playerNumber = 2;
            player2.activeAbility = 1;
            break;
        case p2Controls.ability2:
        case p2Controls.ability2Alt:
            activePlayer.playerNumber = 2;
            player2.activeAbility = 2;
            break;
    }
}

// This function converts any directional key into valuable info
function keyToDirection(key) {
    // This determines if Player 1 pressed the key and which direction they want
    switch (key) {
        case p1Controls.up:
        case p1Controls.upAlt:
            activePlayer.playerNumber = 1;
            player1.direction = "up";
            break;
        case p1Controls.down:
        case p1Controls.downAlt:
            activePlayer.playerNumber = 1;
            player1.direction = "down";
            break;
        case p1Controls.left:
        case p1Controls.leftAlt:
            activePlayer.playerNumber = 1;
            player1.direction = "left";
            break;
        case p1Controls.right:
        case p1Controls.rightAlt:
            activePlayer.playerNumber = 1;
            player1.direction = "right";
            break;
    }

    // This determines if Player 2 pressed the key and which direction they want
    switch (key) {
        case p2Controls.up:
        case p2Controls.upAlt:
            activePlayer.playerNumber = 2;
            player2.direction = "up";
            break;
        case p2Controls.down:
        case p2Controls.downAlt:
            activePlayer.playerNumber = 2;
            player2.direction = "down";
            break;
        case p2Controls.left:
        case p2Controls.leftAlt:
            activePlayer.playerNumber = 2;
            player2.direction = "left";
            break;
        case p2Controls.right:
        case p2Controls.rightAlt:
            activePlayer.playerNumber = 2;
            player2.direction = "right";
            break;
    }
}