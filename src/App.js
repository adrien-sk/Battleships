import React from 'react';
import './styles/site.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import UI from './components/UI'
import Battleground from './components/Battleground'

import generateBoard from './functions/GenerateBoard'
import { getShipsHp } from './Data/Ships'

const gitIcon = <FontAwesomeIcon icon={faGithub} />


class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			board: null,	
			healthPoints: 0,
			hits: 0,
			fails: 0,
		}
	}

	// Launch when clicking "Start a game"
	// Function is sent to --> "Battleground" component
	initiateGame(){
		let newBoard = generateBoard();
		this.setState({board: newBoard, healthPoints: getShipsHp(), hits: 0, fails: 0});
	}

	// Used when user click a Cell
	// Function is sent to --> "Battleground" component --> "Cell" component
	handleCellClick(x, y){
		let tempBoard = [...this.state.board];
		let tempHealthPoints = this.state.healthPoints;
		let tempHits = this.state.hits;
		let tempFails = this.state.fails;

		// If the clicked cell is empty
		if(tempBoard[x][y] === null){
			tempBoard[x][y] = 'Miss';
			tempFails += 1;
		}
		else{
		// Else if : it contains a Ship
			switch(tempBoard[x][y]){
				case 'Ship':
					tempBoard[x][y] = 'Hit';
					tempHealthPoints--;
					tempHits += 1;
					break;
				
				default:
					break;
			}
		}

		this.setState({board: tempBoard, healthPoints: tempHealthPoints, hits: tempHits, fails: tempFails});
	}

	render(){
		return (
			<div className="App">
				<header>
					<h1>Battleships</h1>
				</header>
				<main>
					<Battleground 
						board={this.state.board} 
						healthPoints={this.state.healthPoints} 
						onCellClick={(x, y) => this.handleCellClick(x, y)} 
						onStartGameClick={() => this.initiateGame()} 
						hits={this.state.hits}
						fails={this.state.fails}/>
					{this.state.board && 
						<UI hits={this.state.hits} 
							fails={this.state.fails} />}
				</main>
				<footer>
					<a href="https://github.com/Nadrielle/Battleships" rel="noopener noreferrer" className="github-link" target="_blank">{gitIcon}<p>Github Repository</p></a>
				</footer>
			</div>
		);
	}
}

export default App;