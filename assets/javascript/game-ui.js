function setPlayerUI(num) {
    // FIXME - Refactor this shit like crazy
    $(`#player${num}-ui`).remove();
    let arenaWidth = $(`#game-arena-grid`).outerWidth();
    let arenaHeight = $(`#game-arena-grid`).outerWidth();

    let activeUI = players[`player${num}`];

    $(`body main`).append(`<div id="player${num}-ui" class="player-ui hidden slow-anim"></div>`);
    switch (num) {
        case 1:
            $(`#player1-ui`).attr(`style`, `min-height:${arenaHeight}px; left:50%; transform: translate(-${arenaWidth/2 + 265}px,-50%);`);
            break;
        case 2:
            $(`#player2-ui`).attr(`style`, `min-height:${arenaHeight}px; right:50%; transform: translate(${arenaWidth/2 + 265}px,-50%);`);
            break;
    }

    // FIXME - Handle Instant durations

    $(`#player${num}-ui`).addClass(`${activeUI.arena.snake}-border`);
    $(`#player${num}-ui`).append(`<div id="player${num}-ui-header" class="player-ui-header"></div>`);
    $(`#player${num}-ui`).append(`<div id="player${num}-ui-stats" class="player-ui-stats"></div>`)
    $(`#player${num}-ui`).append(`<div id="player${num}-ui-skills" class="player-ui-skills"></div>`);

    $(`#player${num}-ui-header`).append(`<p id="player${num}-ui-name" class="player-ui-name"></p>`);
    $(`#player${num}-ui-header`).append(`<p id="player${num}-ui-snake" class="player-ui-snake"></p>`);
    $(`#player${num}-ui-name`).html(`${activeUI.main.name}`);
    $(`#player${num}-ui-snake`).html(`${activeUI.arena.snake}`);

    $(`#player${num}-ui-stats`).append(`<p id="player${num}-ui-size-label" class="player-ui-size-label"></p>`);
    $(`#player${num}-ui-stats`).append(`<p id="player${num}-ui-growth-label" class="player-ui-growth-label"></p>`);
    $(`#player${num}-ui-size-label`).html(`Size`);
    $(`#player${num}-ui-growth-label`).html(`Growth`);

    $(`#player${num}-ui-stats`).append(`<p id="player${num}-ui-size" class="player-ui-size"></p>`);
    $(`#player${num}-ui-stats`).append(`<p id="player${num}-ui-growth" class="player-ui-growth"></p>`);
    $(`#player${num}-ui-size`).html(`0`);
    $(`#player${num}-ui-growth`).html(`5`);

    // $(`#player${num}-ui-size-label`).addClass(`${activeUI.arena.snake}-border`);
    // $(`#player${num}-ui-score-label`).addClass(`${activeUI.arena.snake}-border`);
    // $(`#player${num}-ui-stats-size`).addClass(`${activeUI.arena.snake}-border`);
    // $(`#player${num}-ui-stats-size`).addClass(`${activeUI.arena.snake}-border`);

    $(`#player${num}-ui-snake`).addClass(`${activeUI.arena.snake}-font_color`);

    // Add the skills
    $(`#player${num}-ui-skills`).append(`<div id="player${num}-ui-strike" class="player-ui-skill"></div>`);
    $(`#player${num}-ui-strike`).append(`<div id="player${num}-ui-strike-text" class="player-ui-skill-text"></div>`);
    $(`#player${num}-ui-strike-text`).append(`<p id="player${num}-ui-strike-name" class="player-ui-skill-name"></p>`);
    // $(`#player${num}-ui-strike-text`).append(`<p id="player${num}-ui-strike-desc" class="player-ui-skill-desc"></p>`);
    $(`#player${num}-ui-strike`).append(`<div id="player${num}-ui-strike-key" class="player-ui-skill-key"></div>`);

    $(`#player${num}-ui-strike-name`).html(`Strike`);
    // $(`#player${num}-ui-strike-desc`).html(`Attack in a straight line. You won't be able to move or use abilities while the strike is out`);
    $(`#player${num}-ui-strike-key`).html(`<p>${players[`player${num}`].controls.main.skill.strike}</p>`);

    // Add the Required
    $(`#player${num}-ui-strike`).append(`<div id="player${num}-ui-strike-req" class="player-ui-skill-req"></div>`);
    for (let j = 1; j <= 3; j++) {
        $(`#player${num}-ui-strike-req`).append(`<div id="player${num}-ui-strike-req${j}" class="player${num}-ui-strike-req-part"></div>`);
    }

    // Add the Cost
    for (let j = 1; j <= 1; j++) {
        $(`#player${num}-ui-strike-req${j}`).addClass(`player${num}-ui-strike-cost-part`);
    }
    $(`.player${num}-ui-strike-cost-part`).addClass(`${activeUI.arena.snake}-ui-border`);


    // Now we a dd the skills
    for (let i = 1; i <= 2; i++) {
        $(`#player${num}-ui-skills`).append(`<div id="player${num}-ui-skill${i}" class="player-ui-skill"></div>`);

        // Add the Text
        $(`#player${num}-ui-skill${i}`).append(`<div id="player${num}-ui-skill${i}-text" class="player-ui-skill-text"></div>`);
        $(`#player${num}-ui-skill${i}-text`).append(`<p id="player${num}-ui-skill${i}-name" class="player-ui-skill-name"></p>`);
        $(`#player${num}-ui-skill${i}-text`).append(`<p id="player${num}-ui-skill${i}-desc" class="player-ui-skill-desc"></p>`);
        $(`#player${num}-ui-skill${i}-name`).html(`${snakes[activeUI.arena.snake].skills[`skill${i}`].name}`);
        $(`#player${num}-ui-skill${i}-desc`).html(`${snakes[activeUI.arena.snake].skills[`skill${i}`].longerDescription}`);

        // Add the Stats
        $(`#player${num}-ui-skill${i}-text`).append(`<p id="player${num}-ui-skill${i}-dura" class="player-ui-skill-dura"></p>`);
        $(`#player${num}-ui-skill${i}-text`).append(`<p id="player${num}-ui-skill${i}-cool" class="player-ui-skill-cool"></p>`);
        if (snakes[activeUI.arena.snake].skills[`skill${i}`].duration === `Instant`) {
            $(`#player${num}-ui-skill${i}-dura`).html(`Duration: ${snakes[activeUI.arena.snake].skills[`skill${i}`].duration}`);
        }
        else {
            $(`#player${num}-ui-skill${i}-dura`).html(`Duration: ${snakes[activeUI.arena.snake].skills[`skill${i}`].duration} secs`);
        }
        if (snakes[activeUI.arena.snake].skills[`skill${i}`].cooldown === `Instant`) {
            $(`#player${num}-ui-skill${i}-cool`).html(`Cooldown: ${snakes[activeUI.arena.snake].skills[`skill${i}`].cooldown}`);
        }
        else {
            $(`#player${num}-ui-skill${i}-cool`).html(`Cooldown: ${snakes[activeUI.arena.snake].skills[`skill${i}`].cooldown} secs`);
        }

        if (snakes[activeUI.arena.snake].skills[`skill${i}`].cooldown != "Passive") {
            // Add the Time Bar
            $(`#player${num}-ui-skill${i}`).append(`<div id="player${num}-ui-skill${i}-time" class="player-ui-skill-time"></div>`);

            // Add the Key
            $(`#player${num}-ui-skill${i}`).append(`<div id="player${num}-ui-skill${i}-key" class="player-ui-skill-key"></div>`);
            $(`#player${num}-ui-skill${i}-key`).html(`<p>${players[`player${num}`].controls.main.skill[`skill${i}`]}</p>`);

            // Add the Required
            $(`#player${num}-ui-skill${i}`).append(`<div id="player${num}-ui-skill${i}-req" class="player-ui-skill-req"></div>`);
            for (let j = 1; j <= snakes[activeUI.arena.snake].skills[`skill${i}`].required; j++) {
                $(`#player${num}-ui-skill${i}-req`).append(`<div id="player${num}-ui-skill${i}-req${j}" class="player${num}-ui-skill${i}-req-part"></div>`);
            }

            // Add the Cost
            for (let j = 1; j <= snakes[activeUI.arena.snake].skills[`skill${i}`].cost; j++) {
                $(`#player${num}-ui-skill${i}-req${j}`).addClass(`player${num}-ui-skill${i}-cost-part`);
            }
            $(`.player${num}-ui-skill${i}-cost-part`).addClass(`${activeUI.arena.snake}-ui-border`);
        } else {
            console.log(`${snakes[activeUI.arena.snake].skills[`skill${i}`].name} is a Passive Skill`);
            $(`#player${num}-ui-skill${i}`).append(`<div id="player${num}-ui-skill${i}-pass" class="player-ui-skill-pass"></div>`);
            $(`#player${num}-ui-skill${i}-pass`).html(`<p>Passive</p>`);
            $(`#player${num}-ui-skill${i}`).addClass(`player-ui-skill-pass-border`);
        }
    }

    $(`#player${num}-ui-skills .player-ui-skill`).addClass(`${activeUI.arena.snake}-border`);

    setTimeout(() => {
        $(`#player${num}-ui`).removeClass(`hidden `);
        $(`#player${num}-ui`).addClass(`show`);
    }, 1);

    setTimeout(() => {
        $(`#player${num}-ui`).removeClass(`slow-anim`);
    }, 1000);
}

