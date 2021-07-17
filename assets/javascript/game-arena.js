// The state of this boolean determines if logging the gameStarted() events is permitted
// let enableLogGameArena = true;
let enableLogGameArena = false;

let displaySpeed = {
    col: 600,
    border: 1500,
    snake: 800,
    food: 400
}

displaySpeed.col = 200;
displaySpeed.border = 300;
displaySpeed.snake = 400;
displaySpeed.food = 10;

function ultraChecker() {
    // setInterval(() => {
    //     updateDetails();
    // }, 10);
}

function logArena() {
    let logEvent;
    if (key.type != undefined && enableLogGameArena === true) {
        switch (key.type) {
            case `misc`:
                switch (activePlayer.main.misc) {
                    case `aux`:
                        break;
                    case `exit`:
                        break;
                }
                break;
            case `ability`:
                switch (activePlayer.main.ability) {
                    case 0:
                        logEvent = `'Strike'`;
                        break;
                    case 1:
                        logEvent = `'Ability 1'`;
                        break;
                    case 2:
                        logEvent = `'Ability 2'`;
                        break;
                }
                break;
            case `direction`:
                logEvent = `Go '${activePlayer.main.direction}'`;
                break;
        }
        console.log(`--gameArena: Player ${active.id} -> ${key.type}: '${key.id}' = ${logEvent}`);
    }
}

function setArena() {
    ultraChecker();
    setGameVariables();
    setPlayersArena();
    game.state = "arena";
    player.p1.arena.snake = player.p1.choose.snake;
    player.p2.arena.snake = player.p2.choose.snake;
    setAbilities(1);
    setAbilities(2);

    console.log("Player 1's Active Snake = " + player.p1.arena.snake);
    console.log("Player 2's Active Snake = " + player.p2.arena.snake);
    console.log("\n");

    setTimeout(() => {
        setArenaGrid();
    }, 500);
}

function setArenaGrid() {
    // This creates the arena by adding the grid itself and all the cells
    $(`body main`).append(`<div id="game-arena-grid" class="hidden slow-anim arena-border-dead"></div>`);
    for (var i = 1; i <= game.row; i++) { // This first layer of the nest adds the rows
        $(`#game-arena-grid`).append(`<div id="r${i}" class="row"></div>`);
        for (var j = 1; j <= game.col; j++) { // This second layer adds the column cells for each row
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
                setPlayerUI(1);
                setPlayerUI(2);
                setSnakes(1);
                setSnakes(2);
                scoreBoard();
                $(`.col`).removeClass(`medium-anim`);
                $(`.col`).addClass(`slow-anim`);
                let foodNum = 1;
                let foodInterval = setInterval(() => {
                    setFood(foodNum);
                    foodNum++;
                    if (foodNum > 3) {
                        setTimeout(() => {
                            $(`.col`).removeClass(`slow-anim`);
                        }, 500);
                        clearInterval(foodInterval);
                    }
                }, displaySpeed.food);
            }, displaySpeed.snake);
        }, displaySpeed.border);
    }, displaySpeed.col);
}

function resetArenaGrid() {
    $(`.col`).attr("class", "col");
    setGameVariables();
    setPlayersArena();
    $(`.player-popup`).remove();
    game.state = "arena";
    player.p1.arena.snake = player.p1.choose.snake;
    player.p2.arena.snake = player.p2.choose.snake;
    setAbilities(1);
    setAbilities(2);

    fightCountdown();
    setPlayerUI(1);
    setPlayerUI(2);
    setSnakes(1);
    setSnakes(2);
    $(`.col`).addClass(`slow-anim`);
    let foodNum = 1;
    let foodInterval = setInterval(() => {
        setFood(foodNum);
        foodNum++;
        if (foodNum > 3) {
            setTimeout(() => {
                $(`.col`).removeClass(`slow-anim`);
            }, 500);
            clearInterval(foodInterval);
        }
    }, displaySpeed.food);
}

