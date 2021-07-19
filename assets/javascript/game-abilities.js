let snakeSkills = {
    apopis: {
        skill1: function () {},
        skill2: function () {}
    },
    orochi: {
        skill1: function () {},
        skill2: function () {}
    },
    quetzalcoatl: {
        skill1: function () {},
        skill2: function () {}
    },
    lóng: {
        skill1: function () {},
        skill2: function () {}
    },
    jörmungandr: {
        skill1: function () {},
        skill2: function () {}
    },
    sheshanaga: {
        skill1: function () {},
        skill2: function () {}
    },
}

function setCooldown(num, skill) {
    let activeUser = players[`player${num}`];
    let activeSkill = activeUser.skills[`skill${skill}`];
    let assignWidth;

    $(`#player${num}-ui-skill${skill}`).addClass(`player-ui-skill-anim`);
    $(`#player${num}-ui-skill${skill}`).addClass(`player-ui-disabled`);
    $(`#player${num}-ui-skill${skill}-key`).addClass(`player-ui-skill-anim`);
    $(`#player${num}-ui-skill${skill}-key`).addClass(`player-ui-disabled`);

    let countdown = parseFloat(activeSkill.cooldown.value);
    activeSkill.ready = false;
    activeSkill.cooldown.status = true;
    activeSkill.cooldown.function = setInterval(() => {
        if (game.paused === false) {
            if (activeSkill.cooldown.counter % 250 === 0) {
                $(`#player${num}-ui-skill${skill}-key`).html(`<p>${countdown}</p>`);
                countdown--;
            }
            if (activeSkill.cooldown.counter < ((activeSkill.cooldown.value) * 250)) {
                activeSkill.cooldown.counter++;
                assignWidth = `${(activeSkill.cooldown.counter)/activeSkill.cooldown.value/2.5}`;
                $(`#player${num}-ui-skill${skill}-time`).css(`width`, `${assignWidth}%`);
            } else {
                activeSkill.ready = true;
                activeSkill.cooldown.status = false;
                activeSkill.cooldown.counter = 0;
                $(`#player${num}-ui-skill${skill}-time`).addClass(`player-ui-skill-anim`);
                $(`#player${num}-ui-skill${skill}-time`).addClass(`player-ui-skill-time-dead`);
                $(`#player${num}-ui-skill${skill}`).removeClass(`player-ui-disabled`);
                $(`#player${num}-ui-skill${skill}-key`).removeClass(`player-ui-disabled`);
                $(`#player${num}-ui-skill${skill}-key`).html(`<p>${activeUser.controls.main.skill[`skill${skill}`]}</p>`);
                setTimeout(() => {
                    $(`#player${num}-ui-skill${skill}-time`).css(`width`, `0%`);
                    $(`#player${num}-ui-skill${skill}-time`).removeClass(`player-ui-skill-time-dead`);
                    $(`#player${num}-ui-skill${skill}-time`).removeClass(`player-ui-skill-anim`);
                    $(`#player${num}-ui-skill${skill}`).removeClass(`player-ui-skill-anim`);
                    $(`#player${num}-ui-skill${skill}-key`).removeClass(`player-ui-skill-anim`);
                }, 1000);
                clearInterval(activeSkill.cooldown.function);
            }
        }
    }, 1);
}

snakeSkills.apopis.skill1 = function (num) {
    let enm = (num === 1) ? 2 : 1;
    let activeUser = player[`p${num}`];
    let enemyUser = player[`p${enm}`];

    if (enemyUser.abilities.strike.status === true) {
        clearInterval(enemyUser.intervals.fetchStrike.function);
        clearInterval(enemyUser.intervals.useStrike.function);
        clearInterval(activeUser.intervals.fetchStrike.function);
        clearInterval(activeUser.intervals.useStrike.function);
    }

    player.p1.arena.immobilized = true;
    player.p2.arena.immobilized = true;

    player.p1.arena.disarmed = true;
    player.p2.arena.disarmed = true;

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
                player.p1.arena.disarmed = false;
                player.p2.arena.disarmed = false;
                player.p1.arena.immobilized = false;
                player.p2.arena.immobilized = false;
            }
        }
    }, 10);
}

let orochiClones = {
    counter: 0,
    clones: {
        // clone1: {
        //     id: 1,
        //     direction: undefined,
        //     position: [[`x`, `y`]],
        // },
    },
}

