// The state of this boolean determines if logging the gameStarted() events is permitted
var enableLogGameStarted = true;

var row = 49;
var col = 49;

let player1Champion;
let player2Champion;

function setGameStarted() {
    player1.gameSnake = player1.chooseSnake;
    player2.gameSnake = player2.chooseSnake;

    console.log("Player 1's Active Snake = " + player1.gameSnake);
    console.log("Player 2's Active Snake = " + player2.gameSnake);
    console.log("\n");

    switch (player1.gameSnake) {
        case "apopis":
            player1Champion = chooseApopis;
            break;
        case "orochi":
            player1Champion = chooseOrochi;
            break;
        case "quetzalcoatl":
            player1Champion = chooseQuetzalcoatl;
            break;
        case "lóng":
            player1Champion = chooseLóng;
            break;
        case "jörmungandr":
            player1Champion = chooseJörmungandr;
            break;
        case "ouroboros":
            player1Champion = chooseOuroboros;
            break;
    }

    switch (player2.gameSnake) {
        case "apopis":
            player2Champion = chooseApopis;
            break;
        case "orochi":
            player2Champion = chooseOrochi;
            break;
        case "quetzalcoatl":
            player2Champion = chooseQuetzalcoatl;
            break;
        case "lóng":
            player2Champion = chooseLóng;
            break;
        case "jörmungandr":
            player2Champion = chooseJörmungandr;
            break;
        case "ouroboros":
            player2Champion = chooseOuroboros;
            break;
    }
    console.log(`player1Champion.name = ${player1Champion.name}`);
    setTimeout(() => {
        setArenaGrid(row, col);
    }, 500);



    // BUILD
    // The game should automatically start a "Ready... Fight!" sequence upon showing up
}



