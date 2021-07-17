function setDetails() {
}

function updateDetails() {
    $(`#game-winner`).html(`game.winner: ${game.winner}`);
    $(`#game-loser`).html(`game.loser: ${game.loser}`);
    $(`#game-paused`).html(`game.paused: ${game.paused}`);
    $(`#game-over`).html(`game.over: ${game.over}`);
    $(`#game-ready`).html(`game.ready: ${game.ready}`);

    $(`#food-food1-position`).html(`food1.position: [${food.food1.position}]`);
    $(`#food-food3-position`).html(`food2.position: [${food.food2.position}]`);
    $(`#food-food2-position`).html(`food3.position: [${food.food3.position}]`);
    $(`#food-super-count`).html(`super.count: ${food.super.count}`);
    $(`#food-super-position`).html(`super.position: [${food.super.position}]`);

    $(`#p1-run-interval-status`).html(`run.status: ${player.p1.intervals.run.status}`);
    $(`#p1-run-interval-count`).html(`run.count: ${player.p1.intervals.run.count}`);
    $(`#p1-arena-disabled`).html(`disabled: ${player.p1.arena.disabled}`);
    $(`#p2-run-interval-status`).html(`run.status: ${player.p2.intervals.run.status}`);
    $(`#p2-run-interval-count`).html(`run.count: ${player.p2.intervals.run.count}`);
    $(`#p2-arena-disabled`).html(`disabled: ${player.p2.arena.disabled}`);

    $(`#p1-useStrike-interval-status`).html(`useStrike.status: ${player.p1.intervals.useStrike.status}`);
    $(`#p1-useStrike-interval-count`).html(`useStrike.count: ${player.p1.intervals.useStrike.count}`);
    $(`#p1-fetchStrike-interval-status`).html(`fetchStrike.status: ${player.p1.intervals.fetchStrike.status}`);
    $(`#p1-fetchStrike-interval-count`).html(`fetchStrike.count: ${player.p1.intervals.fetchStrike.count}`);

    $(`#p2-useStrike-interval-status`).html(`useStrike.status: ${player.p2.intervals.useStrike.status}`);
    $(`#p2-useStrike-interval-count`).html(`useStrike.count: ${player.p2.intervals.useStrike.count}`);
    $(`#p2-fetchStrike-interval-status`).html(`fetchStrike.status: ${player.p2.intervals.fetchStrike.status}`);
    $(`#p2-fetchStrike-interval-count`).html(`fetchStrike.count: ${player.p2.intervals.fetchStrike.count}`);
    
}