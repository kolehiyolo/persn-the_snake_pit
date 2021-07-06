let chooseApopis = {
    name: "apopis",
    epithet: "Primordial God of Chaos",
    color: "red",
    skills: {
        skill1: {
            name: "Switch",
            description: "-Swap bodies with the enemy",
            duration: "Instant",
            cooldown: "10s"
        },
        skill2: {
            name: "Chaos",
            description: "-Randomly scatter all objects and the snakes",
            duration: "Instant",
            cooldown: "10s"
        }
    }
}

let chooseOrochi = {
    name: "orochi",
    epithet: "Eight-Headed Leviathan",
    color: "orange",
    skills: {
        skill1: {
            name: "Amputate",
            description: "-Leave a clone without taking damage",
            duration: "Instant",
            cooldown: "10s"
        },
        skill2: {
            name: "Sustainable",
            description: "-Any damage taken is halved",
            duration: "Passive",
            cooldown: "Passive"
        }
    }
}

let chooseQuetzalcoatl = {
    name: "quetzalcoatl",
    epithet: "Feathered Serpent Deity",
    color: "yellow",
    skills: {
        skill1: {
            name: "Takeover",
            description: "-Control both snakes",
            duration: "3s",
            cooldown: "10s"
        },
        skill2: {
            name: "Reversal ",
            description: "-Reverse the head and the tail",
            duration: "Instant",
            cooldown: "10s"
        }
    }
}

let chooseLong = {
    name: "lóng",
    epithet: "God King of Dragons",
    color: "lime",
    skills: {
        skill1: {
            name: "Petrify",
            description: "-Stun the enemy momentarily",
            duration: "1s",
            cooldown: "10s"
        },
        skill2: {
            name: "Target",
            description: "-Shows the coordinates of the enemy's head and all objects",
            duration: "3s",
            cooldown: "10s"
        }
    }
}

let chooseJormungandr = {
    name: "jörmungandr",
    epithet: "Herald of Ragnarok",
    color: "cyan",
    skills: {
        skill1: {
            name: "Bifrost",
            description: "-The edges of the arena become portals",
            duration: "3s",
            cooldown: "10s"
        },
        skill2: {
            name: "Phase",
            description: "-Can pass through obstacles",
            duration: "3s",
            cooldown: "10s"
        }
    }
}

let chooseOuroboros = {
    name: "ouroboros",
    epithet: "Self-Devouring Titan",
    color: "magenta",
    skills: {
        skill1: {
            name: "Masochist",
            description: "-Can pass through self",
            duration: "Passive",
            cooldown: "Passive"
        },
        skill2: {
            name: "Impenetrable",
            description: "-The body won't take any damage",
            duration: "3s",
            cooldown: "10s"
        }
    }
}

let chooseSnakesArray = [
    chooseApopis, chooseOrochi, chooseQuetzalcoatl,
    chooseLong, chooseJormungandr, chooseOuroboros
];

function setChooseSnakesGrid() {
    console.log(`activated setChooseSnakesGrid()`);
    $(`body main`).append(`<div id="game-choose-grid"></div>`);
    $(`#game-choose-grid`).append(`<div id="choose-snakes-grid"></div>`);
    $(`#game-choose-grid`).append(`<div id="choose-ready-grid"></div>`);
    $(`#choose-ready-grid`).append(`<button id="choose-player_1-button" class="choose-player-button"></button>`);
    $(`#choose-ready-grid`).append(`<button id="choose-player_2-button" class="choose-player-button"></button>`);

    chooseSnakesArray.forEach((item) => {
        let chooseSnakeID = `${item.name}`;
        let chooseSnakeVar = `snake`;
        $(`#choose-snakes-grid`).append(`<div id="${chooseSnakeID}-div" class="${chooseSnakeVar}-div"></div>`);

        // Choose Snake Header
        $(`#${chooseSnakeID}-div`).append(`<div id="${chooseSnakeID}-header" class="${chooseSnakeVar}-header"></div>`);
        $(`#${chooseSnakeID}-header`).append(`<h2 id="${chooseSnakeID}-header-name" class="${chooseSnakeVar}-header-name"></h2>`);
        $(`#${chooseSnakeID}-header`).append(`<h3 id="${chooseSnakeID}-header-epithet" class="${chooseSnakeVar}-header-epithet choose-italics"></h3>`);

        // Choose Snake Skills
        $(`#${chooseSnakeID}-div`).append(`<div id="${chooseSnakeID}-skills" class="${chooseSnakeVar}-skills"></div>`);
        $(`#${chooseSnakeID}-skills`).append(`<div id="${chooseSnakeID}-skill_1" class="${chooseSnakeVar}-skill_1"></div>`);
        $(`#${chooseSnakeID}-skills`).append(`<div id="${chooseSnakeID}-skill_2" class="${chooseSnakeVar}-skill_2"></div>`);
        for (let i = 1; i <= 2; i++) {
            $(`#${chooseSnakeID}-skill_${i}`).append(`<p id="${chooseSnakeID}-skill_${i}-name" class="${chooseSnakeVar}-skill_${i}-name"></p>`);
            $(`#${chooseSnakeID}-skill_${i}`).append(`<p id="${chooseSnakeID}-skill_${i}-desc" class="${chooseSnakeVar}-skill_${i}-desc"></p>`);
            $(`#${chooseSnakeID}-skill_${i}`).append(`<p id="${chooseSnakeID}-skill_${i}-dura" class="${chooseSnakeVar}-skill_${i}-dura"></p>`);
            $(`#${chooseSnakeID}-skill_${i}`).append(`<p id="${chooseSnakeID}-skill_${i}-cool" class="${chooseSnakeVar}-skill_${i}-cool"></p>`);
        }

        // Choose Snake Players
        $(`#${chooseSnakeID}-div`).append(`<div id="${chooseSnakeID}-players" class="${chooseSnakeVar}-players"></div>`);
        $(`#${chooseSnakeID}-players`).append(`<div class="${chooseSnakeVar}-player_1-icon ${chooseSnakeVar}-players-icon"></div>`);
        $(`#${chooseSnakeID}-players`).append(`<div class="${chooseSnakeVar}-player_2-icon ${chooseSnakeVar}-players-icon"></div>`);

        // Now we populate the details
        let properName = item.name;
        properName = properName.replace(/^\w/, properName[0].toUpperCase());
        $(`#${chooseSnakeID}-header-name`).html(`${properName}`);
        $(`#${chooseSnakeID}-header-epithet`).html(`${item.epithet}`);

        for (let i = 1; i <= 2; i++) {
            $(`#${chooseSnakeID}-skill_${i}-name`).html(`${item.skills[`skill${i}`].name}`);
            $(`#${chooseSnakeID}-skill_${i}-desc`).html(`${item.skills[`skill${i}`].description}`);
            $(`#${chooseSnakeID}-skill_${i}-dura`).html(`<span class="choose-italics">Duration:</span> ${item.skills[`skill${i}`].duration}`);
            $(`#${chooseSnakeID}-skill_${i}-cool`).html(`<span class="choose-italics">Cooldown:</span> ${item.skills[`skill${i}`].cooldown}`);
        }
    });

}

setChooseSnakesGrid();