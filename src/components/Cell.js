import React from 'react'

import hit from '../Images/explosion.svg'
import miss from '../Images/circle.svg'

const Cell = (props) =>{
	let {x, y, cellStatus, onCellClick} = props;
	let cellClass;
	let icon;
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

	const onClick = (x, y) => {
		if(cellStatus !== 'Hit')
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