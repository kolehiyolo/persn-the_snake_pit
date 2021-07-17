let snakeAbilities = {
    apopis: {
        ability1: function () {},
        ability2: function () {}
    },
    orochi: {
        ability1: function () {},
        ability2: function () {}
    },
    quetzalcoatl: {
        ability1: function () {},
        ability2: function () {}
    },
    lóng: {
        ability1: function () {},
        ability2: function () {}
    },
    jörmungandr: {
        ability1: function () {},
        ability2: function () {}
    },
    ouroboros: {
        ability1: function () {},
        ability2: function () {}
    },
}


function setCooldown(num, skill) {
    let activeUser = player[`p${num}`];
    let eraser = (num === 1) ? 1 : 2;
    let assignWidth;
    $(`#player${eraser}-ui-skill${skill}`).addClass(`player-ui-skill-anim`);
    $(`#player${eraser}-ui-skill${skill}`).addClass(`player-ui-disabled`);
    $(`#player${eraser}-ui-skill${skill}-key`).addClass(`player-ui-skill-anim`);
    $(`#player${eraser}-ui-skill${skill}-key`).addClass(`player-ui-disabled`);
    activeUser.abilities[`ability${skill}`].interval.status = true;
    activeUser.abilities[`ability${skill}`].interval.function = setInterval(() => {
        if (game.paused === false) {
            if (activeUser.abilities[`ability${skill}`].interval.counter < ((activeUser.abilities[`ability${skill}`].cooldown) * 250)) {
                activeUser.abilities[`ability${skill}`].interval.counter++;
                assignWidth = `${(activeUser.abilities[`ability${skill}`].interval.counter)/activeUser.abilities[`ability${skill}`].cooldown/2.5}`;
                // console.log(`assignWidth = ${assignWidth}`);
                $(`#player${eraser}-ui-skill${skill}-time`).css(`width`, `${assignWidth}%`);
            } else {
                // console.log(`Stop setCooldown()`);
                activeUser.abilities[`ability${skill}`].interval.status = false;
                activeUser.abilities[`ability${skill}`].interval.counter = 0;
                $(`#player${eraser}-ui-skill${skill}-time`).addClass(`player-ui-skill-anim`);
                $(`#player${eraser}-ui-skill${skill}-time`).addClass(`player-ui-skill-time-dead`);
                $(`#player${eraser}-ui-skill${skill}`).removeClass(`player-ui-disabled`);
                $(`#player${eraser}-ui-skill${skill}-key`).removeClass(`player-ui-disabled`);
                $(`#player${num}-ui-skill${skill}-key`).html(`<p>${controls[`p${num}`].main.ability[`ability${skill}`]}</p>`);
                setTimeout(() => {
                    $(`#player${eraser}-ui-skill${skill}-time`).css(`width`, `0%`);
                    $(`#player${eraser}-ui-skill${skill}-time`).removeClass(`player-ui-skill-time-dead`);
                    $(`#player${eraser}-ui-skill${skill}-time`).removeClass(`player-ui-skill-anim`);
                    $(`#player${eraser}-ui-skill${skill}`).removeClass(`player-ui-skill-anim`);
                    $(`#player${eraser}-ui-skill${skill}-key`).removeClass(`player-ui-skill-anim`);
                }, 1000);
                clearInterval(activeUser.abilities[`ability${skill}`].interval.function);
            }
        }
    }, 1);

    activeUser.abilities[`ability${skill}`].seconds.counter = parseInt(activeUser.abilities[`ability${skill}`].cooldown);
    let secondsCounter = activeUser.abilities[`ability${skill}`].seconds.counter;
    $(`#player${num}-ui-skill${skill}-key`).html(`<p>${secondsCounter}</p>`);
    // console.log(`secondsCounter = ${secondsCounter}`);
    secondsCounter--;
    activeUser.abilities[`ability${skill}`].seconds.function = setInterval(() => {
        if (game.paused === false) {
            if (secondsCounter > 0) {
                $(`#player${num}-ui-skill${skill}-key`).html(`<p>${secondsCounter}</p>`);
                // console.log(`secondsCounter = ${secondsCounter}`);
                secondsCounter--;
            } else {
                // $(`#player${num}-ui-skill${skill}-key`).html(`<p>${controls[`p${num}`].main.ability[`ability${skill}`]}</p>`);
                // console.log(`secondsCounter = ${secondsCounter}`);
                secondsCounter = 0;
                clearInterval(activeUser.abilities[`ability${skill}`].seconds.function);
            }
        }
    }, 1000);
}