snakeSkills.orochi.skill1 = function (num) {
    console.log(`Amputate!`);
    let enm = (num === 1) ? 2 : 1;
    let activeUser = players[`player${num}`];
    let activeSkill = activeUser.skills.skill1;
    let activeSnake = activeUser.arena.snake;
    activeSkill.status = true;

    if (orochiClones.counter === 7) {
        orochiClones.counter = 8;
        orochiClones.clones[`clone8`] = JSON.parse(JSON.stringify(orochiClones.clones[`clone1`]));
        orochiClones.clones[`clone8`].id = 8;
        let activeClone = orochiClones.clones[`clone8`];
        $(`#x${activeClone.position[0][0]}y${activeClone.position[0][1]}`).html(`<p id="clone-8-label" class="clone-labels">8</p>`)
        for (let i = 1; i < 8; i++) {
            orochiClones.clones[`clone${i}`] = JSON.parse(JSON.stringify(orochiClones.clones[`clone${i+1}`]));
            orochiClones.clones[`clone${i}`].id = i;
            let activeClone = orochiClones.clones[`clone${i}`];
            $(`#x${activeClone.position[0][0]}y${activeClone.position[0][1]}`).html(`<p id="clone-${i}-label" class="clone-labels">${i}</p>`)
        }
        delete orochiClones.clones[`clone8`];
        orochiClones.counter = 7;
        return;
    }

    // Here we establish the half of the snake
    let cloneSize = Math.floor(activeUser.arena.position.length / 2);
    let cloneX = activeUser.arena.position[cloneSize][0];
    let cloneY = activeUser.arena.position[cloneSize][1];


    // First, we create the Clone object
    orochiClones.counter++;
    orochiClones.clones[`clone${orochiClones.counter}`] = {
        id: orochiClones.counter,
        direction: String(activeUser.arena.direction),
        position: [
            [undefined, undefined]
        ],
    };
    let activeClone = orochiClones.clones[`clone${orochiClones.counter}`];
    // console.log(`orochiClones.counter = ${orochiClones.counter}`);

    // Now we add the clone parts
    // // First, the head
    let clonePartCount = 1;
    $(`#x${activeUser.arena.position[cloneSize][0]}y${activeUser.arena.position[cloneSize][1]}`).attr(`class`, `cols dead-snake clone-orochi-head`);
    $(`#x${activeUser.arena.position[cloneSize][0]}y${activeUser.arena.position[cloneSize][1]}`).html(`<p id="clone-${orochiClones.counter}-label" class="clone-labels">${orochiClones.counter}</p>`)
    activeClone.position[0] = [parseInt(cloneX), parseInt(cloneY)];

    // // Now, we loop to add the body
    for (let i = cloneSize + 1; i < activeUser.arena.position.length; i++) {
        $(`#x${activeUser.arena.position[i][0]}y${activeUser.arena.position[i][1]}`).attr(`class`, `cols dead-snake clone-orochi-body`);
        let cloneBodyX = parseInt(activeUser.arena.position[i][0]);
        let cloneBodyY = parseInt(activeUser.arena.position[i][1]);
        activeClone.position[clonePartCount] = [parseInt(cloneBodyX), parseInt(cloneBodyY)];
        clonePartCount++;
    }

    // Finally we split the snake in two
    activeUser.arena.position.splice(cloneSize, activeUser.arena.size - cloneSize);
    setSnakeSize(num);

    activeSkill.status = false;
}

