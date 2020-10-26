import React from 'react'

const UI = (props) => {
	let {streak, hits, fails} = props;
	
	return(
		<div className="ui-panel">
			<div className="streak">
				<p className="score-number">{streak}</p>
				<p className="score-title">Best Streak</p>
			</div>
			<div className="hits">
				<p className="score-number">{hits}</p>
				<p className="score-title">Hits</p>
			</div>
			<div className="fails">
				<p className="score-number">{fails}</p>
				<p className="score-title">Fails</p>
			</div>
		</div>
	);
}

export default UI;