function setSnakes(num) {
    // FIX
    // This is to be used to set the Snakes on the Game Board
    // I also intend on adding a "respawn" mechanic, which will probably use the same method this one does
    let activeUser = player[`p${num}`];
    let activeSnake = activeUser.arena.snake;
    let activePosition;
    switch (num) {
        case 1:
            activeUser.main.direction = "right";
            activeUser.arena.position[0] = [Math.floor(game.row / 4), Math.floor(game.col / 4)];
            for (let i = 1; i <= 9; i++) {
                activeUser.arena.position[i] = [];
                activeUser.arena.position[i][0] = activeUser.arena.position[i - 1][0];
                activeUser.arena.position[i][1] = activeUser.arena.position[i - 1][1] - 1;
            }
            break;
        case 2:
            activeUser.main.direction = "left";
            activeUser.arena.position[0] = [Math.ceil(game.row - game.row / 4) + 1, Math.ceil(game.col - game.col / 4) + 1];
            for (let i = 1; i <= 9; i++) {
                activeUser.arena.position[i] = [];
                activeUser.arena.position[i][0] = activeUser.arena.position[i - 1][0];
                activeUser.arena.position[i][1] = activeUser.arena.position[i - 1][1] + 1;
            }
            break;
    }
    activeUser.arena.direction = activeUser.main.direction;
    activePosition = activeUser.arena.position;

    activeUser.arena.size = parseInt(activeUser.arena.position.length);
    // console.log(`${activeUser.arena.size}`);
    $(`#player${num}-ui-size`).html(`${activeUser.arena.size}`);

    // setSnakeSize(num);

    $(`#r${activePosition[0][0]}c${activePosition[0][1]}`).addClass(`player${num}-snake-head player${num}-snake`);
    $(`.player${num}-snake-head`).addClass(`${activeSnake}-head`);

    for (let i = 1; i < activePosition.length; i++) {
        $(`#r${activePosition[i][0]}c${activePosition[i][1]}`).addClass(`player${num}-snake-body player${num}-snake`);
        $(`.player${num}-snake-body`).addClass(`${activeSnake}-body`);
    };
}

function setFood(num) {
    let activeFood = {
        row: undefined,
        col: undefined,
    };
    let foodOkay = false;

    while (foodOkay === false) {
        activeFood.row = Math.floor((Math.random() * parseInt(game.row)) + 1);
        activeFood.col = Math.floor((Math.random() * parseInt(game.col)) + 1)

        // console.log(`Food${num} = [${activeFood.row}, ${activeFood.col}]`);
        // console.log(`Dead = ${$(`#r${activeFood.row}c${activeFood.row}`).hasClass(`dead-snake`)}`);
        if (
            $(`#r${activeFood.row}c${activeFood.row}`).hasClass(`food`) ||
            $(`#r${activeFood.row}c${activeFood.row}`).hasClass(`player1-snake`) ||
            $(`#r${activeFood.row}c${activeFood.row}`).hasClass(`player2-snake`) ||
            $(`#r${activeFood.row}c${activeFood.row}`).hasClass(`dead-snake`) ||
            $(`#r${activeFood.row}c${activeFood.row}`).hasClass(`horizontal-strike`) ||
            $(`#r${activeFood.row}c${activeFood.row}`).hasClass(`vertical-strike`)
        ) {
            // console.log(`There's already something there! Food-${num}`);
        } else {
            foodOkay = true;
            $(`.food-${num}`).removeClass(`food-${num}`);
            $(`#r${activeFood.row}c${activeFood.col}`).addClass(`medium-anim`);
            $(`#r${activeFood.row}c${activeFood.col}`).addClass(`food-${num} food`);
            $(`.food-${num}`).removeClass(`dead-snake`);
            setTimeout(() => {
                $(`#r${activeFood.row}c${activeFood.col}`).removeClass(`medium-anim`);
            }, 1000);
        }
    }

    if (num === "super") {
        food.super.position[0] = activeFood.row;
        food.super.position[1] = activeFood.col;
    } else {
        food[`food${num}`].position[0] = activeFood.row;
        food[`food${num}`].position[1] = activeFood.col;
    }

    if (food.super.count === 5 && food.super.active === false) {
        food.super.active = true;
        setFood(`super`);
    }
    updateFoodCountDiv();
}

