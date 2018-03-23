'use strict';

const
	webpack = require('webpack'),
	webpackMerge = require('webpack-merge');

const
	buildUtils = require('./build-utils'),
	helpers = require('../../helpers').resetEnvironment('development');

const utilsConfig = Object.assign({}, buildUtils.UTILS_CONFIG, {
	ENV: helpers.env
});

module.exports = webpackMerge(require('./common')(utilsConfig), {
	output: {
		path: helpers.dest(),
		filename: '[name].bundle.js',
		sourceMapFilename: '[file].map',
		chunkFilename: '[id].chunk.js',

		library: 'ac_[name]',
		libraryTarget: 'var'
	},
	module: {
		rules: [
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
});
