// The state of this boolean determines if logging the gameChoose() events is permitted
var enableLogGameChoose = true;
// This represents the 2d array of the Selection Grid
var selectSnakeGrid;

// These are the variables used on the Game Start Timer
var gameStartCountdownActive; // This boolean is true if the timer is active
var gameStartCountdownTimer; // This contains the timer itself, and this variable is used for clearing
var gameStartCountdownCounter; // This is the counter for the countdown

function logGameChoose() {
    var logEvent;
    if (keyType != undefined && enableLogGameChoose === true) {
        switch (keyType) {
            case "misc":
                switch (activePlayer.activeMisc) {
                    case "aux":
                        switch (activePlayer.chooseClicked) {
                            case true:
                                if (gameStartCountdownActive === false) {
                                    // If the Active Player already clicked, the following command is prompted
                                    switch (activePlayer.chooseReady) {
                                        case true:
                                            logEvent = "'Ready with " + activePlayer.chooseSnake + "'";
                                            break;
                                        case false:
                                            logEvent = "'Selected " + activePlayer.chooseSnake + "'";
                                            break;
                                    }
                                } else {
                                    logEvent = "'Countdown Already Started'";
                                }
                                break;
                            case false:
                                // If not, the following command is prompted 
                                logEvent = "'Nothing Selected Yet'";
                        }
                        break;
                    case "exit":
                        switch (gameStartCountdownActive) {
                            case true:
                                logEvent = "'Canceled Countdown'";
                                break;
                            case false:
                                logEvent = "'Not Ready'";
                                break;
                        }
                        break;
                }
                break;
            case "ability":
                logEvent = "'NO EFFECT'";
                break;
            case "direction":
                logEvent = "'Hovering over " + activePlayer.chooseSnake + "'";
                break;
        }

        console.log("----gameChoose: Player " + activePlayer.playerNumber + " -> '" + key + "' = " + logEvent);
    }
}

function setPlayerReady(verdict) {
    let playerReadyButtonID = "choose-player_" + activePlayer.playerNumber + "-button";
    let playerReadyButtonStyling = "choose-" + activePlayer.chooseSnake + "-hover ready-div-hover choose-" + activePlayer.chooseSnake + "-font_color";
    let activePlayerReadyID = "choose-player_" + activePlayer.playerNumber + "-button";

    switch (verdict) {
        case true:
            // We now set that the Player is ready
            activePlayer.chooseReady = true;

            // We then set the text on the button
            $("#" + playerReadyButtonID).html(activePlayer.playerName + " is ready");
            $(`.snake-player_${activePlayer.playerNumber}-icon-hover`).addClass(`choose-${activePlayer.chooseSnake}-hover choose-${activePlayer.chooseSnake}-font_color`);
            break;

        case false:
            activePlayer.chooseReady = false;

            $("#" + activePlayerReadyID).attr("class", "choose-player-button");
            $("#" + activePlayerReadyID).html(activePlayer.playerName + " is Not Ready")
            $(`.snake-player_${activePlayer.playerNumber}-icon-hover`).removeClass(`choose-${activePlayer.chooseSnake}-hover choose-${activePlayer.chooseSnake}-font_color`);
            break;
    }

}