function fightCountdown() {
    let fightCounter = 3;
    let fightInterval = setInterval(() => {
        switch (fightCounter) {
            case 3:
                setPromptMsgs("quick", ["small"], ["Ready"]);
                break;
            case 2:
                // setPromptMsgs("zero", ["medium"], ["Set"]);
                $(`#prompt-msg-1`).removeClass(`quick-anim smallPrompt`);
                $(`#prompt-msg-1`).addClass(`mediumPrompt`);
                $(`#prompt-msg-1`).html(`SET`);
                break;
            case 1:
                // setPromptMsgs("zero", ["big"], ["Fight!"]);
                $(`#prompt-msg-1`).removeClass(`mediumPrompt`);
                $(`#prompt-msg-1`).addClass(`bigPrompt`);
                $(`#prompt-msg-1`).html(`FIGHT!`);
                break;
        }
        fightCounter--;
        if (fightCounter === 0) {
            setTimeout(() => {
                remPromptMsgs("quick", 300);
                game.ready = true;
                // RUNMEBOI
                setRunInterval(1);
                setRunInterval(2);
                snakeGrowth(1);
                snakeGrowth(2);
            }, 1000);
            clearInterval(fightInterval);
        }
    }, 1000);
}

function pauseGame() {
    game.paused = true;
    player.p1.intervals.run.status = false;
    player.p2.intervals.run.status = false;

    let promptMsgArray = [];
    promptMsgArray[0] = `${player[`p${active.id}`].main.name} paused the game`;
    promptMsgArray[1] = `Press '${controls[`p${active.id}`].main.misc.aux}' or '${controls[`p${enemy.id}`].main.misc.aux}' to resume`;
    setPromptMsgs(`quick`, [`medium`, `small`], promptMsgArray);

}

function clearAllIntervals() {
    clearInterval(player.p1.intervals.useStrike.function);
    clearInterval(player.p2.intervals.useStrike.function);
    clearInterval(player.p1.intervals.fetchStrike.function);
    clearInterval(player.p2.intervals.fetchStrike.function);
    clearInterval(player.p1.abilities.ability1.interval.function);
    clearInterval(player.p1.abilities.ability2.interval.function);
    clearInterval(player.p2.abilities.ability1.interval.function);
    clearInterval(player.p2.abilities.ability2.interval.function);

    clearInterval(player.p1.intervals.growth.function);
    clearInterval(player.p2.intervals.growth.function);

    clearInterval(player.p1.abilities.ability1.seconds.function);
    clearInterval(player.p1.abilities.ability2.seconds.function);
    clearInterval(player.p2.abilities.ability1.seconds.function);
    clearInterval(player.p2.abilities.ability2.seconds.function);
    clearInterval(player.p1.intervals.run.function);
    clearInterval(player.p2.intervals.run.function);
    clearInterval(popUp.p1.function);
    clearInterval(popUp.p2.function);
    clearInterval(returnSpeed);
}

function resumeGame() {
    remPromptMsgs(`quick`, 200);
    game.paused = false;
}

