'use strict';
var _                  = require( 'lodash' );
var Promise            = require( 'bluebird' );
var clc                = require('cli-color');
var LoginPage          = require( process.cwd() + '/page-objects/login/login.page.js' );
var GroupPage          = require( process.cwd() + '/page-objects/template/groups.page.js' );
var IndicatorsPage     = require( process.cwd() + '/page-objects/template/indicators.page.js' );
var LabelPage          = require( process.cwd() + '/page-objects/template/label.page.js' );
var MultipleChoicePage = require( process.cwd() + '/page-objects/template/multiple-choice-indicator.page.js' );
var ddjson             = require( './test.json' );

function scrapeGroups() {

	return GroupPage.getGroups().then( function ( array ) {
		_.forEach( array, function ( element, index ) {
			GroupPage.clickGroup( index ).then( function () {
				GroupPage.getGroupName().then( function ( groupName ) {
					if ( ddjson.groups[ index ].name === groupName ) {
						console.log(clc.green( ddjson.groups[ index ].name  + ' == ' + groupName ) );
					} else {
						console.log(clc.red( ddjson.groups[ index ].name  + ' != ' + groupName ) );
					}
					scrapeIndicators( index );
				} );
			} );
		} );
	} );
}

function scrapeIndicators( groupIndex ) {

	return IndicatorsPage.getIndicators().then( function ( array ) {
		_.forEach( array, function ( element, index ) {
			IndicatorsPage.iter( element ).then( function ( indicator ) {
				IndicatorsPage.getIndicatorTitle( element ).then( function ( title ) {
					if (indicator === null) {
						indicator = 'Label';
					}
					try {
						if ( ddjson.groups[groupIndex].indicators[index].questionText === title ) {
							console.log(clc.green(ddjson.groups[groupIndex].indicators[index].questionText + ' == ' + title));
						} else {
							console.log(clc.red(ddjson.groups[groupIndex].indicators[index].questionText + ' != ' + title));
						}
					} catch( err ) {
						throw err;
					}
					if( indicator === ( 'Multiple Choice' || 'Multiple Choices' ) ) {
						scrapeMCOptions( element, groupIndex, index );
					} else ( indicator === 'Rubric' ) {
						scrapeRubric();
					}
				} );
			} );
		} );
	} );
}

function scrapeMCOptions( element, groupIndex, indicatorIndex ) {

	return MultipleChoicePage.getMultipleChoiceOptions().then( function ( array ) {
		_.forEach( array, function ( element, index ) {
			MultipleChoicePage.getSubOptions().then( function ( array ) {
				MultipleChoicePage.getOptionText( element ).then( function ( text ) {
					try {
						if ( ddjson.groups[groupIndex].indicators[indicatorIndex].answerOptions[index].optionText === text ) {
							console.log(clc.green( ddjson.groups[groupIndex].indicators[indicatorIndex].answerOptions[index].optionText  + ' == ' + text ) );
						} else {
							console.log(clc.red( ddjson.groups[groupIndex].indicators[indicatorIndex].answerOptions[index].optionText  + ' != ' + text ) );
						}
					} catch ( err ){
						throw err;
					}
					if ( array ) {
						scrapeMCSubOptions();
					}
				} );
			} );
		} );
	} );
}

function scrapeMCSubOptions() {
	return;
}

function scrapeRubric() {
	return;
}

exports.scrapeGroups = scrapeGroups;
