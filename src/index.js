/* @flow */

import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
//css
require('./css/index.css');

type Props = {||};

type State = {
	name: string,
}

class Index extends React.Component<Props, State> {
	state: State = {
		name: 'roy',
	}

	onButtonClick = () => {
		alert(this.state.name)
	}

	render() {
		return (
			<Fragment>
				<div className="main">Index</div>
				<button onClick={this.onButtonClick}>Click Me!</button>
			</Fragment>
		)
	}
}

module.exports = Index
