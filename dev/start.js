'use strict';

const
	webpack = require('webpack'),
	browserSync = require('browser-sync'),
	httpProxyMiddleware = require('http-proxy-middleware'),
	webpackDevMiddleware = require('webpack-dev-middleware'),
	webpackHotMiddleware = require('webpack-hot-middleware');

const
	config = require('./config'),
	helpers = require('./helpers').resetEnvironment('development'),
	browserSyncInstance = browserSync.create(),
	webpackConfig = require('./client/webpack/development'),
	bundler = webpack(webpackConfig);

// Run browserSync with development webpack bundler
browserSyncInstance.init({
	port: config.browserSyncPort,
	server: {
		baseDir: helpers.dest(),
		middleware: [
			webpackDevMiddleware(bundler, {
				publicPath: webpackConfig.output.publicPath,
				stats: {
					colors: true
				},
				watchOptions: {
					aggregateTimeout: 300,
					poll: 1000
				}
			}),
			webpackHotMiddleware(bundler),
			httpProxyMiddleware(`http://localhost:${config.browserSyncServerPort}`)
		]
	},
	//files: `${helpers.dest()}/**/*`,
	reloadDelay: config.browserSyncReloadDelay,
	watchOptions: {
		ignoreInitial: true
	}
});