function logGameStarted() {
    var logEvent;
    if (keyType != undefined && enableLogGameChoose === true) {
        switch (keyType) {
            case "misc":
                switch (activePlayer.activeMisc) {
                    case "aux":
                        break;
                    case "exit":
                        break;
                }
                break;
            case "ability":
                switch (activePlayer.activeAbility) {
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
                logEvent = "Go '" + activePlayer.direction + "'";
                break;
        }

        console.log("----gameStarted: Player " + activePlayer.playerNumber + " -> '" + key + "' = " + logEvent);
    }
}

function setArenaGrid(row, col) {
    console.log("activated addGrid()");
    $(`body main`).append(`<div id="game-arena-grid" class="hidden slowSpeed arena-border-dead"></div>`);
    for (var i = 1; i <= row; i++) { // This first layer of the nest adds the rows
        $("#game-arena-grid").append("<div id='r" + i + "' class='row'></div>");
        for (var j = 1; j <= col; j++) { // This second layer adds the column cells for each row
            $("#r" + i).append("<div id='r" + i + "c" + j + "' class='col col-anim col-dead'></div>");
        }
    }
    setTimeout(() => {
        $(`#game-arena-grid`).removeClass(`hidden`);
        $(`#game-arena-grid`).addClass(`show`);
    }, 1);
    // Now we set-up a sick-ass animation 
    function showArena() {
        for (let j = 1; j <= col; j++) {
            $(`.col`).removeClass(`col-dead`);
            $(`.col`).addClass(`col-color-2`);
        }
        setTimeout(() => {
            $(`.col`).removeClass(`col-anim`);
            $(`.col`).addClass(`col-anim-slower`);
            $(`.col`).removeClass(`col-color-2`);
            $(`.col`).addClass(`col-color`);
            setTimeout(() => {
                $(`#game-arena-grid`).removeClass(`arena-border-dead`);
                $(`#game-arena-grid`).addClass(`arena-border-normal`);

                setTimeout(() => {
                    $(`.col`).removeClass(`col-anim-slower`);
                    $(`.col`).addClass(`col-anim`);
                    setSnakes(1);
                    setSnakes(2);

                    let foodNum = 1;
                    let foodInterval = setInterval(() => {
                        setFood(foodNum);
                        foodNum++;
                        if (foodNum > 3) {
                            clearInterval(foodInterval);
                            player1Running();
                        }
                    }, 400);
                }, 800);

                console.log(`player1.gamePosition = ${player1.gamePosition}`);
                console.log(`player2.gamePosition = ${player2.gamePosition}`);
            }, 1500);
        }, 600);
    }
    showArena();
}

function setSnakes(activePlayerNumber) {
    // FIX
    // This is to be used to set the Snakes on the Game Board
    // I also intend on adding a "respawn" mechanic, which will probably use the same method this one does
    // This replaces p1InitSnake() and p2Initsnake()
    // let num = activePlayerNumber;
    let playerPos;
    let playerSnake;
    let num = activePlayerNumber;
    switch (activePlayerNumber) {
        case 1:
            playerSnake = player1.gameSnake;
            // First we set the head
            player1.gameDirection = "right";
            player1.gamePosition[0] = [];
            player1.gamePosition[0][0] = Math.floor(row / 4);
            player1.gamePosition[0][1] = Math.floor(col / 4);
            for (let i = 1; i <= 4; i++) {
                player1.gamePosition[i] = [];
                player1.gamePosition[i][0] = player1.gamePosition[i - 1][0];
                player1.gamePosition[i][1] = player1.gamePosition[i - 1][1] - 1;
            }
            console.log(`player1.gamePosition = ${player1.gamePosition}`);
            playerPos = player1.gamePosition;
            break;
        case 2:
            playerSnake = player2.gameSnake;
            // First we set the head
            player2.gameDirection = "left";
            player2.gamePosition[0] = [];
            player2.gamePosition[0][0] = Math.ceil(row - row / 4) + 1;
            player2.gamePosition[0][1] = Math.ceil(col - col / 4) + 1;
            for (let i = 1; i <= 4; i++) {
                player2.gamePosition[i] = [];
                player2.gamePosition[i][0] = player2.gamePosition[i - 1][0];
                player2.gamePosition[i][1] = player2.gamePosition[i - 1][1] + 1;
            }
            console.log(`player2.gamePosition = ${player2.gamePosition}`);
            playerPos = player2.gamePosition;
            break;
    }

    $(`#r${playerPos[0][0]}c${playerPos[0][1]}`).addClass(`player${num}-snake-head`);
    $(`.player${num}-snake-head`).addClass(`${playerSnake}-head`);
    console.log(`#r${playerPos[0][0]}c${playerPos[0][1]}`);
    console.log(`\n`);

    for (let i = 1; i < playerPos.length; i++) {
        console.log(`playerPos[${i}] = ${playerPos[i]}`);
        $(`#r${playerPos[i][0]}c${playerPos[i][1]}`).addClass(`player${num}-snake-body`);
        $(`.player${num}-snake-body`).addClass(`${playerSnake}-body`);
    };
    console.log(`\n`);
}

function setFood(food) {
    let activeFood = {
        number: food,
        coordinate: [undefined, undefined]
    };

    activeFood.coordinate[0] = Math.floor((Math.random() * row) + 1);
    activeFood.coordinate[1] = Math.floor((Math.random() * col) + 1);

    $(".food-" + activeFood.number).removeClass("food-" + activeFood.number);
    if (
        $(`#r${activeFood.coordinate[0]}c${activeFood.coordinate[1]}`).hasClass(`food-1`) ||
        $(`#r${activeFood.coordinate[0]}c${activeFood.coordinate[1]}`).hasClass(`food-2`) ||
        $(`#r${activeFood.coordinate[0]}c${activeFood.coordinate[1]}`).hasClass(`food-3`) ||
        $(`#r${activeFood.coordinate[0]}c${activeFood.coordinate[1]}`).hasClass(`food-super`) ||
        $(`#r${activeFood.coordinate[0]}c${activeFood.coordinate[1]}`).hasClass(`player1-snake-head`) ||
        $(`#r${activeFood.coordinate[0]}c${activeFood.coordinate[1]}`).hasClass(`player1-snake-body`) ||
        $(`#r${activeFood.coordinate[0]}c${activeFood.coordinate[1]}`).hasClass(`player2-snake-head`) ||
        $(`#r${activeFood.coordinate[0]}c${activeFood.coordinate[1]}`).hasClass(`player2-snake-body`)
    ) {
        console.log(`There's already a food there!`);
        setFood(activeFood.number);
    } else {
        $("#r" + activeFood.coordinate[0] + "c" + activeFood.coordinate[1]).addClass("food-" + activeFood.number);
    }
}

function gameStartedDefaults() {

}

// let player1Run;
// let player2Run;
let player1RunningStatus = true;
let player2RunningStatus = true;

let player1Run;

let player1RunCount = 0;

function player1Running() {
    console.log(`playerRun() activated`);
    player1Run = setInterval(() => {
        if (player1RunningStatus === true) {
            // console.log(`player1RunCount = ${player1RunCount}`);
            player1RunCount++;
            // console.log(`player1.gameDirection = ${player1.gameDirection}`); 
            switch (player1.gameDirection) {
                case "up":
                    console.log(`player1 is going up`); 
                    break;
                case "down":
                    console.log(`player1 is going down`); 
                    break;
                case "left":
                    console.log(`player1 is going left`); 
                    break;
                case "right":
                    console.log(`player1 is going right`); 
                    break;
            }
        } else {
            clearInterval(player1Run);
        }
    }, 500);
}


function gameStarted() {
    // The following commands are triggered when a miscellaneous key is pressed
    if (keyType === "misc") {
        switch (activePlayer.activeMisc) {
            // BUILD
            // The Aux and Exit keys should serve as Pause/Resume buttons
            // When paused, the Aux key will Resume the game
            // -Both players must press their Aux key to set themselves ready before the game resumes
            // When paused, the Exit key will Exit the game and direct to gameChoose
            // -Both players must press their Exit key to set themselves ready before going back to the Selection Screen
            case "aux":
                if (player1RunningStatus === true) {
                    player1RunningStatus = false;
                    console.log(`Paused playerRun()`);
                } else {
                    player1RunningStatus = true;
                    console.log(`Resumed playerRun()`);
                    player1Running();
                }
                break;
            case "exit":
                break;
        }
    }

    // The following commands are triggered when a directional key is pressed
    else if (keyType === "direction") {
        // BUILD
        // The directional keys direct the movement of the snakes
        // The snake must not be able to go on the opposite direction without turning first
        // -For example, if they're going left, they can't go right without going up or down first
        // If the snake crashes onto the edge of the arena or onto their own body or the enemy's or a dead body, they lose
        switch(activePlayer.direction) {
            case "up":
                console.log(`Change direction to Up`);
                activePlayer.direction = "up";
                break;
            case "down":
                console.log(`Change direction to Down`); 
                activePlayer.direction = "down";
                break;
            case "left":
                console.log(`Change direction to Left`); 
                activePlayer.direction = "left";
                break;
            case "right":
                console.log(`Change direction to Right`); 
                activePlayer.direction = "right";
                break;
        }
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