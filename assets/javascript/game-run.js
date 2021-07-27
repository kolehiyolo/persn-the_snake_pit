function snakeAI(playerNum) {
    // PERFECT
    let num = playerNum;
    let activeUser = players[`player${num}`];
    let e = {
        key: undefined
    };
    if (activeUser.intervals.run.counter % 7 === 0) {
        switch (activeUser.arena.direction) {
            case "up":
                e.key = activeUser.controls.main.direction.right;
                break;
            case "down":
                e.key = activeUser.controls.main.direction.left;
                break;
            case "left":
                e.key = activeUser.controls.main.direction.up;
                break;
            case "right":
                e.key = activeUser.controls.main.direction.down;
                break;
        }
        pressKey(e);
    }
}

function setRunInterval(playerNum) {
    // Perfect
    console.log(`setRunInterval(${playerNum})`);
    let num = playerNum;
    let enm = (num === 1) ? 2 : 1;
    let activeUser = players[`player${num}`];
    let enemyUser = players[`player${enm}`];

    activeUser.intervals.run.status = true;
    activeUser.intervals.run.function = setInterval(() => {
        if (game.paused === false && activeUser.status.immobilized === false) {
            if (activeUser.status.canTurn === true) {
                activeUser.arena.direction = activeUser.main.direction;
                activeUser.status.canTurn = false;
            }
            activeUser.intervals.run.counter++;
            let headX = parseInt(activeUser.arena.position[0][0]);
            let headY = parseInt(activeUser.arena.position[0][1]);
            activeUser.arena.position.splice(1, 0, [(headX), (headY)]);
            activeUser.arena.position.pop();
            if (activeUser.status.ai === true) {
                snakeAI(num);
            }
            switch (activeUser.arena.direction) {
                case "left":
                    headX--;
                    break;
                case "right":
                    headX++;
                    break;
                case "up":
                    headY--;
                    break;
                case "down":
                    headY++;
                    break;
            }
            activeUser.arena.position[0][0] = headX;
            activeUser.arena.position[0][1] = headY;
            moveSnake(num);
            checkForFood(num);
            if (activeUser.skills.strike.status === true) {
                checkForStrike(num);
            }
            if (activeUser.status.unstoppable === true) {
                checkForUnstoppable(num);
            }
            if (activeUser.status.masochist != true) {
                checkForSelf(num);
            }
            if (activeUser.status.phased != true && enemyUser.status.phased != true) {
                checkForEnemy(enm, num);
            }
            if (activeUser.status.phased != true) {
                checkForObstacles(num);
                // checkForStrike(num, enm);
            }
            if (activeUser.status.portable != true) {
                checkForBorder(num);
            } else {
                checkForPortable(num);
            }
        }
    }, activeUser.intervals.run.speed);
}

function moveSnake(num) {
    // PERFECT
    let activeUser = players[`player${num}`];
    let activeSnake = activeUser.arena.snake;

    // We set the head
    $(`.player${num}-snake-head`).removeClass(`player${num}-snake-head ${activeSnake}-head player${num}-snake`);
    let headX = activeUser.arena.position[0][0];
    let headY = activeUser.arena.position[0][1];
    $(`#x${headX}y${headY}`).addClass(`player${num}-snake-head ${activeSnake}-head player${num}-snake`);

    // We set the body
    $(`.player${num}-snake-body`).removeClass(`player${num}-snake-body ${activeSnake}-body player${num}-snake`);
    for (let i = 1; i < activeUser.arena.position.length; i++) {
        let bodyX = activeUser.arena.position[i][0];
        let bodyY = activeUser.arena.position[i][1];
        $(`#x${bodyX}y${bodyY}`).addClass(`player${num}-snake-body ${activeSnake}-body player${num}-snake`);
    }
}

function eatFood(player, foodNum) {
    // PERFECT
    let num = player;
    let activeUser = players[`player${num}`];

    $(`.food-${foodNum}`).removeClass(`food-${foodNum}`);
    switch (foodNum) {
        case `item`:
            food.item.count = 0;
            food.item.active = false;
            console.log(`Add ${food.item.snake}'s ${food.item.skill}`);
            addItemToSnake(num);
            growSnake(num, food.item.value);
            break;
        case `super`:
            food.super.count = 0;
            food.super.active = false;
            // food.item.count++;
            endCountdown(num, 1);
            endCountdown(num, 2);
            growSnake(num, food.super.value);
            break;
        default:
            food.super.count++;
            growSnake(num, food[`food${foodNum}`].value);
            placeFood(foodNum);
            break;
    }
    if (food.super.count === food.super.limit) {
        food.super.active = true;
        placeFood(`super`);
    }
    if (food.item.count === food.item.limit) {
        food.item.active = true;
        placeFood(`item`);
    }

    updateFoodCountDiv();
}

