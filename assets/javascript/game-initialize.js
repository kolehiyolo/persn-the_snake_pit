// These are the options
game.state = "choose"; // This is the state when the Players are at the Snake Selection phase
game.state = "arena"; // This is the state after the Players choose their Snakes and the board is set
game.state = "paused"; // This is the state when any of the Players pause the game
game.state = "continued"; // This is the state when the game is resumed after gamePause
game.state = "over"; // This is the state when one or both Players lose

// Here we assign the gameState as "gameChoose" by default
// This way, the game starts at the Snake Selection phase
// TEST
// player.p1.choose.snake = "apopis";
// player.p1.choose.snake = "orochi";
// player.p1.choose.snake = "quetzalcoatl";
// player.p1.choose.snake = "lóng";
// player.p1.choose.snake = "jörmungandr";
// player.p1.choose.snake = "ouroboros";

player.p1.choose.snake = "lóng";
player.p2.choose.snake = "jörmungandr";
setGameState("arena");
// setGameState("choose");


// This function sets the new Game State as well as logs it
function setGameState(newGameState) {
    game.state = newGameState;
    console.clear();
    console.log("GAME STATE = " + game.state);

    switch (game.state) {
        case "choose":
            console.log("This is the state where Players choose their Snake");
            console.log("\n");
            setChoose();
            break;
        case "arena":
            console.log("This is the state where Players can now fight");
            console.log("\n");
            setArena();
            break;
    }
}

// This is the event listener that takes any keypress from the keyboard
$("html").keypress(function (e) {
    pressKey(e);
});

function pressKey(e) {
    // First, for ease of use, we set the key to the variable "key"
    key.id = e.key;

    // Second, we take the key to the translateKey() function which basically extracts more information based on the key
    // It's quite difficult to explain, but the function simply triggers changes to game variables, which helps in determining what the key means in relation to the player
    translateKey();

    // Then, we trigger the gameState functions
    switch (game.state) {
        case "choose":
            gameChoose();
            break;
        case "arena":
            gameArena();
            break;
        case "gamePaused":
            gamePaused();
            break;
        case "gameContinued":
            gameContinued();
            break;
        case "gameOver":
            gameOver();
            break;
    }
}

// ! These are the functions that are yet to be set-up
function gamePaused(key) {
    console.log("Activated gamePaused() phase");
}

function gameContinued(key) {
    console.log("Activated gameContinued() phase");
}

function gameOver2(key) {
    console.log("Activated gameOver2() phase");
}
// These are the functions that are yet to be set-up !