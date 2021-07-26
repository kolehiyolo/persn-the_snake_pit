function setArenaMenu() {
    $(`body main`).append(`<div id="arena-menu" class="hidden anim-200 game-arena-element"></div>`);
    let arenaWidth = $(`#game-arena-grid`).outerWidth();
    let arenaHeight = $(`#game-arena-grid`).outerWidth();
    let arenaMenuStyling = `min-width:${arenaWidth}px; min-height:${arenaHeight}px;`;
    $(`#arena-menu`).attr(`style`, `${arenaMenuStyling}`);

    $(`#arena-menu`).append(`<div id="arena-menu-main" class="anim-200"></div>`);
    $(`#arena-menu-main`).append(`<div id="button-resume" class="arena-main-buttons"></div>`);
    $(`#arena-menu-main`).append(`<div id="button-settings" class="arena-main-buttons"></div>`);
    $(`#arena-menu-main`).append(`<div id="button-controls" class="arena-main-buttons"></div>`);
    $(`#arena-menu-main`).append(`<div id="button-exit" class="arena-main-buttons"></div>`);

    $(`#button-resume`).append(`<p>Resume</p>`);
    $(`#button-settings`).append(`<p>Settings</p>`);
    $(`#button-controls`).append(`<p>Controls</p>`);
    $(`#button-exit`).append(`<p>Exit</p>`);

    $(`.arena-main-buttons`).addClass(`anim-200`);

    setTimeout(() => {
        $(`#arena-menu`).addClass(`show`);
        $(`#arena-menu`).removeClass(`hidden`);
    }, 1);

    setTimeout(() => {
        $(`#button-resume`).addClass(`arena-main-active`);
        menu.state = `main`;
        menu.main.count = 0;
        menu.main.position = `resume`;
    }, 200);

    setMenuSettings();
    setMenuControls();
    setMenuExit();
}

function setMenuSettings() {
    $(`#arena-menu`).append(`<div id="arena-menu-settings" class="hidden anim-200"></div>`);
    $(`#arena-menu-settings`).append(`<h1>I haven't built this yet</h1>`);
    $(`#arena-menu-settings`).append(`<h2>I don't even know what I would put here lol</h2>`);
}

function setMenuExit() {
    $(`#arena-menu`).append(`<div id="arena-menu-exit" class="hidden anim-200"></div>`);
    $(`#arena-menu-exit`).append(`<div id="ame-label" class="anim-200"></div>`);
    $(`#ame-label`).html(`<p>Are you sure you want to exit?</p>`);

    $(`#arena-menu-exit`).append(`<div id="ame-options" class="anim-200"></div>`);
    $(`#ame-options`).append(`<div id="ameo-yes" class="anim-200 ame-option"></div>`);
    $(`#ame-options`).append(`<div id="ameo-no" class="anim-200 ame-option"></div>`);
    $(`#ameo-yes`).html(`<p>Yes</p>`);
    $(`#ameo-no`).html(`<p>No</p>`);

    $(`#ameo-no`).addClass(`ame-option-active`);
    menu.exit.item = `no`;
}

