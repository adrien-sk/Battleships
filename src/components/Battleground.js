import React from 'react'
import Cell from './Cell'

const Battleground = (props) => {
	let { board,  healthPoints, onStartGameClick, onCellClick } = props;
	let element;

	if(board){
		if(healthPoints > 0){
			element = board.map((row, i) => {
				return(
					<div key={i} className="row">
						{row.map((column, j) => {
							return <Cell x={i} y={j} cellStatus={column} onCellClick={onCellClick} />
						})}
					</div>
				)
			});
		}
		else{
			return(
				<div>
					<p>Game over</p>
					<button onClick={() => onStartGameClick()}>Start a game</button>
				</div>
			);
		}
	}
	else{
		element = <button onClick={() => onStartGameClick()}>Start a game</button>
	}

	return(
		<div className="battleground">
			{element}
		</div>
	);
}

export default Battleground;