snakeAbilities.apopis.ability1 = function (num) {
    let enm = (num === 1) ? 2 : 1;
    let activeUser = player[`p${num}`];
    let enemyUser = player[`p${enm}`];

    if (enemyUser.abilities.strike.status === true) {
        clearInterval(enemyUser.intervals.fetchStrike.function);
        clearInterval(enemyUser.intervals.useStrike.function);
        clearInterval(activeUser.intervals.fetchStrike.function);
        clearInterval(activeUser.intervals.useStrike.function);
    }

    // clearInterval(player.p1.intervals.run.function);
    // clearInterval(player.p2.intervals.run.function);
    player.p1.arena.immobilized = true;
    player.p2.arena.immobilized = true;

    player.p1.arena.disabled = true;
    player.p2.arena.disabled = true;

    // First we set the size, position and direction of the players to their alters
    player.alter1.arena = JSON.parse(JSON.stringify(player.p1.arena));
    player.alter2.arena = JSON.parse(JSON.stringify(player.p2.arena));
    player.alter1.intervals = JSON.parse(JSON.stringify(player.p1.intervals));
    player.alter2.intervals = JSON.parse(JSON.stringify(player.p2.intervals));
    player.alter1.main.direction = JSON.parse(JSON.stringify(player.p1.main.direction));
    player.alter2.main.direction = JSON.parse(JSON.stringify(player.p2.main.direction));

    // Then we swap the alters except for the player's snake
    player.p1.arena = JSON.parse(JSON.stringify(player.alter2.arena));
    player.p2.arena = JSON.parse(JSON.stringify(player.alter1.arena));
    player.p1.arena.snake = JSON.parse(JSON.stringify(player.alter1.arena.snake));
    player.p2.arena.snake = JSON.parse(JSON.stringify(player.alter2.arena.snake));
    player.p1.intervals = JSON.parse(JSON.stringify(player.alter2.intervals));
    player.p2.intervals = JSON.parse(JSON.stringify(player.alter1.intervals));
    player.p1.main.direction = JSON.parse(JSON.stringify(player.alter2.main.direction));
    player.p2.main.direction = JSON.parse(JSON.stringify(player.alter1.main.direction));
    // updatePlayerUI(1, `size`, ``);
    // updatePlayerUI(2, `size`, ``);
    setSnakeSize(1);
    setSnakeSize(2);


    $(`.player1-snake`).addClass(`slow-anim`);
    $(`.player2-snake`).addClass(`slow-anim`);

    $(`.player1-snake-head`).addClass(`${player.p2.arena.snake}-head switch1-head`);
    $(`.player1-snake-body`).addClass(`${player.p2.arena.snake}-body switch1-body`);
    $(`.player2-snake-head`).addClass(`${player.p1.arena.snake}-head switch2-head`);
    $(`.player2-snake-body`).addClass(`${player.p1.arena.snake}-body switch2-body`);

    $(`.switch1-head`).addClass(`player2-snake-head`);
    $(`.switch1-body`).addClass(`player2-snake-body`);
    $(`.switch2-head`).addClass(`player1-snake-head`);
    $(`.switch2-body`).addClass(`player1-snake-body`);

    $(`.switch1-head`).removeClass(`${player.p1.arena.snake}-head switch1-head`);
    $(`.switch1-body`).removeClass(`${player.p1.arena.snake}-body switch1-body`);
    $(`.switch2-head`).removeClass(`${player.p2.arena.snake}-head switch2-head`);
    $(`.switch2-body`).removeClass(`${player.p2.arena.snake}-body switch2-body`);

    if (enemyUser.abilities.strike.status === true) {
        $(`.p${enm}-strike`).addClass(`slow-anim`);
        $(`.p${enm}-strike`).removeClass(`${enemyUser.arena.snake}-strike vertical-strike horizontal-strike`);
        enemyUser.abilities.strike.status = false;
        enemyUser.intervals.fetchStrike.status = false;
        enemyUser.intervals.useStrike.status = false;
        activeUser.abilities.strike.status = false;
        activeUser.intervals.fetchStrike.status = false;
        activeUser.intervals.useStrike.status = false;
    }

    let switchIntervalCounter = 1;
    let switchInterval = setInterval(() => {
        if (game.paused === false) {
            if (switchIntervalCounter <= 100) {
                switchIntervalCounter++;
            } else {
                clearInterval(switchInterval);
                $(`.player1-snake`).removeClass(`slow-anim`);
                $(`.player2-snake`).removeClass(`slow-anim`);
                $(`.p${enm}-strike`).removeClass(`slow-anim p${enm}-strike`);
                game.paused = false;
                player.p1.arena.disabled = false;
                player.p2.arena.disabled = false;
                player.p1.arena.immobilized = false;
                player.p2.arena.immobilized = false;
            }
        }
    }, 10);
}

