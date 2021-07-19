// Possible Abilities
// Dash - Move Forward Quickly

// Whiplash - Send out a Strike you can control
// Venom - Send out consecutive Mini-Strikes
// Latch - Send out a Strike that latches and drags you
// Snipe - Send out a Quick-fire Strike that breaks through all obstacles
// Portals - Send out Strikes that create portals upon impact
// Splinter - Send out Strikes from all directions

let snakes = {
    apopis: {
        name: "apopis",
        epithet: "Primordial God of Chaos",
        color: "red",
        skills: {
            skill1: {
                name: "Switch",
                description: "Swap bodies with the enemy",
                longerDescription: "Swap bodies with the enemy",
                duration: "Instant",
                cooldown: 20,
                cost: 5,
                required: 8,
            },
            skill2: {
                name: "Chaos",
                description: "Randomly scatter all objects and the snakes",
                longerDescription: "Randomly scatter all objects and the snakes",
                duration: "Instant",
                cooldown: 10,
                cost: 3,
                required: 5,
            }
        }
    },
    orochi: {
        name: "orochi",
        epithet: "Eight-Headed Leviathan",
        color: "orange",
        skills: {
            skill1: {
                name: "Amputate",
                description: "Dissect yourself to leave a clone",
                longerDescription: "Dissect yourself to leave a clone",
                duration: "Instant",
                cooldown: 2,
                cooldown: 2,
                cost: 0,
                required: 4,
            },
            skill2: {
                name: "Transfer",
                description: "Transfer to one of the clones",
                longerDescription: "Transfer to one of the clones",
                duration: "Instant",
                cooldown: 2,
                cooldown: 2,
                cost: 0,
                required: 1,
            },
            // skill1: {
            //     name: "Sustainable",
            //     description: "Any damage taken is halved",
            //     longerDescription: "Any damage taken is halved",
            //     duration: "Passive",
            //     cooldown: "Passive",
            //     cost: 0,
            //     required: 0,
            // },
        }
    },
    quetzalcoatl: {
        name: "quetzalcoatl",
        epithet: "Feathered Serpent Deity",
        color: "yellow",
        skills: {
            skill1: {
                name: "Reversal",
                description: "Reverse the head and the tail",
                longerDescription: "Reverse the head and the tail",
                duration: "Instant",
                cooldown: 2,
                cost: 1,
                required: 3,
            },
            skill2: {
                name: "Takeover",
                description: "Control both snakes' directions",
                longerDescription: "Control both snakes' directions",
                duration: 1,
                cooldown: 10,
                cost: 4,
                required: 7,
                // duration: 9,
                // cooldown: 10,
                // cost: 4,
                // required: 7,
            }
        }
    },
    lóng: {
        name: "lóng",
        epithet: "God King of Dragons",
        color: "lime",
        skills: {
            skill1: {
                name: "Quicken",
                description: "Speed up momentarily",
                longerDescription: "Speed up momentarily",
                duration: 0.75,
                cooldown: 5,
                cost: 3,
                required: 5,
            },
            skill2: {
                name: "Petrify",
                description: "Stun the enemy momentarily",
                longerDescription: "Stun the enemy momentarily",
                duration: 1,
                cooldown: 15,
                cost: 4,
                required: 5,
            },
            // skill2: {
            //     name: "Target",
            //     description: "Shows the coordinates of all targets",
            //     longerDescription: "Shows the coordinates of all targets",
            //     duration: 3,
            //     cooldown: 5,
            //     cost: 1,
            //     required: 3,
            // }
        }
    },
    jörmungandr: {
        name: "jörmungandr",
        epithet: "Herald of Ragnarok",
        color: "cyan",
        skills: {
            skill1: {
                name: "Phase",
                description: "Can pass through obstacles",
                longerDescription: "Can pass through obstacles",
                duration: 3,
                cooldown: 10,
                cost: 3,
                required: 4,
            },
            skill2: {
                name: "Bifrost",
                description: "The edges of the arena become portals",
                longerDescription: "The edges of the arena become portals",
                duration: 3,
                cooldown: 10,
                cost: 2,
                required: 3,
            },
        }
    },
    sheshanaga: {
        name: "sheshanaga",
        epithet: "The Infinite One",
        color: "magenta",
        skills: {
            skill1: {
                name: "Drain",
                description: "Steal half of your enemy's size",
                longerDescription: "Instantly steal half of your enemy's length to your own",
                duration: "Instant",
                cooldown: 20,
                cost: 4,
                required: 5,
            },
            skill2: {
                name: "Unstoppable",
                description: "Plow through everything",
                longerDescription: "Plow through everything",
                duration: 4,
                cooldown: 10,
                cost: 2,
                required: 5,
            },
            // skill1: {
            //     name: "Karma",
            //     description: "Instantly steal half of your enemy's length to your own",
            //     longerDescription: "Instantly steal half of your enemy's length to your own",
            //     duration: "Instant",
            //     cooldown: 20,
            //     cost: 4,
            //     required: 5,
            // },
            // skill1: {
            //     name: "Masochist",
            //     description: "Can pass through self",
            //     longerDescription: "Can pass through self",
            //     duration: 5,
            //     cooldown: 10,
            //     cost: 2,
            //     required: 3,
            // },
        }
    }
}

let chooseSnakesArray = [
    snakes.apopis, snakes.orochi, snakes.quetzalcoatl,
    snakes.lóng, snakes.jörmungandr, snakes.sheshanaga
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
            if (typeof item.skills[`skill${i}`].duration === "number") {
                console.log(`item.name = ${item.name} ; true`);
                $(`#${chooseSnakeID}-skill_${i}-dura`).html(`<span class="choose-italics">Duration:</span> ${item.skills[`skill${i}`].duration} seconds`);
            } else {
                console.log(`item.name = ${item.name} ; false`);
                $(`#${chooseSnakeID}-skill_${i}-dura`).html(`<span class="choose-italics">Duration:</span> ${item.skills[`skill${i}`].duration}`);
            }
            if (typeof item.skills[`skill${i}`].cooldown === "number") {
                $(`#${chooseSnakeID}-skill_${i}-cool`).html(`<span class="choose-italics">Cooldown:</span> ${item.skills[`skill${i}`].cooldown} seconds`);
            } else {
                $(`#${chooseSnakeID}-skill_${i}-cool`).html(`<span class="choose-italics">Cooldown:</span> ${item.skills[`skill${i}`].cooldown}`);
            }
        }
    });

}