function updateSkillUI(num, skill) {
    let activeUI = players[`player${num}`];
    let i = skill;

    // Add the Text
    $(`#player${num}-ui-skill${i}-name`).html(`${snakes[activeUI.arena.snake].skills[`skill${i}`].name}`);
    $(`#player${num}-ui-skill${i}-desc`).html(`${snakes[activeUI.arena.snake].skills[`skill${i}`].longerDescription}`);

    // Add the Stats
    if (snakes[activeUI.arena.snake].skills[`skill${i}`].duration === `Instant`) {
        $(`#player${num}-ui-skill${i}-dura`).html(`Duration: ${snakes[activeUI.arena.snake].skills[`skill${i}`].duration}`);
    }
    else {
        $(`#player${num}-ui-skill${i}-dura`).html(`Duration: ${snakes[activeUI.arena.snake].skills[`skill${i}`].duration} secs`);
    }
    if (snakes[activeUI.arena.snake].skills[`skill${i}`].cooldown === `Instant`) {
        $(`#player${num}-ui-skill${i}-cool`).html(`Cooldown: ${snakes[activeUI.arena.snake].skills[`skill${i}`].cooldown}`);
    }
    else {
        $(`#player${num}-ui-skill${i}-cool`).html(`Cooldown: ${snakes[activeUI.arena.snake].skills[`skill${i}`].cooldown} secs`);
    }

    // Add the Key
    $(`#player${num}-ui-skill${i}-key`).html(`<p>${players[`player${num}`].controls.main.skill[`skill${i}`]}</p>`);
    $(`#player${num}-ui-skill${i}-req`).remove();

    // Add the Required
    $(`#player${num}-ui-skill${i}`).append(`<div id="player${num}-ui-skill${i}-req" class="player-ui-skill-req"></div>`);
    for (let j = 1; j <= snakes[activeUI.arena.snake].skills[`skill${i}`].required; j++) {
        $(`#player${num}-ui-skill${i}-req`).append(`<div id="player${num}-ui-skill${i}-req${j}" class="player${num}-ui-skill${i}-req-part"></div>`);
    }

    // Add the Cost
    for (let j = 1; j <= snakes[activeUI.arena.snake].skills[`skill${i}`].cost; j++) {
        $(`#player${num}-ui-skill${i}-req${j}`).addClass(`player${num}-ui-skill${i}-cost-part`);
    }
    $(`.player${num}-ui-skill${i}-cost-part`).addClass(`${activeUI.arena.snake}-ui-border`);
}

