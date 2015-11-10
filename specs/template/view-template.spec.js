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
		browser.get( 'https://dev.observe.edivate.com/#!/template/02b5fd2b-bc13-40e9-a24e-d52178aa11e4' );
	} );

	it( 'should start scraping', function ( done ) {
		var TemplateChecker = require( process.cwd() + '/template-checker.js' );

		TemplateChecker.scrapeGroups( done ).then( function () {
			console.log('done scraping');
			done();
		} );
	} );
} );