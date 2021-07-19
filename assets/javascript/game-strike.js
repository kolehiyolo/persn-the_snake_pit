let strike = function (num) {
    let enm = (num === 1) ? 2 : 1;
    let activeUser = players[`player${num}`];
    let enemyUser = players[`player${enm}`];
    let activeSkill = activeUser.skills.strike;

    activeSkill.status = true;
    activeSkill.ready = false;
    activeUser.status.disarmed = true;
    activeUser.status.canStrike = false;
    activeUser.arena.position.pop();

    switch (activeUser.arena.direction) {
        case `left`:
            activeSkill.strike.counter = activeUser.arena.position[0][0] - 1;
            break;
        case `right`:
            activeSkill.strike.counter = activeUser.arena.position[0][0] + 1;
            break;
        case `up`:
            activeSkill.strike.counter = activeUser.arena.position[0][1] - 1;
            break;
        case `down`:
            activeSkill.strike.counter = activeUser.arena.position[0][1] + 1;
            break;
    }
    setStrike(num);
}

function setStrike(num) {
    // console.log(`setStrike(${num})`);
    let enm = (num === 1) ? 2 : 1;
    let activeUser = players[`player${num}`];
    let enemyUser = players[`player${enm}`];
    let activeSkill = activeUser.skills.strike;

    activeSkill.strike.status = true;

    let strikeCondition;
    let addOrMinus;
    switch (activeUser.arena.direction) {
        case `left`:
            strikeCondition = (i) => i > 0;
            addOrMinus = -1;
            break;
        case `right`:
            strikeCondition = (i) => i <= game.arena.xAxis;
            addOrMinus = 1;
            break;
        case `up`:
            strikeCondition = (i) => i > 0;
            addOrMinus = -1;
            break;
        case `down`:
            strikeCondition = (i) => i <= game.arena.yAxis;
            addOrMinus = 1;
            break;
    }
    activeSkill.strike.function = setInterval(() => {
        if (game.paused === false) {
            let i = activeSkill.strike.counter;
            if (strikeCondition(i)) {
                switch (activeUser.arena.direction) {
                    case "left":
                    case "right":
                        $(`#x${i}y${activeUser.arena.position[0][1]}`).addClass(`horizontal-strike p${num}-strike ${activeUser.arena.snake}-strike`);
                        break;
                    case "up":
                    case "down":
                        $(`#x${activeUser.arena.position[0][0]}y${i}`).addClass(`vertical-strike p${num}-strike ${activeUser.arena.snake}-strike`);
                        break;
                }
                if (checkStrikeFood(num) || checkStrikeSnake(num, enm)) {
                    strikeCondition = (i) => {
                        return false;
                    }
                };
                activeSkill.strike.counter += addOrMinus;
            } else {
                activeSkill.strike.status = false;
                clearInterval(activeSkill.strike.function);
                setFetch(num);
            }
        }
    }, activeSkill.strike.speed);
}

function setFetch(num) {
    // console.log(`setFetch(${num})`);
    let enm = (num === 1) ? 2 : 1;
    let activeUser = players[`player${num}`];
    let enemyUser = players[`player${enm}`];
    let activeSkill = activeUser.skills.strike;

    activeSkill.fetch.status = true;
    activeSkill.fetch.counter = parseInt(activeSkill.strike.counter);

    let strikeCondition;
    let addOrMinus;
    switch (activeUser.arena.direction) {
        case "left":
            strikeCondition = (i) => i < activeUser.arena.position[0][0];
            addOrMinus = 1;
            break;
        case "right":
            strikeCondition = (i) => i > activeUser.arena.position[0][0];
            addOrMinus = -1;
            break;
        case "up":
            strikeCondition = (i) => i < activeUser.arena.position[0][1];
            addOrMinus = 1;
            break;
        case "down":
            strikeCondition = (i) => i > activeUser.arena.position[0][1];
            addOrMinus = -1;
            break;
    }
    activeSkill.fetch.function = setInterval(() => {
        if (game.paused === false) {
            let i = activeSkill.fetch.counter;
            if (strikeCondition(i)) {
                switch (activeUser.arena.direction) {
                    case "left":
                    case "right":
                        $(`#x${i}y${activeUser.arena.position[0][1]}`).removeClass(`horizontal-strike p${num}-strike ${activeUser.arena.snake}-strike`);
                        break;
                    case "up":
                    case "down":
                        $(`#x${activeUser.arena.position[0][0]}y${i}`).removeClass(`vertical-strike p${num}-strike ${activeUser.arena.snake}-strike`);
                        break;
                }
                activeSkill.fetch.counter += addOrMinus;
            } else {
                $(`.p${num}-strike`).removeClass(`vertical-strike horizontal-strike p${num}-strike ${activeUser.arena.snake}-strike`);
                activeSkill.fetch.status = false;
                clearInterval(activeSkill.fetch.function);

                // TESTME
                activeSkill.status = false;
                activeSkill.ready = true;
                activeUser.status.disarmed = false;
                activeUser.status.canStrike = true;
            }
        }
    }, activeSkill.fetch.speed);
}