snakeSkills.orochi.skill2 = function (num) {
    console.log(`Transfer!`);
    let enm = (num === 1) ? 2 : 1;
    let activeUser = players[`player${num}`];
    let activeSkill = activeUser.skills.skill1;
    let activeSnake = activeUser.arena.snake;
    activeSkill.status = true;

    if (orochiClones.counter === 0) {
        console.log(`No clones!`);
        gamePopUp(num, `ability`, `No clones!`);
        return
    }

    // Let's check to see if the clone body has a head
    let activeClone = orochiClones.clones[`clone1`];
    if ($(`#x${activeClone.position[0][0]}y${activeClone.position[0][1]}`).hasClass(`dead-snake clone-orochi-head`) === false) {
        for (let i = 1; i < activeClone.position.length; i++) {
            if ($(`#x${activeClone.position[i][0]}y${activeClone.position[i][1]}`).hasClass(`dead-snake`)) {
                $(`#x${activeClone.position[i][0]}y${activeClone.position[i][1]}`).attr(`class`, `cols dead-snake`);
            }
        }
        for (let i = 1; i < orochiClones.counter; i++) {
            orochiClones.clones[`clone${i}`] = JSON.parse(JSON.stringify(orochiClones.clones[`clone${i+1}`]));
            orochiClones.clones[`clone${i}`].id = i;
        }
        delete orochiClones.clones[`clone${orochiClones.counter}`];
        orochiClones.counter--;
        snakeSkills.orochi.skill2(num);
        return;
    }

    // First, we add the real body as a clone object
    orochiClones.counter++;
    orochiClones.clones[`clone${orochiClones.counter}`] = {
        id: orochiClones.counter,
        direction: String(activeUser.arena.direction),
        position: JSON.parse(JSON.stringify(activeUser.arena.position))
    };
    let previousClone = orochiClones.clones[`clone${orochiClones.counter}`];
    $(`#x${previousClone.position[0][0]}y${previousClone.position[0][1]}`).html(`<p id="clone-${orochiClones.counter}-label" class="clone-labels">${orochiClones.counter}</p>`)

    // Now we turn the real body into a clone
    $(`#x${previousClone.position[0][0]}y${previousClone.position[0][1]}`).attr(`class`, `cols dead-snake clone-orochi-head`);
    for (let i = 1; i < previousClone.position.length; i++) {
        $(`#x${previousClone.position[i][0]}y${previousClone.position[i][1]}`).attr(`class`, `cols dead-snake clone-orochi-body`);
    }

    // Now, we set the next clone body in line into the real body
    activeClone = orochiClones.clones[`clone1`];
    activeUser.arena.position = JSON.parse(JSON.stringify(activeClone.position));
    activeUser.arena.direction = JSON.parse(JSON.stringify(activeClone.direction));
    activeUser.main.direction = String(activeUser.arena.direction);

    // Now we turn the clone body into the real one
    let activeSnakeHeadClasses = `player${num}-snake-head player${num}-snake orochi-head`;
    let activeSnakeBodyClasses = `player${num}-snake-body player${num}-snake orochi-body`;
    $(`#x${activeUser.arena.position[0][0]}y${activeUser.arena.position[0][1]}`).attr(`class`, `cols ${activeSnakeHeadClasses}`);
    let foundPart = undefined;
    for (let i = 1; i < activeUser.arena.position.length; i++) {
        if (foundPart != undefined) {
            if ($(`#x${activeClone.position[i][0]}y${activeClone.position[i][1]}`).hasClass(`dead-snake`)) {
                $(`#x${activeClone.position[i][0]}y${activeClone.position[i][1]}`).attr(`class`, `cols dead-snake`);
            }
        } else {
            if ($(`#x${activeClone.position[i][0]}y${activeClone.position[i][1]}`).hasClass(`dead-snake`) === false) {
                foundPart = parseInt(i);
            } else {
                $(`#x${activeUser.arena.position[i][0]}y${activeUser.arena.position[i][1]}`).attr(`class`, `cols ${activeSnakeBodyClasses}`);
            }
        }
    }
    if (foundPart != undefined) {
        activeUser.arena.position.splice(foundPart, activeUser.arena.size - foundPart);
    }


    // Finally, we move the clone queue forward
    for (let i = 1; i < orochiClones.counter; i++) {
        orochiClones.clones[`clone${i}`] = JSON.parse(JSON.stringify(orochiClones.clones[`clone${i+1}`]));
        orochiClones.clones[`clone${i}`].id = i;
        let activeClone = orochiClones.clones[`clone${i}`];
        $(`#clone-${i}-label`).remove();
        $(`#x${activeClone.position[0][0]}y${activeClone.position[0][1]}`).html(`<p id="clone-${i}-label" class="clone-labels">${i}</p>`)
    }
    delete orochiClones.clones[`clone${orochiClones.counter}`];
    // $(`#x${activeClone.position[0][0]}y${activeClone.position[0][1]}`).html(`<p id="clone-8-label" class="clone-labels">8</p>`);
    $(`#clone-${orochiClones.counter}-label`).remove();
    orochiClones.counter--;

    // orochiClones.counter = 8;
    //     orochiClones.clones[`clone8`] = JSON.parse(JSON.stringify(orochiClones.clones[`clone1`]));
    //     orochiClones.clones[`clone8`].id = 8;
    //     let activeClone = orochiClones.clones[`clone8`];
    //     $(`#x${activeClone.position[0][0]}y${activeClone.position[0][1]}`).html(`<p id="clone-8-label" class="clone-labels">8</p>`)
    //     for (let i = 1; i < 8; i++) {
    //         orochiClones.clones[`clone${i}`] = JSON.parse(JSON.stringify(orochiClones.clones[`clone${i+1}`]));
    //         orochiClones.clones[`clone${i}`].id = i;
    //         let activeClone = orochiClones.clones[`clone${i}`];
    //         $(`#x${activeClone.position[0][0]}y${activeClone.position[0][1]}`).html(`<p id="clone-${i}-label" class="clone-labels">${i}</p>`)
    //     }
    //     delete orochiClones.clones[`clone8`];
    //     orochiClones.counter = 7;
    //     return;

    activeSkill.status = false;
}

