import React from 'react'
import Cell from './Cell'

const Battleground = (props) => {
	let { board, onCellClick } = props;
	let element;

	if(board){
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

	return(
		<div className="battleground">
			{element}
		</div>
	);
}

export default Battleground;