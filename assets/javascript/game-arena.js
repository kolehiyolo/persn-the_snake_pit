// The state of this boolean determines if logging the gameStarted() events is permitted
let enableLogGameStarted = true;
let acceptKey = false;

let row = 49;
let col = 49;

function logGameStarted() {
    var logEvent;
    if (keyType != undefined && enableLogGameChoose === true) {
        switch (keyType) {
            case "misc":
                switch (activePlayer.main.misc) {
                    case "aux":
                        break;
                    case "exit":
                        break;
                }
                break;
            case "ability":
                switch (activePlayer.main.ability) {
                    case 0:
                        logEvent = "'Strike'";
                        break;
                    case 1:
                        logEvent = "'Ability 1'";
                        break;
                    case 2:
                        logEvent = "'Ability 2'";
                        break;
                }
                break;
            case "direction":
                logEvent = "Go '" + activePlayer.main.direction + "'";
                break;
        }

        console.log("----gameStarted: Player " + activePlayer.main.id + " -> '" + key + "' = " + logEvent);
    }
}

function setArena() {
    player.p1.arena.snake = player.p1.choose.snake;
    player.p2.arena.snake = player.p2.choose.snake;

    console.log("Player 1's Active Snake = " + player.p1.arena.snake);
    console.log("Player 2's Active Snake = " + player.p2.arena.snake);
    console.log("\n");

    setTimeout(() => {
        setArenaGrid(row, col);
    }, 100);
}


let colSpeed = 600;
let borderSpeed = 1500;
let snakeSpeed = 800;
let foodSpeed = 400;

// colSpeed = 200;
// borderSpeed = 300;
// snakeSpeed = 400;
// foodSpeed = 10

function setArenaGrid(row, col) {
    // console.log("activated setArenaGrid()");

    // This creates the arena by adding the grid itself and all the cells
    $(`body main`).append(`<div id="game-arena-grid" class="hidden slow-anim arena-border-dead"></div>`);
    for (var i = 1; i <= row; i++) { // This first layer of the nest adds the rows
        $(`#game-arena-grid`).append(`<div id="r${i}" class="row"></div>`);
        for (var j = 1; j <= col; j++) { // This second layer adds the column cells for each row
            $(`#r${i}`).append(`<div id="r${i}c${j}" class="col medium-anim col-dead"></div>`);
        }
    }

    setTimeout(() => {
        $(`#game-arena-grid`).removeClass(`hidden`);
        $(`#game-arena-grid`).addClass(`show`);
    }, 1);

    // Now we set-up a sick-ass animation 
    $(`.col`).removeClass(`col-dead`);
    $(`.col`).addClass(`col-glow`);
    setTimeout(() => {
        $(`.col`).removeClass(`medium-anim`);
        $(`.col`).addClass(`slow-anim`);
        $(`.col`).removeClass(`col-glow`);
        fightCountdown();
        setTimeout(() => {
            $(`#game-arena-grid`).removeClass(`arena-border-dead`);
            $(`#game-arena-grid`).addClass(`arena-border-normal`);
            setTimeout(() => {
                $(`.col`).removeClass(`slow-anim`);
                $(`.col`).addClass(`medium-anim`);
                setSnakes(1);
                setSnakes(2);
                $(`.col`).removeClass(`medium-anim`);
                $(`.col`).addClass(`slow-anim`);
                let foodNum = 1;
                let foodInterval = setInterval(() => {
                    setFood(foodNum);
                    foodNum++;
                    if (foodNum > 3) {
                        setTimeout(() => {
                            $(`.col`).removeClass(`slow-anim`);
                        }, 1000);
                        clearInterval(foodInterval);
                    }
                }, foodSpeed);
            }, snakeSpeed);
        }, borderSpeed);
    }, colSpeed);
}

function fightCountdown() {
    // console.log(`Activate fightCountdown()`);
    let fightCounter = 3;
    let fightInterval = setInterval(() => {
        // console.log(`fightCounter = ${fightCounter}`);
        switch (fightCounter) {
            case 3:
                setPromptMsgs("quick", ["small"], ["Ready"]);
                break;
            case 2:
                setPromptMsgs("medium", ["medium"], ["Set"]);
                break;
            case 1:
                setPromptMsgs("medium", ["big"], ["Fight!"]);
                break;
        }
        fightCounter--;
        if (fightCounter === 0) {
            setTimeout(() => {
                remPromptMsgs("quick", 300);
                acceptKey = true;
                // RUNMEBOI
                // player1Interval();
                // player2Interval();
            }, 1000);
            clearInterval(fightInterval);
        }
    }, 1000);
}

