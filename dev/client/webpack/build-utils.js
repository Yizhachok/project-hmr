'use strict';

const
	path = require('path'),
	ts = require('typescript');

const helpers = require('../../helpers');

const UTILS_CONFIG = {
	HMR: helpers.hasProcessFlag('hot'),
	tsConfigPath: 'tsconfig.webpack.json',
	envFileSuffix: null
};

function supportES2015(tsConfigPath) {
	if (!supportES2015.hasOwnProperty('supportES2015')) {
		const tsTarget = readTsConfig(tsConfigPath).options.target;
		supportES2015['supportES2015'] = tsTarget !== ts.ScriptTarget.ES3 && tsTarget !== ts.ScriptTarget.ES5;
	}
	return supportES2015['supportES2015'];
}

function readTsConfig(tsConfigPath) {
	const configResult = ts.readConfigFile(tsConfigPath, ts.sys.readFile);
	return ts.parseJsonConfigFileContent(configResult.config, ts.sys,
		path.dirname(tsConfigPath), undefined, tsConfigPath);
}


exports.UTILS_CONFIG = UTILS_CONFIG;
exports.supportES2015 = supportES2015;
exports.readTsConfig = readTsConfig;