function gameArena() {
    if (key.valid === false) {
        return "nah";
    }
    if (game.ready === false) {
        console.log(`Can't accept any Keys yet`);
        return "Can't accept any Keys yet";
    };
    // The following commands are triggered when a miscellaneous key is pressed
    if (key.type === "misc") {
        // if (activePlayer.main.misc === "exit") {
        //     player.p1.intervals.run.speed = (player.p1.intervals.run.speed === 100) ? 1000 : 100;
        //     console.log(`Change speed to ${player.p1.intervals.run.speed}`);
        //     clearInterval(player.p1.intervals.run.function);
        //     setRunInterval(active.id);
        // } else {
        if (game.over === true) {
            console.log(`Reset Arena Grid()`);
            resetArenaGrid();
        } else {
            if (game.paused === false) {
                pauseGame();
            } else {
                switch (activePlayer.main.misc) {
                    // BUILD
                    // The Aux and Exit keys should serve as Pause/Resume buttons
                    // When paused, the Aux key will Resume the game
                    // -Both players must press their Aux key to set themselves ready before the game resumes
                    // When paused, the Exit key will Exit the game and direct to gameChoose
                    // -Both players must press their Exit key to set themselves ready before going back to the Selection Screen
                    case "aux":
                        resumeGame();
                        break;
                    case "exit":
                        console.log(`EXIT!!!`);
                        break;
                }
            }
        }
        // }
    }

    // The following commands are triggered when a directional key is pressed
    else if (key.type === "direction") {
        if (activePlayer.arena.disabled === false) {
            if (
                activePlayer.arena.direction === `up` && activePlayer.main.direction === `down` ||
                activePlayer.arena.direction === `down` && activePlayer.main.direction === `up` ||
                activePlayer.arena.direction === `left` && activePlayer.main.direction === `right` ||
                activePlayer.arena.direction === `right` && activePlayer.main.direction === `left`
            ) {
                let mainDirection = activePlayer.main.direction.toUpperCase();
                let arenaDirection = activePlayer.arena.direction.toUpperCase();
                // console.log(`${mainDirection} is opposite of ${arenaDirection}`);
                activePlayer.arena.canTurn = false;
            } else {
                activePlayer.arena.canTurn = true;
            }
        }
    }

    // The following commands are triggered when an ability key is pressed
    else if (key.type === "ability") {
        // BUILD
        // We have to implement a cost-required system
        // If the snake size doesn't meet the ability's requirement, the ability doesn't activate TESTME
        // If the snake activates a skill, the ability's cost will be reduced from the snake size TESTME
        if (game.paused === false) {
            if (activePlayer.arena.disabled === false) {
                switch (activePlayer.main.ability) {
                    case "strike":
                        if (activePlayer.arena.size > 2) {
                            // console.log(`${activePlayer.main.name} activated Strike!`);
                            activePlayer.abilities.strike.status = true;
                            strike(active.id);
                        }
                        break;
                    case "ability1":
                    case "ability2":
                        let num = (activePlayer.main.ability === "ability1") ? 1 : 2;
                        let abilityNum = `ability${num}`;
                        let abilityReq = snakes[`${activePlayer.arena.snake}`].skills[`skill${num}`].required;
                        let abilityCost = snakes[`${activePlayer.arena.snake}`].skills[`skill${num}`].cost;
                        let skillName = snakes[activePlayer.arena.snake].skills[`skill${num}`].name;
                        if (snakes[activePlayer.arena.snake].skills[`skill${num}`].cooldown != "Passive") {
                            if (activePlayer.arena.size >= abilityReq) {
                                if (activePlayer.abilities[abilityNum].interval.status === false) {
                                    activePlayer.abilities[abilityNum].status = true;
                                    snakeAbilities[activePlayer.arena.snake][abilityNum](active.id);
                                    setCooldown(active.id, num);
                                    popSnake(active.id, abilityCost);
                                    abilityPopUp(active.id, `activate`, skillName);
                                } else {
                                    abilityPopUp(active.id, `cool`, skillName);
                                }
                            } else {
                                abilityPopUp(active.id, `size`, skillName);
                            }
                        } else {
                            abilityPopUp(active.id, `cool`, skillName);
                        }
                        break;
                }
            }
        }
    }

    logArena();
}

function popSnake(num, pops) {
    // console.log(`popSnake(${pops})`);

    // FIXME
    // When a snake eats food, any snake-size altering event gets hella confused and throws errors
    // This affects abilities like Quetzalcoatl's Reversal and even this popSnake() function
    // My instinct tells me fixing the snake-growth function will fix this
    let enm = (num === 1) ? 2 : 1;
    let activeUser = player[`p${num}`];
    let enemyUser = player[`p${enm}`];
    pops = (activeUser.arena.size - pops <= 1) ? 1 : pops;
    setSnakeSize(num);
    for (let i = activeUser.arena.size - 1, j = 1; j <= pops; i--, j++) {
        // console.log(`activeUser.arena.position.length = ${activeUser.arena.position.length}`); 
        // console.log(`activeUser.arena.position[${i}] = ${activeUser.arena.position[i]}`); 
        $(`#r${activeUser.arena.position[i][0]}c${activeUser.arena.position[i][1]}`).attr(`class`, `col dead-snake`);
        foundPart = i;
    }
    foundPart = (foundPart < 1) ? 1 : foundPart;
    activeUser.arena.position.splice(foundPart, pops);
    // activeUser.arena.size = activeUser.arena.position.length;
    setSnakeSize(num);
}

