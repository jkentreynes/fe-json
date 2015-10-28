'use strict';
var _                  = require( 'lodash' );
var Promise            = require( 'bluebird' );
var clc                = require( 'cli-color' );
var fs                 = require( 'fs-extra' );
var LoginPage          = require( './page-objects/login/login.page.js' );
var GroupPage          = require( './page-objects/template/groups.page.js' );
var IndicatorsPage     = require( './page-objects/template/indicators.page.js' );
var LabelPage          = require( './page-objects/template/label.page.js' );
var MultipleChoicePage = require( './page-objects/template/multiple-choice-indicator.page.js' );
var ddjson             = require( './test.json' );

var indicatorsArray      = [];
var groupsArray          = [];
var answerOptionsArray   = [];
var templateJson         = {};
var groupsObject         = {};
var labelObject          = {};
var openEndedObject      = {};
var multipleChoiceObject = {};
var rubricObject         = {};
var answerOptionsObject  = {};

function scrapeGroups() {

	return GroupPage.getGroups().then( function ( array ) {
		_.forEach( array, function ( group, index ) {
			GroupPage.clickGroup( index ).then( function () {
				GroupPage.getGroupName().then( function ( groupName ) {
					scrapeIndicators( index, array.length ).then(function () {
						groupsObject       = {};
						groupsObject.name  = groupName;
						groupsArray[index] = groupsObject;
					} );
				} );
			} );
		} );
	} );
}

function scrapeIndicators( groupIndex, groupsLength ) {

	return IndicatorsPage.getIndicators().then( function ( array ) {
		indicatorsArray =  [];
		_.forEach( array, function ( indicator, index ) {
			IndicatorsPage.getIndicatorType( indicator ).then( function ( indicatorType ) {
				IndicatorsPage.getIndicatorTitle( indicator ).then( function ( title ) {
					if (indicatorType === null) {
						indicatorType = 'Label';
						labelObject = {};
						labelObject.type = 5;
						labelObject.questionText = title;
						indicatorsArray[index] = labelObject;
					} else if( indicatorType === ( 'Multiple Choice' || 'Multiple Choices' ) ) {
						multipleChoiceObject = {};
						multipleChoiceObject.type = 2;
						multipleChoiceObject.questionText = title;
						indicatorsArray[index] = multipleChoiceObject;
						scrapeMCOptions( indicator, groupIndex, index, multipleChoiceObject );
					} else if ( indicatorType === 'Rubric' ) {
						rubricObject = {};
						rubricObject.type = 4;
						rubricObject.questionText = title;
						indicatorsArray[index] = rubricObject;
						// scrapeRubric();
					} else {
						openEndedObject = {};
						openEndedObject.type = 1;
						openEndedObject.questionText = title;
						indicatorsArray[index] = openEndedObject;
					}


					if ( index === array.length - 1 ) {
						console.log(indicatorsArray);
						groupsObject.indicators = indicatorsArray;
						groupsObject = JSON.stringify( groupsObject );
						groupsArray[groupIndex] = groupsObject;
					}
					if ( groupIndex === groupsLength - 1 ) {
						fs.outputFileSync( './output.json', groupsArray);
					}
				} );
			} );
		} );
	} );
}

function scrapeMCOptions( indicator, groupIndex, indicatorIndex, multipleChoiceObject ) {

	console.log('inside scrape MC');

	return GroupPage.clickGroup( groupIndex ).then( function () {
		return  MultipleChoicePage.getMultipleChoiceOptions( indicator ).then( function ( options ) {
			_.forEach( options, function ( indicator, index ) {
				answerOptionsArray = [];
				MultipleChoicePage.getOptionText( indicator ).then( function ( text ) {
					answerOptionsObject = {};
					console.log('options length: ' + options.length);
					answerOptionsObject.optionText = text;
					answerOptionsArray.push( answerOptionsObject );

					console.log( 'options index: ' + index);
					console.log( answerOptionsArray );
					console.log( 'group index: ' + groupIndex );
					if ( index === options.length - 1 ){
						console.log(' index === options.length - 1');
						multipleChoiceObject.answerOptions = answerOptionsArray;
						indicatorsArray[index] = multipleChoiceObject;
					}
				} );
			} );
		} );
	} );
}

function scrapeMCSubOptions( indicator, groupIndex, index ) {
	// return MultipleChoicePage.getMultipleChoiceOptions( indicator ).then( function ( array ) {
	// 	_.forEach( array, function ( option, index ) {
	// 		MultipleChoicePage.getOptionText( option ).then( function ( optionText ) {
	// 			console.log( optionText );
	// 		} );
	// 	} )
	// } );
	return;
}

function scrapeRubric() {
	return;
}

exports.scrapeGroups = scrapeGroups;