function setSnakes(activePlayerNumber) {
    // FIX
    // This is to be used to set the Snakes on the Game Board
    // I also intend on adding a "respawn" mechanic, which will probably use the same method this one does
    // let num = activePlayerNumber;
    let playerPos;
    let playerSnake;
    let num = activePlayerNumber;
    switch (activePlayerNumber) {
        case 1:
            playerSnake = player.p1.arena.snake;
            // First we set the head
            player.p1.main.direction = "right";
            player.p1.arena.position[0] = [Math.floor(row / 4), Math.floor(col / 4)];
            for (let i = 1; i <= 4; i++) {
                player.p1.arena.position[i] = [];
                player.p1.arena.position[i][0] = player.p1.arena.position[i - 1][0];
                player.p1.arena.position[i][1] = player.p1.arena.position[i - 1][1] - 1;
            }
            // console.log(`player1.gamePosition = ${player.p1.arena.position}`);
            playerPos = player.p1.arena.position;
            break;
        case 2:
            playerSnake = player.p2.arena.snake;
            // First we set the head
            player.p2.main.direction = "left";
            player.p2.arena.position[0] = [Math.ceil(row - row / 4) + 1, Math.ceil(col - col / 4) + 1];
            for (let i = 1; i <= 4; i++) {
                player.p2.arena.position[i] = [];
                player.p2.arena.position[i][0] = player.p2.arena.position[i - 1][0];
                player.p2.arena.position[i][1] = player.p2.arena.position[i - 1][1] + 1;
            }
            // console.log(`player2.gamePosition = ${player.p2.arena.position}`);
            playerPos = player.p2.arena.position;
    }

    $(`#r${playerPos[0][0]}c${playerPos[0][1]}`).addClass(`player${num}-snake-head`);
    $(`.player${num}-snake-head`).addClass(`${playerSnake}-head`);
    // console.log(`#r${playerPos[0][0]}c${playerPos[0][1]}`);
    // console.log(`\n`);

    for (let i = 1; i < playerPos.length; i++) {
        // console.log(`playerPos[${i}] = ${playerPos[i]}`);
        $(`#r${playerPos[i][0]}c${playerPos[i][1]}`).addClass(`player${num}-snake-body`);
        $(`.player${num}-snake-body`).addClass(`${playerSnake}-body`);
    };
    // console.log(`\n`);
}

function setFood(food) {
    let activeFood = {
        number: food,
        coordinate: [undefined, undefined]
    };

    activeFood.coordinate[0] = Math.floor((Math.random() * row) + 1);
    activeFood.coordinate[1] = Math.floor((Math.random() * col) + 1);

    $(".food-" + activeFood.number).removeClass("food-" + activeFood.number);
    let foodChecker = "food-1 food-2 food-3 food-super ";
    foodChecker = foodChecker + "player1-snake-head player1-snake-body ";
    foodChecker = foodChecker + "player2-snake-head player2-snake-body ";
    if (
        $(`#r${activeFood.coordinate[0]}c${activeFood.coordinate[1]}`).hasClass(foodChecker)
    ) {
        console.log(`There's already a food there!`);
        setFood(activeFood.number);
    } else {
        $("#r" + activeFood.coordinate[0] + "c" + activeFood.coordinate[1]).addClass("food-" + activeFood.number);
    }
}

let playerRun = {
    p1: {
        status: true,
        count: 0,
        interval: undefined
    },
    p2: {
        status: true,
        count: 0,
        interval: undefined
    }
}

function player1Interval() {
    playerRun.p1.interval = setInterval(() => {
        playerRun.p1.count++;
        // console.log(`playerRun.p1.count = ${playerRun.p1.count}`);
        // console.log(`player.p1.main.direction = ${player.p1.main.direction}`); 
        // First, we offset the positions of each segment
        // position[i] has to take the values of position[i-1]
        // for (let i = 1; i<player.p1.arena.position.length ;i++) {

        // }
        // FIX = Establish a Shorthand for playerSize
        let playerSize = player.p1.arena.position.length;
        // console.log(`playerSize = ${playerSize}`); 
        player.p1.arena.position.splice(1, 0, [player.p1.arena.position[0][0], player.p1.arena.position[0][1]]);
        switch (player.p1.main.direction) {
            case "up":
                player.p1.arena.position[0][0]--;
                break;
            case "down":
                player.p1.arena.position[0][0]++;
                break;
            case "left":
                player.p1.arena.position[0][1]--;
                break;
            case "right":
                player.p1.arena.position[0][1]++;
                break;
        }
        console.log(`Player is going ${player.p1.main.direction}`);
        checkSnakePath();
        moveSnake();
    }, 100);
}

