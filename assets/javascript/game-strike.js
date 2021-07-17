let strike = function (num) {
    let enm = (num === 1) ? 2 : 1;
    let activeUser = player[`p${num}`];
    let enemyUser = player[`p${enm}`];

    activeUser.arena.disabled = true;
    activeUser.intervals.useStrike.status = true;
    activeUser.intervals.useStrike.count = 0;
    shrinkSnake(num);

    switch (activeUser.arena.direction) {
        case "up":
            activeUser.intervals.useStrike.count = activeUser.arena.position[0][0] - 1;
            setUseStrike(num);
            break;
        case "down":
            activeUser.intervals.useStrike.count = activeUser.arena.position[0][0] + 1;
            setUseStrike(num);
            break;
        case "left":
            activeUser.intervals.useStrike.count = activeUser.arena.position[0][1] - 1;
            setUseStrike(num);
            break;
        case "right":
            activeUser.intervals.useStrike.count = activeUser.arena.position[0][1] + 1;
            setUseStrike(num);
            break;
    }
}

function setUseStrike(num) {
    let enm = (num === 1) ? 2 : 1;
    let activeUser = player[`p${num}`];
    let enemyUser = player[`p${enm}`];

    let strikeCondition;
    let addOrMinus;
    switch (activeUser.arena.direction) {
        case "up":
            strikeCondition = (i) => {
                return i > 0;
            };
            addOrMinus = -1;
            break;
        case "down":
            strikeCondition = (i) => {
                return i <= game.row;
            }
            addOrMinus = 1;
            break;
        case "left":
            strikeCondition = (i) => {
                return i > 0;
            }
            addOrMinus = -1;
            break;
        case "right":
            strikeCondition = (i) => {
                return i <= game.col;
            }
            addOrMinus = 1;
            break;
    }
    activeUser.intervals.useStrike.function = setInterval(() => {
        if (game.paused === false) {
            let i = activeUser.intervals.useStrike.count;
            if (strikeCondition(i)) {
                switch (activeUser.arena.direction) {
                    case "up":
                    case "down":
                        $(`#r${i}c${activeUser.arena.position[0][1]}`).addClass(`vertical-strike p${num}-strike ${activeUser.arena.snake}-strike`);
                        break;
                    case "left":
                    case "right":
                        $(`#r${activeUser.arena.position[0][0]}c${i}`).addClass(`horizontal-strike p${num}-strike ${activeUser.arena.snake}-strike`);
                        break;
                }
                if (strikeFood(num, enm) || strikeSnake(num, enm)) {
                    strikeCondition = (i) => {
                        return false;
                    }
                };
                activeUser.intervals.useStrike.count += addOrMinus;
            } else {
                activeUser.intervals.useStrike.status = false;
                clearInterval(activeUser.intervals.useStrike.function);
                setFetchStrike(num);
            }
        }
    }, activeUser.intervals.useStrike.speed);
}

function strikeFood(num, enm) {
    let activeUser = player[`p${num}`];
    let enemyUser = player[`p${enm}`];

    let strikeRow;
    let strikeCol;
    switch (activeUser.arena.direction) {
        case "up":
        case "down":
            strikeRow = activeUser.intervals.useStrike.count;
            strikeCol = activeUser.arena.position[0][1];
            break;
        case "left":
        case "right":
            strikeRow = activeUser.arena.position[0][0];
            strikeCol = activeUser.intervals.useStrike.count;
            break;
    }
    for (let i = 1; i <= 3; i++) {
        if ($(`#r${strikeRow}c${strikeCol}`).hasClass(`food-${i}`)) {
            food.super.count++;
            growSnake(num, 2);
            setFood(i);
            // updatePlayerUI(num, `size`, ``);
            setSnakeSize(num);
            return true;
        }
        if ($(`#r${strikeRow}c${strikeCol}`).hasClass(`food-super`)) {
            $(`.food-super`).removeClass(`food-super`);
            food.super.active = false;
            food.super.count = 0;
            updateFoodCountDiv();
            growSnake(num, 5);
            // updatePlayerUI(num, `size`, ``);
            setSnakeSize(num);
            return true;
        }
    }
}

function strikeSnake(num, enm) {
    let activeUser = player[`p${num}`];
    let enemyUser = player[`p${enm}`];

    let strikeRow;
    let strikeCol;
    switch (activeUser.arena.direction) {
        case "up":
        case "down":
            strikeRow = activeUser.intervals.useStrike.count;
            strikeCol = activeUser.arena.position[0][1];
            break;
        case "left":
        case "right":
            strikeRow = activeUser.arena.position[0][0];
            strikeCol = activeUser.intervals.useStrike.count;
            break;
    }
    if ($(`#r${strikeRow}c${strikeCol}`).hasClass(`dead-snake`)) {
        $(`#r${strikeRow}c${strikeCol}`).attr(`class`, `col`);
        return true;
    }
    if ($(`#r${strikeRow}c${strikeCol}`).hasClass(`player${num}-snake-body`)) {
        chopSnake(num, strikeRow, strikeCol);
        return true;
    }
    if ($(`#r${strikeRow}c${strikeCol}`).hasClass(`player${enm}-snake-body`)) {
        chopSnake(enm, strikeRow, strikeCol);
        return true;
    }
    if ($(`#r${strikeRow}c${strikeCol}`).hasClass(`player${enm}-snake-head`)) {
        playerDied(enm, num);
        return true;
    }
}

