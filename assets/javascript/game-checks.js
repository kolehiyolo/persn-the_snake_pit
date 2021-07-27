function checkForFood(num) {
    for (let i = 1; i <= 3; i++) {
        if ($(`.player${num}-snake-head`).hasClass(`food-${i}`)) {
            eatFood(num, i);
            break;
        }
    }
    if ($(`.player${num}-snake-head`).hasClass(`food-super`)) {
        eatFood(num, `super`);
    }
    if ($(`.player${num}-snake-head`).hasClass(`food-item`)) {
        $(`.food-item`).removeClass(`${food.item.snake}-border`);
        eatFood(num, `item`);
    }
}

function checkForSelf(num) {
    if ($(`.player${num}-snake-head`).hasClass(`player${num}-snake-body`)) {
        snakeCrash(num);
    }
}

function checkForStrike(num) {
    let activeUser = players[`player${num}`];
    if ($(`.player${num}-snake-body`).hasClass(`p${num}-strike`)) {
        $(`.player${num}-snake-body`).removeClass(`p${num}-strike ${activeUser.arena.snake}-strike`);
        switch (activeUser.arena.direction) {
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

function checkForEnemy(num, enm) {
    if (
        $(`.player${num}-snake-head`).hasClass(`player${enm}-snake-body`) ||
        $(`.player${num}-snake-head`).hasClass(`player${enm}-snake-head`)
    ) {
        snakeCrash(num);
    }
}

function checkForObstacles(num) {
    if ($(`.player${num}-snake-head`).hasClass(`dead-snake`)) {
        snakeCrash(num, )
    }
}

function checkForBorder(num) {
    let activeUser = players[`player${num}`];
    if (
        activeUser.arena.position[0][0] === 0 ||
        activeUser.arena.position[0][0] > game.arena.xAxis ||
        activeUser.arena.position[0][1] === 0 ||
        activeUser.arena.position[0][1] > game.arena.yAxis
    ) {
        snakeCrash(num)
    }
}

function checkForPortable(num) {
    let enm = (num === 1) ? 2 : 1;
    let activeUser = players[`player${num}`];
    let enemyUser = players[`player${enm}`];

    let xLimit = parseInt(game.arena.xAxis);
    let yLimit = parseInt(game.arena.yAxis);

    let partX = parseInt(activeUser.arena.position[0][0]);
    let partY = parseInt(activeUser.arena.position[0][1]);
    if (partX <= 0) {
        activeUser.arena.position[0][0] = xLimit;
    } else if (partX > xLimit) {
        activeUser.arena.position[0][0] = 1;
    } else if (partY <= 0) {
        activeUser.arena.position[0][1] = yLimit;
    } else if (partY > yLimit) {
        activeUser.arena.position[0][1] = 1;
    }
}

function checkForUnstoppable(num) {
    let enm = (num === 1) ? 2 : 1;
    let activeUser = players[`player${num}`];
    let enemyUser = players[`player${enm}`];
    let activeSnake = String(players[`player${num}`].arena.snake);

    if ($(`.player${num}-snake-head`).hasClass(`dead-snake`)) {
        // $(`.player${num}-snake-head`).removeClass(`dead-snake`);
        $(`.player${num}-snake-head`).attr(`class`,`cols player${num}-snake-head ${activeSnake}-head player${num}-snake`);
        $(`.player${num}-snake-head`).html(``);
    }

    let headX = parseInt(activeUser.arena.position[0][0]);
    let headY = parseInt(activeUser.arena.position[0][1]);
    if (activeUser.status.phased != true && enemyUser.status.phased != true) {
        LoopFindEnemy: {
            for (let i = 1; i < enemyUser.arena.position.length; i++) {
                let enemyX = parseInt(enemyUser.arena.position[i][0]);
                let enemyY = parseInt(enemyUser.arena.position[i][1]);
                if (
                    (headX === enemyX) &&
                    (headY === enemyY)
                ) {
                    i = 0;
                    chopSnake(enm, enemyX, enemyY);
                    break LoopFindEnemy;
                }
            }
        }
    }

    if (activeUser.status.masochist != true) {
        LoopFindSelf: {
            for (let i = 1; i < activeUser.arena.position.length; i++) {
                let selfX = parseInt(activeUser.arena.position[i][0]);
                let selfY = parseInt(activeUser.arena.position[i][1]);
                if (
                    (headX === selfX) &&
                    (headY === selfY)
                ) {
                    i = 0;
                    chopSnake(num, selfX, selfY);
                    break LoopFindSelf;
                }
            }
        }
    }

}