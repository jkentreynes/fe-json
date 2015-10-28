'use strict'

var _               = require( 'lodash' );
var Promise         = require( 'bluebird' );
var LoginPage       = require( process.cwd() + '/page-objects/login/login.page.js' );

describe( 'View Template', function () {
	var loginPage = new LoginPage();

	beforeAll( function () {
		loginPage.navigate();
		loginPage.login( 'testfoo', 'testfoo' );
		browser.waitForAngular();
	} );

	it( 'should view a template', function () {
		browser.get( 'http://192.168.99.100/#!/template/9c61387a-131e-470a-9ac4-8409a844bd90' );
	} );

	it( 'should start scraping', function ( done ) {
		var TemplateChecker = require( process.cwd() + '/template-checker.js' );

		TemplateChecker.scrapeGroups( done ).then( function () {
			console.log('done scraping');
			done();
		} );
	} );
} );