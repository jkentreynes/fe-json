'use strict';

( function () {
	var navigate = function () {
		browser.get( '#!/login' );
	};

	var login = function ( username, password ) {
		this.username.clear().sendKeys( username );
		this.password.clear().sendKeys( password );
		this.loginFrm.submit();
	};

	var LoginPage = function () {
		var content = element( by.css( '#content' ) );

		this.MISSING_MSG = 'Some fields are missing.';
		this.username = content.element( by.model( 'vm.username' ) );
		this.password = content.element( by.model( 'vm.password' ) );
		this.loginFrm = content.element( by.css( '[data-ng-submit="vm.login( vm.username, vm.password )"]' ) );
		this.errorMsg = content.element( by.binding( 'vm.errorMessage' ) );
	};

	LoginPage.prototype.navigate = navigate;
	LoginPage.prototype.login    = login;

	module.exports = LoginPage;
} )();