snakeAbilities.quetzalcoatl.ability1 = function (num) {
    // FIX
    // When a food is consumed, Quetzalcoatl should not use Reversal immediately
    // Otherwise, the snake will somehow get sucked into it's tail
    // We must fix this so that using Reversal after immediately eating food should work as expected
    // console.log(`Reversal`);
    let enm = (num === 1) ? 2 : 1;
    let activeUser = player[`p${num}`];
    let enemyUser = player[`p${enm}`];

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
}

snakeAbilities.quetzalcoatl.ability2 = function (num) {
    console.log(`Takeover!`);
    let enm = (num === 1) ? 2 : 1;
    let activeUser = player[`p${num}`];
    let enemyUser = player[`p${enm}`];

    // enemyUser.arena.disabled = true;
    let originalControls = {
        up: String(`${controls[`p${enm}`].main.direction.up}`),
        down: String(`${controls[`p${enm}`].main.direction.down}`),
        left: String(`${controls[`p${enm}`].main.direction.left}`),
        right: String(`${controls[`p${enm}`].main.direction.right}`),
    }

    controls[`p${enm}`].main.direction = {
        up: String(`${controls[`p${num}`].main.direction.up}`),
        down: String(`${controls[`p${num}`].main.direction.down}`),
        left: String(`${controls[`p${num}`].main.direction.left}`),
        right: String(`${controls[`p${num}`].main.direction.right}`),
    }

    console.log(`New control:`);
    console.log(`controls.p${enm}.main.direction.up = ${controls[`p${enm}`].main.direction.up}`);
    console.log(`controls.p${enm}.main.direction.down = ${controls[`p${enm}`].main.direction.down}`);
    console.log(`controls.p${enm}.main.direction.left = ${controls[`p${enm}`].main.direction.left}`);
    console.log(`controls.p${enm}.main.direction.right = ${controls[`p${enm}`].main.direction.right}`);

    let takeoverStyle = `box-shadow: 0 0 5px 2px rgb(255, 255, 0)`;
    $(`head`).append(`<style id="quetzalcoatl-takeover" class="temp-styling"> .player${enm}-snake{ ${takeoverStyle}; } </style>`);

    // Takeover Interval
    let takeoverCounter = 0;
    let takeoverIntervalSpeed = 5;
    let takeoverInterval = setInterval(() => {
        if (game.paused === false) {
            if (takeoverCounter <= snakes.quetzalcoatl.skills.skill2.duration * 200) {
                takeoverCounter++;
                enemyUser.main.direction = String(activeUser.arena.direction);
                if (
                    enemyUser.arena.direction === `up` && enemyUser.main.direction === `down` ||
                    enemyUser.arena.direction === `down` && enemyUser.main.direction === `up` ||
                    enemyUser.arena.direction === `left` && enemyUser.main.direction === `right` ||
                    enemyUser.arena.direction === `right` && enemyUser.main.direction === `left`
                ) {
                    let mainDirection = enemyUser.main.direction.toUpperCase();
                    let arenaDirection = enemyUser.arena.direction.toUpperCase();
                    console.log(`${mainDirection} is opposite of ${arenaDirection}`);
                    enemyUser.arena.canTurn = false;
                } else {
                    enemyUser.arena.canTurn = true;
                }

            } else {
                $(`#quetzalcoatl-takeover`).remove();
                // enemyUser.arena.disabled = false;
                controls[`p${enm}`].main.direction = {
                    up: String(`${originalControls.up}`),
                    down: String(`${originalControls.down}`),
                    left: String(`${originalControls.left}`),
                    right: String(`${originalControls.right}`),
                }
                console.log(`Original Controls:`);
                console.log(`controls.p${enm}.main.direction.up = ${controls[`p${enm}`].main.direction.up}`);
                console.log(`controls.p${enm}.main.direction.down = ${controls[`p${enm}`].main.direction.down}`);
                console.log(`controls.p${enm}.main.direction.left = ${controls[`p${enm}`].main.direction.left}`);
                console.log(`controls.p${enm}.main.direction.right = ${controls[`p${enm}`].main.direction.right}`);
                clearInterval(takeoverInterval);
            }
        }
    }, takeoverIntervalSpeed);
}

