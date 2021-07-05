var player1;
var player2;
var activePlayer;
var enemyPlayer;

var p1Controls;
var p2Controls;

var food1;
var food2;
var food3;
var superFood;

function setPlayers() {
    player1 = {
        playerNumber: 1,
        playerName: "Tristan",
        direction: undefined,
        activeAbility: undefined,
        activeMisc: undefined,
        score: 0,
        
        gameSnake: undefined,
        gamePosition: [undefined, undefined],

        chooseSnake: undefined,
        chooseReady: false,
        chooseClicked: false,
        chooseGridPosition: [undefined, undefined],

        startedCoordinate: [undefined, undefined]
    };

    player2 = {
        playerNumber: 2,
        playerName: "Theolo",
        direction: undefined,
        activeAbility: undefined,
        activeMisc: undefined,
        score: 0,

        gameSnake: undefined,
        gamePosition: [undefined, undefined],

        chooseSnake: undefined,
        chooseReady: false,
        chooseClicked: false,
        chooseGridPosition: [undefined, undefined],

        startedCoordinate: [undefined, undefined]
    };

    activePlayer = {
        playerNumber: undefined,
        playerName: undefined,
        direction: undefined,
        activeAbility: undefined,
        activeMisc: undefined,
        score: 0,

        gameSnake: undefined,
        gamePosition: [undefined, undefined],

        chooseSnake: undefined,
        chooseReady: false,
        chooseClicked: false,
        chooseGridPosition: [undefined, undefined],

        startedCoordinate: [undefined, undefined]
    }

    enemyPlayer = {
        playerNumber: undefined,
        playerName: undefined,
        direction: undefined,
        activeAbility: undefined,
        activeMisc: undefined,
        score: 0,

        gameSnake: undefined,
        gamePosition: [undefined, undefined],

        chooseSnake: undefined,
        chooseReady: false,
        chooseClicked: false,
        chooseGridPosition: [undefined, undefined],

        startedCoordinate: [undefined, undefined]
    }
}

function setActivePlayer() {
    switch (activePlayer.playerNumber) {
        case 1:
            activePlayer = {
                playerNumber: player1.playerNumber,
                playerName: player1.playerName,
                direction: player1.direction,
                activeAbility: player1.activeAbility,
                activeMisc: player1.activeMisc,
                score: player1.score,

                gameSnake: player1.gameSnake,
                gamePosition: player1.gamePosition,

                chooseSnake: player1.chooseSnake,
                chooseReady: player1.chooseReady,
                chooseClicked: player1.chooseClicked,
                chooseGridPosition: player1.chooseGridPosition,

                startedCoordinate: player1.startedCoordinate
            }
            break;
        case 2:
            activePlayer = {
                playerNumber: player2.playerNumber,
                playerName: player2.playerName,
                direction: player2.direction,
                activeAbility: player2.activeAbility,
                activeMisc: player2.activeMisc,
                score: player2.score,

                gameSnake: player2.gameSnake,
                gamePosition: player2.gamePosition,

                chooseSnake: player2.chooseSnake,
                chooseReady: player2.chooseReady,
                chooseClicked: player2.chooseClicked,
                chooseGridPosition: player2.chooseGridPosition,

                startedCoordinate: player2.startedCoordinate
            }
            break;
    }
}

function setEnemyPlayer() {
    switch (activePlayer.playerNumber) {
        case 1:
            enemyPlayer = {
                playerNumber: player2.playerNumber,
                playerName: player2.playerName,
                direction: player2.direction,
                activeAbility: player2.activeAbility,
                activeMisc: player2.activeMisc,
                score: player2.score,

                gameSnake: player2.gameSnake,
                gamePosition: player2.gamePosition,

                chooseSnake: player2.chooseSnake,
                chooseReady: player2.chooseReady,
                chooseClicked: player2.chooseClicked,
                chooseGridPosition: player2.chooseGridPosition,

                startedCoordinate: player2.startedCoordinate
            }
            break;
        case 2:
            enemyPlayer = {
                playerNumber: player1.playerNumber,
                playerName: player1.playerName,
                direction: player1.direction,
                activeAbility: player1.activeAbility,
                activeMisc: player1.activeMisc,
                score: player1.score,

                gameSnake: player1.gameSnake,
                gamePosition: player1.gamePosition,

                chooseSnake: player1.chooseSnake,
                chooseReady: player1.chooseReady,
                chooseClicked: player1.chooseClicked,
                chooseGridPosition: player1.chooseGridPosition,

                startedCoordinate: player1.startedCoordinate
            }
            break;
    }
}

function setControls() {
    // Here are the Primary Controls for Player 1
    p1Controls = {
        up: "w",
        down: "s",
        left: "a",
        right: "d",

        strike: "c",
        ability1: "v",
        ability2: "b",

        aux: " ",
        exit: "y",
    };

    // Here are the Primary Controls for Player 2
    p2Controls = {
        up: "i",
        down: "k",
        left: "j",
        right: "l",

        strike: "[",
        ability1: "]",
        ability2: "\\",

        aux: "Enter",
        exit: "8",
    }

    // Now we define the Alternative Controls for each player
    p1Controls.upAlt = p1Controls.up.toUpperCase();
    p1Controls.downAlt = p1Controls.down.toUpperCase();
    p1Controls.leftAlt = p1Controls.left.toUpperCase();
    p1Controls.rightAlt = p1Controls.right.toUpperCase();
    p1Controls.strikeAlt = p1Controls.strike.toUpperCase();
    p1Controls.ability1Alt = p1Controls.ability1.toUpperCase();
    p1Controls.ability2Alt = p1Controls.ability2.toUpperCase();
    p1Controls.auxAlt = p1Controls.aux.toUpperCase();
    p1Controls.exitAlt = p1Controls.exit.toUpperCase();

    p2Controls.upAlt = p2Controls.up.toUpperCase();
    p2Controls.downAlt = p2Controls.down.toUpperCase();
    p2Controls.leftAlt = p2Controls.left.toUpperCase();
    p2Controls.rightAlt = p2Controls.right.toUpperCase();
    p2Controls.strikeAlt = p2Controls.strike.toUpperCase();
    p2Controls.ability2Alt = p2Controls.ability1.toUpperCase();
    p2Controls.ability2Alt = p2Controls.ability2.toUpperCase();
    p2Controls.auxAlt = p2Controls.aux.toUpperCase();
    p2Controls.exitAlt = p2Controls.exit.toUpperCase();
}

setPlayers();
setControls();