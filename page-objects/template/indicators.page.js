'use strict';

function indicators () {
	return element.all( by.css( 'div[ng-repeat="indicator in vm.model.indicators"]' ) );
}

function getIndicators () {
	return indicators().then( function ( array ) {
		return ( array );
	} );
};

function getIndicatorType ( element ) {
	return element.element( by.css( 'div[ng-form="labelForm"]' ) ).getAttribute( 'default-text' );
}

function getIndicatorTitle ( element ) {
	return element.element( by.css('div[ng-form="labelForm"] div.indicator-label') ).getText();
}

exports.getIndicators     = getIndicators;
exports.getIndicatorType  = getIndicatorType;
exports.getIndicatorTitle = getIndicatorTitle;