snakeAbilities.lóng.ability1 = function (num) {
    let enm = (num === 1) ? 2 : 1;
    let activeUser = player[`p${num}`];
    let enemyUser = player[`p${enm}`];

    // enemyUser.arena.disabled = true;
    enemyUser.arena.immobilized = true;

    $(`.player${enm}-snake`).addClass(`quick-anim`);
    $(`.player${enm}-snake`).addClass(`lóng-petrify`);

    let stunCountdown = 0;
    let petrifyIntervalSpeed = 10;
    let petrifyInterval = setInterval(() => {
        if (game.paused === false) {
            if (stunCountdown <= (snakes.lóng.skills.skill1.duration * 1000) / petrifyIntervalSpeed) {
                stunCountdown++;
            } else {
                $(`.quick-anim`).removeClass(`quick-anim`);
                // enemyUser.arena.disabled = false;
                enemyUser.arena.immobilized = false;
                clearInterval(petrifyInterval);
            }
            if (stunCountdown === ((snakes.lóng.skills.skill1.duration * 1000) / petrifyIntervalSpeed) - 10) {
                $(`.lóng-petrify`).removeClass(`lóng-petrify`);
            }
        }
    }, petrifyIntervalSpeed);

}

let returnSpeed;
snakeAbilities.lóng.ability2 = function (num) {
    let enm = (num === 1) ? 2 : 1;
    let activeUser = player[`p${num}`];
    let enemyUser = player[`p${enm}`];
    console.log(`Activated Dash Yo!`);

    // activeUser.arena.disabled = true;
    activeUser.intervals.run.speed = 25;
    clearInterval(activeUser.intervals.run.function);
    setRunInterval(num);

    let returnSpeedCounter = 0;
    returnSpeed = setInterval(() => {
        if (game.paused === false) {
            if (returnSpeedCounter <= 0.5 * 100) {
                returnSpeedCounter++;
            } else {
                // activeUser.arena.disabled = false;
                activeUser.intervals.run.speed = 100;
                clearInterval(activeUser.intervals.run.function);
                setRunInterval(num);
                clearInterval(returnSpeed);
            }
        }
    }, 10);
}

// snakeAbilities.lóng.ability2 = function (num) {
//     let enm = (num === 1) ? 2 : 1;
//     let activeUser = \[`p${num}`];
//     let enemyUser = player[`p$ {enm}`];

