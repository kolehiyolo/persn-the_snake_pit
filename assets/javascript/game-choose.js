// The state of this boolean determines if logging the gameChoose() events is permitted
let enableLogGameChoose = true;
// This represents the 2d array of the Selection Grid
let selectSnakeGrid;

// These are the variables used on the Game Start Timer
let gameStartCountdownActive; // This boolean is true if the timer is active
let gameStartCountdownTimer; // This contains the timer itself, and this variable is used for clearing
let gameStartCountdownCounter; // This is the counter for the countdown

function logChoose() {
    let logEvent;
    let activePlayer = player[`p${active.id}`];
    if (key.type != undefined && enableLogGameChoose === true) {
        switch (key.type) {
            case "misc":
                switch (activePlayer.main.misc) {
                    case "aux":
                        switch (activePlayer.choose.clicked) {
                            case true:
                                if (gameStartCountdownActive === false) {
                                    // If the Active Player already clicked, the following command is prompted
                                    switch (activePlayer.choose.ready) {
                                        case true:
                                            logEvent = `Ready with ${activePlayer.choose.snake}`;
                                            break;
                                        case false:
                                            logEvent = `Selected ${activePlayer.choose.snake}`;
                                            break;
                                    }
                                } else {
                                    logEvent = `'Countdown Already Started'`;
                                }
                                break;
                            case false:
                                // If not, the following command is prompted 
                                logEvent = `'Nothing Selected Yet'`;
                        }
                        break;
                    case "exit":
                        switch (gameStartCountdownActive) {
                            case true:
                                logEvent = `'Canceled Countdown'`;
                                break;
                            case false:
                                logEvent = `'Not Ready'`;
                                break;
                        }
                        break;
                }
                break;
            case "ability":
                logEvent = `'NO EFFECT'`;
                break;
            case "direction":
                logEvent = `'Hovering over ${activePlayer.choose.snake}'`;
                break;
        }

        console.log(`--gameChoose: Player ${active.id} -> ${key.type}: '${key.id}' = ${logEvent}`);
    }
}

function setChoose() {
    setChooseSnakesGrid();
    selectSnakeGrid = [
        ["apopis", "orochi", "quetzalcoatl"],
        ["lóng", "jörmungandr", "ouroboros"]
    ];

    player.p1.choose = {
        snake: "apopis",
        position: [0, 0],
        ready: false,
        clicked: false
    }

    player.p2.choose = {
        snake: "quetzalcoatl",
        position: [0, 2],
        ready: false,
        clicked: false
    }

    gameStartCountdownActive = false;
    gameStartCountdownTimer = undefined;

    // $("#game-arena").addClass("hidden");

    $(".snake-player_1-icon").html(player.p1.main.name);
    $(".snake-player_2-icon").html(player.p2.main.name);

    $("#choose-player_1-button").html(player.p1.main.name + " is Not Ready");
    $("#choose-player_2-button").html(player.p2.main.name + " is Not Ready");
}