function setScoreBoard() {
    $(`body main`).append(`<div id="score-board"></div>`);
    $(`#score-board`).addClass(`hidden slow-anim`);

    $(`#score-board`).append(`<div id="food-count-div"></div>`);
    for (let i = 1; i <= food.super.limit; i++) {
        $(`#food-count-div`).append(`<div id="food-count-${i}" class="food-count"></div>`);
    }
    $(`.food-count`).addClass(`slow-anim`);

    $(`#score-board`).append(`<div id="player1-score-div"></div>`);
    $(`#score-board`).append(`<div id="player2-score-div"></div>`);

    setTimeout(() => {
        $(`#score-board`).removeClass(`hidden`);
        $(`#score-board`).addClass(`show`);
    }, 1);

    setTimeout(() => {
        $(`#score-board`).removeClass(`slow-anim`);
    }, 2000);
}

function updateFoodCountDiv() {
    let num = parseInt(food.super.count);
    if (num === 0) {
        $(`.food-count`).removeClass(`food-count-active`);
    }
    if (num <= 5) {
        $(`#food-count-${num}`).addClass(`food-count-active`);
    }
}

function updatePlayerScoreDiv(num) {
    // FIXME
    let score = parseInt(players[`player${num}`].main.score);
    let snake = players[`player${num}`].arena.snake;
    console.log(`updatePlayerScoreDiv(${num})`);
    console.log(`--player${num}-score-count = ${score}`);
    $(`#player${num}-score-div`).append(`<div id="player${num}-score-${score}" class="player${num}-score slow-anim"></div>`);
    $(`#player${num}-score-${score}`).addClass(`player${num}-score`);
    $(`#player${num}-score-${score}`).addClass(`${snake}-border`);
}



function updatePlayerUI(num, item, value) {
    switch (item) {
        case "size":
            $(`#player${num}-ui-size`).html(`${players[`player${num}`].arena.size}`);
            break;
        case "score":
            break;
    }
}