snakeSkills.quetzalcoatl.skill1 = function (num) {
    console.log(`Reversal!`);
    let enm = (num === 1) ? 2 : 1;
    let activeUser = players[`player${num}`];
    let activeSkill = activeUser.skills.skill1;
    let activeSnake = activeUser.arena.snake;

    activeSkill.status = true;
    activeUser.arena.position.reverse();

    // Now we set the head immediately to the tail
    let headX = activeUser.arena.position[0][0];
    let headY = activeUser.arena.position[0][1];
    $(`.player${num}-snake-head`).removeClass(`player${num}-snake-head ${activeSnake}-head player${num}-snake`);
    $(`#x${headX}y${headY}`).addClass(`player${num}-snake-head ${activeSnake}-head player${num}-snake`);
    $(`#x${headX}y${headY}`).removeClass(`player${num}-snake-body ${activeSnake}-body player${num}-snake`);

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

    activeUser.main.direction = activeUser.arena.direction;
    activeSkill.status = false;
}

snakeSkills.quetzalcoatl.skill2 = function (num) {
    console.log(`Takeover!`);
    let enm = (num === 1) ? 2 : 1;
    let activeUser = players[`player${num}`];
    let enemyUser = players[`player${enm}`];
    let activeSkill = activeUser.skills.skill2;

    activeSkill.status = true;
    let originalControls = JSON.parse(JSON.stringify(enemyUser.controls.main.direction));
    enemyUser.controls.main.direction = JSON.parse(JSON.stringify(activeUser.controls.main.direction));
    let takeoverStyle = `box-shadow: 0 0 5px 2px rgb(255, 255, 0)`;
    $(`head`).append(`<style id="quetzalcoatl-takeover" class="temp-styling"> .player${enm}-snake{ ${takeoverStyle}; } </style>`);

    let countdown = parseFloat(activeSkill.duration.value);
    let durationCounter = 0;
    activeSkill.duration.function = setInterval(() => {
        if (game.paused === false) {
            if (durationCounter % 25 === 0) {
                gamePopUp(enm, `ability`, `${activeSkill.name} ${countdown}`)
                countdown -= 0.1;
                countdown = (Math.round(countdown * 100) / 100).toFixed(2);
            }
            if (durationCounter <= (activeSkill.duration.value * 250)) {
                durationCounter++;
                takeoverControl();
            } else {
                activeSkill.status = false;
                clearInterval(activeSkill.duration.function);
                gamePopUp(enm, `ability`, `${activeSkill.name} over!`);

                $(`#quetzalcoatl-takeover`).remove();
                enemyUser.controls.main.direction = JSON.parse(JSON.stringify(originalControls));
            }
        }
    }, 1);

    function takeoverControl() {
        enemyUser.main.direction = String(activeUser.arena.direction);
        if (
            enemyUser.arena.direction === `up` && enemyUser.main.direction === `down` ||
            enemyUser.arena.direction === `down` && enemyUser.main.direction === `up` ||
            enemyUser.arena.direction === `left` && enemyUser.main.direction === `right` ||
            enemyUser.arena.direction === `right` && enemyUser.main.direction === `left`
        ) {
            enemyUser.status.canTurn = false;
        } else {
            enemyUser.status.canTurn = true;
        }
    }
}

