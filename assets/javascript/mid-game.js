function moveSnake() {
    p1GameClock = setInterval(p1MoveSnake, 100);
    p2GameClock = setInterval(p2MoveSnake, 100);
}

function changeDirection(player) {
    // console.log( "activated changeDirection()" ) ;
    if (player === "p1") {
        switch (p1Direction) {
            case 'a':
                --p1SnakeBody[0][1];
                break;
            case 'd':
                ++p1SnakeBody[0][1];
                break;
            case 'w':
                --p1SnakeBody[0][0];
                break;
            case 's':
                ++p1SnakeBody[0][0];
                break;
        }
    } else {
        switch (p2Direction) {
            case 'j':
                --p2SnakeBody[0][1];
                break;
            case 'l':
                ++p2SnakeBody[0][1];
                break;
            case 'i':
                --p2SnakeBody[0][0];
                break;
            case 'k':
                ++p2SnakeBody[0][0];
                break;
        }
    }
}

function checkSnakeHead(player, enemy, playerBody, headClassName, bodyClassName, playerScore) {
    // console.log( "activated checkSnakeHead()" ) ;
    // If the head contacts with a food, the addPoints() function is triggered
    if ($("." + headClassName).hasClass("food") === true) {
        addPoints(playerBody, playerScore, "food");
    }
    if ($("." + headClassName).hasClass("food-2") === true) {
        addPoints(playerBody, playerScore, "food-2");
    }
    if ($("." + headClassName).hasClass("super-food") === true) {
        addPoints(playerBody, playerScore, "super-food");
    }
    // If the head contacts with the snake's own body part, it's a game-over
    if ($("." + headClassName).hasClass(bodyClassName) === true) {
        gameOver(playerBody, headClassName, bodyClassName, player);
    }
    // If the head contacts with the enemy's body part, it's a game-over
    if ($("." + headClassName).hasClass(enemy + "-snake-body") === true) {
        gameOver(playerBody, headClassName, bodyClassName, player);
    }
    // If the head contacts with the enemy's head, it's a game-over for both of them
    if ($("." + headClassName).hasClass(enemy + "-snake-head") === true) {
        gameOver(p1SnakeBody, "p1-snake-head", "p1-snake-body");
        gameOver(p2SnakeBody, "p2-snake-head", "p2-snake-body");
    }
    // If the head contacts with the enemy's head, it's a game-over for both of them
    if ($("." + headClassName).hasClass("dead-snake-body") === true) {
        gameOver(playerBody, headClassName, bodyClassName, player);
    }
    // If the head goes outside of the row and column values, it's a game-over
    if (playerBody[0][0] > row || playerBody[0][1] > col || playerBody[0][0] <= 0 || playerBody[0][1] <= 0) {
        gameOver(playerBody, headClassName, bodyClassName, player);
    }

    // If the head connects with the snake's own tongue-segment, the tongue-segment is replaced by the head
    if ($("." + headClassName).hasClass(player + "-horizontal-tongue") === true) {
        $("#r" + playerBody[0][0] + "c" + playerBody[0][1]).removeClass(player + "-horizontal-tongue");
    }
    if ($("." + headClassName).hasClass(player + "-vertical-tongue") === true) {
        $("#r" + playerBody[0][0] + "c" + playerBody[0][1]).removeClass(player + "-vertical-tongue");
    }
}

function p1MoveSnake() {
    // console.log( "activated p1MoveSnake()" ) ;
    remSnakeClass(p1SnakeBody, "p1-snake-head", "p1-snake-body");
    changeSnakeCoordinates(p1SnakeBody);
    changeDirection("p1");
    addSnakeClass(p1SnakeBody, "p1-snake-head", "p1-snake-body");
    checkSnakeHead("p1", "p2", p1SnakeBody, "p1-snake-head", "p1-snake-body", p1Score);
}

function p2MoveSnake() {
    // console.log( "activated p2MoveSnake()" ) ;
    remSnakeClass(p2SnakeBody, "p2-snake-head", "p2-snake-body");
    changeSnakeCoordinates(p2SnakeBody);
    changeDirection("p2");
    addSnakeClass(p2SnakeBody, "p2-snake-head", "p2-snake-body");
    checkSnakeHead("p2", "p1", p2SnakeBody, "p2-snake-head", "p2-snake-body", p2Score);

}