function gameChoose(key) {
    // The following commands are triggered when a miscellaneous key is pressed
    if (keyType === "misc") {
        switch (activePlayer.activeMisc) {
            /* Aux Key */
            case "aux":
                if (activePlayer.chooseClicked === true) {
                    // Placeholder Variables
                    var playerReadyButtonID = "choose-player_" + activePlayer.playerNumber + "-button";
                    var playerReadyButtonStyling = "choose-" + activePlayer.chooseSnake + "-hover ready-div-hover choose-" + activePlayer.chooseSnake + "-font_color";

                    // If the player pressed the aux key when they haven't selected the snake they're on yet, these commands are fulfilled
                    if ($("#" + playerReadyButtonID).hasClass(playerReadyButtonStyling) === false) {
                        // We set that the Player isn't ready yet
                        activePlayer.chooseReady = false;

                        // We set the styling on the Player Ready button
                        $("#" + playerReadyButtonID).attr("class", "choose-player-button");
                        $("#" + playerReadyButtonID).addClass(playerReadyButtonStyling);

                        // Finally, we set the text on the button
                        $("#" + playerReadyButtonID).html(activePlayer.playerName + " chooses " + activePlayer.chooseSnake);
                    }
                    // If the player pressed the aux key when they've already selected the snake they're on, these commands are fulfilled, meaning they're ready
                    else {
                        setPlayerReady(true);
                    }

                    // We then assign the activePlayer ready value to the actual player
                    switch (activePlayer.playerNumber) {
                        case 1:
                            player1.chooseReady = activePlayer.chooseReady;
                            break;
                        case 2:
                            player2.chooseReady = activePlayer.chooseReady;
                            break;
                    }
                }

                /* Players Ready */
                // If both Players are ready, then we trigger the gameStartCountdown()
                if (player1.chooseReady === true && player2.chooseReady === true) {
                    /* Same Snakes */
                    // If the Players have the same snake, the Active Player is "unreadied" and must choose another snake
                    if (activePlayer.chooseSnake === enemyPlayer.chooseSnake) {
                        // Placeholder Variables
                        var activePlayerReadyID = "choose-player_" + activePlayer.playerNumber + "-button";
                        $(`.snake-player_${activePlayer.playerNumber}-icon-hover`).removeClass(`choose-${activePlayer.chooseSnake}-hover choose-${activePlayer.chooseSnake}-font_color`);
                        $("#" + playerReadyButtonID).html(activePlayer.playerName + " chooses " + activePlayer.chooseSnake);

                        // We first show the Prompt
                        // The prompt then tells that the Enemy Player already chose the snake
                        // FIX - The name of the snake has to be capitalized on the prompt
                        // FIX - We should reeaally set up proper functions that manipulate styling
                        let promptMsgArray = [];
                        promptMsgArray.push(`<span class='choose-${enemyPlayer.chooseSnake}-font_color'>${enemyPlayer.playerName}</span> selected ${enemyPlayer.chooseSnake} first`);
                        setPromptMsgs("quick", ["small"], promptMsgArray);
                        activePlayer.chooseReady = false;
                        // Then, the prompt closes after a while
                        setTimeout(function () {
                            // The prompt is hidden
                            setTimeout(function () {

                                remPromptMsgs("medium");
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
                var activePlayerReadyID = "choose-player_" + activePlayer.playerNumber + "-button";

                // The following commands are triggered when the countdown is active and exit is clicked
                if (gameStartCountdownActive === true) {
                    // First, we stop the Countdown Timer
                    clearInterval(gameStartCountdownTimer);

                    // We then broadcast that the active player is not ready
                    $(".prompt-msg-light").html((activePlayer.playerName + " is not Ready").toUpperCase());

                    // We then establish that the boolean switch is false and the active player is not ready
                    gameStartCountdownActive = false;
                    activePlayer.chooseReady = false;

                    // Finally, we hide the Countdown div and remove the styling from the Active Player's Ready button, indicating that they aren't ready
                    setTimeout(function () {
                        // We remove the styling on the Ready button as well as broadcast the unready-ing
                        setPlayerReady(false);
                        // We finally hide the prompt
                        remPromptMsgs("slow");
                    }, 1000);
                }

                // If the countdown hasn't started yet, the exit button sets the Active Player "unready"
                else if (gameStartCountdownActive === false) {
                    // This is the unready-ing of the Active Player
                    activePlayer.chooseReady = false;

                    // We remove the styling on the Ready button as well as broadcast the unready-ing
                    setPlayerReady(false);
                }
                break;
        }
        // We then assign the activePlayer ready value to the actual player
        switch (activePlayer.playerNumber) {
            case 1:
                player1.chooseReady = activePlayer.chooseReady;
                break;
            case 2:
                player2.chooseReady = activePlayer.chooseReady;
                break;
        }
    }

    // The following commands are triggered when a directional key is pressed
    else if (keyType === "direction") {
        if (activePlayer.chooseReady === false) {
            if (activePlayer.chooseClicked === true) {
                switch (activePlayer.direction) {
                    case "up":
                        if (activePlayer.chooseGridPosition[0] > 0) {
                            activePlayer.chooseGridPosition[0]--;
                        }
                        break;
                    case "down":
                        if (activePlayer.chooseGridPosition[0] < 1) {
                            activePlayer.chooseGridPosition[0]++;
                        }
                        break;
                    case "left":
                        if (activePlayer.chooseGridPosition[1] > 0) {
                            activePlayer.chooseGridPosition[1]--;
                        }
                        break;
                    case "right":
                        if (activePlayer.chooseGridPosition[1] < 2) {
                            activePlayer.chooseGridPosition[1]++;
                        }
                        break;
                }
            } else {
                switch (activePlayer.playerNumber) {
                    case 1:
                        player1.chooseClicked = true;
                        break;
                    case 2:
                        player2.chooseClicked = true;
                        break;
                }
            }
            navigateSelection();
        }
    }

    // The following commands are triggered when an ability key is pressed
    else if (keyType === "ability") {

    }

    logGameChoose();
}

function setGameChoose() {
    setChooseSnakesGrid();
    selectSnakeGrid = [
        ["apopis", "orochi", "quetzalcoatl"],
        ["lóng", "jörmungandr", "ouroboros"]
    ];

    player1.chooseGridPosition = [0, 0];
    player2.chooseGridPosition = [0, 2];
    activePlayer.chooseGridPosition = [undefined, undefined];

    player1.chooseSnake = "apopis";
    player2.chooseSnake = "quetzalcoatl";
    activePlayer.chooseSnake = undefined;

    player1.chooseClicked = false;
    player2.chooseClicked = false;

    player1.chooseReady = false;
    player2.chooseReady = false;

    gameStartCountdownActive = false;
    gameStartCountdownTimer = undefined;

    $("#game-arena").addClass("hidden");

    $(".snake-player_1-icon").html(player1.playerName);
    $(".snake-player_2-icon").html(player2.playerName);

    $("#choose-player_1-button").html(player1.playerName + " is Not Ready");
    $("#choose-player_2-button").html(player2.playerName + " is Not Ready");
}

function navigateSelection() {
    // Placeholder Variables
    let playerHover = `choose-player_${activePlayer.playerNumber}-hover`;
    let enemyHover = `choose-player_${enemyPlayer.playerNumber}-hover`;
    let playerIcon = `snake-player_${activePlayer.playerNumber}-icon-hover`;
    let snakeHover = `choose-${activePlayer.chooseSnake}-hover`;
    let colorHover = `choose-${activePlayer.chooseSnake}-font_color`;

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
    activePlayer.chooseSnake = selectSnakeGrid[activePlayer.chooseGridPosition[0]][activePlayer.chooseGridPosition[1]];
    snakeHover = `choose-${activePlayer.chooseSnake}-hover`;
    colorHover = `choose-${activePlayer.chooseSnake}-font_color`;

    // Finally, add the styling to the new location
    // -This adds the styling to the Selection Div
    $(`#${activePlayer.chooseSnake}-div`).addClass(`${snakeHover} ${playerHover} snake-div-hover`);
    $(`#${activePlayer.chooseSnake}-div .snake-header-name`).addClass(`${colorHover}`);
    $(`#${activePlayer.chooseSnake}-div .snake-skill_1-name`).addClass(`${colorHover} ${snakeHover}`);
    $(`#${activePlayer.chooseSnake}-div .snake-skill_2-name`).addClass(`${colorHover} ${snakeHover}`);
    // -This adds the Active Player's Icon to the new location
    $(`#${activePlayer.chooseSnake}-div .snake-player_${activePlayer.playerNumber}-icon`).addClass(playerIcon);

    switch (activePlayer.playerNumber) {
        case 1:
            player1.chooseSnake = activePlayer.chooseSnake;
            break;
        case 2:
            player2.chooseSnake = activePlayer.chooseSnake;
            break;
    }
}

function gameStartCountdown() {
    // Obligatory Clog
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
    remPromptMsgs("slow");

    // Then, we hide the Snake Selection Grid
    setTimeout(() => {
        $("#game-choose-grid").addClass("slowSpeed");
        $("#game-choose-grid").removeClass("show");
        $("#game-choose-grid").addClass("hidden");

        setTimeout(() => {
            $(`#game-choose-grid`).remove();
            // Then, we set the gameStarted state
            setGameState("gameStarted");
        }, 1000);
    }, 1000);
}