snakeSkills.lóng.skill1 = function (num) {
    console.log(`Quicken!`);
    let activeUser = players[`player${num}`];
    let activeSkill = activeUser.skills.skill1;

    activeSkill.status = true;
    activeUser.intervals.run.speed = 25;
    clearInterval(activeUser.intervals.run.function);
    setRunInterval(num);

    let countdown = parseFloat(activeSkill.duration.value);
    let durationCounter = 0;
    activeSkill.duration.function = setInterval(() => {
        if (game.paused === false) {
            if (durationCounter % 25 === 0) {
                gamePopUp(num, `ability`, `${activeSkill.name} ${countdown}`)
                countdown -= 0.1;
                countdown = (Math.round(countdown * 100) / 100).toFixed(2);
            }
            if (durationCounter <= (activeSkill.duration.value * 250)) {
                durationCounter++;
            } else {
                activeSkill.status = false;
                clearInterval(activeSkill.duration.function);
                gamePopUp(num, `ability`, `${activeSkill.name} over!`);

                activeUser.intervals.run.speed = 100;
                clearInterval(activeUser.intervals.run.function);
                setRunInterval(num);
            }
        }
    }, 1);
}

snakeSkills.lóng.skill2 = function (num) {
    console.log(`Petrify!`);
    let enm = (num === 1) ? 2 : 1;
    let activeUser = players[`player${num}`];
    let enemyUser = players[`player${enm}`];
    let activeSkill = activeUser.skills.skill2;

    activeSkill.status = true;
    enemyUser.status.immobilized = true;
    $(`.player${enm}-snake`).addClass(`quick-anim`);
    $(`.player${enm}-snake`).addClass(`lóng-petrify`);

    let countdown = parseFloat(activeSkill.duration.value);
    let durationCounter = 0;
    activeSkill.duration.function = setInterval(() => {
        if (game.paused === false) {
            if (durationCounter === ((activeSkill.duration.value * 250)) - 100) {
                $(`.lóng-petrify`).removeClass(`lóng-petrify`);
            }
            if (durationCounter % 25 === 0) {
                gamePopUp(num, `ability`, `${activeSkill.name} ${countdown}`)
                countdown -= 0.1;
                countdown = (Math.round(countdown * 100) / 100).toFixed(2);
            }
            if (durationCounter <= (activeSkill.duration.value * 250)) {
                durationCounter++;
            } else {
                activeSkill.status = false;
                clearInterval(activeSkill.duration.function);
                gamePopUp(num, `ability`, `${activeSkill.name} over!`);

                $(`.quick-anim`).removeClass(`quick-anim`);
                enemyUser.status.immobilized = false;
            }
        }
    }, 1);
}

snakeSkills.jörmungandr.skill1 = function (num) {
    // Placeholder Variables
    console.log(`Phase!`);
    let enm = (num === 1) ? 2 : 1;
    let activeUser = players[`player${num}`];
    let enemyUser = players[`player${enm}`];
    let activeSkill = activeUser.skills.skill1;

    // Now we establish the skill
    activeSkill.status = true;
    activeUser.status.phased = true;
    let skillStyle = "box-shadow: 0 0 5px 2px cyan; ";
    $(`head`).append(`<style id="jörmungandr-phase" class="temp-styling"> .player${num}-snake{ ${skillStyle} } </style>`);

    // Finallly, we set up the duration countdown
    let countdown = parseFloat(activeSkill.duration.value);
    let durationCounter = 0;
    activeSkill.duration.function = setInterval(() => {
        if (game.paused === false) {
            // This activates the gamePopUp in intervals for the duration countdown
            if (durationCounter % 25 === 0) {
                gamePopUp(num, `ability`, `${activeSkill.name} ${countdown}`)
                countdown -= 0.1;
                countdown = (Math.round(countdown * 100) / 100).toFixed(2);
            }
            if (durationCounter <= (activeSkill.duration.value * 250)) {
                durationCounter++;
            } else {
                activeSkill.status = false;
                clearInterval(activeSkill.duration.function);
                gamePopUp(num, `ability`, `${activeSkill.name} over!`);

                activeUser.status.phased = false;
                $(`#jörmungandr-phase`).remove();
                durationEnds();
            }
        }
    }, 1);

    function durationEnds() {
        // Now we chop
        let partX;
        let partY;
        $(`#x${activeUser.arena.position[0][0]}y${activeUser.arena.position[0][1]}`).removeClass(`dead-snake`);
        $(`#x${activeUser.arena.position[1][0]}y${activeUser.arena.position[1][1]}`).removeClass(`dead-snake`);
        $(`#x${activeUser.arena.position[2][0]}y${activeUser.arena.position[2][1]}`).removeClass(`dead-snake`);
        LoopFindPart: {
            for (let i = 3; i < activeUser.arena.position.length; i++) {
                partX = parseInt(activeUser.arena.position[i][0]);
                partY = parseInt(activeUser.arena.position[i][1]);
                let beforeX = parseInt(activeUser.arena.position[i - 1][0]);
                let beforeY = parseInt(activeUser.arena.position[i - 1][1]);
                if (
                    $(`#x${partX}y${partY}`).hasClass(`dead-snake`) ||
                    $(`#x${partX}y${partY}`).hasClass(`player${enm}-snake`)
                ) {
                    partX = beforeX;
                    partY = beforeY;
                    chopSnake(num, partX, partY);
                    break LoopFindPart;
                }
            }
        }
    }
}

