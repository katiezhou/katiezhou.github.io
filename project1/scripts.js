// ===================================================================================
// 																		Connect Four 
// ===================================================================================

// ==============================================
// 								Global Variables
// ==============================================

var rows = [];
var columns = [];

var player;
var totalMoves = 0;

// variables used in function that checks for lowest available spot in column and places piece there
var $findColumn;
var $currentColumn;
var player1Color;
var player2Color;

// various jquery elements that are used to hide/show the elements later or insert/change HTML
var $header = $("#header-container");

var $instructions = $("#instructions");

var $startButton = $("#start-button");
var $startButtonContainer = $("#start-button-container");

var $playerOrderContainer = $("#player-order-container");
var $playerOrder = $("#player-order");
var $diceRollGif = $("#dice-roll");

// variables used to notify whose turn it is, notify name of winner, set up scoreboard
var $nameInputContainer = $("#name-input-container");
var $player1Input = $("#player1-input");
var $player2Input = $("#player2-input");
var $player1Name;
var $player2Name;
var $currentPlayer = $("#current-player");
var currentPlayerName;

// variables used to control the game outcome output
var winner;
var $gameOutcomeContainer = $("#game-outcome-container");
var $gameOutcome = $("#game-outcome");

// scoreboard and "play again" setup
var $scoreboard = $("#scoreboard-container");
var player1wins = 0;
var player2wins = 0;
var $player1score = $("#player1-score");
var $player2score = $("#player2-score");
var $playAgain = $("#play-again-container");


// board size variables
var $boardSizeContainer = $("#board-size-container");
var $rowsInput = $("#rows-input");
var $columnsInput = $("#columns-input");
var $nextButton = $("#next-button");

// ===========================
// 					Functions
// ===========================

var $scoreboardContainer = $("#scoreboard-container");
$($scoreboardContainer).after("<div id='spot-container'/>");
var $spotContainer = $("#spot-container");


// creates board with variable rows/columns/buttons
// sets click events on each button
var createBoard = function(columns, rows) {
	for (var i = 0; i < columns; i++) {
		var $createColumnContainer = $("<div class='column-container'></div>");
		$($spotContainer).append($createColumnContainer);
		$($createColumnContainer).prepend("<button class='spot-button'>&darr;</button>");

		var $createColumn = $("<div class='column'></div>");
		$($createColumnContainer).append($createColumn);

		for (var j = 0; j < rows; j++) {
			$($createColumn).append("<div class='spot'></div>");
		}
	}

	var $spotButtons = $(".spot-button");
	for (var i = 0; i < $spotButtons.length; i++) {
		$($spotButtons[i]).click(placeLowestSpot);
	}

	var $columnElements = $(".column");
	$($spotContainer).width(($columnElements.length * 70) + 90);
	populateArrays();

}

// dynamically creates row and column arrays from HTML elements to allow simpler win checking later
var populateArrays = function() {
	$createColumn = $(".column");

	for (var i = 0; i < $createColumn[0].children.length; i++) {
		rows.push([]);
		for (var j = 0; j < $createColumn.length; j++) {
			rows[i].push($createColumn[j].children[i]);
		}
	}


	for (var i = 0; i < $createColumn.length; i++) {
		columns.push([]);
		for (var j = 0; j < $createColumn[0].children.length; j++) {
			columns[i].push($createColumn[i].children[j]);
		}
	}
}



var setUp = function() {
	var $rowsValue = parseInt($rowsInput.val());
	var $columnsValue = parseInt($columnsInput.val());
	createBoard($columnsValue, $rowsValue);
	$($boardSizeContainer).hide();
	playerNames();
}

// initial setup function that clears the board and resets all settings changed during gameplay
// called again in "play again" function
var initialize = function() {
	$($boardSizeContainer).show();
	$($($header).children()[0]).css("font-size", "120px");
	$($($header).children()[1]).css("font-size", "60px");
	$($spotContainer).hide();
	$($instructions).hide();
	$($playerOrderContainer).hide();
	$($currentPlayer).hide();
	$($gameOutcomeContainer).hide();
	$($nameInputContainer).hide();
	$($startButtonContainer).hide();
	$($playAgain).hide();
	totalMoves = 0;
	winner = null;

	// removes color class from all spots that have one
	var $createColumn = $(".column");
	for (var i = 0; i < $createColumn.length; i++) {
		for (var j = 0; j < $createColumn[i].children.length; j++) {
			if ($($createColumn[i].children[j]).hasClass("purple")) {
				$($createColumn[i].children[j]).removeClass("purple");
			} else if ($($createColumn[i].children[j]).hasClass("green")) {
				$($createColumn[i].children[j]).removeClass("green");
			}
		}
	}
}

