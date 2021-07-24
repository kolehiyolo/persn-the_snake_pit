let game;
let food;
let players;
let active;
let enemy;

// We establish the Key object
let key = {
    id: undefined,
    type: undefined,
    valid: false,
}

function setGameVariables() {
    // We establish the active.id and enemy.id objects that keep track of who uses the functions
    active = {
        id: 0
    }
    enemy = {
        id: 0
    }

    // We establish the values of each food and their positions
    food = {
        food1: {
            position: [undefined, undefined],
            value: 2,
        },
        food2: {
            position: [undefined, undefined],
            value: 2,
        },
        food3: {
            position: [undefined, undefined],
            value: 2,
        },
        super: {
            position: [undefined, undefined],
            value: 5,
            active: false,
            count: 0,
            limit: 5,
        }
    }

    // We finally establish the game variables
    game = {
        state: undefined, // This determines which state the game is at (choose, arena, etc)
        arena: {
            xAxis: 49, // This determines the arena's columns
            yAxis: 49, // This determines the arena's row
            winner: undefined, // This determines a round's winner
            loser: undefined, // This determines a round's loser
            paused: false, // This determines if a round is paused
            over: false, // This determines if a round is completed and someone won
            ready: false, // This determines if a round is set-up and the game accepts keys
        },
    }
}

function setPlayers() {
    // First we set up the template for player1.main and player1.choose
    players = {
        player1: {
            main: {
                id: 1,
                name: undefined,
                direction: undefined,
                skill: undefined,
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

    // Now, we clone player1.main and player1.choose into player2.main and player2.choose
    // Of course we make sure that the id and names of each snake are properly determined
    players.player2 = JSON.parse(JSON.stringify(players.player1));
    players.player2.main.id = 2;
    players.player1.main.name = "Tristan";
    players.player2.main.name = "Theolo";

    // Finally, we set-up what I call "alter" profiles, which is primarily used for Apopis' Switch skill
    // FIXME - Find a better way to implement Switch skill
    // players.alter1 = JSON.parse(JSON.stringify(players.player1));
    // players.alter2 = JSON.parse(JSON.stringify(players.player2));
}

function setControls(num) {
    switch (num) {
        case 1:
            players.player1.controls = {
                // Here are the Primary Controls for Player 1
                main: {
                    direction: {
                        up: "w",
                        down: "s",
                        left: "a",
                        right: "d",
                    },
                    skill: {
                        strike: "c",
                        skill1: "v",
                        skill2: "b",
                    },
                    misc: {
                        aux: " ",
                        exit: "t",
                    }
                }
            }
            break;
        case 2:
            players.player2.controls = {
                // Here are the Primary Controls for Player 2
                main: {
                    direction: {
                        up: "i",
                        down: "k",
                        left: "j",
                        right: "l",
                    },
                    skill: {
                        strike: "[",
                        skill1: "]",
                        skill2: "\\",
                        // skill2: "Enter",
                    },
                    misc: {
                        aux: "Enter",
                        exit: "8",
                    }
                }
            }
            break;
    }

    // Now we build the Alternate Controls for the player
    players[`player${num}`].controls.alt = JSON.parse(JSON.stringify(players[`player${num}`].controls.main));

    // Now we define the Alternative Controls for each player
    // For now, these are just the uppercase versions of the main controls
    // for (let i = 1; i <= 2; i++) {
    for (let j in players[`player${num}`].controls.main) {
        for (let k in players[`player${num}`].controls.main[j]) {
            players[`player${num}`].controls.alt[j][k] = players[`player${num}`].controls.main[j][k].toUpperCase();
        }
    }
    // }
}

function setPlayersArena() {
    players.player1.arena = {
        direction: undefined,
        snake: undefined,
        position: [undefined],
        size: 10,
    }
    players.player1.status = {
        alive: false, // This means the snake is alive
        disarmed: false, // This means the snake can't change directions and use skills
        canTurn: false, // This means the snake can turn to a perpendicular direction
        canStrike: true, // This means the snake can use strike
        immobilized: false, // This means the snake can't move but still use skill
        phased: false, // This means the snake can pass through obstacles, snakes and strikes
        portable: false, // This means the snake can use the borders as portals
        unstoppable: false, // This means the snake can plow through obstacles, snakes and strikes
        masochist: false, // This means the snake can pass through itself
        immortal: false,
    }
    players.player1.intervals = {
        run: {
            status: false,
            function: undefined,
            counter: 0,
            speed: 100
        },
        growth: {
            status: false,
            function: undefined,
            counter: 5,
            speed: 1000
        },
        popUp: {
            status: false,
            function: undefined,
            counter: 5,
            speed: 1000
        },
    }

    players.player2.arena = JSON.parse(JSON.stringify(players.player1.arena));
    players.player2.status = JSON.parse(JSON.stringify(players.player1.status));
    players.player2.intervals = JSON.parse(JSON.stringify(players.player1.intervals));

    // TEST ME
    players.player2.status.immortal = true;
    // players.player1.intervals.growth.speed = 100;
    // players.player2.intervals.growth.speed = 100000;
    // player.alter1.arena = JSON.parse(JSON.stringify(player.p1.arena));
    // player.alter2.arena = JSON.parse(JSON.stringify(player.p2.arena));
    // players.alter1.intervals = JSON.parse(JSON.stringify(players.player1.intervals));
    // players.alter2.intervals = JSON.parse(JSON.stringify(players.player2.intervals));
    // players.alter1.status = JSON.parse(JSON.stringify(players.player1.status));
    // players.alter2.status = JSON.parse(JSON.stringify(players.player2.status));
}


function setSkills(num) {
    let activeUser = players[`player${num}`];
    let activeSnake = snakes[activeUser.arena.snake];
    activeUser.skills = {
        strike: {
            name: "strike",
            status: true,
            ready: true,
            required: 3,
            cost: 1,
            strike: {
                status: false,
                function: undefined,
                counter: 0,
                speed: 5
            },
            fetch: {
                status: false,
                function: undefined,
                counter: 0,
                speed: 40
            },
        },
    }

    // Now we establish each skill variables
    for (let i = 1; i <= 2; i++) {
        activeUser.skills[`skill${i}`] = {
            name: activeSnake.skills[`skill${i}`].name,
            status: true,
            ready: true,
            required: activeSnake.skills[`skill${i}`].required,
            cost: activeSnake.skills[`skill${i}`].cost,
            duration: {
                value: activeSnake.skills[`skill${i}`].duration,
                status: false,
                counter: 0,
                function: undefined,
            },
            cooldown: {
                value: activeSnake.skills[`skill${i}`].cooldown,
                status: false,
                counter: 0,
                function: undefined,
            },
        }
    }
}