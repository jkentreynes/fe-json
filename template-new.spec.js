'use strict'
/* eslint no-undef:0 */
var LoginPage    = require( '../test/e2e/login/login.page.js' );
var TemplateBody = require( './mc-page.js' );
var Calendar     = require( '../test/e2e/calendar/calendar.page.js' );

describe( 'POC templates', function () {

	var templateBody = new TemplateBody();
	var loginPage    = new LoginPage();
	var calendar     = new Calendar();

	beforeAll( function () {
		loginPage.navigate();
		browser.waitForAngular();
	} );

	it( 'should log the user in', function () {
		loginPage.login( 'tyler.hansen', 'tylergo' );
		expect( calendar.calendarLanding.isPresent() ).toBe( true );
	} );

	it( 'should test if parent referencing is ok', function (  ) {
		templateBody.navigate();
		templateBody.checkForMc();
	} );

} );