var playerNames = function() {
	$($nameInputContainer).show();
	$($startButtonContainer).show();
}



// I originally just had the "play again" button on a click event to run "initialize" 
// but I wanted a scoreboard, so now "play again" doesn't ask for player names,
// it jumps straight to randomizing who goes first
var playAgainSetup = function() {
	$($scoreboard).show();
	$($currentPlayer).html("");
	initialize();
	rollDice();
}

// function that randomizes the player order and tells the user(s) who is going first
var rollDice = function() {
	$boardSizeContainer.hide();
	$($playerOrder).html("");
	$($playerOrderContainer).show();
	$($diceRollGif).show();
	$($startButtonContainer).hide();
	$player1Name = $($player1Input).val();
	$player2Name = $($player2Input).val();
	$($nameInputContainer).hide();
	if (Math.random() < 0.5) {
		player1Color = "purple";
		player2Color = "green";
		currentPlayerName = $player1Name;
		setTimeout(function() {
			$($playerOrder).html($player1Name + " goes first!");
			$($diceRollGif).hide();
		}, 2000)
		setTimeout(setGame, 4000)
	} else if (Math.random() < 1) {
		player1Color = "green";
		player2Color = "purple";
		currentPlayerName = $player2Name;
		setTimeout(function() {
			$($playerOrder).html($player2Name + " goes first!")
			$($diceRollGif).hide();
		}, 2000)
		setTimeout(setGame, 4000)
	}

}


// function that gets called at the conclusion of the rollDice function; makes game header
// smaller so that the user doesn't have to scroll down as much to see the whole board

// also notifies whose turn it is
var setGame = function() {
	$($($header).children()[0]).css("font-size", "72px");
	$($($header).children()[1]).css("font-size", "36px");
	$($spotContainer).show();
	$($instructions).show();
	$($startButtonContainer).hide();
	$($playerOrderContainer).hide();
	$($currentPlayer).show();
	$($currentPlayer).html(currentPlayerName + "'s turn!");
}


// checks for lowest free column spot and adds the class of the player whose turn it is
var placeLowestSpot = function() {
	if (currentPlayerName === $player1Name) {
		currentPlayerName = $player2Name;
	} else if (currentPlayerName === $player2Name) {
		currentPlayerName = $player1Name;
	} 

	// allows game to alternate turns for players
	if (totalMoves % 2 === 0) {
		player = "purple";
	} else if (totalMoves % 2 === 1) {
		player = "green";
	}

	if (totalMoves < 42 && winner === null) {
		setTimeout(function() {
			$($currentPlayer).html(currentPlayerName + "'s turn!");
		}, 100);

		// Finds sibling of the button pressed (i.e. the column container)
		$findColumn = $(this).siblings()[0];
		$currentColumn = $($findColumn).children();

		// reverse for loop; goes through the whole column starting from the bottom
		// As soon as it finds a free spot, it adds the class and breaks out of the loop
		for (var i = ($currentColumn.length - 1); i >= 0; i--) {
			if (!($($currentColumn[i]).hasClass("purple")) && !($($currentColumn[i]).hasClass("green"))) {
				$($currentColumn[i]).addClass(player);
				totalMoves += 1;

				checkForWin();
				break;
			} else {
			null;
			}
		} 
	}
	
}  

var checkForWin = function() {
	rowColumnWinCheck(rows);
	rowColumnWinCheck(columns);
	diagonalWinCheck(rows);

	// i.e. if any of the above outcomes return true
	if (winner != null) {
		setTimeout(showGameOutcome, 200);
	}
}


// checks if there are 4 elements that match up in rows and columns
var rowColumnWinCheck = function(array) {
	for (var i = 0; i < array.length; i++) {
		for (var j = 0; j < (array[i].length - 3); j++) {
			if ($(array[i][j]).hasClass(player1Color) && $(array[i][j+1]).hasClass(player1Color) && $(array[i][j+2]).hasClass(player1Color) && $(array[i][j+3]).hasClass(player1Color)) {
				winner = $player1Name;
				player1wins += 1;
			} else if ($(array[i][j]).hasClass(player2Color) && $(array[i][j+1]).hasClass(player2Color) && $(array[i][j+2]).hasClass(player2Color) && $(array[i][j+3]).hasClass(player2Color)) {
				winner = $player2Name;
				player2wins += 1;
			} else if (totalMoves >= 42) {
				winner = "none";
			}
		}
	}

}