function gameChoose() {
    // Placeholder Variables
    let activePlayer = player[`p${active.id}`];
    let enemyPlayer = player[`p${enemy.id}`];
    let activeID = activePlayer.main.id;
    let activeName = activePlayer.main.name;
    let activeDirection = activePlayer.main.direction;
    let activeAbility = activePlayer.main.ability;
    let activeMisc = activePlayer.main.misc;

    let activeSnake = activePlayer.choose.snake;
    let activePosition = activePlayer.choose.position;
    let activeReady = activePlayer.choose.ready;
    let activeClicked = activePlayer.choose.clicked;

    let playerReadyButtonID = "choose-player_" + activeID + "-button";

    // The following commands are triggered when a miscellaneous key is pressed
    if (key.type === "misc") {
        switch (activeMisc) {
            /* Aux Key */
            case "aux":
                if (activeClicked === true) {
                    // Placeholder Variables
                    let playerReadyButtonStyling = "choose-" + activeSnake + "-hover ready-div-hover choose-" + activeSnake + "-font_color";

                    // If the player pressed the aux key when they haven't selected the snake they're on yet, these commands are fulfilled
                    if ($("#" + playerReadyButtonID).hasClass(playerReadyButtonStyling) === false) {
                        // We set that the Player isn't ready yet
                        activeReady = false;

                        // We set the styling on the Player Ready button
                        $("#" + playerReadyButtonID).attr("class", "choose-player-button");
                        $("#" + playerReadyButtonID).addClass(playerReadyButtonStyling);

                        // Finally, we set the text on the button
                        $("#" + playerReadyButtonID).html(activeName + " chooses " + activeSnake);
                    }
                    // If the player pressed the aux key when they've already selected the snake they're on, these commands are fulfilled, meaning they're ready
                    else {
                        setPlayerReady(true);
                    }

                    // We then assign the activePlayer ready value to the actual player
                    // setPlayerValues();
                }

                /* Players Ready */
                // If both Players are ready, then we trigger the gameStartCountdown()
                if (player.p1.choose.ready === true && player.p2.choose.ready === true) {
                    /* Same Snakes */
                    // If the Players have the same snake, the Active Player is "unreadied" and must choose another snake
                    if (activeSnake === enemyPlayer.choose.snake) {
                        // Placeholder Variables
                        $(`.snake-player_${activeID}-icon-hover`).removeClass(`choose-${activeSnake}-hover choose-${activeSnake}-font_color`);
                        $("#" + playerReadyButtonID).html(activeName + " chooses " + activeSnake);

                        // We first show the Prompt
                        // The prompt then tells that the Enemy Player already chose the snake
                        // FIX - The name of the snake has to be capitalized on the prompt
                        // FIX - We should reeaally set up proper functions that manipulate styling
                        let promptMsgArray = [];
                        promptMsgArray.push(`<span class='choose-${enemyPlayer.choose.snake}-font_color'>${enemyPlayer.main.name}</span> selected ${enemyPlayer.choose.snake} first`);
                        setPromptMsgs("quick", ["small"], promptMsgArray);
                        activePlayer.choose.ready = false;
                        // Then, the prompt closes after a while
                        setTimeout(function () {
                            // The prompt is hidden
                            setTimeout(function () {
                                remPromptMsgs("medium", 1000);
                                // We then "unready" the Active Player
                                setPlayerReady(false);
                            }, 300);

                        }, 1500);
                    }

                    /* Start Countdown */
                    // Otherwise, the countdown is started
                    else if (gameStartCountdownActive === false) {
                        gameStartCountdown();
                    }
                }

                break;

                /* Exit Key */
            case "exit":
                // Placeholder Variables    
                // The following commands are triggered when the countdown is active and exit is clicked
                if (gameStartCountdownActive === true) {
                    // First, we stop the Countdown Timer
                    clearInterval(gameStartCountdownTimer);

                    // We then broadcast that the active player is not ready
                    $(".prompt-msg-light").html((activeName + " is not Ready").toUpperCase());

                    // We then establish that the boolean switch is false and the active player is not ready
                    gameStartCountdownActive = false;
                    activePlayer.choose.ready = false;

                    // Finally, we hide the Countdown div and remove the styling from the Active Player's Ready button, indicating that they aren't ready
                    setTimeout(function () {
                        // We remove the styling on the Ready button as well as broadcast the unready-ing
                        setPlayerReady(false);
                        // We finally hide the prompt
                        remPromptMsgs("slow", 1000);
                    }, 1000);
                }

                // If the countdown hasn't started yet, the exit button sets the Active Player "unready"
                else if (gameStartCountdownActive === false) {
                    // This is the unready-ing of the Active Player
                    activeReady = false;

                    // We remove the styling on the Ready button as well as broadcast the unready-ing
                    setPlayerReady(false);
                }
                break;
        }
        // We then assign the activePlayer ready value to the actual player
        // setPlayerValues();
    }

    // The following commands are triggered when a directional key is pressed
    else if (key.type === "direction") {
        if (activeReady === false) {
            if (activeClicked === true) {
                switch (activeDirection) {
                    case "up":
                        if (activePlayer.choose.position[0] > 0) {
                            activePlayer.choose.position[0]--;
                        }
                        break;
                    case "down":
                        if (activePlayer.choose.position[0] < 1) {
                            activePlayer.choose.position[0]++;
                        }
                        break;
                    case "left":
                        if (activePlayer.choose.position[1] > 0) {
                            activePlayer.choose.position[1]--;
                        }
                        break;
                    case "right":
                        if (activePlayer.choose.position[1] < 2) {
                            activePlayer.choose.position[1]++;
                        }
                        break;
                }
            } else {
                activePlayer.choose.clicked = true;
                // setPlayerValues();
            }
            navigateSelection();
        }
    }

    // The following commands are triggered when an ability key is pressed
    else if (key.type === "ability") {

    }

    logChoose();
}

function setPlayerReady(verdict) {
    let activePlayer = player[`p${active.id}`];
    let playerReadyButtonID = "choose-player_" + activePlayer.main.id + "-button";
    let activePlayerReadyID = "choose-player_" + activePlayer.main.id + "-button";

    switch (verdict) {
        case true:
            // We now set that the Player is ready
            activePlayer.choose.ready = true;

            // We then set the text on the button
            $("#" + playerReadyButtonID).html(activePlayer.main.name + " is ready");
            $(`.snake-player_${activePlayer.main.id}-icon-hover`).addClass(`choose-${activePlayer.choose.snake}-hover choose-${activePlayer.choose.snake}-font_color`);
            break;

        case false:
            activePlayer.choose.ready = false;

            $("#" + activePlayerReadyID).attr("class", "choose-player-button");
            $("#" + activePlayerReadyID).html(activePlayer.main.name + " is Not Ready")
            $(`.snake-player_${activePlayer.main.id}-icon-hover`).removeClass(`choose-${activePlayer.choose.snake}-hover choose-${activePlayer.choose.snake}-font_color`);
            break;
    }

}