//     for (let j = 1; j <= 3; j++) {
//         for (let i = 1; i < game.col; i++) {
//             $(`#r${food[`food${j}`].position[0]}c${i}`).addClass(`quick-anim`);
//             $(`#r${food[`food${j}`].position[0]}c${i}`).addClass(`lóng-target`);
//         }
//         for (let i = 1; i < game.row; i++) {
//             $(`#r${food[`food${j}`].position[0]}c${i}`).addClass(`quick - anim `);
//             $(`#r${i}c${food[`food${j}`].position[1]}`).addClass(`lóng - target `);
//     }
// }
// $(`.food - 1 `).removeClass(`lóng - target `);
// $(`.food - 2 `).removeClass(`lóng - target `);
// $(`.food - 3 `).removeClass(`lóng - target `);
// setTimeout(() => {
//     $(`.lóng - target `).removeClass(`lóng - target `);
//     setTimeout(() => {
//         $(`.quick - anim `).removeClass(`quick - anim `);
//     }, 1000);
// }, 3000);}

let phaseCounter;
snakeAbilities.jörmungandr.ability1 = function (num) {
    let enm = (num === 1) ? 2 : 1;
    let activeUser = player[`p${num}`];
    let enemyUser = player[`p${enm}`];
    console.log(`Phase!`);

    activeUser.arena.phased = true;
    let phaseStyle = "box-shadow: 0 0 5px 2px cyan; ";
    // phaseStyle = phaseStyle + "border: none ";
    // phaseStyle = phaseStyle + "border: none ";

    $(`head`).append(`<style id="jörmungandr-phase" class="temp-styling"> .player${num}-snake{ ${phaseStyle} } </style>`);
    // FIX
    // Set up a duration countdown popup system
    phaseCounter = 0;
    let popMsg;
    phaseInterval = setInterval(() => {
        if (game.paused === false) {
            if (phaseCounter <= activeUser.abilities.ability1.duration * 100) {
                phaseCounter++;
            } else {
                console.log(`Phase Over!`);
                // Now find the part that we can cut
                let partRow;
                let partCol;
                let chopped = false;
                clearInterval(phaseInterval);
                $(`#r${activeUser.arena.position[0][0]}c${activeUser.arena.position[0][1]}`).removeClass(`dead-snake`);;
                $(`#r${activeUser.arena.position[1][0]}c${activeUser.arena.position[1][1]}`).removeClass(`dead-snake`);;
                $(`#r${activeUser.arena.position[2][0]}c${activeUser.arena.position[2][1]}`).removeClass(`dead-snake`);;
                LoopFindPart: {
                    for (let i = 3; i < activeUser.arena.size; i++) {
                        let blocked = false;
                        partRow = parseInt(activeUser.arena.position[i][0]);
                        partCol = parseInt(activeUser.arena.position[i][1]);
                        let beforeRow = parseInt(activeUser.arena.position[i - 1][0]);
                        let beforeCol = parseInt(activeUser.arena.position[i - 1][1]);
                        console.log(`position[${i}] = [${partRow}, ${partCol}]`);
                        // console.log(`before[${i-1}] = [${beforeRow}, ${beforeCol}]`);
                        if (
                            $(`#r${partRow}c${partCol}`).hasClass(`dead-snake`) ||
                            $(`#r${partRow}c${partCol}`).hasClass(`player${enm}-snake`)
                        ) {
                            blocked = true;
                            chopped = true;
                            partRow = beforeRow;
                            partCol = beforeCol;
                            break LoopFindPart;
                        }
                        if (blocked === true) {
                            console.log(`position[${i}] is blocked`);
                        }
                    }
                }
                if (chopped === true) {

                    chopSnake(num, partRow, partCol);
                } else {}
                $(`#jörmungandr-phase`).remove();
                // setTimeout(()=>{
                //     $(`#game-arena-grid`).removeClass(`medium-anim`);
                // },1000);
                phaseCounter = 0;
                activeUser.arena.phased = false;
            }
            if (phaseCounter % 100 === 0 && phaseCounter < activeUser.abilities.ability1.duration * 100) {
                switch (phaseCounter) {
                    case 100:
                        popMsg = `2`;
                        break;
                    case 200:
                        popMsg = `1`;
                        break;
                    case 0:
                        popMsg = `Phase Over!`;
                        break;
                }
                abilityPopUp(num, `ability`, `${popMsg}`);
            }
        }
    }, 10);
}