let popUp = {
    p1: {
        function: undefined,
        counter: 0,
        status: false,
        msg: undefined
    },
    p2: {
        function: undefined,
        counter: 0,
        status: false,
        msg: undefined
    }
}

function abilityPopUp(num, reason, value) {
    let enm = (num === 1) ? 2 : 1;
    let activeUser = player[`p${num}`];
    let enemyUser = player[`p${enm}`];
    // console.log(`popUp[p${num}].counter = ${popUp[`p${num}`].counter}`); 
    // console.log(`abilityTip(${num},${reason},${value})`);
    let popUpMsg;
    switch (reason) {
        case "activate":
            popUpMsg = `${value}!`;
            break;
        case "already":
            popUpMsg = `${value} already active!`;
            break;
        case "size":
            popUpMsg = `Too short for ${value}!`;
            break;
        case "cool":
            popUpMsg = `${value} not ready!`;
            break;
        case "crash":
            let crashMsg = Math.floor((Math.random() * 3) + 1);
            switch (crashMsg) {
                case 1:
                    popUpMsg = `oof!`;
                    break;
                case 2:
                    popUpMsg = `ow!`;
                    break;
                case 3:
                    popUpMsg = `oh no!`;
                    break;
            }
            break;
        case "snip":
            popUpMsg = `snipped!`;
            break;
        case "ability":
            popUpMsg = `${value}`;
            break;
    }
    // console.log(`${popUp}`);


    // console.log(`findMe() = ${$(`#game-arena-grid`).find(`#player${num}-popup`)}`);
    if ($(`#game-arena-grid`).find(`#player${num}-popup`).length != 0) {
        // console.log(`It already exists`);
        $(`#player${num}-popup`).remove();
        popUp[`p${num}`].counter = 0;
        clearInterval(popUp[`p${num}`].function);
    }


    $(`#game-arena-grid`).append(`<div id="player${num}-popup" class="player-popup"></div>`);
    $(`#player${num}-popup`).html(`<p>${popUpMsg}</p>`);
    let headPosX = parseInt(activeUser.arena.position[0][1]);
    let headPosY = parseInt(activeUser.arena.position[0][0]);
    // console.log(`[headPosX, headPosY] Real = [${headPosX}, ${headPosY}]`);
    headPosX = Math.floor(headPosX * 100 / game.col);
    headPosY = Math.floor(headPosY * 100 / game.row);
    headPosY = headPosY - 5;
    if (headPosX < 15) {
        // console.log(`To close to the left`);
        headPosX += 10;
    } else if (headPosX > 85) {
        // console.log(`To close to the right`);
        headPosX -= 10;
    }
    if (headPosY < 15) {
        // console.log(`To close to the top`);
        headPosY += 10;
    } else if (headPosY > 85) {
        // console.log(`To close to the bottom`);
    }
    // console.log(`[headPosX, headPosY] Perc = [${headPosX}, ${headPosY}]`);
    $(`#player${num}-popup`).attr(`style`, `top:${headPosY}%; left:${headPosX}%`);
    if (reason === "activate") {
        $(`#player${num}-popup`).addClass(`${activeUser.arena.snake}-font_color`);
    }

    popUp[`p${num}`].counter = 1;
    popUp[`p${num}`].function = setInterval(() => {
            if (game.paused === false) {
                if (popUp[`p${num}`].counter <= 100) {
                    popUp[`p${num}`].counter++;
                } else {
                    // console.log(`Make PopUp Disappear!`);
                    popUp[`p${num}`].counter = 0;
                    $(`#player${num}-popup`).remove();
                    clearInterval(popUp[`p${num}`].function);
                }
            }
        },
        10);
}

function setSnakeSize(num) {
    // console.log(`setSnakeSize(${num})`); 
    let activeUser = player[`p${num}`];
    activeUser.arena.size = parseInt(activeUser.arena.position.length);

    updatePlayerUI(num, `size`, ``);
}