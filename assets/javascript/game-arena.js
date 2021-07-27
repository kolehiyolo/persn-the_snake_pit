// The state of this boolean determines if logging the gameStarted() events is permitted
// let enableLogGameArena = true;
let enableLogGameArena = false;

let displaySpeed = {
    col: 400,
    border: 400,
    snake: 500,
    food: 400
}

function logArena() {
    // FIXME - Refactor
    let activeUser = players[`player${active.id}`];
    let logEvent;
    if (key.type != undefined && enableLogGameArena === true) {
        switch (key.type) {
            case `misc`:
                switch (activeUser.main.misc) {
                    case `aux`:
                        break;
                    case `exit`:
                        break;
                }
                break;
            case `ability`:
                switch (activeUser.main.ability) {
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
                logEvent = `Go '${activeUser.main.direction}'`;
                break;
        }
        console.log(`--gameArena: Player ${active.id} -> ${key.type}: '${key.id}' = ${logEvent}`);
    }
}

function setArena() {
    // FIXME - Refactor
    console.log(`setArena()`);
    setGameVariables();
    setPlayersArena();
    game.state = "arena";
    players.player1.arena.snake = players.player1.choose.snake;
    players.player2.arena.snake = players.player2.choose.snake;
    setSkills(1);
    setSkills(2);
    testVariables();

    console.log("Player 1's Active Snake = " + players.player1.arena.snake);
    console.log("Player 2's Active Snake = " + players.player2.arena.snake);
    console.log("\n");

    setTimeout(() => {
        buildArenaGrid();
        placeArenaElements();
        setSkillFunctions();
    }, 500);
}

function buildArenaGrid() {
    // PERFECT
    console.log(`buildArenaGrid()`);

    // This creates the arena by adding the grid itself and all the cells
    $(`body main`).append(`<div id="game-arena-grid" class="hidden slow-anim arena-border-dead game-arena-element"></div>`);
    for (var i = 1; i <= game.arena.yAxis; i++) { // This first layer of the nest adds the rows
        $(`#game-arena-grid`).append(`<div id="row${i}" class="rows"></div>`);
        for (var j = 1; j <= game.arena.xAxis; j++) { // This second layer adds the column cells for each row
            $(`#row${i}`).append(`<div id="x${j}y${i}" class="cols medium-anim col-dead"></div>`);
        }
    }
}

function placeArenaElements() {
    // FIXME - Refactor
    console.log(`setArenaElements()`);
    // Now we set-up a sick-ass animation to show the Arena
    setTimeout(() => {
        $(`#game-arena-grid`).removeClass(`hidden`);
        $(`#game-arena-grid`).addClass(`show`);
    }, 1);
    $(`.cols`).removeClass(`col-dead`);
    $(`.cols`).addClass(`col-glow`);

    // Then we set-up the fight count-down
    fightCountdown();
    setTimeout(() => {
        $(`.cols`).removeClass(`medium-anim`);
        $(`.cols`).addClass(`slow-anim`);
        $(`.cols`).removeClass(`col-glow`);

        setTimeout(() => {
            $(`#game-arena-grid`).removeClass(`arena-border-dead`);
            $(`#game-arena-grid`).addClass(`arena-border-normal`);

            setTimeout(() => {
                $(`.cols`).removeClass(`slow-anim`);
                $(`.cols`).addClass(`medium-anim`);
                setPlayerUI(1);
                setPlayerUI(2);
                placeSnake(1);
                placeSnake(2);
                setScoreBoard();
                $(`.cols`).removeClass(`medium-anim`);
                $(`.cols`).addClass(`slow-anim`);
                let foodNum = 1;
                let foodInterval = setInterval(() => {
                    placeFood(foodNum);
                    foodNum++;
                    if (foodNum > 3) {
                        setTimeout(() => {
                            $(`.cols`).removeClass(`slow-anim`);
                        }, 500);
                        clearInterval(foodInterval);
                    }
                }, displaySpeed.food);
            }, displaySpeed.snake);
        }, displaySpeed.border);
    }, displaySpeed.col);
}

function resetArenaElements() {
    // FIXME - Refactor
    console.log(`resetArenaGrid()`);
    remPromptMsgs("quick", 300);
    $(`.cols`).attr("class", "cols");
    $(`#game-arena-grid`).attr(`class`, `slow-anim arena-border-normal game-arena-element`);
    setGameVariables();
    setPlayersArena();
    resetSkills();
    $(`.player-popup`).remove();
    $(`.temp-styling`).remove();
    $(`.clone-labels`).remove();
    game.state = "arena";
    players.player1.arena.snake = players.player1.choose.snake;
    players.player2.arena.snake = players.player2.choose.snake;
    setSkills(1);
    setSkills(2);

    fightCountdown();
    setPlayerUI(1);
    setPlayerUI(2);
    placeSnake(1);
    placeSnake(2);
    setSkillFunctions();
    $(`.cols`).addClass(`slow-anim`);
    let foodNum = 1;
    let foodInterval = setInterval(() => {
        placeFood(foodNum);
        foodNum++;
        if (foodNum > 3) {
            setTimeout(() => {
                $(`.cols`).removeClass(`slow-anim`);
            }, 500);
            clearInterval(foodInterval);
        }
    }, displaySpeed.food);
}

function placeSnake(num) {
    // FIXME - Refactor
    // FIX
    // This is to be used to set the Snakes on the Game Board
    // I also intend on adding a "respawn" mechanic, which will probably use the same method this one does
    let activeUser = players[`player${num}`];
    let activeSnake = activeUser.arena.snake;
    let activePosition;
    let row = game.arena.yAxis;
    let col = game.arena.xAxis;
    // if (num ===2) {
    //     players.player2.status.immobilized = true
    // }
    switch (num) {
        case 1:
            activeUser.main.direction = `right`;
            activeUser.arena.position[0] = [Math.floor(col / 4), Math.floor(row / 4)];
            for (let i = 1; i < activeUser.arena.size; i++) {
                activeUser.arena.position[i] = [];
                activeUser.arena.position[i][0] = activeUser.arena.position[i - 1][0] - 1;
                activeUser.arena.position[i][1] = activeUser.arena.position[i - 1][1];
            }
            break;
        case 2:
            activeUser.main.direction = `left`;
            activeUser.arena.position[0] = [Math.ceil(col - col / 4) + 1, Math.ceil(row - row / 4) + 1];
            for (let i = 1; i < activeUser.arena.size; i++) {
                activeUser.arena.position[i] = [];
                activeUser.arena.position[i][0] = activeUser.arena.position[i - 1][0] + 1;
                activeUser.arena.position[i][1] = activeUser.arena.position[i - 1][1];
            }
            break;
    }
    activeUser.arena.direction = activeUser.main.direction;
    activePosition = activeUser.arena.position;

    activeUser.arena.size = parseInt(activeUser.arena.position.length);
    $(`#player${num}-ui-size`).html(`${activeUser.arena.size}`);

    $(`#x${activePosition[0][0]}y${activePosition[0][1]}`).addClass(`player${num}-snake-head player${num}-snake`);
    $(`.player${num}-snake-head`).addClass(`${activeSnake}-head`);

    for (let i = 1; i < activePosition.length; i++) {
        $(`#x${activePosition[i][0]}y${activePosition[i][1]}`).addClass(`player${num}-snake-body player${num}-snake`);
        $(`.player${num}-snake-body`).addClass(`${activeSnake}-body`);
    };
}

function placeFood(num) {
    // FIXME - Refactor
    let foodActive = false;
    let foodNum = num;
    let foodX;
    let foodY;

    while (foodActive === false) {
        foodX = Math.floor((Math.random() * parseInt(game.arena.xAxis)) + 1)
        foodY = Math.floor((Math.random() * parseInt(game.arena.yAxis)) + 1);
        if (
            $(`#x${foodX}y${foodY}`).hasClass(`food`) ||
            $(`#x${foodX}y${foodY}`).hasClass(`player1-snake`) ||
            $(`#x${foodX}y${foodY}`).hasClass(`player2-snake`) ||
            $(`#x${foodX}y${foodY}`).hasClass(`dead-snake`) ||
            $(`#x${foodX}y${foodY}`).hasClass(`horizontal-strike`) ||
            $(`#x${foodX}y${foodY}`).hasClass(`vertical-strike`)
        ) {
            console.log(`--There's already something there! Food-${foodNum}`);
        } else {
            foodActive = true;
            $(`#x${foodX}y${foodY}`).addClass(`medium-anim`);
            $(`#x${foodX}y${foodY}`).addClass(`food-${foodNum} food`);
            $(`.food-${foodNum}`).removeClass(`dead-snake`);
            setTimeout(() => {
                $(`#x${foodX}y${foodY}`).removeClass(`medium-anim`);
            }, 1000);
        }
    }

    if (foodNum === "item") {
        food.item.position[0] = foodX;
        food.item.position[1] = foodY;
        setItemFood();
    } else if (foodNum === "super") {
        food.super.position[0] = foodX;
        food.super.position[1] = foodY;
    } else {
        food[`food${num}`].position[0] = foodX;
        food[`food${num}`].position[1] = foodY;
    }
    updateFoodCountDiv();
}


function setItemFood() {
    let snakeChoices = [`apopis`, `orochi`, `quetzalcoatl`, `lóng`, `jörmungandr`, `sheshanaga`];
    let activeSnake = snakeChoices[Math.floor((Math.random() * 6))];

    food.item.snake = activeSnake;
    food.item.skill = Math.floor((Math.random() * 2) + 1);

    $(`.food-item`).addClass(`${activeSnake}-border`);
}

function addItemToSnake(num) {
    let s = `skill${food.item.skill}`;
    // $(`#player${num}-ui-item`).append(`<div id="player${num}-ui-item-text" class="player-ui-item-text"></div>`);
    // $(`#player${num}-ui-item-text`).append(`<p id="player${num}-ui-item-name" class="player-ui-item-name"></p>`);
    // $(`#player${num}-ui-item-text`).append(`<p id="player${num}-ui-item-desc" class="player-ui-item-desc"></p>`);
    $(`#player${num}-ui-item-name`).html(`${snakes[food.item.snake].skills[`${s}`].name}`);
    $(`#player${num}-ui-item-desc`).html(`${snakes[food.item.snake].skills[`${s}`].longerDescription}`);

    // Add the Stats
    $(`#player${num}-ui-item-text`).append(`<p id="player${num}-ui-item-dura" class="player-ui-skill-dura"></p>`);
    $(`#player${num}-ui-item-text`).append(`<p id="player${num}-ui-item-cool" class="player-ui-skill-cool"></p>`);
    if (snakes[food.item.snake].skills[`${s}`].duration === `Instant`) {
        $(`#player${num}-ui-item-dura`).html(`Duration: ${snakes[food.item.snake].skills[`${s}`].duration}`);
    } else {
        $(`#player${num}-ui-item-dura`).html(`Duration: ${snakes[food.item.snake].skills[`${s}`].duration} secs`);
    }
    if (snakes[food.item.snake].skills[`${s}`].cooldown === `Instant`) {
        $(`#player${num}-ui-item-cool`).html(`Duration: ${snakes[food.item.snake].skills[`${s}`].cooldown}`);
    } else {
        $(`#player${num}-ui-item-cool`).html(`Duration: ${snakes[food.item.snake].skills[`${s}`].cooldown} secs`);
    }

    if (snakes[food.item.snake].skills[`${s}`].cooldown != "Passive") {
        // Add the Time Bar
        $(`#player${num}-ui-item`).append(`<div id="player${num}-ui-item-time" class="player-ui-skill-time"></div>`);

        // Add the Key
        // $(`#player${num}-ui-item`).append(`<div id="player${num}-ui-item-key" class="player-ui-skill-key"></div>`);
        // $(`#player${num}-ui-item-key`).html(`<p>${players[`player${num}`].controls.main.skill.item}</p>`);

        // Add the Required
        $(`#player${num}-ui-item`).append(`<div id="player${num}-ui-item-req" class="player-ui-skill-req"></div>`);
        for (let j = 1; j <= snakes[food.item.snake].skills[`${s}`].required; j++) {
            $(`#player${num}-ui-item-req`).append(`<div id="player${num}-ui-item-req${j}" class="player${num}-ui-item-req-part"></div>`);
            $(`#player${num}-ui-item-req${j}`).addClass(`player-ui-skill-req-part`);
        }

        // Add the Cost
        for (let j = 1; j <= snakes[food.item.snake].skills[`${s}`].cost; j++) {
            $(`#player${num}-ui-item-req${j}`).addClass(`player${num}-ui-item-cost-part`);
        }
        $(`.player${num}-ui-item-cost-part`).addClass(`${food.item.snake}-ui-border`);
    } else {
        // console.log(`${snakes[food.item.snake].skills[`${s}`].name} is a Passive Skill`);
        // $(`#player${num}-ui-skill${i}`).append(`<div id="player${num}-ui-skill${i}-pass" class="player-ui-skill-pass"></div>`);
        // $(`#player${num}-ui-skill${i}-pass`).html(`<p>Passive</p>`);
        // $(`#player${num}-ui-skill${i}`).addClass(`player-ui-skill-pass-border`);
    }
    $(`#player${num}-ui-item`).addClass(`${food.item.snake}-border`);

}

function fightCountdown() {
    // FIXME - Refactor
    let fightCounter = 2;
    let fightInterval = setInterval(() => {
        switch (fightCounter) {
            case 2:
                setPromptMsgs("quick", ["small"], ["Ready"]);
                break;
            case 1:
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
                game.paused = false;
                // RUNMEBOI
                setRunInterval(1);
                setRunInterval(2);
                autoGrowth(1);
                autoGrowth(2);
            }, 1000);
            clearInterval(fightInterval);
        }
    }, 1000);
}

