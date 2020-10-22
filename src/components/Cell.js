import React from 'react'

import hit from '../Images/explosion.svg'
import miss from '../Images/circle.svg'

const Cell = (props) =>{
	let {x, y, cellStatus, onCellClick} = props;
	let cellClass;
	let icon;

	// Define Class and Icon depending on the Cell status
	switch(cellStatus){
		case 'Hit':
			cellClass = 'hit';
			icon = <img src={hit} className='icon hit' alt='hit' />
			break;

		case 'Miss':
			cellClass = 'miss';
			icon = <img src={miss} className='icon miss' alt='miss' />
			break;

		default:
			break;
	}

	// When clicking a Cell : If it's not already clicked : Call App's Handle Click method with cell position
	const onClick = (x, y) => {
		if(cellStatus !== 'Hit' && cellStatus !== 'Miss')
			onCellClick(x, y);
	}

	return(
		<div key={x+'-'+y} className={`cell ${(cellClass ? cellClass : ``)}`} onClick={() => onClick(x, y)}>
			{
				icon
			}
		</div>
	);
}

export default Cell;