function chopSnake(num, row, col) {
    let enm = (num === 1) ? 2 : 1;
    let activeUser = player[`p${num}`];
    let enemyUser = player[`p${enm}`];
    setSnakeSize(num);
    let strikeRow = row;
    let strikeCol = col;
    let foundPart = undefined;
    for (let i = 1; i < activeUser.arena.size; i++) {
        if (foundPart != undefined) {
            $(`#r${activeUser.arena.position[i][0]}c${activeUser.arena.position[i][1]}`).attr(`class`, `col dead-snake`);
        }
        if (strikeRow === activeUser.arena.position[i][0] && strikeCol === activeUser.arena.position[i][1]) {
            $(`#r${activeUser.arena.position[i][0]}c${activeUser.arena.position[i][1]}`).attr(`class`, `col`);
            foundPart = i;
        }
    }
    activeUser.arena.position.splice(foundPart, activeUser.arena.size - foundPart);
}

function setFetchStrike(num) {
    let enm = (num === 1) ? 2 : 1;
    let activeUser = player[`p${num}`];
    let enemyUser = player[`p${enm}`];

    activeUser.intervals.fetchStrike.count = parseInt(activeUser.intervals.useStrike.count);
    activeUser.intervals.fetchStrike.status = true;
    let strikeCondition;
    let addOrMinus;
    switch (activeUser.arena.direction) {
        case "up":
            strikeCondition = (i) => {
                return i < activeUser.arena.position[0][0];
            };
            addOrMinus = 1;
            break;
        case "down":
            strikeCondition = (i) => {
                return i > activeUser.arena.position[0][0];
            }
            addOrMinus = -1;
            break;
        case "left":
            strikeCondition = (i) => {
                return i < activeUser.arena.position[0][1];
            }
            addOrMinus = 1;
            break;
        case "right":
            strikeCondition = (i) => {
                return i > activeUser.arena.position[0][1];
            }
            addOrMinus = -1;
            break;
    }
    activeUser.intervals.fetchStrike.function = setInterval(() => {
        if (game.paused === false) {
            let i = activeUser.intervals.fetchStrike.count;
            if (strikeCondition(i)) {
                switch (activeUser.arena.direction) {
                    case "up":
                    case "down":
                        $(`#r${i}c${activeUser.arena.position[0][1]}`).removeClass(`vertical-strike p${num}-strike ${activeUser.arena.snake}-strike`);
                        break;
                    case "left":
                    case "right":
                        $(`#r${activeUser.arena.position[0][0]}c${i}`).removeClass(`horizontal-strike p${num}-strike ${activeUser.arena.snake}-strike`);
                        break;
                }
                // console.log($(`.p${num}-strike`).hasClass(`player${enm}-snake-head`)); 
                if ($(`.p${num}-strike`).hasClass(`player${enm}-snake-head`)) {
                    // console.log(`Oh NO!`);
                    abilityPopUp(num, `snip`, "");
                    $(`.p${num}-strike`).addClass(`quick-anim`);
                    $(`.p${num}-strike`).removeClass(`vertical-strike horizontal-strike ${activeUser.arena.snake}-strike`);
                    activeUser.abilities.strike.status = false;
                    activeUser.intervals.fetchStrike.status = false;
                    activeUser.arena.disabled = false;
                    setTimeout(() => {
                        // console.log(`Remove animation`);
                        $(`.p${num}-strike`).removeClass(`p${num}-strike quick-anim`);
                        $(`#game-arena-grid .quick-anim`).removeClass(`quick-anim`);
                        clearInterval(activeUser.intervals.fetchStrike.function);
                    }, 250);
                    popSnake(num, Math.floor(activeUser.arena.position.length / 2));
                }
                activeUser.intervals.fetchStrike.count += addOrMinus;
            } else {
                $(`.p${num}-strike`).removeClass(`vertical-strike horizontal-strike p${num}-strike ${activeUser.arena.snake}-strike`);
                activeUser.abilities.strike.status = false;
                activeUser.intervals.fetchStrike.status = false;
                activeUser.arena.disabled = false;
                clearInterval(activeUser.intervals.fetchStrike.function);
            }
        }
    }, activeUser.intervals.fetchStrike.speed);
}