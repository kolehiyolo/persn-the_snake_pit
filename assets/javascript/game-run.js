function snakeAI(playerNum) {
    let num = playerNum;
    let e = {
        key: undefined
    };
    switch (num) {
        case 1:
            break;
        case 2:
            if (player.p2.intervals.run.count % 7 === 0) {
                switch (player.p2.arena.direction) {
                    case "up":
                        e.key = controls.p2.main.direction.right;
                        break;
                    case "down":
                        e.key = controls.p2.main.direction.left;
                        break;
                    case "left":
                        e.key = controls.p2.main.direction.up;
                        break;
                    case "right":
                        e.key = controls.p2.main.direction.down;
                        break;
                }
                pressKey(e);
            }
            break;
    }
}

function setRunInterval(playerNum) {
    let num = playerNum;
    let enm = (num === 1) ? 2 : 1;
    let activeUser = player[`p${num}`];
    let enemyUser = player[`p${enm}`];
    activeUser.intervals.run.status = true;
    activeUser.intervals.run.function = setInterval(() => {
        if (game.paused === false && activeUser.arena.immobilized === false) {
            if (activeUser.arena.canTurn === true) {
                activeUser.arena.direction = activeUser.main.direction;
                activeUser.arena.canTurn = false;
            }
            player[`p${num}`].intervals.run.count++;
            player[`p${num}`].arena.position.splice(1, 0, [parseInt(player[`p${num}`].arena.position[0][0]), parseInt(player[`p${num}`].arena.position[0][1])]);
            player[`p${num}`].arena.position.pop();
            // snakeAI(num);
            switch (player[`p${num}`].arena.direction) {
                case "up":
                    player[`p${num}`].arena.position[0][0]--;
                    break;
                case "down":
                    player[`p${num}`].arena.position[0][0]++;
                    break;
                case "left":
                    player[`p${num}`].arena.position[0][1]--;
                    break;
                case "right":
                    player[`p${num}`].arena.position[0][1]++;
                    break;
            }
            moveSnake(num, enm);
            checkForFood(num, enm);
            checkForSelf(num, enm);
            if (activeUser.arena.phased === false){
                checkStrike(num, enm);
                checkForEnemy(num, enm);
                checkForObstacles(num, enm);
            }
            if (activeUser.arena.portaled === false) {
                checkForBorder(num, enm);
            }
            else {
                portaledFunc(num);
            }
        }
    }, player[`p${num}`].intervals.run.speed);
}

function shrinkSnake(num) {
    player[`p${num}`].arena.position.pop();
    setSnakeSize(num);
}

function growSnake(num, growth) {
    for (var i = 1; i <= growth; i++) {
        player[`p${num}`].arena.position.push([]);
        // TESTME
        player[`p${num}`].arena.position[player[`p${num}`].arena.position.length - 1][0] = parseInt(player[`p${num}`].arena.position[player[`p${num}`].arena.position.length - 2][0]);
        player[`p${num}`].arena.position[player[`p${num}`].arena.position.length - 1][1] = parseInt(player[`p${num}`].arena.position[player[`p${num}`].arena.position.length - 2][1]);
    }
    setSnakeSize(num);
}

function checkStrike(num, enm) {
    if ($(`.player${num}-snake-head`).hasClass(`p${num}-strike`)) {
        $(`.player${num}-snake-head`).removeClass(`p${num}-strike ${player[`p${num}`].arena.snake}-strike`);
        switch (player[`p${num}`].arena.direction) {
            case "up":
            case "down":
                $(`.player${num}-snake-head`).removeClass(`vertical-strike`);
                break;
            case "left":
            case "right":
                $(`.player${num}-snake-head`).removeClass(`horizontal-strike`);
                break;
        }
    }
    if ($(`.player${num}-snake-body`).hasClass(`p${num}-strike`)) {
        $(`.player${num}-snake-body`).removeClass(`p${num}-strike ${player[`p${num}`].arena.snake}-strike`);
        switch (player[`p${num}`].arena.direction) {
            case "up":
            case "down":
                $(`.player${num}-snake-body`).removeClass(`vertical-strike`);
                break;
            case "left":
            case "right":
                $(`.player${num}-snake-body`).removeClass(`horizontal-strike`);
                break;
        }
    }
}

function checkForFood(num, enm) {
    for (let i = 1; i <= 3; i++) {
        if ($(`.player${num}-snake-head`).hasClass(`food-${i}`)) {
            food.super.count++;
            growSnake(num, 2);
            setFood(i);
            // updatePlayerUI(num, `size`, ``);
            setSnakeSize(num);
            break;
        }
    }
    if ($(`.player${num}-snake-head`).hasClass(`food-super`)) {
        $(`.food-super`).removeClass(`food-super`);
        food.super.active = false;
        food.super.count = 0;
        updateFoodCountDiv();
        growSnake(num, 5);
        // updatePlayerUI(num, `size`, ``);
        setSnakeSize(num);
    }
}

function checkForSelf(num, enm) {
    if ($(`.player${num}-snake-head`).hasClass(`player${num}-snake-body`)) {
        snakeCrash(num, enm)
    }
}