function sniperTongue(player) {
    console.log("activated sniperTongue()");
    if (player === "p1") {
        p1Bullets--;
        $("#p1-bullets").html(p1Bullets);
    } else {
        p2Bullets--;
        $("#p2-bullets").html(p2Bullets);
    }
    var playerBody;
    var playerDirection;
    var playerScore;
    var enemyPlayerBody;
    var enemyHeadClassName;
    var enemyBodyClassName;
    if (player === "p1") {
        playerBody = p1SnakeBody;
        playerDirection = p1Direction;
        playerScore = p1Score;
        enemy = "p2";
        enemyPlayerBody = p2SnakeBody;
        enemyHeadClassName = "p2-snake-head";
        enemyBodyClassName = "p2-snake-body";
    } else {
        playerBody = p2SnakeBody;
        playerDirection = p2Direction;
        playerScore = p2Score;
        enemy = "p1";
        enemyPlayerBody = p1SnakeBody;
        enemyHeadClassName = "p1-snake-head";
        enemyBodyClassName = "p1-snake-body";
    }
    if (playerDirection === 'a' || playerDirection === 'j') {
        for (var i = playerBody[0][1] - 1; i > 0; i--) {
            if ($("#r" + playerBody[0][0] + "c" + i).hasClass("food") === true) {
                addPoints(playerBody, playerScore, "food");
                break;
            } else if ($("#r" + playerBody[0][0] + "c" + i).hasClass("food-2") === true) {
                addPoints(playerBody, playerScore, "food-2");
                break;
            } else if ($("#r" + playerBody[0][0] + "c" + i).hasClass("super-food") === true) {
                addPoints(playerBody, playerScore, "super-food");
                break;
            }
            //WAAAAA
            else if ($("#r" + playerBody[0][0] + "c" + i).hasClass("dead-snake-body") === true) {
                $("#r" + playerBody[0][0] + "c" + i).removeClass("dead-snake-body");
                break;
            } else if ($("#r" + playerBody[0][0] + "c" + i).hasClass(enemy + "-snake-head") === true) {
                gameOver(enemyPlayerBody, enemyHeadClassName, enemyBodyClassName, enemy);
            } else if ($("#r" + playerBody[0][0] + "c" + i).hasClass(enemy + "-snake-body") === true) {
                var snakeIndex;
                for (var t = 0; t < enemyPlayerBody.length; t++) {
                    if (playerBody[0][0] === enemyPlayerBody[t][0]) {
                        if (i === enemyPlayerBody[t][1]) {
                            snakeIndex = t;
                        }
                    }
                }
                enemyPlayerBody = sliceSnake(player, snakeIndex);
                break;
            }
            // WAAAA
            else {
                $("#r" + playerBody[0][0] + "c" + i).addClass(player + "-horizontal-tongue");
            }
        }
    } else if (playerDirection === 'd' || playerDirection === 'l') {
        for (var i = playerBody[0][1] + 1; i <= col; i++) {
            if ($("#r" + playerBody[0][0] + "c" + i).hasClass("food") === true) {
                addPoints(playerBody, playerScore, "food");
                break;
            } 
            else if ($("#r" + playerBody[0][0] + "c" + i).hasClass("food-2") === true) {
                addPoints(playerBody, playerScore, "food-2");
                break;
            }
            
            else if ($("#r" + playerBody[0][0] + "c" + i).hasClass("super-food") === true) {
                addPoints(playerBody, playerScore, "super-food");
                break;
            }
            //
            else if ($("#r" + playerBody[0][0] + "c" + i).hasClass("dead-snake-body") === true) {
                $("#r" + playerBody[0][0] + "c" + i).removeClass("dead-snake-body");
                break;
            } else if ($("#r" + playerBody[0][0] + "c" + i).hasClass(enemy + "-snake-head") === true) {
                gameOver(enemyPlayerBody, enemyHeadClassName, enemyBodyClassName, enemy);
            } else if ($("#r" + playerBody[0][0] + "c" + i).hasClass(enemy + "-snake-body") === true) {
                var snakeIndex;
                for (var t = 0; t < enemyPlayerBody.length; t++) {
                    if (playerBody[0][0] === enemyPlayerBody[t][0]) {
                        if (i === enemyPlayerBody[t][1]) {
                            snakeIndex = t;
                        }
                    }
                }
                enemyPlayerBody = sliceSnake(player, snakeIndex);
                break;
            }
            //
            else {
                $("#r" + playerBody[0][0] + "c" + i).addClass(player + "-horizontal-tongue");
            }
        }
    } else if (playerDirection === 's' || playerDirection === 'k') {
        for (var i = playerBody[0][0] + 1; i <= row; i++) {
            if ($("#r" + i + "c" + playerBody[0][1]).hasClass("food") === true) {
                addPoints(playerBody, playerScore, "food");
                break;
            } 
            if ($("#r" + i + "c" + playerBody[0][1]).hasClass("food-2") === true) {
                addPoints(playerBody, playerScore, "food-2");
                break;
            }
            else if ($("#r" + i + "c" + playerBody[0][1]).hasClass("super-food") === true) {
                addPoints(playerBody, playerScore, "super-food");
                break;
            } else if ($("#r" + i + "c" + playerBody[0][1]).hasClass("dead-snake-body") === true) {
                $("#r" + i + "c" + playerBody[0][1]).removeClass("dead-snake-body");
                break;
            } else if ($("#r" + i + "c" + playerBody[0][1]).hasClass(enemy + "-snake-head") === true) {
                gameOver(enemyPlayerBody, enemyHeadClassName, enemyBodyClassName, enemy);
            } else if ($("#r" + i + "c" + playerBody[0][1]).hasClass(enemy + "-snake-body") === true) {
                var snakeIndex;
                for (var t = 0; t < enemyPlayerBody.length; t++) {
                    if (i === enemyPlayerBody[t][0]) {
                        if (playerBody[0][1] === enemyPlayerBody[t][1]) {
                            snakeIndex = t;
                        }
                    }
                }
                enemyPlayerBody = sliceSnake(player, snakeIndex);
                break;
            } else {
                $("#r" + i + "c" + playerBody[0][1]).addClass(player + "-vertical-tongue");
            }
        }
    } else if (playerDirection === 'w' || playerDirection === 'i') {
        for (var i = playerBody[0][0] - 1; i > 0; i--) {
            if ($("#r" + i + "c" + playerBody[0][1]).hasClass("food") === true) {
                addPoints(playerBody, playerScore, "food");
                break;
            } 
            if ($("#r" + i + "c" + playerBody[0][1]).hasClass("food-2") === true) {
                addPoints(playerBody, playerScore, "food-2");
                break;
            }
            
            else if ($("#r" + i + "c" + playerBody[0][1]).hasClass("super-food") === true) {
                addPoints(playerBody, playerScore, "super-food");
                break;
            } else if ($("#r" + i + "c" + playerBody[0][1]).hasClass("dead-snake-body") === true) {
                $("#r" + i + "c" + playerBody[0][1]).removeClass("dead-snake-body");
                break;
            } else if ($("#r" + i + "c" + playerBody[0][1]).hasClass(enemy + "-snake-head") === true) {
                gameOver(enemyPlayerBody, enemyHeadClassName, enemyBodyClassName, enemy);
            } else if ($("#r" + i + "c" + playerBody[0][1]).hasClass(enemy + "-snake-body") === true) {
                var snakeIndex;
                for (var t = 0; t < enemyPlayerBody.length; t++) {
                    if (i === enemyPlayerBody[t][0]) {
                        if (playerBody[0][1] === enemyPlayerBody[t][1]) {
                            snakeIndex = t;
                        }
                    }
                }
                enemyPlayerBody = sliceSnake(player, snakeIndex);
                break;
            } else {
                $("#r" + i + "c" + playerBody[0][1]).addClass(player + "-vertical-tongue");
            }
        }
    }
    setTimeout(function () {
        $("." + player + "-horizontal-tongue").removeClass(player + "-horizontal-tongue");
        $("." + player + "-vertical-tongue").removeClass(player + "-vertical-tongue");
    }, 100);
}

