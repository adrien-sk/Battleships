export const ships = [
	{
		id: 0,
		name: 'Battleship',
		size: 5,
		number: 1
	},
	{
		id: 1,
		name: 'Destroyer',
		size: 4,
		number: 2
	}
];

export const getShipsHp = () => {
	let healthPoints = 0;
	for(let i=0;i<ships.length;i++){
		healthPoints += ships[i].size*ships[i].number;
	}
	return healthPoints;
}