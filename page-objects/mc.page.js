'use strict';

	var Promise = require( 'bluebird' );

	var templateName;
	var mcTitles  = [];
	var mcOptions = [];
	var mcSubOPts = [];

	var initialize = function () {
		this.mcCollection  = element.all( by.repeater( "option in vm.model.answerOptions track by $index" ) );
		this.groupForm     = element( by.css( '[ng-form="groups"]' ) );
		this.nextGrpNav    = element( by.css( '[ng-disabled="!vm.isNotLast()"]' ) );
		this.templateTitle = element( by.css( 'input.template-name[ng-enter="vm.trimTemplateName()"]' ) );
		this.groupName     = element( by.model( "vm.model.groupName" ) );
		this.mcTitle       = element.all( by.css( '[default-text="Multiple Choice"] .indicator-label' ) );
		this.mcOption      = element.all( by.css( '.mc-indicator.view-mode > span[ng-if="vm.viewMode"]' ) );
		this.mcSubOption   = element.all( by.css( '.mc-sub-indicator.view-mode > div > span[ng-if="vm.viewMode"]' ) );
		this.indicators    = element.all( by.repeater( 'indicator in vm.model.indicators') );
	};

	var navigate = function () {
		browser.get( 'https://dev.observe.edivate.com/#!/template/02b5fd2b-bc13-40e9-a24e-d52178aa11e4' );
	};

	var tempName = function () {
		this.initialize();
		console.log( this.templateTitle.getAttribute( 'value' ) );
		return this.templateTitle.getAttribute( 'value' );
	};

	var getTemplateName = function () {
		this.initialize();
		return this.templateTitle.getAttribute( 'value' )
			.then( function ( name ) {
				templateName = name;
				return templateName;
			} );
	};

	var checkForMc = function checkForMc () {
		this.initialize();

		var childobj = {};
		var tempObj  = [];

		this.indicators.map( function ( elem, index ) {
			// Find title
			var multipleChoiceTitle = elem.all( by.css( '[default-text="Multiple Choice"] .indicator-label' ) );
			// var rubricTitle        = elem.all( by.css( '[default-text="Rubric"] .indicator-label' ) );

			mapParentObject( multipleChoiceTitle, index, true ).then(function () {

				// mapParentObject( rubricTitle, index );

				// Find options
				var mcOptionsTitle = elem.all( by.repeater( 'option in vm.model.answerOptions track by $index' ) );

				console.log('typeof mcOptionsTitle: ', typeof mcOptionsTitle);
				console.log(tempObj);

				mcOptionsTitle.map( function ( el, i ) {
				    var option = el.all( by.css( '<div class="mc-in"></div>dicator.view-mode span[ng-if="vm.viewMode"]') );
				    option.map( function ( mcOpt ) {
				        mcOpt.getText().then( function ( optionName ) {
				            if ( !tempObj[ index ].options ) {
				                tempObj[ index ].options = [];
				            }
				            tempObj[ index ].options[ i ] = {
				                'optionName' : optionName
				            }
				        } );
				    } );

				    // var subOptionsTitle = el.all( by.css( '.mc-sub-container span[ng-if="vm.viewMode"]') );
				    // subOptionsTitle.map( function ( mcSub, idx ) {
				    //     mcSub.getText().then( function ( mcSubTitle ) {
				    //         if ( !tempObj[ index ].options ) {
				    //             tempObj[ index ].options = [];
				    //         }
				    //         if ( !tempObj[ index ].options[i].subOptions ) {
				    //             tempObj[ index ].options[ i ].subOptions = [];
				    //         }
				    //         tempObj[ index ].options[ i ].subOptions[ idx ] = {
				    //             'subOptionsTitle' : mcSubTitle
				    //         }
				    //     } );
				    // } );

				} );
			} );

		} ).then( function () {
			console.log( '================ Showing tempObj ==========');
			console.log( JSON.stringify( tempObj ) )
			console.log('===================')
		} );

		function mapParentObject ( element, index, hasOptions ) {
			return element.getText().then( function ( titles ) {
				tempObj[ index ] = {
					'title'   : titles[ 0 ] || 'No title'
				};

				if ( hasOptions ) {
					tempObj[ index ].options = [];
				};
			} );
		}
		// function isNextGrp () {
		// 	var self = this;
		// 	this.initialize();
		// 	var nextGrpNav = element( by.css( '[ng-disabled="!vm.isNotLast()"]' ) );
		// 	nextGrpNav.isEnabled().then( function ( enabled ) {
		// 		if ( enabled ) {
		// 			//console.log( 'is the button displayed? ' + enabled );
		// 			nextGrpNav.click()
		// 				.then( checkForMc.bind( self ) );
		// 		};
		// 	} )
		// }

		// isNextGrp.bind(this)();

	};

	var TemplateBody = function TemplateBody () {};

	TemplateBody.prototype = {
		'initialize'      : initialize,
		'navigate'        : navigate,
		'checkForMc'      : checkForMc,
		'getTemplateName' : getTemplateName
	};

	module.exports = TemplateBody;