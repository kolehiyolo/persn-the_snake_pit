var player1 = {
    playerNumber: 1,
    playerName: undefined,
    direction: undefined,
    activeAbility: undefined,
    score: 0,
    snake: undefined
};

var player2 = {
    playerNumber: 1,
    playerName: undefined,
    direction: undefined,
    activeAbility: undefined,
    score: 0,
    snake: undefined
};

var activePlayer = {
    playerNumber: undefined,
    playerName: undefined,
    direction: undefined,
    activeAbility: undefined,
    activeMisc: undefined,
    score: 0,
    snake: undefined,
}

var p1Controls ;
var p2Controls ;

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
        up: "o",
        down: "l",
        left: "k",
        right: ";",

        strike: "[",
        ability1: "]",
        ability2: "\\",

        aux: "Enter",
        exit: "8",
    }

    // Now we define the Alternative Controls for each player
    p1Controls.upAlt = p1Controls.up.toUpperCase();
    p1Controls.downAlt = p1Controls.down.toUpperCase();
    p1Controls.leftAlt = p1Controls.left.toUpperCase() ; 
    p1Controls.rightAlt = p1Controls.right.toUpperCase() ; 
    p1Controls.strikeAlt = p1Controls.strike.toUpperCase() ; 
    p1Controls.ability1Alt = p1Controls.ability1.toUpperCase() ; 
    p1Controls.ability2Alt = p1Controls.ability2.toUpperCase() ; 
    p1Controls.auxAlt = p1Controls.aux.toUpperCase() ; 
    p1Controls.exitAlt = p1Controls.exit.toUpperCase() ; 

    p2Controls.upAlt = p2Controls.up.toUpperCase();
    p2Controls.downAlt = p2Controls.down.toUpperCase();
    p2Controls.leftAlt = p2Controls.left.toUpperCase() ; 
    p2Controls.rightAlt = p2Controls.right.toUpperCase() ; 
    p2Controls.strikeAlt = p2Controls.strike.toUpperCase() ; 
    p2Controls.ability2Alt = p2Controls.ability1.toUpperCase() ; 
    p2Controls.ability2Alt = p2Controls.ability2.toUpperCase() ; 
    p2Controls.auxAlt = p2Controls.aux.toUpperCase() ; 
    p2Controls.exitAlt = p2Controls.exit.toUpperCase() ; 
}

setControls() ;