function clearAllIntervals() {
    clearInterval(players.player1.intervals.run.function);
    clearInterval(players.player2.intervals.run.function);
    clearInterval(players.player1.intervals.growth.function);
    clearInterval(players.player2.intervals.growth.function);
    clearInterval(players.player1.intervals.popUp.function);
    clearInterval(players.player2.intervals.popUp.function);

    clearInterval(players.player1.skills.strike.strike.function);
    clearInterval(players.player2.skills.strike.strike.function);
    clearInterval(players.player1.skills.strike.fetch.function);
    clearInterval(players.player2.skills.strike.fetch.function);

    clearInterval(players.player1.skills.skill1.duration.function);
    clearInterval(players.player1.skills.skill1.cooldown.function);
    clearInterval(players.player1.skills.skill2.duration.function);
    clearInterval(players.player1.skills.skill2.cooldown.function);

    clearInterval(players.player2.skills.skill1.duration.function);
    clearInterval(players.player2.skills.skill1.cooldown.function);
    clearInterval(players.player2.skills.skill2.duration.function);
    clearInterval(players.player2.skills.skill2.cooldown.function);

    orochiClones = {
        counter: 0,
        clones: {
            // clone1: {
            //     id: 1,
            //     position: [[`x`, `y`]],
            // },
        },
    }
}