let bifrostInterval

snakeAbilities.jörmungandr.ability2 = function (num) {
    let enm = (num === 1) ? 2 : 1;
    let activeUser = player[`p${num}`];
    let enemyUser = player[`p${enm}`];
    console.log(`Bifrost!`);

    activeUser.arena.portaled = true;
    $(`#game-arena-grid`).addClass(`medium-anim`);
    setTimeout(() => {
        $(`#game-arena-grid`).addClass(`arena-border-portal`);
    }, )
    // $(`#game-arena-grid`).removeClass(`arena-border-normal`);

    let bifrostCounter = 0;

    bifrostInterval = setInterval(() => {
        if (game.paused === false) {
            if (bifrostCounter <= activeUser.abilities.ability2.duration * 100) {
                bifrostCounter++;

            } else {
                console.log(`Bifrost Over!`);
                // Now find the part that we can cut
                let partRow;
                let partCol;
                let chopped = false;
                clearInterval(bifrostInterval);
                LoopFindPart: {
                    for (let i = 1; i < activeUser.arena.size; i++) {
                        let adjacent = false;
                        partRow = parseInt(activeUser.arena.position[i][0]);
                        partCol = parseInt(activeUser.arena.position[i][1]);
                        let beforeRow = parseInt(activeUser.arena.position[i - 1][0]);
                        let beforeCol = parseInt(activeUser.arena.position[i - 1][1]);
                        console.log(`position[${i}] = [${partRow}, ${partCol}]`);
                        console.log(`before[${i-1}] = [${beforeRow}, ${beforeCol}]`);
                        if (partRow - beforeRow === 1 || partRow - beforeRow === -1) {
                            adjacent = true;
                        } else if (partCol - beforeCol === 1 || partCol - beforeCol === -1) {
                            adjacent = true;
                        } else {
                            console.log(`Not adjacent at position[${i}]`);
                            chopped = true;
                            partRow = beforeRow;
                            partCol = beforeCol;
                            break LoopFindPart;
                        }
                        if (adjacent === true) {
                            console.log(`position[${i}] is adjacent with position[${i-1}]`);
                        }
                    }

                }
                if (chopped === true) {
                    chopSnake(num, partRow, partCol);
                } else {

                }
                // $(`#game-arena-grid`).addClass(`arena-border-normal`);
                $(`#game-arena-grid`).removeClass(`arena-border-portal`);
                setTimeout(() => {
                    $(`#game-arena-grid`).removeClass(`medium-anim`);
                }, 1000);
                activeUser.arena.portaled = false;
                clearInterval(bifrostInterval);
            }
        }
    }, 10);
}

function portaledFunc(num) {
    let enm = (num === 1) ? 2 : 1;
    let activeUser = player[`p${num}`];
    let enemyUser = player[`p${enm}`];
    for (let i = 0; i < activeUser.arena.size; i++) {
        let partRow = parseInt(activeUser.arena.position[i][0]);
        let partCol = parseInt(activeUser.arena.position[i][1]);
        // console.log(`position[${i}] = [${partRow}, ${partCol}]`); 
        if (partRow <= 0) {
            console.log(`position[${i}] is beyond the top border`);
            activeUser.arena.position[i][0] = game.row;
        } else if (partRow > game.row) {
            console.log(`position[${i}] is beyond the bottom border`);
            activeUser.arena.position[i][0] = 1;
        } else if (partCol <= 0) {
            console.log(`position[${i}] is beyond the left border`);
            activeUser.arena.position[i][1] = game.col;
        } else if (partCol > game.col) {
            console.log(`position[${i}] is beyond the right border`);
            activeUser.arena.position[i][1] = 1;
        }
    }
}