function setMenuControls() {
    $(`#arena-menu`).append(`<div id="arena-menu-controls" class="hidden anim-200"></div>`);
    $(`#arena-menu-controls`).append(`<div id="amc-player1" class="anim-200 amc-player"></div>`);
    $(`#arena-menu-controls`).append(`<div id="amc-player2" class="anim-200 amc-player"></div>`);

    let directions = [`up`, `down`, `left`, `right`];
    let skills = [`strike`, `skill1`, `skill2`];
    let misc = [`aux`, `exit`];

    for (let i = 1; i <= 2; i++) {
        // Header
        $(`#amc-player${i}`).append(`<div id="amc-player${i}-header" class="anim-200 amc-player-header"></div>`);
        $(`#amc-player${i}-header`).append(`<div id="amc-player${i}-label" class="anim-200 amc-player-label"></div>`);
        $(`#amc-player${i}-header`).append(`<div id="amcp${i}-reset" class="anim-200 amc-reset"></div>`);
        $(`#amc-player${i}-label`).append(`<p>${players[`player${i}`].main.name}</p>`);
        $(`#amcp${i}-reset`).append(`<p>Reset</p>`);

        // Direction
        $(`#amc-player${i}`).append(`<div id="amcp${i}-direction" class="anim-200 amc-category"></div>`);
        $(`#amcp${i}-direction`).append(`<div id="amcp${i}-direction-label" class="anim-200 amc-category-label"></div>`);
        $(`#amcp${i}-direction-label`).append(`<p>Direction</p>`);
        directions.forEach(j => {
            $(`#amcp${i}-direction`).append(`<div id="amcp${i}d-${j}" class="anim-200 amc-item"></div>`);
            $(`#amcp${i}d-${j}`).append(`<div id="amcp${i}d-${j}-label" class="anim-200 amc-label"></div>`);
            $(`#amcp${i}d-${j}`).append(`<div id="amcp${i}d-${j}-value" class="anim-200 amc-value"></div>`);
            $(`#amcp${i}d-${j}-label`).append(`<p>${j}</p>`);
            $(`#amcp${i}d-${j}-value`).append(`<p>'${players[`player${i}`].controls.main.direction[j]}'</p>`);
        });

        // Skill
        $(`#amc-player${i}`).append(`<div id="amcp${i}-skill" class="anim-200 amc-category"></div>`);
        $(`#amcp${i}-skill`).append(`<div id="amcp${i}-skill-label" class="anim-200 amc-category-label"></div>`);
        $(`#amcp${i}-skill-label`).append(`<p>Skill</p>`);
        skills.forEach(j => {
            $(`#amcp${i}-skill`).append(`<div id="amcp${i}s-${j}" class="anim-200 amc-item"></div>`);
            $(`#amcp${i}s-${j}`).append(`<div id="amcp${i}s-${j}-label" class="anim-200 amc-label"></div>`);
            $(`#amcp${i}s-${j}`).append(`<div id="amcp${i}s-${j}-value" class="anim-200 amc-value"></div>`);
            $(`#amcp${i}s-${j}-value`).append(`<p>'${players[`player${i}`].controls.main.skill[j]}'</p>`);
        });
        $(`#amcp${i}s-strike-label`).append(`<p>Strike</p>`);
        $(`#amcp${i}s-skill1-label`).append(`<p>Skill 1</p>`);
        $(`#amcp${i}s-skill2-label`).append(`<p>Skill 2</p>`);

        // Misc
        $(`#amc-player${i}`).append(`<div id="amcp${i}-misc" class="anim-200 amc-category"></div>`);
        $(`#amcp${i}-misc`).append(`<div id="amcp${i}-misc-label" class="anim-200 amc-category-label"></div>`);
        $(`#amcp${i}-misc-label`).append(`<p>Miscellaneous</p>`);
        misc.forEach(j => {
            $(`#amcp${i}-misc`).append(`<div id="amcp${i}m-${j}" class="anim-200 amc-item"></div>`);
            $(`#amcp${i}m-${j}`).append(`<div id="amcp${i}m-${j}-label" class="anim-200 amc-label"></div>`);
            $(`#amcp${i}m-${j}`).append(`<div id="amcp${i}m-${j}-value" class="anim-200 amc-value"></div>`);
            $(`#amcp${i}m-${j}-label`).append(`<p>${j}</p>`);
            $(`#amcp${i}m-${j}-value`).append(`<p>'${players[`player${i}`].controls.main.misc[j]}'</p>`);
        });
    }
}

function remArenaMenu() {
    $(`#arena-menu`).addClass(`hidden`);
    $(`#arena-menu`).removeClass(`show`);

    setTimeout(() => {
        $(`#arena-menu`).remove();
    }, 300);
}

let amMainOptions = [`resume`, `settings`, `controls`, `exit`];
let amControlsCategories = [`reset`, `direction`, `skill`, `misc`];
let amControlsItems = [`reset`, `up`, `down`, `left`, `right`, `strike`, `skill1`, `skill2`, `aux`, `exit`];

function navMainMenu() {
    $(`.arena-main-active`).removeClass(`arena-main-active`);
    $(`#button-${menu.main.position}`).addClass(`arena-main-active`);
}

