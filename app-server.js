var express = require('express');
var path = require('path');

var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var _collection = require('lodash/collection'); // find
var _util = require('lodash/util'); // matches

var app = express();

// Hot reloading
var compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
	noInfo: true, publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));
// End hot reloading

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

var server = app.listen(3000);

console.log('Server running at http://localhost:3000');