'use strict';

let
	helpers = require('./helpers'),
	packageJson = require(helpers.root('package.json'));

exports.main = packageJson.main;
exports.browserSyncPort = parseInt(helpers.args.port || helpers.args.p || 80);
exports.browserSyncServerPort = exports.browserSyncPort + 1;

exports.browserSyncReloadDelay = false;
