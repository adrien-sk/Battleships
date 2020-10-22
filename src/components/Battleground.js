import React from 'react'
import Cell from './Cell'

const Battleground = (props) => {
	let { board,  healthPoints, onStartGameClick, onCellClick, hits, fails } = props;
	let element;

	// If the board is generated : Render the visual
	if(board){
		element = 
			<div className="board">
				{board.map((row, i) => {
					return(
						<div key={i} className="row">
							{row.map((column, j) => {
								return <Cell x={i} y={j} cellStatus={column} onCellClick={onCellClick} />
							})}
						</div>
					)
				})}
				{
					// If we destroyed all ships : Display Victory screen over the board
					healthPoints <= 0 && 
					<div className="gameover">
						<p>The flotilla has been defeated</p>
						<div>
							<p className="victory-score-title">Score</p>
							<p className="victory-score-number">{hits+fails}</p>
							<p className="victory-score-number-label">shots</p>
							<p className="victory-score-fails">with <span>{fails}</span> fails</p>
						</div>
						<button onClick={() => onStartGameClick()}>Start a new game</button>
					</div>
				}
			</div>
	}
	// Else : Render Start button
	else{
		element = 
			<div className="inner">
				<button onClick={() => onStartGameClick()}>Start A Game</button>
			</div>
	}

	return(
		<div className="battleground">
			{element}
		</div>
	);
}

export default Battleground;