snakeSkills.jörmungandr.skill2 = function (num) {
    // Placeholder Variables
    console.log(`Bifrost!`);
    let enm = (num === 1) ? 2 : 1;
    let activeUser = players[`player${num}`];
    let enemyUser = players[`player${enm}`];
    let activeSkill = activeUser.skills.skill2;

    // Now we establish the skill
    activeSkill.status = true;
    activeUser.status.portable = true;
    $(`#game-arena-grid`).addClass(`medium-anim`);
    setTimeout(() => {
        $(`#game-arena-grid`).addClass(`arena-border-portal`);
    }, )

    // Finallly, we set up the duration countdown
    let countdown = parseFloat(activeSkill.duration.value);
    let durationCounter = 0;
    activeSkill.duration.function = setInterval(() => {
        if (game.paused === false) {
            // This activates the gamePopUp in intervals for the duration countdown
            if (durationCounter % 25 === 0) {
                gamePopUp(num, `ability`, `${activeSkill.name} ${countdown}`)
                countdown -= 0.1;
                countdown = (Math.round(countdown * 100) / 100).toFixed(2);
            }
            if (durationCounter <= (activeSkill.duration.value * 250)) {
                durationCounter++;
            } else {
                activeSkill.status = false;
                clearInterval(activeSkill.duration.function);
                gamePopUp(num, `ability`, `${activeSkill.name} over!`);

                activeUser.status.portable = false;
                durationEnds();
            }
        }
    }, 1);

    function durationEnds() {
        // Now find the part that we can cut
        let partX;
        let partY;
        LoopFindPart: {
            for (let i = 1; i < activeUser.arena.position.length; i++) {
                partX = parseInt(activeUser.arena.position[i][0]);
                partY = parseInt(activeUser.arena.position[i][1]);
                let beforeX = parseInt(activeUser.arena.position[i - 1][0]);
                let beforeY = parseInt(activeUser.arena.position[i - 1][1]);
                if (
                    (partX - beforeX === 1 || partX - beforeX === -1) ||
                    (partY - beforeY === 1 || partY - beforeY === -1)
                ) {

                } else {
                    partX = beforeX;
                    partY = beforeY;
                    chopSnake(num, partX, partY);
                    break LoopFindPart;
                }
            }
        }

        $(`#game-arena-grid`).removeClass(`arena-border-portal`);
        setTimeout(() => {
            $(`#game-arena-grid`).removeClass(`medium-anim`);
        }, 1000);
    }
}

snakeSkills.sheshanaga.skill1 = function (num) {
    let enm = (num === 1) ? 2 : 1;
    let activeUser = players[`player${num}`];
    let enemyUser = players[`player${enm}`];
    let activeSkill = activeUser.skills.skill1;

    // Now we establish the skill
    activeSkill.status = true;

    let stealSize = Math.floor(enemyUser.arena.position.length / 2);
    let stealX = enemyUser.arena.position[stealSize][0];
    let stealY = enemyUser.arena.position[stealSize][1];
    chopSnake(enm, stealX, stealY);
    growSnake(num, stealSize);

    // Finally, we close the function
    activeSkill.status = false;
}