function sliceSnake(player, snakeIndex) {
    var enemyPlayerBody;
    if (player === "p1") {
        $("#r" + p2SnakeBody[snakeIndex][0] + "c" + p2SnakeBody[snakeIndex][1]).removeClass("p2-snake-body");
        for (var i = snakeIndex + 1; i < p2SnakeBody.length; i++) {
            $("#r" + p2SnakeBody[i][0] + "c" + p2SnakeBody[i][1]).removeClass("p2-snake-body");
            $("#r" + p2SnakeBody[i][0] + "c" + p2SnakeBody[i][1]).addClass("dead-snake-body");
        }
        p2SnakeBody = p2SnakeBody.slice(0, snakeIndex);
        enemyPlayerBody = p2SnakeBody;
    } else {
        $("#r" + p1SnakeBody[snakeIndex][0] + "c" + p1SnakeBody[snakeIndex][1]).removeClass("p1-snake-body");
        for (var i = snakeIndex + 1; i < p1SnakeBody.length; i++) {
            $("#r" + p1SnakeBody[i][0] + "c" + p1SnakeBody[i][1]).removeClass("p1-snake-body");
            $("#r" + p1SnakeBody[i][0] + "c" + p1SnakeBody[i][1]).addClass("dead-snake-body");
        }
        p1SnakeBody = p1SnakeBody.slice(0, snakeIndex);
        enemyPlayerBody = p1SnakeBody;
    }

    return enemyPlayerBody;
}