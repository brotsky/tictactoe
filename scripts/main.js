var board = [];
var BOARD_SIZE = 9;
var turn;
var winningPath;

// Returns array of winning board spots if win is present
function checkForWin() {
	for(var i = 0; i < 3; i++) {
		// Check vertically
		if( board[i] != "" && (board[i] == board[i+3] && board[i] == board[i+6]) ) 
			return [i, i+3, i+6];

		// Check horizontally
		if( board[3*i] != "" && (board[3*i] == board[3*i + 1] && board[3*i] == board[3*i + 2]) ) 
			return [3*i, 3*i+1, 3*i+2];
	}

	// Check diagonally
	if( board[0] != "" && (board[0] == board[4] && board[4] == board[8]) )
		return [0, 4, 8];
	if( board[2] != "" && (board[2] == board[4] && board[4] == board[6]) )
		return [2, 4, 6];

	return [];
}

function newGame() {
	// Build the board
	$board = $("#board");
	$board.empty();
	for(var i = 0; i < BOARD_SIZE; i++) 
		$board.append($("<div class='cell' id = " + i + "></div>"));

	// Set listener
	$("#board").on("click", "div", function() {
		if( !($(this).hasClass('x') || $(this).hasClass('o')) ) {
			$(this).addClass(turn);
			board[$(this).attr('id')] = turn;

			// Check for winner
			winningPath = checkForWin();
			if(winningPath.length > 0) {
				for(var i = 0; i < winningPath.length; i++) 
					$("#" + winningPath[i]).css("background-color", "#6fdc6f");

				endGame();
			}

			turn = turn == "x" ? "o" : "x";
		}
	});

	board.length = 0;
	for(var i = 0; i < BOARD_SIZE; i++) 
		board.push("");

	turn = "x";
}

function endGame() {
	$("#board").off();
}

$(function() {

	newGame();

	$("#newgame").on("click", newGame);
	
});







