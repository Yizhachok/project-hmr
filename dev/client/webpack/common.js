'use strict';

const
	ngcWebpack = require('ngc-webpack'),
	HtmlWebpackPlugin = require('html-webpack-plugin');

const
	helpers = require('../../helpers'),
	buildUtils = require('./build-utils');

module.exports = function (utilsConfig = {}) {
	const supportES2015 = buildUtils.supportES2015(utilsConfig.tsConfigPath);

	const entry = {
		polyfills: './client/polyfills.ts',
		main: './client/main.ts',
		hmr: 'webpack-hot-middleware/client'
	};

	return {
		mode: helpers.env,
		entry: entry,
		resolve: {
			mainFields: [
				...(supportES2015 ? ['es2015'] : []),
				'browser',
				'module',
				'main'
			],
			extensions: [
				'.ts',
				'.js',
				'.json'
			],
			modules: [
				helpers.client(),
				helpers.root('node_modules')
			]
		},
		module: {
			rules: [
				{
					test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
					use: [ '@ngtools/webpack' ]
				},
				{
					test: /\.pug$/,
					use: [
						'raw-loader',
						{
							loader: 'pug-html-loader',
							options: {
								pretty: helpers.isDevelopment,
								exports: false,
								doctype: 'html'
							}
						}
					]
				}
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: 'client/index.pug',
				inject: 'body',
				xhtml: true,
			}),
			new ngcWebpack.NgcWebpackPlugin({
				tsConfigPath: utilsConfig.tsConfigPath,
				mainPath: entry.main,
				skipCodeGeneration: false,
				sourceMap: true,
				hostReplacementPaths: {
					[helpers.client('environments/environment.ts')]: helpers.client(`environments/environment.hmr.ts`)
				}
			})
		]
	};
};
