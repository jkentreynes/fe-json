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
var mChoicePage        = require( './page-objects/mc.page.js' );
var ddjson             = require( './test.json' );
var templatePage       = require( './page-objects/template.page.js' );
var filespath;
var fname;

var mcPage               = new mChoicePage();
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
var groupsContObject     = {};
var templateObject       = {};

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
						indicatorType            = 'Label';
						labelObject              = {};
						labelObject.type         = 5;
						labelObject.questionText = title;
						indicatorsArray[index]   = labelObject;
					} else if( indicatorType === ( 'Multiple Choice' || 'Multiple Choices' ) ) {
						multipleChoiceObject              = {};
						multipleChoiceObject.type         = 2;
						multipleChoiceObject.questionText = title;
						indicatorsArray[index]            = multipleChoiceObject;
						scrapeMCOptions( indicator, groupIndex, index, multipleChoiceObject );
						// indicatorsArray[index] = mcPage.checkForMc().then// tempObj
						// console.log(indicatorsArray);
					} else if ( indicatorType === 'Rubric' ) {
						rubricObject              = {};
						rubricObject.type         = 4;
						rubricObject.questionText = title;
						indicatorsArray[index]    = rubricObject;
						var rubTitle = element.all( by.css( '[data-ng-repeat="model in vm.model.answerOptions track by $index"] [class="ng-scope col-lg-11 col-md-11 col-sm-11"]' ) );


						// scrapeRubric( indicator, index, rubricObject );
						// console.log(templatePage.getRubricStdTitle());
					} else {
						openEndedObject              = {};
						openEndedObject.type         = 1;
						openEndedObject.questionText = title;
						indicatorsArray[index]       = openEndedObject;
					}


					if ( index === array.length - 1 ) {

						groupsObject.indicators = indicatorsArray;
						groupsArray[groupIndex] = groupsObject;
						groupsContObject        = {};
						groupsContObject.groups = groupsArray;

						GroupPage.getTemplateName().then( function ( templateName ) {
							templateObject      = groupsContObject;
							templateObject.name = templateName;
							var tname = templateName;
							// fname = tname.slice(0,3);
							fname = '[SCRAPE]:' + tname;
						} );
						templateObject = JSON.stringify( templateObject );
						filespath = ('./' + fname + '.json');
					}
					if ( groupIndex === groupsLength - 1 ) {
						// fs.outputFileSync( './output.json', templateObject );
						fs.outputFileSync( filespath, templateObject );
					}
				} );
			} );
		} );
	} );
}

// function scrapeMCOptions( indicator, groupIndex, indicatorIndex, multipleChoiceObject ) {

// 	return GroupPage.clickGroup( groupIndex ).then( function () {
// 		return  MultipleChoicePage.getMultipleChoiceOptions( indicator ).then( function ( options ) {
// 			_.forEach( options, function ( indicator, optionsIndex ) {
// 				answerOptionsArray = [];
// 				MultipleChoicePage.getOptionText( indicator ).then( function ( text ) {
// 					answerOptionsObject = {};
// 					answerOptionsObject.optionText = text;
// 					answerOptionsArray.push( answerOptionsObject );

// 					if ( optionsIndex === options.length - 1 ){
// 						multipleChoiceObject.answerOptions = answerOptionsArray;
// 						indicatorsArray[optionsIndex] = multipleChoiceObject;
// 						answerOptionsArray = indicatorsArray;
// 					console.log( JSON.stringify(answerOptionsArray));
// 					console.log('==================================');
// 					}
// 				} );
// 			} );
// 		} );
// 	} );
// }



function scrapeMCOptions( indicator, groupIndex, indicatorIndex, multipleChoiceObject ) {

	return GroupPage.clickGroup( groupIndex ).then( function () {
		return  MultipleChoicePage.getMultipleChoiceOptions( indicator ).then( function ( options ) {
			_.forEach( options, function ( indicator, optionsIndex ) {
				answerOptionsArray = [];
				MultipleChoicePage.getOptionText( indicator ).then( function ( text ) {
					answerOptionsObject = {};
					answerOptionsObject.optionText = text;
					answerOptionsArray.push( answerOptionsObject );

					if ( optionsIndex === options.length - 1 ){
						multipleChoiceObject.answerOptions = answerOptionsArray;
						indicatorsArray[optionsIndex] = multipleChoiceObject;
					console.log( JSON.stringify(answerOptionsArray));
					console.log('==================================');
					}
				} );
			} );
		} );
	} );
}


exports.scrapeGroups = scrapeGroups;