function snakeCrash(num, enm) {
    // FIX
    let activeUser = player[`p${num}`];
    let enemyUser = player[`p${enm}`];
    if (activeUser.arena.position.length === 1) {
        playerDied(num, enm);
        return;
    }
    abilityPopUp(num, `crash`, "");
    activeUser.arena.position.reverse();
    // Now we set the head immediately to the tail
    let headRow = player[`p${num}`].arena.position[0][0];
    let headCol = player[`p${num}`].arena.position[0][1];
    $(`.player${num}-snake-head`).removeClass(`player${num}-snake-head ${player[`p${num}`].arena.snake}-head player${num}-snake`);
    $(`#r${headRow}c${headCol}`).addClass(`player${num}-snake-head ${player[`p${num}`].arena.snake}-head player${num}-snake`);
    $(`#r${headRow}c${headCol}`).removeClass(`player${num}-snake-body ${player[`p${num}`].arena.snake}-body player${num}-snake`);

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
        activeUser.arena.direction = `up`;
    } else if (snakeHead[0] > afterSnakeHead[0]) {
        activeUser.arena.direction = `down`;
    } else if (snakeHead[1] < afterSnakeHead[1]) {
        activeUser.arena.direction = `left`;
    } else if (snakeHead[1] > afterSnakeHead[1]) {
        activeUser.arena.direction = `right`;
    }

    activeUser.main.direction = activeUser.arena.direction;
    activeUser.abilities.ability1.status = false;
    setSnakeSize(num);
    popSnake(num, Math.floor(activeUser.arena.position.length / 2));
}

function checkForEnemy(num, enm) {
    if ($(`.player${num}-snake-head`).hasClass(`player${enm}-snake-body`)) {
        snakeCrash(num, enm)
    }
    if ($(`.player${num}-snake-head`).hasClass(`player${enm}-snake-head`)) {
        snakeCrash(num, enm)
    }
}

function checkForBorder(num, enm) {
    if (
        player[`p${num}`].arena.position[0][0] === 0 ||
        player[`p${num}`].arena.position[0][0] > game.row ||
        player[`p${num}`].arena.position[0][1] === 0 ||
        player[`p${num}`].arena.position[0][1] > game.col
    ) {
        snakeCrash(num, enm)
    }
}

function checkForObstacles(num, enm) {
    if ($(`.player${num}-snake-head`).hasClass(`dead-snake`)) {
        snakeCrash(num, enm)
    }
}

function playerDied(num) {
    let enm = (num === 1) ? 2 : 1;
    let activeUser = player[`p${num}`];
    let enemyUser = player[`p${enm}`];
    enemyUser.main.score += 1;

    game.paused = true;
    game.winner = enemyUser.main.name;
    game.loser = activeUser.main.name;
    let winnerSnake = enemyUser.arena.snake;
    let loserSnake = activeUser.arena.snake;
    console.log(`${game.winner} wins!`);
    clearAllIntervals();

    activeUser.arena.alive = false;


    game.winner = `<span class="choose-${winnerSnake}-font_color">${game.winner}</span>`;
    game.loser = `<span class="choose-${loserSnake}-font_color">${game.loser}</span>`;

    // $(`.player${num}-snake`).addClass(`dead-snake`);
    // $(`.player${num}-snake`).removeClass(`player${num}-snake-head player${num}-snake-body player${num}-snake ${loserSnake}-head ${loserSnake}-body`);

    let promptMsgArray = [];
    promptMsgArray[0] = `${game.winner} wins!`;
    setPromptMsgs(`quick`, [`medium`], promptMsgArray);
    game.over = true;
    updatePlayerScoreDiv(enm);
}

function moveSnake(num, enm) {
    // First we remove the head
    let headRow = player[`p${num}`].arena.position[0][0];
    let headCol = player[`p${num}`].arena.position[0][1];
    $(`.player${num}-snake-head`).removeClass(`player${num}-snake-head ${player[`p${num}`].arena.snake}-head player${num}-snake`);
    // Then we set the head on it's new position
    $(`#r${headRow}c${headCol}`).addClass(`player${num}-snake-head ${player[`p${num}`].arena.snake}-head player${num}-snake`);
    let bodyRow;
    let bodyCol;
    $(`.player${num}-snake-body`).removeClass(`player${num}-snake-body ${player[`p${num}`].arena.snake}-body player${num}-snake`);
    for (let i = 1; i < player[`p${num}`].arena.position.length; i++) {
        bodyRow = player[`p${num}`].arena.position[i][0];
        bodyCol = player[`p${num}`].arena.position[i][1];
        $(`#r${bodyRow}c${bodyCol}`).addClass(`player${num}-snake-body ${player[`p${num}`].arena.snake}-body player${num}-snake`);
    }
}

function snakeGrowth(num) {
    let enm = (num === 1) ? 2 : 1;
    let activeUser = player[`p${num}`];
    let enemyUser = player[`p${enm}`];

    activeUser.intervals.growth.function = setInterval(() => {
        if (game.paused === false) {
            if (activeUser.intervals.growth.count > 0) {
                activeUser.intervals.growth.count--;
            } else {
                activeUser.intervals.growth.count = 5;
                growSnake(num, 1);
            }
            $(`#player${num}-ui-growth`).html(`${activeUser.intervals.growth.count}`);
        }
    }, 1000);
}