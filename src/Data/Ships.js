// Composition of the flotilla
// Can be modified manually or Dynamised if we want more ships or types
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

// Return total hit required for all the ships
export const getShipsHp = () => {
	let healthPoints = 0;
	for(let i=0;i<ships.length;i++){
		healthPoints += ships[i].size*ships[i].number;
	}
	return healthPoints;
}