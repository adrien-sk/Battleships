import { ships } from '../Data/Ships'
import { directions } from '../Data/DirectionMatrix'

// Return a 10x10 array with { ships } spread out
const generateBoard = () => {

	// Create the empty 10x10 array
	let board = createEmptyBoard();

	// Populate the array with { ships } and random positions
	board = generateShipsPosition(board, ships);
	
	return board;
}

// Create the empty 10x10 array
const createEmptyBoard = () =>{
	let emptyBoard = [10];

	for (let i = 0; i < 10; i++) {
		emptyBoard[i] = [10];

		for (let j = 0; j < 10; j++) {
			emptyBoard[i][j] = null;
		}
	}

	return emptyBoard;
}

// Given an empty board
// Return randomly populated board with { ships }
const generateShipsPosition = (board, ships) => {
	let newBoard = JSON.parse(JSON.stringify(board));

	// For each ship type
	for(let i=0;i<ships.length;i++){

		//For each ship of type "ships[i]"
		for(let j=0;j<ships[i].number;j++){

			// Get each cell position for this ship
			let positions = getFreePositions(newBoard, ships[i]);
			
			// For each cell position
			for(let k=0;k<positions.length;k++){
				// Add the "Ship" tag in the board
				newBoard[positions[k][0]][positions[k][1]] = 'Ship';
			}
		}
	}

	return newBoard;
}

// Generate a random Position
// And return each cell position for a ship
const getFreePositions = (board, ship) => {
	let positionFound = false;
	let positions;

	// While we didn't find any free position
	while(!positionFound){
		// Get a random starting cell
		let x = getRandomNumber(9);
		let y = getRandomNumber(9);

		// If starting cell is free & It allows to place the entire ship :
		//		"cells" = All Cells for this ship
		//	Else : 
		//		"cells" = False
		let cells = isPathFree(board, ship, x, y);

		// If starting cell is free & We have Cells
		if(board[x][y] === null && cells){
			//Break the while
			positionFound = true;
			positions = cells;
		}
	}
	return positions;
}

// Given a random position : Verify this position and the space for the entire ship
// Return a list of Cells for this ship to be inserted in
const isPathFree = (board, ship, x, y) => {

	//Get a random direction from DirectionMatrix
	let direction = directions[getRandomNumber(3)];
	let cells = [];

	// For each cell size of the ship
	for(let i=0;i<ship.size;i++){
		//Predict next cell position according Direction
		let newX = x+(i*direction.x);
		let newY = y+(i*direction.y);

		// If cell is not out of boundaries & the cell is not occupied
		if((x+direction.x*(ship.size-1) >= 0 && x+direction.x*(ship.size-1) <= 9) && (y+direction.y*(ship.size-1) >= 0 && y+direction.y*(ship.size-1) <= 9) && board[newX][newY] === null){
			// Add the cell to the list
			cells.push([newX,newY]);
		}
		// Else if out of boundaries or cell occupied : 
		// Return False
		else{
			return false;
		}
	}
	
	return cells;
}

// Return random number from [0 to max]
const getRandomNumber = (max) => {
	return Math.floor(Math.random() * (max+1));
}

export default generateBoard;