function returnToMainMenu() {
    console.log(`controlsChanged = ${controlsChanged}`);
    if (controlsChanged === true) {
        updateControlsUI();
    }
    menu.state = `main`;
    $(`#arena-menu-controls`).addClass(`hidden`);
    $(`#arena-menu-controls`).removeClass(`show`);

    $(`#arena-menu-settings`).addClass(`hidden`);
    $(`#arena-menu-settings`).removeClass(`show`);

    $(`#arena-menu-exit`).addClass(`hidden`);
    $(`#arena-menu-exit`).removeClass(`show`);

    $(`#arena-menu-main`).addClass(`show`);
    $(`#arena-menu-main`).removeClass(`hidden`);
}

function updateControlsUI() {
    for (let i = 1; i <= 2; i++) {
        $(`#player${i}-ui-strike-key`).html(`<p>${players[`player${i}`].controls.main.skill.strike}</p>`);
        $(`#player${i}-ui-skill1-key`).html(`<p>${players[`player${i}`].controls.main.skill.skill1}</p>`);
        $(`#player${i}-ui-skill2-key`).html(`<p>${players[`player${i}`].controls.main.skill.skill2}</p>`);
    }
}

function gamePaused() {
    let num = parseInt(active.id);
    let activeUser = players[`player${num}`];

    if (key.type === `misc`) {
        if (menu.state === `main`) {
            switch (activeUser.main.misc) {
                case `aux`:
                    if (menu.main.position === `resume`) {
                        resumeGame();
                    } else if (menu.main.position === `settings`) {
                        menu.state = `settings`;
                        showMenuSettings();
                    } else if (menu.main.position === `controls`) {
                        menu.state = `controls`;
                        showMenuControls();
                    } else if (menu.main.position === `exit`) {
                        menu.state = `exit`;
                        showMenuExit();
                    }
                    break;
                case `exit`:
                    resumeGame();
                    break;
            }
        } else if (menu.state === `settings`) {
            switch (activeUser.main.misc) {
                case `aux`:
                    console.log(`Pressing Enter in Settings`);
                    break;
                case `exit`:
                    returnToMainMenu();
                    break;
            }
        } else if (menu.state === `controls`) {
            switch (activeUser.main.misc) {
                case `aux`:
                    if (menu.controls[`player${num}`].category === `reset`) {
                        resetControls(num);
                    } else if (controlWait === false) {
                        waitForControl(num);
                    }
                    break;
                case `exit`:
                    returnToMainMenu();
                    break;
            }
        } else if (menu.state === `exit`) {
            switch (activeUser.main.misc) {
                case `aux`:
                    if (menu.exit.item === `yes`) {
                        console.log(`Exit to gameChoose()`);
                        exitToChoose();
                    } else {
                        returnToMainMenu();
                    }
                    break;
                case `exit`:
                    returnToMainMenu();
                    break;
            }
        }
    } else if (key.type === `direction`) {
        if (menu.state === `main`) {
            switch (activeUser.main.direction) {
                case `up`:
                    if (menu.main.count > 0) {
                        menu.main.count--;
                    }
                    break;
                case `down`:
                    if (menu.main.count < amMainOptions.length - 1) {
                        menu.main.count++;
                    }
                    break;
            }
            menu.main.position = `${amMainOptions[menu.main.count]}`;
            navMainMenu();
        } else if (menu.state === `controls`) {
            switch (activeUser.main.direction) {
                case `up`:
                    if (menu.controls[`player${num}`].count > 0) {
                        menu.controls[`player${num}`].count--;
                    }
                    break;
                case `down`:
                    if (menu.controls[`player${num}`].count < amControlsItems.length - 1) {
                        menu.controls[`player${num}`].count++;
                    }
                    break;
            }
            menu.controls[`player${num}`].item = `${amControlsItems[menu.controls[`player${num}`].count]}`;
            menu.controls[`player${num}`].category =
                (menu.controls[`player${num}`].count === 0) ? `reset` :
                (menu.controls[`player${num}`].count <= 4) ? `direction` :
                (menu.controls[`player${num}`].count <= 7) ? `skill` : `misc`
            navMenuControls(num);
        } else if (menu.state === `exit`) {
            switch (activeUser.main.direction) {
                case `up`:
                    if (menu.exit.item === `no`) {
                        menu.exit.item = `yes`;
                        navMenuExit();
                    }
                    break;
                case `down`:
                    if (menu.exit.item === `yes`) {
                        menu.exit.item = `no`;
                        navMenuExit();
                    }
                    break;
            }

        }
    } else if (key.type === `skill`) {
        console.log(`No effect!`);
    }
}