// takes the row array as an argument because of the way the rows array visually matches the gameboard
// 2 for loops - one for each "direction" of diagonals
var diagonalWinCheck = function(array) {
	$createColumn = $(".column");
	for (var b = 0; b < ($createColumn[0].children.length - 3); b++) {
		for (var c = 0; c < ($createColumn.length - 3); c++) {

			if ($(array[b][c]).hasClass(player1Color) && $(array[b + 1][c + 1]).hasClass(player1Color) && $(array[b + 2][c + 2]).hasClass(player1Color) && $(array[b + 3][c + 3]).hasClass(player1Color)) {
				winner = $player1Name;
				player1wins += 1;
			} else if ($(array[b][c]).hasClass(player2Color) && $(array[b + 1][c + 1]).hasClass(player2Color) && $(array[b + 2][c + 2]).hasClass(player2Color) && $(array[b + 3][c + 3]).hasClass(player2Color)) {
				winner = $player2Name;
				player1wins += 1;
			} else if (totalMoves >= 42) {
				winner = "none";
			}
		}

		for (var d = ($createColumn.length - 1); d >= 3; d--) {

			if ($(array[b][d]).hasClass(player1Color) && $(array[b + 1][d - 1]).hasClass(player1Color) && $(array[b + 2][d - 2]).hasClass(player1Color) && $(array[b + 3][d - 3]).hasClass(player1Color)) {
				winner = $player1Name;
				player1wins += 1;
			} else if ($(array[b][d]).hasClass(player2Color) && $(array[b + 1][d - 1]).hasClass(player2Color) && $(array[b + 2][d - 2]).hasClass(player2Color) && $(array[b + 3][d - 3]).hasClass(player2Color)) {
				winner = $player2Name;
				player1wins += 1;
			} else if (totalMoves >= 42) {
				winner = "none";
			}
		}
	}
}

// var diagonalWinCheck = function(array) {
// 	$createColumn = $(".column");
// 	for (var b = 0; b < ($createColumn[0].children.length - 3); b++) {
// 		for (var c = 0; c < ($createColumn.length - 3); c++) {

// 			console.log($(array[b][c])) 
// 			console.log($(array[b + 1][c + 1]))
// 			console.log($(array[b + 2][c + 2]))
// 			console.log($(array[b + 3][c + 3]))
				
// 		}

// 		for (var d = ($createColumn.length - 1); d >= 3; d--) {

// 			console.log($(array[b][d]))
// 			console.log($(array[b + 1][d - 1]))
// 			console.log($(array[b + 2][d - 2]))
// 			console.log($(array[b + 3][d - 3]))
// 		}
// 	}
// }



// things that happen once a winner is found
var showGameOutcome = function() {
	if (winner === $player1Name) {
		$($currentPlayer).hide();
		$($gameOutcomeContainer).show();
		$($instructions).hide();
		$($gameOutcome).html($player1Name + " wins!");
		$($spotContainer).fadeOut("slow");
		$($playAgain).show();

		// sets scoreboard text
		$($player1score).html($player1Name + ": " + player1wins);
		$($player2score).html($player2Name + ": " + player2wins);
	} else if (winner === $player2Name) {
		$($currentPlayer).hide();
		$($gameOutcomeContainer).show();
		$($instructions).hide();
		$($gameOutcome).html($player2Name + " wins!");
		$($spotContainer).fadeOut("slow");
		$($playAgain).show();
		$($player1score).html($player1Name + ": " + player1wins);
		$($player2score).html($player2Name + ": " + player2wins);
	} else if (winner === "none") {
		$($currentPlayer).hide();
		$($gameOutcomeContainer).show();
		$($instructions).hide();
		$($gameOutcome).html("Draw!");
		$($spotContainer).fadeOut("slow");
		$($playAgain).show();
		$($player1score).html($player1Name + ": " + player1wins);
		$($player2score).html($player2Name + ": " + player2wins);
	}
}


// ===========================
// 		 	 Event Listeners
// ===========================

$(document).ready(initialize);

$($nextButton).click(setUp);

$($startButton).click(rollDice);

$($playAgain).click(playAgainSetup);