function growSnake(num, growth) {
    // PERFECT
    let activeUser = players[`player${num}`];
    let activePosition = activeUser.arena.position;
    for (var i = 1; i <= growth; i++) {
        activePosition.push([]);
        activePosition[activePosition.length - 1][0] = parseInt(activePosition[activePosition.length - 2][0]);
        activePosition[activePosition.length - 1][1] = parseInt(activePosition[activePosition.length - 2][1]);
    }
    setSnakeSize(num);
}

function setSnakeSize(num) {
    // ALMOST
    let activeUser = players[`player${num}`];
    activeUser.arena.size = parseInt(activeUser.arena.position.length);
    updatePlayerUI(num, `size`, ``); // FIXME
}

function autoGrowth(num) {
    // ALMOST
    let activeUser = players[`player${num}`];
    activeUser.intervals.growth.function = setInterval(() => {
        if (game.paused === false) {
            if (activeUser.intervals.growth.counter > 0) {
                activeUser.intervals.growth.counter--;
            } else {
                activeUser.intervals.growth.counter = 5;
                growSnake(num, 1);
            }
            $(`#player${num}-ui-growth`).html(`${activeUser.intervals.growth.counter}`); // FIXME
        }
    }, activeUser.intervals.growth.speed);
}

function snakeCrash(num) {
    // FIX
    let activeUser = players[`player${num}`];
    if (activeUser.arena.position.length === 1) {
        if (activeUser.status.immortal === false) {
            playerDied(num);
            return;
        }
        switch (activeUser.arena.direction) {
            case `left`:
                activeUser.arena.direction = `right`;
                break;
            case `right`:
                activeUser.arena.direction = `left`;
                break;
            case `up`:
                activeUser.arena.direction = `down`;
                break;
            case `down`:
                activeUser.arena.direction = `up`;
                break;
        }
        activeUser.main.direction = activeUser.arena.direction;
        setSnakeSize(num);
        return;
        x
    }
    gamePopUp(num, `crash`, "");

    activeUser.arena.position.reverse();

    // Now we set the head immediately to the tail
    let headX = activeUser.arena.position[0][0];
    let headY = activeUser.arena.position[0][1];
    $(`.player${num}-snake-head`).removeClass(`player${num}-snake-head ${activeUser.arena.snake}-head player${num}-snake`);
    $(`#x${headX}y${headY}`).addClass(`player${num}-snake-head ${activeUser.arena.snake}-head player${num}-snake`);
    $(`#x${headX}y${headY}`).removeClass(`player${num}-snake-body ${activeUser.arena.snake}-body player${num}-snake`);

    // Now we determine the direction of the head by determining it's relation to the next segment
    let snakeHead = activeUser.arena.position[0];
    let afterSnakeHead = activeUser.arena.position[1];

    // This makes sure the snake doesn't kill itself when using Reversal right after eating
    if (snakeHead[0] === afterSnakeHead[0] && snakeHead[1] === afterSnakeHead[1]) {
        SearchForNotEqual: {
            for (let i = 1; i < activeUser.arena.position.length; i++) {
                if (snakeHead[0] != activeUser.arena.position[i][0] || snakeHead[1] != activeUser.arena.position[i][1]) {
                    afterSnakeHead = activeUser.arena.position[i];
                    break SearchForNotEqual;
                }
            }
        }
    }

    if (snakeHead[0] < afterSnakeHead[0]) {
        activeUser.arena.direction = `left`;
    } else if (snakeHead[0] > afterSnakeHead[0]) {
        activeUser.arena.direction = `right`;
    } else if (snakeHead[1] < afterSnakeHead[1]) {
        activeUser.arena.direction = `up`;
    } else if (snakeHead[1] > afterSnakeHead[1]) {
        activeUser.arena.direction = `down`;
    }
    activeUser.arena.position.pop();
    // activeUser.abilities.ability1.status = false;
    activeUser.main.direction = activeUser.arena.direction;
    setSnakeSize(num);
    popSnake(num, Math.floor(activeUser.arena.position.length / 2));
}

function playerDied(num) {
    // FIXME
    let enm = (num === 1) ? 2 : 1;
    let activeUser = players[`player${num}`];
    let enemyUser = players[`player${enm}`];
    enemyUser.main.score += 1;

    game.paused = true;
    game.winner = enemyUser.main.name;
    game.loser = activeUser.main.name;
    let winnerSnake = enemyUser.arena.snake;
    let loserSnake = activeUser.arena.snake;
    game.winner = `<span class="choose-${winnerSnake}-font_color">${game.winner}</span>`;
    game.loser = `<span class="choose-${loserSnake}-font_color">${game.loser}</span>`;

    activeUser.status.alive = false;

    console.log(`${game.winner} wins!`);
    clearAllIntervals();
    gameOver(enm);
}

function gameOver(num) {
    // FIXME
    let promptMsgArray = [];
    promptMsgArray[0] = `${game.winner} wins!`;
    setPromptMsgs(`quick`, [`medium`], promptMsgArray);
    game.over = true;
    updatePlayerScoreDiv(num);
}