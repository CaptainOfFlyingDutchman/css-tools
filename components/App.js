import React, { Component } from 'react';
import { Link } from 'react-router';

import BorderRadius from './tools/BorderRadius';

export default class App extends Component {
	render() {
		return(
			<div>
				<ul>
					<li><Link to="/border-radius">Border Radius</Link></li>
				</ul>

				<hr/>

				{React.cloneElement(this.props.children, {...this.state, emit: this.emit})}
			</div>
			);
	}
};