function navigateSelection() {
    // Placeholder Variables
    let activePlayer = player[`p${active.id}`];
    let enemyPlayer = player[`p${enemy.id}`];
    
    let playerHover = `choose-player_${activePlayer.main.id}-hover`;
    let enemyHover = `choose-player_${enemyPlayer.main.id}-hover`;
    let playerIcon = `snake-player_${activePlayer.main.id}-icon-hover`;
    let snakeHover = `choose-${activePlayer.choose.snake}-hover`;
    let colorHover = `choose-${activePlayer.choose.snake}-font_color`;

    // First, remove the styling from the current location
    // -This removes the styling on the Selection Div
    // -- If the activePlayer's icon is not on the same Selection Div as the enemyPlayer's, remove the styling on the Selection Div
    if ($("." + playerHover).hasClass(enemyHover) === false) {
        // $("." + snakeHover).removeClass(snakeHover + " snake-div-hover");
        $(`#choose-snakes-grid .${snakeHover}`).removeClass(snakeHover + " snake-div-hover");
        $(`#choose-snakes-grid .${colorHover}`).removeClass(colorHover);
    }
    // -- Otherwise, remove only the activePlayer's icon
    $("." + playerHover).removeClass(playerHover);
    // -This removes the Active Player's Icon from the current location
    $("." + playerIcon).removeClass(playerIcon);

    // Then, set the new location
    activePlayer.choose.snake = selectSnakeGrid[activePlayer.choose.position[0]][activePlayer.choose.position[1]];
    snakeHover = `choose-${activePlayer.choose.snake}-hover`;
    colorHover = `choose-${activePlayer.choose.snake}-font_color`;

    // Finally, add the styling to the new location
    // -This adds the styling to the Selection Div
    $(`#${activePlayer.choose.snake}-div`).addClass(`${snakeHover} ${playerHover} snake-div-hover`);
    $(`#${activePlayer.choose.snake}-div .snake-header-name`).addClass(`${colorHover}`);
    $(`#${activePlayer.choose.snake}-div .snake-skill_1-name`).addClass(`${colorHover} ${snakeHover}`);
    $(`#${activePlayer.choose.snake}-div .snake-skill_2-name`).addClass(`${colorHover} ${snakeHover}`);
    // -This adds the Active Player's Icon to the new location
    $(`#${activePlayer.choose.snake}-div .snake-player_${activePlayer.main.id}-icon`).addClass(playerIcon);
}

function gameStartCountdown() {
    // Obligatory Clog
    let activePlayer = player[`p${active.id}`];
    let enemyPlayer = (activePlayer === 1) ? 2 : 1;
    if (enableLogGameChoose === true) {
        console.log("----gameChoose: Event = gameStartCountdown Started");
        console.log("\n");
    }

    // First, we confirm that the countdown has started
    gameStartCountdownActive = true;

    // We then create a variable that counts the, well, countdown
    var countdownNum = 3;

    // Obligatory Clog
    if (enableLogGameChoose === true) {
        console.log("----gameChoose: Event = counter = " + countdownNum);
        console.log("\n");
    }

    // We then show the prompt with specific speed and decide the sizes of the prompts
    let promptMsgArray = [];
    promptMsgArray.push(`<span class="prompt-msg-light">Game Starts In</span>`);
    promptMsgArray.push(`${countdownNum}`);
    setPromptMsgs("medium", ["medium", "big"], promptMsgArray);

    // Before the actual Countdown, we reduce the counter
    countdownNum--;

    // Now we activate the Countdown
    gameStartCountdownTimer = setInterval(function () {
        // If the countdown hasn't gone below zero, just keep counting down
        if (countdownNum >= 0) {
            // Obligatory Clog
            if (enableLogGameChoose === true) {
                console.log("----gameChoose: Event = counter = " + countdownNum);
                console.log("\n");
            }

            $("#prompt-msg-2").html(`${countdownNum}`);
            countdownNum--;
        }
        // Once the countdown goes below zero, we set the stage for the gameStarted gameState
        else {
            // First, we stop the Countdown
            clearInterval(gameStartCountdownTimer);

            // Obligatory Clog
            if (enableLogGameChoose === true) {
                console.log("----gameChoose: Event = gameStartCountdown Ended");
                console.log("\n");
            }
            remGameChoose();
            // Finally, we show the Game Board and the new Header
            // setTimeout(function () {
            //     // // Show the Game Board
            //     // $("#game-arena").removeClass("hidden slowSpeed");
            //     // $("#game-arena").addClass("show slowSpeed");
            // }, 1000);
        }
    }, 1000);
}

function remGameChoose() {
    // We then hide the prompt while making sure to clear the speed and the sizes
    remPromptMsgs("slow", 1000);

    // Then, we hide the Snake Selection Grid
    setTimeout(() => {
        $("#game-choose-grid").addClass("slow-anim");
        $("#game-choose-grid").removeClass("show");
        $("#game-choose-grid").addClass("hidden");

        setTimeout(() => {
            $(`#game-choose-grid`).remove();
            // Then, we set the gameStarted state
            setGameState("arena");
        }, 1000);
    }, 1000);
}