import React, { Component } from 'react';
import { Link } from 'react-router';

import BorderRadius from './tools/BorderRadius';

export default class App extends Component {
	render() {
		return(
			<div className="container">
				<div className="row">
					<div className="col-xs-12 col-sm-12 col-md-3">
						<ul>
							<li><Link to="/border-radius">Border Radius</Link></li>
						</ul>
					</div>

					<div className="col-xs-12 col-sm-12 col-md-9">
						{React.cloneElement(this.props.children)}
					</div>
				</div>
			</div>
			);
	}
};