function checkStrikeSnip(num, enm) {
    // if ($(`.p${num}-strike`).hasClass(`player${enm}-snake-head`)) {
    //     // console.log(`Oh NO!`);
    //     abilityPopUp(num, `snip`, "");
    //     $(`.p${num}-strike`).addClass(`quick-anim`);
    //     $(`.p${num}-strike`).removeClass(`vertical-strike horizontal-strike ${activeUser.arena.snake}-strike`);
    //     activeUser.abilities.strike.status = false;
    //     activeUser.intervals.fetchStrike.status = false;
    //     activeUser.arena.disarmed = false;
    //     setTimeout(() => {
    //         // console.log(`Remove animation`);
    //         $(`.p${num}-strike`).removeClass(`p${num}-strike quick-anim`);
    //         $(`#game-arena-grid .quick-anim`).removeClass(`quick-anim`);
    //         clearInterval(activeUser.intervals.fetchStrike.function);
    //     }, 250);
    //     popSnake(num, Math.floor(activeUser.arena.position.length / 2));
    // }
}

function checkStrikeFood(num) {
    let enm = (num === 1) ? 2 : 1;
    let activeUser = players[`player${num}`];
    let activeSkill = activeUser.skills.strike;

    let strikeX;
    let strikeY;
    switch (activeUser.arena.direction) {
        case "left":
        case "right":
            strikeX = activeSkill.strike.counter;
            strikeY = activeUser.arena.position[0][1];
            break;
        case "up":
        case "down":
            strikeX = activeUser.arena.position[0][0];
            strikeY = activeSkill.strike.counter;
            break;
    }
    for (let i = 1; i <= 3; i++) {
        if ($(`#x${strikeX}y${strikeY}`).hasClass(`food-${i}`)) {
            eatFood(num, i);
            setSnakeSize(num);
            return true;
        }
        if ($(`#x${strikeX}y${strikeY}`).hasClass(`food-super`)) {
            eatFood(num, `super`);
            setSnakeSize(num);
            return true;
        }
    }
}

function checkStrikeSnake(num, enm) {
    let activeUser = players[`player${num}`];
    let enemyUser = players[`player${enm}`];
    let activeSkill = activeUser.skills.strike;

    let strikeX;
    let strikeY;
    switch (activeUser.arena.direction) {
        case "left":
        case "right":
            strikeX = activeSkill.strike.counter;
            strikeY = activeUser.arena.position[0][1];
            break;
        case "up":
        case "down":
            strikeX = activeUser.arena.position[0][0];
            strikeY = activeSkill.strike.counter;
            break;
    }

    if ($(`#x${strikeX}y${strikeY}`).hasClass(`dead-snake`)) {
        if ($(`#x${strikeX}y${strikeY}`).hasClass(`clone-orochi-head`) === false &&
            $(`#x${strikeX}y${strikeY}`).hasClass(`clone-orochi-body`) === false) {
            $(`#x${strikeX}y${strikeY}`).attr(`class`, `cols`);
        }
        return true;
    }
    if (activeUser.status.phased === false) {
        if ($(`#x${strikeX}y${strikeY}`).hasClass(`player${num}-snake-body`)) {
            if (activeUser.status.unstoppable === false) {
                chopSnake(num, strikeX, strikeY);
            }
            return true;
        }
    }
    if (enemyUser.status.phased === false) {
        if ($(`#x${strikeX}y${strikeY}`).hasClass(`player${enm}-snake-body`)) {
            if (enemyUser.status.unstoppable === false) {
                chopSnake(enm, strikeX, strikeY);
            }
            return true;
        }
        if (
            strikeX === enemyUser.arena.position[0][0] &&
            strikeY === enemyUser.arena.position[0][1]
        ) {
            if (enemyUser.status.unstoppable === false) {
                playerDied(enm, num);
            }
            return true;
        }
    }
}

function chopSnake(num, chopX, chopY) {
    let activeUser = players[`player${num}`];

    let foundPart = undefined;
    for (let i = 1; i < activeUser.arena.position.length; i++) {
        if (foundPart != undefined) {
            $(`#x${activeUser.arena.position[i][0]}y${activeUser.arena.position[i][1]}`).attr(`class`, `cols dead-snake`);
        }
        if (chopX === activeUser.arena.position[i][0] && chopY === activeUser.arena.position[i][1]) {
            $(`#x${activeUser.arena.position[i][0]}y${activeUser.arena.position[i][1]}`).attr(`class`, `cols`);
            foundPart = i;
        }
    }
    activeUser.arena.position.splice(foundPart, activeUser.arena.size - foundPart);
    setSnakeSize(num);
}