import { ships } from '../Data/Ships'
import { directions, surroundingCells } from '../Data/DirectionMatrix'

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
			let positions = getShipPosition(newBoard, ships[i]);
			
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
const getShipPosition = (board, ship) => {
	let positionFound = false;
	let positions;

	// While we didn't find any free position
	while(!positionFound){
		// Get a random starting cell
		let x = getRandomNumber(9);
		let y = getRandomNumber(9);

		// If starting cell and its surrounding is free
		if(isCellValid(board, x, y)){

			// If it allows to place the entire ship && surrounding cells are free:
			//		cells = All Cells for this ship
			//	Else : 
			//		cells = False
			let cells = getCellsOrNull(board, ship, x, y);

			// If we have Cells
			if(cells){
				// Break the while
				positionFound = true;
				positions = cells;
			}
			// Else : Start "While" again with a new random position
		}
	}
	return positions;
}

// Given a random position : Verify this position & the space for the entire ship & surrounding cells
// Return a list of Cells for this ship to be inserted in
const getCellsOrNull = (board, ship, x, y) => {
	let cells = [];

	// True when all cells are found for this ship
	let allCellsFound = false;

	// Array of already tried directions
	let triedDirections = [];

	// While we didn't found all the cells : It means we try again with another direction
	while(!allCellsFound){

		// Get a random direction from DirectionMatrix
		let randomDirection = null;
		let tryDirection;

		// If we tried all Top, Right, Bottom, Left
		// Return False (= Not a good starting cell)
		if(triedDirections.length >= 4){
			return false;
		}

		// Find a new random direction -> randomDirection
		do{
			tryDirection = directions[getRandomNumber(3)];
			if(!triedDirections.includes(tryDirection, 0)){
				randomDirection = tryDirection;
			}
		}
		while(triedDirections.includes(tryDirection, 0));

		triedDirections.push(randomDirection);
		
		// First, check if last cell of the ship is out of boundaries
		let lastCellX = x + ((ship.size - 1) * randomDirection.x);
		let lastCellY = y + ((ship.size - 1) * randomDirection.y);

		if(isInsideBoundaries(lastCellX, lastCellY)){

			// Second, check if all following cells of the ship and their surrounding are empty
			for(let i=0;i<ship.size;i++){
				// Predict next cell position according randomDirection
				let newX = x + (i * randomDirection.x);
				let newY = y + (i * randomDirection.y);
		
				// If cell is not out of boundaries & the cell is not occupied
				if(isCellValid(board, newX, newY)){
					// Add the cell to the list
					cells.push([newX,newY]);
					
					// If last cell of the ship
					if(i === ship.size-1)
						allCellsFound = true;
				}
				// Else if : out of boundaries or cell occupied : 
				// Not a valid direction : flush saved cells and restart the While
				else{
					cells = [];
					break;
				}
			}
		}
	}
	
	return cells;
}

// Check if the cell is empty & if surrounding cells are empty
const isCellValid = (board, x, y) => {
	// If the cell is empty
	if(board[x][y] === null){
		// Check surrounding of the cell
		return areSurroundingCellsEmpty(board, x, y);
	}
	else{
		return false;
	}
}

// Check if all surrounding cells of a position are empty
// (We don't check if surrounding cell outside the board is empty : because we allow a ship to be next to a board side)
const areSurroundingCellsEmpty = (board, x, y) => {
	// For each cell around [x,y]
	for(let i=0;i<surroundingCells.length;i++){
		let newX = x+surroundingCells[i].x;
		let newY = y+surroundingCells[i].y;

		// If the cell is inside the board & is not null : Return false
		if(isInsideBoundaries(newX, newY) && board[newX][newY] !== null){
			return false;
		}
	}

	return true;
}

// Return random number from [0 to max]
const getRandomNumber = (max) => {
	return Math.floor(Math.random() * (max+1));
}

// Check if the cell inside the boundaries of the board
const isInsideBoundaries = (x, y) =>{
	if((x >= 0 && x <= 9) && (y >= 0 && y <= 9))
	{
		return true;
	}
	else{
		return false;
	}
}

export default generateBoard;