snakeSkills.sheshanaga.skill2 = function (num) {
    let enm = (num === 1) ? 2 : 1;
    let activeUser = players[`player${num}`];
    let activeSkill = activeUser.skills.skill2;

    // Now we establish the skill
    activeSkill.status = true;
    activeUser.status.unstoppable = true;
    // let skillStyle = "";
    let skillStyle = `.player${num}-snake{ box-shadow: 0 0 5px 2px magenta; }`;
    $(`head`).append(`<style id="ouroboros-unstoppable" class="temp-styling"></style>`);
    $(`#ouroboros-unstoppable`).html(`${skillStyle}`);

    activeUser.intervals.run.speed = 90;
    clearInterval(activeUser.intervals.run.function);
    setRunInterval(num);

    // Finallly, we set up the duration countdown
    let countdown = parseFloat(activeSkill.duration.value);
    let durationCounter = 0;
    activeSkill.duration.function = setInterval(() => {
        if (game.paused === false) {
            if (durationCounter % 25 === 0) {
                gamePopUp(num, `ability`, `${activeSkill.name} ${countdown}`)
                countdown -= 0.1;
                countdown = (Math.round(countdown * 100) / 100).toFixed(2);
            }
            if (durationCounter <= (activeSkill.duration.value * 250)) {
                durationCounter++;
            } else {
                activeSkill.status = false;
                clearInterval(activeSkill.duration.function);
                gamePopUp(num, `ability`, `${activeSkill.name} over!`);

                activeUser.intervals.run.speed = 100;
                clearInterval(activeUser.intervals.run.function);
                setRunInterval(num);
                $(`#ouroboros-unstoppable`).remove();
                activeUser.status.unstoppable = false;
            }
        }
    }, 1);
}

// snakeAbilities.lóng.skill2 = function (num) {
// console.log(`Target!`);
// let enm = (num === 1) ? 2 : 1;
//     let activeUser = player[`p${num}`];
//     let enemyUser = player[`p$ {enm}`]
//     for (let j = 1; j <= 3; j++) {
//         for (let i = 1; i < game.col; i++) {
//             $(`#r${food[`food${j}`].position[0]}c${i}`).addClass(`quick-anim`);
//             $(`#r${food[`food${j}`].position[0]}c${i}`).addClass(`lóng-target`);
//         }
//         for (let i = 1; i < game.row; i++) {
//             $(`#r${food[`food${j}`].position[0]}c${i}`).addClass(`quick - anim `);
//             $(`#r${i}c${food[`food${j}`].position[1]}`).addClass(`lóng - target `);
//         }
//     }
//     $(`.food - 1 `).removeClass(`lóng - target `);
//     $(`.food - 2 `).removeClass(`lóng - target `);
//     $(`.food - 3 `).removeClass(`lóng - target `);
//     setTimeout(() => {
//         $(`.lóng - target `).removeClass(`lóng - target `);
//         setTimeout(() => {
//             $(`.quick - anim `).removeClass(`quick - anim `);
//         }, 1000);
//     }, 3000);
// }

// snakeSkills.sheshanaga.skill1 = function (num) {
//     console.log(`Masochist!`); 
//     let enm = (num === 1) ? 2 : 1;
//     let activeUser = players[`player${num}`];
//     let enemyUser = players[`player${enm}`];
//     let activeSkill = activeUser.skills.skill1;

//     // Now we establish the skill
//     activeSkill.status = true;
//     activeUser.status.masochist = true;
//     let skillStyle = `.player${num}-snake-body {border-color: rgb(124, 46, 124);}`;
//     $(`head`).append(`<style id="ouroboros-masochist" class="temp-styling"></style>`);
//     $(`#ouroboros-masochist`).html(`${skillStyle}`);

//     // Finallly, we set up the duration countdown
//     let countdown = parseFloat(activeSkill.duration.value);
//     let durationCounter = 0;
//     activeSkill.duration.function = setInterval(() => {
//         if (game.paused === false) {
//             if (durationCounter % 25 === 0) {
//                 gamePopUp(num, `ability`, `${activeSkill.name} ${countdown}`)
//                 countdown -= 0.1;
//                 countdown = (Math.round(countdown * 100) / 100).toFixed(2);
//             }
//             if (durationCounter <= (activeSkill.duration.value * 250)) {
//                 durationCounter++;
//             } else {
//                 activeSkill.status = false;
//                 clearInterval(activeSkill.duration.function);
//                 gamePopUp(num, `ability`, `${activeSkill.name} over!`);

//                 $(`#ouroboros-masochist`).remove();
//                 activeUser.status.masochist = false;
//             }
//         }
//     }, 1);
// }