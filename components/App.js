import React, { Component } from 'react';
import { Link } from 'react-router';

import BorderRadius from './tools/BorderRadius';

require('../public/style.scss');

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

				<div className="row text-center">
					<div className="col-xs-12">
						<p>Made with &#9829; by <a href="https://twitter.com/Manvendra_SK">Manvendra Singh</a></p>
						<p>Source at <a href="https://github.com/ManvendraSK/css-tools">https://github.com/ManvendraSK/css-tools</a></p>
					</div>
				</div>
			</div>
			);
	}
};