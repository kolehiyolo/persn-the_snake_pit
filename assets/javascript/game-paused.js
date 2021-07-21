function setArenaMenu() {
    $(`body main`).append(`<div id="arena-menu" class="hidden anim-200"></div>`);
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

    setMenuControls();
    setMenuSettings();
}

function setMenuSettings() {}

function setMenuControls() {
    $(`#arena-menu`).append(`<div id="arena-menu-controls" class="hidden anim-200"></div>`);
    $(`#arena-menu-controls`).append(`<div id="amc-player1" class="anim-200 amc-player"></div>`);
    $(`#arena-menu-controls`).append(`<div id="amc-player2" class="anim-200 amc-player"></div>`);
    $(`#amc-player1`).append(`<div id="amc-player1-label" class="anim-200 amc-player-label"></div>`);
    $(`#amc-player2`).append(`<div id="amc-player2-label" class="anim-200 amc-player-label"></div>`);
    $(`#amc-player1-label`).append(`<p>${players.player1.main.name}</p>`);
    $(`#amc-player2-label`).append(`<p>${players.player2.main.name}</p>`);

    let directions = [`up`, `down`, `left`, `right`];
    let skills = [`strike`, `skill1`, `skill2`];
    let misc = [`aux`, `exit`];

    for (let i = 1; i <= 2; i++) {
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
let amControlsCategories = [`direction`, `skill`, `misc`];
let amControlsItems = [`up`, `down`, `left`, `right`, `strike`, `skill1`, `skill2`, `aux`, `exit`];

function navMainMenu() {
    $(`.arena-main-active`).removeClass(`arena-main-active`);
    $(`#button-${menu.main.position}`).addClass(`arena-main-active`);
}

function returnToMainMenu() {
    menu.state = `main`;
    $(`#arena-menu-controls`).addClass(`hidden`);
    $(`#arena-menu-controls`).removeClass(`show`);

    $(`#arena-menu-settings`).addClass(`hidden`);
    $(`#arena-menu-settings`).removeClass(`show`);

    $(`#arena-menu-main`).addClass(`show`);
    $(`#arena-menu-main`).removeClass(`hidden`);
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
                    }
                    if (menu.main.position === `settings`) {
                        menu.state = `settings`;
                        showMenuSettings();
                    }
                    if (menu.main.position === `controls`) {
                        menu.state = `controls`;
                        showMenuControls();
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
                    if (controlWait === false) {
                        waitForControl(num);
                    } 
                    // console.log(`Pressing Enter in Controls`);
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
            // console.log(`menu.main.position = ${menu.main.position}`);
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
            // amControlsItems = [`up`, `down`, `left`, `right`, `strike`, `skill1`, `skill2`, `aux`, `exit`];
            menu.controls[`player${num}`].item = `${amControlsItems[menu.controls[`player${num}`].count]}`;
            menu.controls[`player${num}`].category = (menu.controls[`player${num}`].count <= 3) ? `direction` :
                (menu.controls[`player${num}`].count <= 6) ? `skill` : `misc`;
            navMenuControls(num);
            // console.log(`menu.main.position = ${menu.main.position}`);
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

    $(`#amc-player1 .amc-category-active`).removeClass(`amc-category-active`);
    $(`#amc-player1 .amc-category-label-active`).removeClass(`amc-category-label-active`);
    $(`#amc-player1 .amc-item-active`).removeClass(`amc-item-active`);

    $(`#amc-player2 .amc-category-active`).removeClass(`amc-category-active`);
    $(`#amc-player2 .amc-category-label-active`).removeClass(`amc-category-label-active`);
    $(`#amc-player2 .amc-item-active`).removeClass(`amc-item-active`);

    $(`#arena-menu-controls`).addClass(`show`);
    $(`#arena-menu-controls`).addClass(`hidden`);
    menu.controls.player1.count = 0;
    menu.controls.player1.category = `direction`;
    menu.controls.player1.item = `up`;
    menu.controls.player2.count = 0;
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
    controlWait = false;
    $(`#amc-player${num} .amc-category-active`).removeClass(`amc-category-active`);
    $(`#amc-player${num} .amc-category-label-active`).removeClass(`amc-category-label-active`);
    $(`#amc-player${num} .amc-item-active`).removeClass(`amc-item-active`);

    $(`#amcp${num}-${menu.controls[`player${num}`].category}`).addClass(`amc-category-active`);
    $(`#amcp${num}-${menu.controls[`player${num}`].category}-label`).addClass(`amc-category-label-active`);

    let catFirst = String(menu.controls[`player${num}`].category)[0];
    $(`#amcp${num}${catFirst}-${menu.controls[`player${num}`].item}-label`).addClass(`amc-item-active`);
    $(`#amcp${num}${catFirst}-${menu.controls[`player${num}`].item}-value`).addClass(`amc-item-active`);
}

function waitForControl(num) {
    controlWait = true;
    console.log(`Press anything for a new control`);
    let catFirst = String(menu.controls[`player${num}`].category)[0];
    $(`#amcp${num}${catFirst}-${menu.controls[`player${num}`].item}-value`).html(`<p style="font-style:italic;">Press Key</p>`);
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
    FindMatchingControls: {
        for (let i in players) {
            for (let j in players[i].controls) {
                for (let k in players[i].controls[j]) {
                    for (let l in players[i].controls[j][k]) {
                        if (key.id === players[i].controls[j][k][l]) {
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

let controlWait = false;

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
}

// menu.state = `main`;
// menu.state = `settings`;
// menu.state = `controls`;