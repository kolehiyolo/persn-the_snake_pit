$("html").keypress(function (e) {
    if (gameState === "gameStarted") {
        if ((e.key === "a" || e.key === "w" || e.key === "s" || e.key === "d")) {
            if (p1Direction === "d" && e.key === "a") {

            } else if (p1Direction === "a" && e.key === "d") {

            } else if (p1Direction === "w" && e.key === "s") {

            } else if (p1Direction === "s" && e.key === "w") {

            } else {
                p1Direction = e.key;
            }
        } else if ((e.key === "j" || e.key === "i" || e.key === "k" || e.key === "l")) {
            if (p2Direction === "l" && e.key === "j") {

            } else if (p2Direction === "j" && e.key === "l") {

            } else if (p2Direction === "i" && e.key === "k") {

            } else if (p2Direction === "k" && e.key === "i") {

            } else {
                p2Direction = e.key;
            }
        } else if (e.key === "f" && p1Bullets > 0) {
            sniperTongue("p1");
        } else if (e.key === "p" && p2Bullets > 0) {
            console.log("triggered");
            sniperTongue("p2");
        } else if (e.key === "Enter" && gamePause === true && gameOverState === true) {
            console.log("New Game");
            $("#game-over").addClass("hidden");
            newGame();
            gamePause = false;

        } else if (e.key === "Enter" && gamePause === true) {
            console.log("Game Start");
            p1GameClock = setInterval(p1MoveSnake, 100);
            // p2GameClock = setInterval(p2MoveSnake, 100);
            gamePause = false;
        } else if (e.key === "Enter" && gamePause === false) {
            console.log("Game Pause");
            clearInterval(p1GameClock);
            // clearInterval(p2GameClock);
            gamePause = true;
            // } else if (e.key === " " && gamePause === true) {
            //     console.log("Game Start");
            //     // p1GameClock = setInterval(p1MoveSnake, 100);
            //     p2GameClock = setInterval(p2MoveSnake, 100);
            //     gamePause = false;
            // } else if (e.key === " " && gamePause === false) {
            //     console.log("Game Pause");
            //     // clearInterval(p1GameClock);
            //     clearInterval(p2GameClock);
            //     gamePause = true;
        }
    }
});

function newGame() {
    console.log("activated newGame()");
    $(".dead-snake-body").removeClass("dead-snake-body");
    $(".super-food").removeClass("super-food");
    $(".food").removeClass("food");
    $(".food-2").removeClass("food-2");
    remSnakeClass(p1SnakeBody, "p1-snake-head", "p1-snake-body");
    remSnakeClass(p1SnakeBody, "dead-snake-head", "dead-snake-body");
    remSnakeClass(p2SnakeBody, "p2-snake-head", "p2-snake-body");
    remSnakeClass(p2SnakeBody, "dead-snake-head", "dead-snake-body");
    p1Direction = "d";
    p2Direction = "j";
    p1SnakeBody = [];
    p2SnakeBody = [];
    food = [];
    // p1Score = 0;
    // p2Score = 0;
    gamePause = false;
    gameOverState = false;
    foodCounter = 0;
    superFood = [];

    p1Bullets = 1;
    p2Bullets = 1;

    $("#p1Score").html("Player 1 Score: " + p1Score);
    $("#p2Score").html("Player 2 Score: " + p2Score);

    $("#p1-bullets").html(p1Bullets);
    $("#p2-bullets").html(p2Bullets);

    p1InitSnake(row, col);
    p2InitSnake(row, col);
    addFood(row, col);
    addFood2(row, col);
}

function resumeGame() {
    console.log("activated resumeGame()");
}

function pauseGame() {
    console.log("activated pauseGame()");
}

function gameOver(playerBody, headClassName, bodyClassName, loser) {
    console.log("activated gameOver()");
    // $(".food").removeClass("food");
    gameOverState = true;
    $("#game-over").removeClass("hidden");
    clearInterval(p1GameClock);
    clearInterval(p2GameClock);
    remSnakeClass(playerBody, headClassName, bodyClassName);
    addSnakeClass(playerBody, "dead-snake-head", "dead-snake-body");

    if (loser === "p1") {
        $("#game-verdict").html("<span id='p2-wins'>Player 2</span> Wins!");
        p2Score++;
    } else if (loser === "p2") {
        $("#game-verdict").html("<span id='p1-wins'>Player 1</span> Wins!");
        p1Score++;
    } else {
        $("#game-verdict").html("You both lose");
    }

    $("#p1Score").html("Player 1 Score: " + p1Score);
    $("#p2Score").html("Player 2 Score: " + p2Score);
}



function addPoints(playerBody, playerScore, food) {
    console.log("activated addPoints()");
    if (food === "food") {
        $(".food").removeClass("food");
        playerBody[playerBody.length] = [];
        playerBody[playerBody.length] = [];
        playerBody[playerBody.length] = [];
        addFood(row, col);
        foodCounter++;


        if (foodCounter === 5) {
            addSuperFood(row, col);
        }
        if (playerBody === p1SnakeBody) {
            p1Bullets = p1Bullets + 1;
            $("#p1-bullets").html(p1Bullets);
        } else {
            p2Bullets = p2Bullets + 1;
            $("#p2-bullets").html(p2Bullets);
        }
    } else if (food === "food-2") {
        $(".food-2").removeClass("food-2");
        playerBody[playerBody.length] = [];
        playerBody[playerBody.length] = [];
        playerBody[playerBody.length] = [];
        playerScore++;
        addFood2(row, col);
        foodCounter++;
        if (foodCounter === 5) {
            addSuperFood(row, col);
        }
        if (playerBody === p1SnakeBody) {
            p1Bullets = p1Bullets + 1;
            $("#p1-bullets").html(p1Bullets);
        } else {
            p2Bullets = p2Bullets + 1;
            $("#p2-bullets").html(p2Bullets);
        }
    } else if (food === "super-food") {
        $(".super-food").removeClass("super-food");
        foodCounter = 0;
        playerBody[playerBody.length] = [];
        playerBody[playerBody.length] = [];
        playerBody[playerBody.length] = [];
        playerBody[playerBody.length] = [];
        playerBody[playerBody.length] = [];

        if (playerBody === p1SnakeBody) {
            p1Bullets = p1Bullets + 5;
            $("#p1-bullets").html(p1Bullets);
        } else {
            p2Bullets = p2Bullets + 5;
            $("#p2-bullets").html(p2Bullets);
        }
    }
}