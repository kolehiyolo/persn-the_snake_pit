var noP1Clicks = true;
var noP2Clicks = true;

var p1GridPosition = [];
var p2GridPosition = [];

var p1SelectedSnake;
var p2SelectedSnake;

var p1Ready = false;
var p2Ready = false;

var gameStartCountdownActive = false;
var gameStartCountdownTimer;

function gameChoose(key) {
    var selectSnakeGrid = [
        ["apopis", "orochi", "quetzalcoatl"],
        ["long", "jormungandr", "ouroboros"]
    ];
    // If a player hasn't clicked yet, any click will lead them to either Apopis or Quetzalcoatl
    if (noP1Clicks === true && player1.direction != undefined) {
        noP1Clicks = false;
        $("#select-apopis").addClass("p1-select snake-select-div-hover select-apopis-hover");
        p1SelectedSnake = "apopis";
        $("#select-" + p1SelectedSnake).append("<div id='p1-select-icon'>P1</div>");
        p1GridPosition[0] = 0;
        p1GridPosition[1] = 0;
    } else if (noP2Clicks === true && player2.direction != undefined) {
        noP2Clicks = false;
        $("#select-quetzalcoatl").addClass("p2-select snake-select-div-hover select-quetzalcoatl-hover");
        p2SelectedSnake = "quetzalcoatl";
        $("#select-" + p2SelectedSnake).append("<div id='p2-select-icon'>P2</div>");
        p2GridPosition[0] = 0;
        p2GridPosition[1] = 2;
    }
    // Otherwise, we proceed with the navigation of the Selection grid
    else if (keyType === "direction") {
        switch (activePlayer.playerNumber) {
            case 1:
                switch (player1.direction ) {
                    case "up":
                        if (p1GridPosition[0] > 0) {
                            p1GridPosition[0]--;
                        }
                        break;
                    case "down":
                        if (p1GridPosition[0] < 1) {
                            p1GridPosition[0]++;
                        }
                        break;
                    case "left":
                        if (p1GridPosition[1] > 0) {
                            p1GridPosition[1]--;
                        }
                        break;
                    case "right":
                        if (p1GridPosition[1] < 2) {
                            p1GridPosition[1]++;
                        }
                        break;
                }
                if ($(".p1-select").hasClass("p2-select") === false) {
                    $(".p1-select").removeClass("p1-select snake-select-div-hover select-" + p1SelectedSnake + "-hover");
                } else {
                    $(".p1-select").removeClass("p1-select");
                }
                p1SelectedSnake = selectSnakeGrid[p1GridPosition[0]][p1GridPosition[1]];
                $("#select-" + p1SelectedSnake).addClass("p1-select snake-select-div-hover select-" + p1SelectedSnake + "-hover");
                $("#p1-select-icon").remove();
                $("#select-" + p1SelectedSnake).append("<div id='p1-select-icon'>P1</div>");

                console.log("Player 1 is at " + p1SelectedSnake);
                break;
            case 2:
                switch (player2.direction) {
                    case "up":
                        if (p2GridPosition[0] > 0) {
                            p2GridPosition[0]--;
                        }
                        break;
                    case "down":
                        if (p2GridPosition[0] < 1) {
                            p2GridPosition[0]++;
                        }
                        break;
                    case "left":
                        if (p2GridPosition[1] > 0) {
                            p2GridPosition[1]--;
                        }
                        break;
                    case "right":
                        if (p2GridPosition[1] < 2) {
                            p2GridPosition[1]++;
                        }
                        break;
                }
                if ($(".p2-select").hasClass("p1-select") === false) {
                    $(".p2-select").removeClass("p2-select snake-select-div-hover select-" + p2SelectedSnake + "-hover");
                } else {
                    $(".p2-select").removeClass("p2-select");
                }
                p2SelectedSnake = selectSnakeGrid[p2GridPosition[0]][p2GridPosition[1]];
                $("#select-" + p2SelectedSnake).addClass("p2-select snake-select-div-hover select-" + p2SelectedSnake + "-hover");
                $("#p2-select-icon").remove();
                $("#select-" + p2SelectedSnake).append("<div id='p2-select-icon'>P2</div>");
                console.log("Player2 is at " + p2SelectedSnake);
                break;
        }


    } else if (
        keyType === "misc" &&
        (key === p1Controls.aux || key === p1Controls.auxAlt ||
            key === p2Controls.aux || key === p2Controls.auxAlt) &&
        (p1SelectedSnake != undefined || p2SelectedSnake != undefined)
    ) {
        console.log("Aux activated by " + key);
        switch (activePlayer.playerNumber) {
            case 1:
                if ($("#p1-ready").hasClass("skills-" + p1SelectedSnake)) {
                    p1Ready = true;
                    console.log("Player 1 is ready");
                    $("#p1-ready").html("Player 1 is ready");
                } else {
                    p1Ready = false;
                    console.log("Player 1 has selected " + p1SelectedSnake);
                    $("#p1-ready").removeClass();
                    $("#p1-ready").addClass("player-ready-btn");
                    $("#p1-ready").addClass("select-" + p1SelectedSnake + "-hover skills-" + p1SelectedSnake);
                    $("#p1-ready").html("Player 1 chooses " + p1SelectedSnake);
                }
                break;
            case 2:
                if ($("#p2-ready").hasClass("skills-" + p2SelectedSnake)) {
                    p2Ready = true;
                    console.log("Player 2 is ready");
                    $("#p2-ready").html("Player 2 is ready");
                } else {
                    p2Ready = false;
                    console.log("Player 2 has selected " + p2SelectedSnake);
                    $("#p2-ready").removeClass();
                    $("#p2-ready").addClass("player-ready-btn");
                    $("#p2-ready").addClass("select-" + p2SelectedSnake + "-hover skills-" + p2SelectedSnake);
                    $("#p2-ready").html("Player 2 chooses " + p2SelectedSnake);
                }
                break;
        }


        if (p1Ready === true && p2Ready === true) {
            console.log("Both player are ready");
            gameStartCountdown();
        }
    } else if (gameStartCountdownActive === true && (key === p1Controls.exit || key === p1Controls.exitAlt)) {
        console.log("Countdown Stopped");
        gameStartCountdownActive = false;
        p1Ready = false;
        p2Ready = false;
        clearInterval(gameStartCountdownTimer);

        $("#countdown-msg").html("Countdown Stopped");

        setTimeout(function () {
            $("#p1-ready").removeClass();
            $("#p1-ready").addClass("player-ready-btn");
            // $("#p1-ready").addClass("select-" + p1SelectedSnake + "-hover skills-" + p1SelectedSnake);
            $("#p1-ready").html("Player 1 is Not Ready");
            $("#p2-ready").removeClass();
            $("#p2-ready").addClass("player-ready-btn");
            // $("#p2-ready").addClass("select-" + p2SelectedSnake + "-hover skills-" + p2SelectedSnake);
            $("#p2-ready").html("Player 2 is Not Ready");
    
            $("#countdown-div").removeClass("show");
            $("#countdown-div").addClass("hidden");
        }, 500);

    }

}

function gameStartCountdown() {
    console.log("gameStartCountdown() activated");
    gameStartCountdownActive = true;
    var countdown = 3;
    $("#countdown-div").removeClass("hidden");
    $("#countdown-div").addClass("show");

    $("#countdown-msg").html("Game Starts in");
    $("#countdown-number").html(countdown);
    countdown--;
    gameStartCountdownTimer = setInterval(function () {
        if (countdown < 0) {
            clearInterval(gameStartCountdownTimer);
            $("#snake-selection-div").removeClass("show");
            $("#snake-selection-div").addClass("hidden");

            $("#countdown-div").removeClass("show");
            $("#countdown-div").addClass("hidden");

            $("header h1").removeClass("show");
            $("header h1").addClass("hidden");
            $("header h2").removeClass("show");
            $("header h2").addClass("hidden");

            setGameState("gameStarted");
            setTimeout(function () {
                $("#game-board").removeClass("hidden");
                $("#game-board").addClass("show");

                $("header h1").html("Snek Fight");
                $("header h1").removeClass("hidden");
                $("header h1").addClass("show");
            }, 500);
        } else {
            $("#countdown-number").html(countdown);
            countdown--;
        }
    }, 1000);
}