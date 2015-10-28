'use strict';

function multipleChoiceOptions ( indicator ) {
	return indicator.all( by.css( 'div[ng-repeat="option in vm.model.answerOptions track by $index"]') );
}

function getMultipleChoiceOptions ( indicator ) {
	return multipleChoiceOptions( indicator );
}

function getOptionText( element ) {
	return element.element( by.binding(' ::option.optionText ') ).getText();
}

function subOptions () {
	return element.all( by.css('div[ng-repeat="subOption in option.subOptions track by $index"]') );
}

function getSubOptions () {
	return subOptions().then( function ( array ) {
		return array;
	} );
}

exports.getMultipleChoiceOptions = getMultipleChoiceOptions;
exports.getSubOptions            = getSubOptions;
exports.getOptionText            = getOptionText;
exports.getSubOptions            = getSubOptions;