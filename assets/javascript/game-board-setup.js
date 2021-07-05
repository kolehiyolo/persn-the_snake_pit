// < Variables - 
// <- Macro Game Variables -- 
// These variables determine the size of the game-board
var row = 49; // This is obviously the row
var col = 49; // This is obviously the columns
var food = []; // The food array is where the coordinate of the food is located at a time
var food2 = [];
var superFood = [];
var foodCounter = 0;

var initBullets = 1;

var gamePause = true;
var gameOverState = false;
// -- Macro Game Variables -! 

// <- Player 1 Variables -- 
var p1GameClock; // This is what triggers the movement of the snake
var p1SnakeBody = []; // This is what contains the coordinates of each snake segment of the first player
var p1Direction = "d"; // This is what triggers the movement direction of the snake
var p1Score = 0; // This is obviously what contains the score of the first snake
var p1Bullets = initBullets;
// -- Player 1 Variables -! 

// <- Player 2 Variables -- 
var p2GameClock; // This is what triggers the movement of the snake
var p2SnakeBody = []; // This is what contains the coordinates of each snake segment of the first player
var p2Direction = "j"; // This is what triggers the movement direction of the snake
var p2Score = 0; // This is obviously what contains the score of the first snake
var p2Bullets = initBullets;
// -- Player 2 Variables -! 
// - Variables ! 

// < Game Grid Set-up - 
function addGrid(row, col) {
}
// - Game Grid Set-up ! 

// < Random Food Generator - 
function addFood(row, col) {
    console.log( "activated addFood()" ) ; 
    food[0] = Math.floor((Math.random() * row)) + 1; // This determines the random row#
    food[1] = Math.floor((Math.random() * col)) + 1; // This determines the random col#

    $("#r" + food[0] + "c" + food[1]).addClass("food");
}

function addFood2(row, col) {
    console.log( "activated addFood()" ) ; 
    food2[0] = Math.floor((Math.random() * row)) + 1; // This determines the random row#
    food2[1] = Math.floor((Math.random() * col)) + 1; // This determines the random col#

    $("#r" + food2[0] + "c" + food2[1]).addClass("food-2");
}
// - Random Food Generator ! 

// < Random Food Generator - 
function addSuperFood(row, col) {
    console.log( "activated addSuperFood()" ) ; 
    superFood[0] = Math.floor((Math.random() * row)) + 1; // This determines the random row#
    superFood[1] = Math.floor((Math.random() * col)) + 1; // This determines the random col#

    $("#r" + superFood[0] + "c" + superFood[1]).addClass("super-food");
}
// - Random Food Generator ! 

// This sets up the Player 1 Snake's starting position
function p1InitSnake(row, col) {
    console.log( "activated p1InitSnake()" ) ; 
    p1SnakeBody[0] = [];
    p1SnakeBody[0] = [Math.floor(row / 4), Math.floor(col / 4)]; // This sets the head of the snake at the top-left quadrant
    for ( var i = 1 ; i <= 4 ; i++ ) {
        p1SnakeBody[i] = [];
        p1SnakeBody[i][0] = p1SnakeBody[i-1][0];
        p1SnakeBody[i][1] = p1SnakeBody[i-1][1] - 1;
    }
    
    addSnakeClass(p1SnakeBody, "p1-snake-head " + player1.gameSnake +"-head", "p1-snake-body " + player1.gameSnake +"-body");
}

function p2InitSnake(row, col) {
    console.log( "activated p2InitSnake()" ) ; 
    p2SnakeBody[0] = [];
    p2SnakeBody[0] = [Math.ceil(row-(row / 4)), Math.floor(col-(col / 4))]; // This sets the head of the snake at the bottom-right quadrant
    for ( var i = 1 ; i <= 4 ; i++ ) {
        p2SnakeBody[i] = [];
        p2SnakeBody[i][0] = p2SnakeBody[i-1][0];
        p2SnakeBody[i][1] = p2SnakeBody[i-1][1] + 1;
    }

    addSnakeClass(p2SnakeBody, "p2-snake-head " + player2.gameSnake +"-head", "p2-snake-body " + player2.gameSnake +"-body");
}


function addSnakeClass(playerBody, headClassName, bodyClassName ) {
    // console.log( "activated addSnakeClass()" ) ; 
    $("#r" + playerBody[0][0] + "c" + playerBody[0][1]).addClass(headClassName); // Add headClass
    for (var i = 1; i < playerBody.length; i++) { // Add bodyClass
        $("#r" + playerBody[i][0] + "c" + playerBody[i][1]).addClass(bodyClassName);
    }
}

function remSnakeClass(playerBody, headClassName, bodyClassName) {
    // console.log( "activated remSnakeClass()" ) ;
    $("#r" + playerBody[0][0] + "c" + playerBody[0][1]).removeClass(headClassName); // Remove headClass
    for (var i = 1; i < playerBody.length; i++) { // Remove bodyClass
        $("#r" + playerBody[i][0] + "c" + playerBody[i][1]).removeClass(bodyClassName);
    }
}

function changeSnakeCoordinates(playerBody) {
    // console.log( "activated changeSnakeCoordinates()" ) ;
    for (var i = playerBody.length - 1; i > 0; i--) {
        playerBody[i][0] = playerBody[i-1][0];
        playerBody[i][1] = playerBody[i-1][1];
    }
}