function showMenuSettings() {
    $(`#arena-menu-main`).addClass(`hidden`);
    $(`#arena-menu-main`).removeClass(`show`);

    $(`#arena-menu-settings`).addClass(`show`);
    $(`#arena-menu-settings`).addClass(`hidden`);
}

function showMenuControls() {
    $(`#arena-menu-main`).addClass(`hidden`);
    $(`#arena-menu-main`).removeClass(`show`);

    $(`#arena-menu-controls`).addClass(`show`);
    $(`#arena-menu-controls`).addClass(`hidden`);

    $(`#amc-player1 .amc-category-active`).removeClass(`amc-category-active`);
    $(`#amc-player1 .amc-category-label-active`).removeClass(`amc-category-label-active`);
    $(`#amc-player1 .amc-item-active`).removeClass(`amc-item-active`);

    $(`#amc-player2 .amc-category-active`).removeClass(`amc-category-active`);
    $(`#amc-player2 .amc-category-label-active`).removeClass(`amc-category-label-active`);
    $(`#amc-player2 .amc-item-active`).removeClass(`amc-item-active`);

    menu.controls.player1.count = 1;
    menu.controls.player1.category = `direction`;
    menu.controls.player1.item = `up`;
    menu.controls.player2.count = 1;
    menu.controls.player2.category = `direction`;
    menu.controls.player2.item = `up`;

    $(`#amcp1-direction`).addClass(`amc-category-active`);
    $(`#amcp1-direction-label`).addClass(`amc-category-label-active`);
    $(`#amcp1d-up-label`).addClass(`amc-item-active`);
    $(`#amcp1d-up-value`).addClass(`amc-item-active`);

    $(`#amcp2-direction`).addClass(`amc-category-active`);
    $(`#amcp2-direction-label`).addClass(`amc-category-label-active`);
    $(`#amcp2d-up-label`).addClass(`amc-item-active`);
    $(`#amcp2d-up-value`).addClass(`amc-item-active`);
}

function navMenuControls(num) {
    // controlWait = false;
    $(`#amcp${num}-reset`).removeClass(`amc-reset-active`);
    $(`#amc-player${num} .amc-category-active`).removeClass(`amc-category-active`);
    $(`#amc-player${num} .amc-category-label-active`).removeClass(`amc-category-label-active`);
    $(`#amc-player${num} .amc-item-active`).removeClass(`amc-item-active`);

    if (menu.controls[`player${num}`].category === `reset`) {
        $(`#amcp${num}-reset`).addClass(`amc-reset-active`);
        return
    }

    $(`#amcp${num}-${menu.controls[`player${num}`].category}-label`).addClass(`amc-category-label-active`);
    $(`#amcp${num}-${menu.controls[`player${num}`].category}`).addClass(`amc-category-active`);

    let catFirst = String(menu.controls[`player${num}`].category)[0];
    $(`#amcp${num}${catFirst}-${menu.controls[`player${num}`].item}-label`).addClass(`amc-item-active`);
    $(`#amcp${num}${catFirst}-${menu.controls[`player${num}`].item}-value`).addClass(`amc-item-active`);

    // console.log(`menu.controls.player${num}.category = ${menu.controls[`player${num}`].category}`);
    // console.log(`menu.controls.player${num}.item = ${menu.controls[`player${num}`].item}`);
}

function waitForControl(num) {
    controlWait = true;
    console.log(`Press anything for a new control`);
    let catFirst = String(menu.controls[`player${num}`].category)[0];
    $(`#amcp${num}${catFirst}-${menu.controls[`player${num}`].item}-value`).html(`<p style="font-style:italic;">Press Key</p>`);
}

