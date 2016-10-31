import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import BorderRadius from './components/tools/BorderRadius';

import NotFound from './components/NotFound';

const routes = (
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={BorderRadius} />
			<Route path="border-radius" component={BorderRadius} />

			<Route path="*" component={NotFound} />
		</Route>
	</Router>
	);

render(routes, document.getElementById('react-container'));