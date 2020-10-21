import { ships } from '../Data/Ships'
import { directions } from '../Data/DirectionMatrix'

const generateBoard = () => {
	let board = createEmptyBoard();
	board = generateShipsPosition(board, ships);
	
	return board;
}

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

const generateShipsPosition = (board, ships) => {
	let newBoard = [...board];

	for(let i=0;i<ships.length;i++){
		for(let j=0;j<ships[i].number;j++){
			let positions = getFreePositions(newBoard, ships[i]);
			console.log(positions);
			for(let k=0;k<positions.length;k++){
				newBoard[positions[k][0]][positions[k][1]] = ships[i].name;
			}
		}
	}

	return newBoard;
}

const getFreePositions = (board, ship) => {
	let positionFound = false;
	let positions;
	while(!positionFound){
		let x = getRandomNumber(9);
		let y = getRandomNumber(9);
		let cells = isPathFree(board, ship, x, y);

		if(board[x][y] === null && cells){
			positionFound = true;
			positions = cells;
		}
	}
	return positions;
}

const isPathFree = (board, ship, x, y) => {
	let direction = directions[getRandomNumber(3)];
	let cells = [];
	//console.log(direction.x+' & '+direction.y);

	for(let i=0;i<ship.size;i++){
		let newX = x+(i*direction.x);
		let newY = y+(i*direction.y);

		//console.log('---> '+newX+' & '+newY);
		if((x+direction.x*(ship.size-1) >= 0 && x+direction.x*(ship.size-1) <= 9) && (y+direction.y*(ship.size-1) >= 0 && y+direction.y*(ship.size-1) <= 9) && board[newX][newY] === null){
			cells.push([newX,newY]);
		}
		else{
			return false;
		}
	}
	//console.log(cells);
	return cells;
}

const getRandomNumber = (max) => {
	return Math.floor(Math.random() * (max+1));
}

export default generateBoard;