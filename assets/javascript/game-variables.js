// This variable represents the current game state, which will be used to determine what the keys are supposed to do at a time
let player;
let controls;
let food;
let game;
let active;
let enemy;
let activePlayer;
let enemyPlayer;

let key = {
    id: undefined,
    type: undefined,
    valid: false
}

function setGameVariables() {
    active = {
        id: 0
    }
    enemy = {
        id: 0
    }
    food = {
        food1: {
            position: [undefined, undefined]
        },
        food2: {
            position: [undefined, undefined]
        },
        food3: {
            position: [undefined, undefined]
        },
        super: {
            position: [undefined, undefined],
            active: false,
            count: 0
        }
    }
    game = {
        state: undefined,
        row: 49,
        col: 49,
        winner: undefined,
        loser: undefined,
        paused: false,
        over: false,
        ready: false,
    }
    // game.row = 29;
    // game.col = 29;
    // game.row = 49;
    // game.col = 29;
}

function setPlayersMain() {
    player = {
        p1: {
            main: {
                id: 1,
                name: undefined,
                direction: undefined,
                ability: undefined,
                misc: undefined,
                score: 0,
            },

            choose: {
                snake: undefined,
                position: [undefined, undefined],
                ready: false,
                clicked: false,
            },
        }
    }
    player.p2 = JSON.parse(JSON.stringify(player.p1));
    player.alter1 = JSON.parse(JSON.stringify(player.p1));
    player.alter2 = JSON.parse(JSON.stringify(player.p2));
    player.p2.main.id = 2;
    player.p1.main.name = "Tristan";
    player.p2.main.name = "Theolo";
}

function setPlayersArena() {
    player.p1.arena = {
        direction: undefined,
        snake: undefined,
        position: [undefined],
        size: undefined,
        alive: true,
        disabled: false,
        canTurn: false,
        immobilized: false,
        phased: false,
        portaled: false,
    }
    player.p1.status = {
        alive: true, // This means the snake is alive
        disabled: false, // This means the snake can't move and use abilities
        canTurn: false, // This means the snake can turn to a perpendicular direction
        canStrike: false, // This means the snake can use strike
        immobilized: false, // This means the snake can't move but still use abilities
        phased: false, // This means the snake can pass through obstacles, snakes and strikes
        portable: false, // This means the snake can use the borders as portals
        unstoppable: false, // This means the snake can plow through obstacles, snakes and strikes
        masochist: false, // This means the snake can pass through itself
    }
    player.p1.intervals = {
        run: {
            status: false,
            function: undefined,
            count: 0,
            speed: 100
            // speed: 120
        },
        useStrike: {
            status: false,
            function: undefined,
            count: 0,
            speed: 5
            // speed: 1
        },
        fetchStrike: {
            status: false,
            function: undefined,
            count: 0,
            speed: 40
            // speed: 200
        },
        growth: {
            status: false,
            function: undefined,
            count: 5,
            speed: 1000
        }
    }
    player.p2.arena = JSON.parse(JSON.stringify(player.p1.arena));
    player.alter1.arena = JSON.parse(JSON.stringify(player.p1.arena));
    player.alter2.arena = JSON.parse(JSON.stringify(player.p2.arena));
    player.p2.intervals = JSON.parse(JSON.stringify(player.p1.intervals));
    player.alter1.intervals = JSON.parse(JSON.stringify(player.p1.intervals));
    player.alter2.intervals = JSON.parse(JSON.stringify(player.p2.intervals));
}

function setControls() {
    controls = {
        p1: {
            // Here are the Primary Controls for Player 1
            main: {
                direction: {
                    up: "w",
                    down: "s",
                    left: "a",
                    right: "d",
                },
                ability: {
                    strike: "c",
                    ability1: "v",
                    ability2: "b",
                },
                misc: {
                    aux: " ",
                    exit: "t",
                }
            },
        },
        // Here are the Primary Controls for Player 2
        p2: {
            main: {
                direction: {
                    up: "i",
                    down: "k",
                    left: "j",
                    right: "l",
                },
                ability: {
                    strike: "[",
                    ability1: "]",
                    ability2: "\\",
                    // ability2: "Enter",
                },
                misc: {
                    aux: "Enter",
                    exit: "8",
                }
            }
        }
    }

    controls.p1.alt = JSON.parse(JSON.stringify(controls.p1.main));
    controls.p2.alt = JSON.parse(JSON.stringify(controls.p2.main));

    // Now we define the Alternative Controls for each player
    for (let i = 1; i <= 2; i++) {
        for (let j in controls[`p${i}`].main) {
            for (let k in controls[`p${i}`].main[j]) {
                controls[`p${i}`].alt[j][k] = controls[`p${i}`].main[j][k].toUpperCase();
            }
        }
    }
}

function setAbilities(num) {
    let activeUser = player[`p${num}`];
    activeUser.abilities = {
        strike: {
            name: "strike",
            status: false,
            cost: 1,
        },
        ability1: {
            name: snakes[activeUser.arena.snake].skills.skill1.name,
            status: false,
            ready: false,
            cost: 1,
            duration: snakes[activeUser.arena.snake].skills.skill1.duration,
            cooldown: snakes[activeUser.arena.snake].skills.skill1.cooldown,
            interval: {
                status: false,
                counter: 0,
                function: undefined
            },
            seconds: {
                status: false,
                counter: 0,
                function: undefined
            }
        },
        ability2: {
            name: snakes[activeUser.arena.snake].skills.skill2.name,
            status: false,
            ready: false,
            cost: 1,
            duration: snakes[activeUser.arena.snake].skills.skill2.duration,
            cooldown: snakes[activeUser.arena.snake].skills.skill2.cooldown,
            interval: {
                status: false,
                counter: 0,
                function: undefined
            },
            seconds: {
                status: false,
                counter: 0,
                function: undefined
            }
        },
    }
}

setGameVariables();
setPlayersMain();
setPlayersArena();
setControls();