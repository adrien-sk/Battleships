import React from 'react';
import './styles/site.scss';

import UI from './components/UI'
import Battleground from './components/Battleground'

import generateBoard from './functions/GenerateBoard'
import { getShipsHp } from './Data/Ships'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const element = <FontAwesomeIcon icon={faGithub} />

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

	initiateGame(){
		let newBoard = generateBoard();
		this.setState({board: newBoard, healthPoints: getShipsHp(), hits: 0, fails: 0});
	}

	handleCellClick(x, y){
		let tempBoard = [...this.state.board];
		let tempHealthPoints = this.state.healthPoints;
		let tempHits = this.state.hits;
		let tempFails = this.state.fails;
		if(tempBoard[x][y] === null){
			tempBoard[x][y] = 'Miss';
			tempFails += 1;
		}
		else{
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
					<a href="https://github.com/Nadrielle/Battleships" rel="noopener noreferrer" className="github-link" target="_blank">{element}<p>Github Repository</p></a>
				</footer>
			</div>
		);
	}
}

export default App;
