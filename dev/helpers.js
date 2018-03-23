'use strict';

const
	path = require('path'),
	minimist = require('minimist');

/**
 * Constants
 */
const
	CLIENT_FOLDER = 'client',
	PUBLIC_FOLDER = 'public',
	ARGS = minimist(process.argv.slice(2)),
	ROOT_PATH = path.resolve(__dirname, '..'),
	NPM_EVENT = process.env.npm_lifecycle_event || '',
	ENV = getEnvName(ARGS.environment || ARGS.env || process.env.NODE_ENV || process.env.ENV || 'production');

resetEnvironment(ENV);

/**
 * Object of arguments
 * @type {Object.<string, string|boolean>}
 */
exports.args = ARGS;

/**
 * Path from root of project
 * @param {...string} part - parts of path related to root of project
 * @returns {string}
 */
exports.root = path.join.bind(path, ROOT_PATH);

/**
 * Path from client folder
 * @param {...string} parts - Path parts to add after base string
 * @returns {string}
 */
exports.client = path.join.bind(path, ROOT_PATH, CLIENT_FOLDER);

/**
 * Path from destination folder
 * @param {...string} parts - Path parts to add after base string
 * @returns {string}
 */
exports.dest = path.join.bind(path, ROOT_PATH, PUBLIC_FOLDER);

/**
 * Check if process has flag
 * @param flag
 * @returns {boolean}
 */
exports.hasProcessFlag = flag => process.argv.join('').includes(flag);

/**
 * Check if has special npm flag
 * @param flag
 * @returns {boolean}
 */
exports.hasNpmFlag = flag => NPM_EVENT.includes(flag);

exports.resetEnvironment = resetEnvironment;

/**
 * Get normalized environment name
 * @param {string} [env] - environment name
 * @returns {string} - normalized environment name (default is production)
 */
function getEnvName(env) {
	// Default is production environment
	let normalized = 'production';

	// Choose environment
	switch (env) {
		case 'test':
		case 'testing':
			normalized = 'test';
			break;
		case 'dev':
		case 'development':
			normalized = 'development';
	}
	return normalized;
}

/**
 * Reset global environment variables
 * @param {string} env - environment name
 */
function resetEnvironment(env) {
	env = getEnvName(env);
	process.env.ENV = process.env.NODE_ENV = env;

	/**
	 * Current environment
	 * @type {string}
	 */
	exports.env = env;
	/**
	 * Indicate if current environment is production
	 * @type {boolean}
	 */
	exports.isProduction = env === 'production';
	/**
	 * Indicate if current environment is development
	 * @type {boolean}
	 */
	exports.isDevelopment = env === 'development';
	/**
	 * Indicate if current environment is test
	 * @type {boolean}
	 */
	exports.isTest = env === 'test';

	return exports;
}
