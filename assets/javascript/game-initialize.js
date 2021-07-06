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
setGameState("gameChoose");

// This function sets the new Game State as well as logs it
function setGameState(newGameState) {
    gameState = newGameState;
    console.clear();
    console.log("GAME STATE = " + gameState);

    switch (gameState) {
        case "gameChoose":
            gameChooseDefaults();
            console.log("This is the state where Players choose their Snake");
            console.log("\n");
            break;
        case "gameStarted":
            console.log("This is the state where Players can now fight");
            console.log("\n");
            setGameStarted();
            break;
    }
}

function setPromptMsgs(speed, sizes, messages) {
    // First, we add the Prompt Div
    $(`body main`).append(`<div id="game-prompts-div" class="hidden"></div>`);

    // Then, set the Prompt Div Messages
    for (let i = 1; i <= 4; i++) {
        $(`#game-prompts-div`).append(`<p id="prompt-msg-${i}" class="prompt-msgs"></p>`);
        if (sizes[i - 1] != undefined) {
            $(`#prompt-msg-${i}`).addClass(`${sizes[i-1]}Prompt`);
            $(`#prompt-msg-${i}`).html(`${messages[i-1]}`);
        }
    }

    // Finally, we show the Prompt Div
    setTimeout(() => {
        $("#game-prompts-div").addClass(`${speed}Speed`);
        $("#game-prompts-div").removeClass("hidden");
        $("#game-prompts-div").addClass("show");
    }, 1);
}

function remPromptMsgs(speed) {
    // First, we hide the Prompt Div
    $("#game-prompts-div").addClass(`${speed}Speed`);
    $("#game-prompts-div").removeClass("show");
    $("#game-prompts-div").addClass("hidden");

    // Finally, we delete the Prompt Div altogether
    setTimeout(() => {
        $(`#game-prompts-div`).remove();
    }, 2000);
}

function resetHeaderMsgs() {
    $(`#header-msg-1`).html("");
    $(`#header-msg-2`).html("");
    $(`#header-msg-3`).html("");
    $(`#header-msg-4`).html("");
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