function resetControls(num) {
    controlsChanged = true;
    // console.log(`Reset the Controls for Player ${num}`);
    setControls(num);
    amControlsCategories = [`reset`, `direction`, `skill`, `misc`];
    amControlsItems = [`reset`, `up`, `down`, `left`, `right`, `strike`, `skill1`, `skill2`, `aux`, `exit`];

    let directions = [`up`, `down`, `left`, `right`];
    let skills = [`strike`, `skill1`, `skill2`];
    let misc = [`aux`, `exit`];

    directions.forEach(j => {
        $(`#amcp${num}d-${j}-value`).html(`<p>'${players[`player${num}`].controls.main.direction[j]}'</p>`);
    });
    skills.forEach(j => {
        $(`#amcp${num}s-${j}-value`).html(`<p>'${players[`player${num}`].controls.main.skill[j]}'</p>`);
    });
    misc.forEach(j => {
        $(`#amcp${num}m-${j}-value`).html(`<p>'${players[`player${num}`].controls.main.misc[j]}'</p>`);
    });
}

function setNewControl(num) {
    controlWait = false;
    console.log(`New control set with ${key.id}`);
    let contCategory = String(menu.controls[`player${num}`].category);
    let contItem = String(menu.controls[`player${num}`].item);
    let catFirst = String(menu.controls[`player${num}`].category)[0];
    players[`player${num}`].controls.main[contCategory][contItem] = String(key.id);
    players[`player${num}`].controls.alt[contCategory][contItem] = String(key.id).toUpperCase();

    $(`#amcp${num}${catFirst}-${contItem}-value`).html(`<p>'${players[`player${num}`].controls.main[contCategory][contItem]}'</p>`);


}

function checkNewControl(num) {
    let unique = true;
    controlsChanged = true;
    FindMatchingControls: {
        for (let i in players) {
            for (let j in players[i].controls) {
                for (let k in players[i].controls[j]) {
                    for (let l in players[i].controls[j][k]) {
                        if (key.id === players[i].controls[j][k][l]) {
                            let contCategory = String(menu.controls[`player${num}`].category);
                            let contItem = String(menu.controls[`player${num}`].item);
                            controlsChanged = false;
                            if (key.id === players[`player${num}`].controls.main[contCategory][contItem]) {
                                console.log(`Same controls`);
                                break FindMatchingControls;
                            }
                            unique = false;
                            let catFirst = String(menu.controls[`player${num}`].category)[0];
                            $(`#amcp${num}${catFirst}-${menu.controls[`player${num}`].item}-value`).html(`<p style="font-style:italic;">Already Used</p>`);
                            setTimeout(() => {
                                $(`#amcp${num}${catFirst}-${menu.controls[`player${num}`].item}-value`).html(`<p style="font-style:italic;">Press Key</p>`);
                            }, 500);
                            break FindMatchingControls;
                        }
                    }
                }
            }
        }
    }
    if (unique === true) {
        setNewControl(num);
    }
}

function showMenuExit() {
    $(`#arena-menu-main`).addClass(`hidden`);
    $(`#arena-menu-main`).removeClass(`show`);

    $(`#arena-menu-exit`).addClass(`show`);
    $(`#arena-menu-exit`).removeClass(`hidden`);

    $(`.ame-option-active`).removeClass(`ame-option-active`);
    $(`#ameo-no`).addClass(`ame-option-active`);
    menu.exit.item = `no`;
}

function navMenuExit() {
    $(`.ame-option-active`).removeClass(`ame-option-active`);
    $(`#ameo-${menu.exit.item}`).addClass(`ame-option-active`);
}

function exitToChoose() {
    console.log(`exitToChoose()`);
    $(`.game-arena-element`).addClass(`anim-1000`);
    setTimeout(() => {
        $(`.game-arena-element`).removeClass(`show`);
        $(`.game-arena-element`).addClass(`hidden`);
    }, 1);

    clearAllIntervals();
    setTimeout(() => {
        $(`.game-arena-element`).remove();
        // console.log(`Delete .game-arena-element`); 
        setGameState(`choose`);
    }, 1000);
}

let controlWait = false;
let controlsChanged = false;

let menu = {
    state: undefined,
    main: {
        count: 0,
        position: undefined,
    },
    settings: {
        count: 0,
        category: undefined,
        item: undefined,
    },
    controls: {
        player1: {
            count: 0,
            category: undefined,
            item: undefined,
        },
        player2: {
            count: 0,
            category: undefined,
            item: undefined,
        },
    },
    exit: {
        item: undefined,
    }
}

// menu.state = `main`;
// menu.state = `settings`;
// menu.state = `controls`;