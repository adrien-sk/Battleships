const GenerateBoard = () => {
	let board = [10];
	for (let i = 0; i < 10; i++) {
		board[i] = [10];

		for (let j = 0; j < 10; j++) {
			board[i][j] = null;
		}
	}
	
	return board;
}

export default GenerateBoard;