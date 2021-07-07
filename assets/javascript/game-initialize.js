// This variable represents the current game state, which will be used to determine what the keys are supposed to do at a time
var gameState;
var key;
var keyType;

// These are the options
gameState = "gameChoose"; // This is the state when the Players are at the Snake Selection phase
gameState = "gameStarted"; // This is the state after the Players choose their Snakes and the board is set
gameState = "gamePaused"; // This is the state when any of the Players pause the game
gameState = "gameContinued"; // This is the state when the game is resumed after gamePause
gameState = "gameOver"; // This is the state when one or both Players lose

// Here we assign the gameState as "gameChoose" by default
// This way, the game starts at the Snake Selection phase
// TEST
// setGameState("gameChoose");
player1.chooseSnake = "apopis";
player2.chooseSnake = "orochi";
setGameState("gameStarted");


// This function sets the new Game State as well as logs it
function setGameState(newGameState) {
    gameState = newGameState;
    console.clear();
    console.log("GAME STATE = " + gameState);

    switch (gameState) {
        case "gameChoose":
            setGameChoose();
            console.log("This is the state where Players choose their Snake");
            console.log("\n");
            break;
        case "gameStarted":
            console.log("This is the state where Players can now fight");
            setGameStarted();
            console.log("\n");
            break;
    }
}

// This is the event listener that takes any keypress from the keyboard
$("html").keypress(function (e) {
    // First, for ease of use, we set the key to the variable "key"
    key = e.key;

    // Second, we take the key to the translateKey() function which basically extracts more information based on the key
    // It's quite difficult to explain, but the function simply triggers changes to game variables, which helps in determining what the key means in relation to the player
    translateKey(key);

    // Then, we trigger the gameState functions
    switch (gameState) {
        case "gameChoose":
            gameChoose(key);
            break;
        case "gameStarted":
            gameStarted(key);
            break;
        case "gamePaused":
            gamePaused(key);
            break;
        case "gameContinued":
            gameContinued(key);
            break;
        case "gameOver":
            gameOver(key);
            break;
    }

    console.log("\n");
});

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