function pauseGame() {
    game.paused = true;
    setArenaMenu();
    game.state = `paused`;
    // let promptMsgArray = [];
    // promptMsgArray[0] = `${players[`player${active.id}`].main.name} paused the game`;
    // promptMsgArray[1] = `Press '${players[`player${active.id}`].controls.main.misc.aux}' or `;
    // promptMsgArray[1] += `'${players[`player${enemy.id}`].controls.main.misc.aux}' to resume`;
    // setPromptMsgs(`quick`, [`medium`, `small`], promptMsgArray);
}

function resumeGame() {
    game.paused = false;
    remArenaMenu();
    game.state = `arena`;
    // remPromptMsgs(`quick`, 200);
}

function gameArena() {
    let num = parseInt(active.id);
    let activeUser = players[`player${num}`];

    if (game.ready === false) { // This basically escapes the function if game.ready is false
        console.log(`Can't accept any Keys yet`);
        return false;
    };

    if (key.type === "misc") { // The following commands are triggered when a miscellaneous key is pressed
        if (game.over === true) { // If the round is over and a misc key is pressed, we start the new round
            resetArenaElements();
        } else {
            if (game.paused === false) { // If the game is not paused and a misc key is pressed, we pause the game
                pauseGame();
            } else { // If the game is paused and a misc key is pressed, aux will resume the game while exit will exit the round to the choose screen
                switch (activeUser.main.misc) { // We now determine which misc key it is
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
    } else if (key.type === "direction") { // The following commands are triggered when a directional key is pressed
        if (activeUser.status.disarmed === false) {
            if ( // This simply determines if the snake can turn which prevents inward movement
                activeUser.arena.direction === `up` && activeUser.main.direction === `down` ||
                activeUser.arena.direction === `down` && activeUser.main.direction === `up` ||
                activeUser.arena.direction === `left` && activeUser.main.direction === `right` ||
                activeUser.arena.direction === `right` && activeUser.main.direction === `left`
            ) {
                activeUser.status.canTurn = false;
            } else {
                activeUser.status.canTurn = true;
            }
        }
    } else if (key.type === "skill") { // The following commands are triggered when an ability key is pressed
        let activeSkill = activeUser.skills[`${activeUser.main.skill}`];
        let skillName = activeSkill.name;
        if (game.paused === false) {
            if (activeUser.status.disarmed === false) {
                if (activeUser.arena.position.length >= activeSkill.required) {
                    if (activeSkill.ready === true) {
                        gamePopUp(num, `activate`, skillName); // Activate the skill
                        if (activeUser.main.skill === `strike` && activeUser.status.canStrike === true) {
                            strike(num);
                        }
                        if (activeUser.main.skill != `strike`) {
                            let skillNum = (activeUser.main.skill === "skill1") ? 1 : 2;

                            // Now we activate the skill
                            console.log(`Activate ${skillName}`);
                            activeSkill.status = true;
                            // snakeSkills[activeUser.arena.snake][`skill${skillNum}`](num);
                            snakes[activeUser.arena.snake].skills[`skill${skillNum}`].function(num);
                            if (activeSkill.cooldown.value != `Instant`) {
                                setCooldown(num, skillNum);
                            }
                            popSnake(num, activeSkill.cost);
                        }
                    } else {
                        gamePopUp(num, `cool`, skillName); // Skill cooling down
                    }
                } else {
                    gamePopUp(num, `size`, skillName); // Not long enough
                }
            } else {
                gamePopUp(num, `disarmed`, skillName); // Snake is disarmed
            }
        }
    }

    logArena();
}

function popSnake(num, pops) {
    if (pops === 0 || pops === undefined) {
        return;
    }
    // FIXME
    // When a snake eats food, any snake-size altering event gets hella confused and throws errors
    // This affects abilities like Quetzalcoatl's Reversal and even this popSnake() function
    // My instinct tells me fixing the snake-growth function will fix this
    let enm = (num === 1) ? 2 : 1;
    let activeUser = players[`player${num}`];
    // let enemyUser = players[`player${enm}`];
    pops = (activeUser.arena.size === 1) ? 0 : (activeUser.arena.size - pops <= 1) ? 1 : pops;
    setSnakeSize(num);
    for (let i = activeUser.arena.size - 1, j = 1; j <= pops; i--, j++) {
        // activeUser.arena.position.pop();
        $(`#x${activeUser.arena.position[i][0]}y${activeUser.arena.position[i][1]}`).attr(`class`, `cols dead-snake`);
        foundPart = i;
    }
    foundPart = (foundPart < 1) ? 1 : foundPart;
    activeUser.arena.position.splice(foundPart, pops);
    setSnakeSize(num);
}

function gamePopUp(num, reason, value) {
    // FIXME
    let enm = (num === 1) ? 2 : 1;
    let activeUser = players[`player${num}`];
    let enemyUser = players[`player${enm}`];

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
        case "disarmed":
            popUpMsg = `currently disarmed!`;
    }

    if ($(`#game-arena-grid`).find(`#player${num}-popup`).length != 0) {
        $(`#player${num}-popup`).remove();
        activeUser.intervals.count = 0;
        clearInterval(activeUser.intervals.popUp.function);
    }

    $(`#game-arena-grid`).append(`<div id="player${num}-popup" class="player-popup"></div>`);
    $(`#player${num}-popup`).html(`<p>${popUpMsg}</p>`);
    let headPosX = parseInt(activeUser.arena.position[0][0]);
    let headPosY = parseInt(activeUser.arena.position[0][1]);
    headPosX = Math.floor(headPosX * 100 / game.arena.xAxis);
    headPosY = Math.floor(headPosY * 100 / game.arena.yAxis);
    headPosY = headPosY - 5;
    if (headPosX < 15) {
        headPosX += 10;
    } else if (headPosX > 85) {
        headPosX -= 10;
    }
    if (headPosY < 15) {
        headPosY += 10;
    }
    $(`#player${num}-popup`).attr(`style`, `top:${headPosY}%; left:${headPosX}%`);
    if (reason === "activate") {
        $(`#player${num}-popup`).addClass(`${activeUser.arena.snake}-font_color`);
    }

    let durationCounter = 1;
    activeUser.intervals.popUp.function = setInterval(() => {
        if (game.paused === false) {
            if (durationCounter <= 250) {
                durationCounter++;
            } else {
                durationCounter = 0;
                $(`#player${num}-popup`).remove();
                clearInterval(activeUser.intervals.popUp.function);
            }
        }
    }, 1);
}