import React from 'react'

const Cell = (props) =>{
	let {x, y, cellStatus, onCellClick} = props;
	let cellClass;
	switch(cellStatus){
		case 'Hit':
			cellClass = 'hit';
			break;

		case 'Miss':
			cellClass = 'miss';
			break;

		default:
			break;
	}

	const onClick = (x, y) => {
		if(cellStatus !== 'Hit')
			onCellClick(x, y);
	}

	return(
		<div key={x+'-'+y} className={`cell ${cellClass}`} onClick={() => onClick(x, y)}>
			{
			}
		</div>
	);
}

export default Cell;