import React from 'react'
import Cell from './Cell'

const Battleground = (props) => {
	let { board,  healthPoints, onStartGameClick, onCellClick } = props;
	let element;

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
					healthPoints <= 0 && 
					<div className="gameover">
						<p>The flotilla has been defeated</p>
						<button onClick={() => onStartGameClick()}>Start a new game</button>
					</div>
				}
			</div>
	}
	else{
		element = 
			<div className="inner">
				<button onClick={() => onStartGameClick()}>Start a game</button>
			</div>
	}

	return(
		<div className="battleground">
			{element}
		</div>
	);
}

export default Battleground;