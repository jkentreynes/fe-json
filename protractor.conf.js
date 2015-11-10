'use strict';
/* jshint -W117 */
/* eslint no-undef:0 */

var HtmlReporter = require( 'protractor-html-screenshot-reporter' );

var reporter = new HtmlReporter( {
	'baseDirectory' : './protractor-result', // a location to store screen shots.
	'docTitle'      : 'Edivate Observe e2e results',
	'docName'       : 'index.html'
} );

exports.config = {

	// The address of a running selenium server.
	'seleniumAddress' : 'http://localhost:4444/wd/hub',
//
	// The address where our server under test is running
	// 'baseUrl' : 'http://localhost:8000/build/',
	// 'baseUrl' : 'http://192.168.99.100/',
	'baseUrl' : 'https://dev.observe.edivate.com/#!/',
	// Capabilities to be passed to the webdriver instance.
	'capabilities' : {
		'browserName' : 'chrome'
	},

	'allScriptsTimeout' : 120000,

	// Spec patterns are relative to the location of the // spec file. They may include glob patterns.
	'specs' : [ 'specs/**/*.spec.js' ],

	'framework' : 'jasmine2',

	// Options to be passed to Jasmine-node.
	'jasmineNodeOpts' : {
		'showColors'             : true, // Use colors in the command line report.
		'defaultTimeoutInterval' : 1200000,
		// 'print'                  : function () {}
	},

	// Set the browser's window size
	'onPrepare' : function () {
		var SpecReporter = require( 'jasmine-spec-reporter' );
		browser.manage().window().setSize( 1888, 1062 );
		// browser.driver.manage().window().maximize();

		// add jasmine spec reporter
		jasmine.getEnv().addReporter( new SpecReporter( { 'displayStacktrace' : true } ) );
		jasmine.getEnv().addReporter( reporter );
	}

};