function checkSnakePath() {
    if ($(`.player1-snake-head`).hasClass(`player1-snake-body`)) {
        console.log(`OH NO!`); 
        clearInterval(playerRun.p1.interval);   
    }
    if ($(`.player1-snake-head`).hasClass(`food-1`)) {
        console.log(`FOOOOD 1!`);
        setFood(1);
        growSnake();
    } else if ($(`.player1-snake-head`).hasClass(`food-2`)) {
        console.log(`FOOOOD 2!`);
        setFood(2);
        growSnake();
    } else if ($(`.player1-snake-head`).hasClass(`food-3`)) {
        console.log(`FOOOOD 3!`);
        setFood(3);
        growSnake();
    } else {
        player.p1.arena.position.pop();
    };
}

function growSnake() {
    console.log(`Grow the Snake!`);
}

function moveSnake() {
    // First we remove the head
    let headRow = player.p1.arena.position[0][0];
    let headCol = player.p1.arena.position[0][1];
    // $(`.player1-snake-head`).attr(`class`, `col`);
    $(`.player1-snake-head`).removeClass(`player1-snake-head ${player.p1.arena.snake}-head`);
    // Then we set the head on it's new position
    $(`#r${headRow}c${headCol}`).addClass(`player1-snake-head ${player.p1.arena.snake}-head`);
    let bodyRow;
    let bodyCol;
    // $(`.player1-snake-body`).attr(`class`, `col`);
    $(`.player1-snake-body`).removeClass(`player1-snake-body ${player.p1.arena.snake}-body`);
    for (let i = 1; i < player.p1.arena.position.length; i++) {
        bodyRow = player.p1.arena.position[i][0];
        bodyCol = player.p1.arena.position[i][1];
        // console.log(`eyy`); 
        $(`#r${bodyRow}c${bodyCol}`).addClass(`player1-snake-body ${player.p1.arena.snake}-body`);
    }
}

function player2Interval() {
    playerRun.p2.interval = setInterval(() => {
        playerRun.p2.count++;
        // console.log(`playerRun.p2.count = ${playerRun.p2.count}`);
        console.log(`player.p2.main.direction = ${player.p2.main.direction}`);
    }, 100);
}

function gameArena() {
    if (acceptKey === false) {
        console.log(`Can't accept any Keys yet`);
        return "Can't accept any Keys yet";
    };
    // The following commands are triggered when a miscellaneous key is pressed
    if (keyType === "misc") {
        if (playerRun.p1.status === true || playerRun.p2.status === true) {
            playerRun.p1.status = false;
            playerRun.p2.status = false;
            clearInterval(playerRun.p1.interval);
            // clearInterval(playerRun.p2.interval);
            let promptMsgArray = [];
            promptMsgArray[0] = `${player[`p${activePlayer.main.id}`].main.name} paused the game`;
            promptMsgArray[1] = `Press '${controls[`p${activePlayer.main.id}`].main.misc.aux}' or '${controls[`p${enemyPlayer.main.id}`].main.misc.aux}' to resume`;

            setPromptMsgs(`quick`, [`medium`, `small`], promptMsgArray);
        } else {
            switch (activePlayer.main.misc) {
                // BUILD
                // The Aux and Exit keys should serve as Pause/Resume buttons
                // When paused, the Aux key will Resume the game
                // -Both players must press their Aux key to set themselves ready before the game resumes
                // When paused, the Exit key will Exit the game and direct to gameChoose
                // -Both players must press their Exit key to set themselves ready before going back to the Selection Screen
                case "aux":
                    playerRun.p1.status = true;
                    playerRun.p2.status = true;
                    remPromptMsgs(`quick`, 200);
                    player1Interval();
                    // player2Interval();
                    break;
                case "exit":
                    console.log(`EXIT!!!`);
                    break;
            }
        }
    }

    // The following commands are triggered when a directional key is pressed
    else if (keyType === "direction") {
        // BUILD
        // The directional keys direct the movement of the snakes
        // The snake must not be able to go on the opposite direction without turning first
        // -For example, if they're going left, they can't go right without going up or down first
        // If the snake crashes onto the edge of the arena or onto their own body or the enemy's or a dead body, they lose
        // switch (activePlayer.main.direction) {
        //     case "up":
        //         console.log(`Change direction to Up`);
        //         activePlayer.direction = "up";
        //         break;
        //     case "down":
        //         console.log(`Change direction to Down`);
        //         activePlayer.direction = "down";
        //         break;
        //     case "left":
        //         console.log(`Change direction to Left`);
        //         activePlayer.direction = "left";
        //         break;
        //     case "right":
        //         console.log(`Change direction to Right`);
        //         activePlayer.direction = "right";
        //         break;
        // }
    }

    // The following commands are triggered when an ability key is pressed
    else if (keyType === "ability") {
        switch (activePlayer.activeAbility) {
            // BUILD
            // The ability keys will trigger the snake's abilities (duh) 
            // The first ability key by default activates Strike, which is the same across all the snakes
            // The other 2 will trigger abilities, and each snake has 2 unique abilities, unless the ability is passive
            // The active abilities have cooldowns and duration
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
        }
    }

    logGameStarted();
}