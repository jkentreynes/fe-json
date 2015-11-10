'use strict';

function groupsQuickAccess () {
	return element.all( by.css('li[data-ng-repeat="group in groups track by $index"]') );
}

function clickGroup ( index ) {
	return groupsQuickAccess().get( index ).click();
};

function getGroups () {
	return groupsQuickAccess();
};

function getGroupName() {
	// return element( by.css('input[name="groupname"]') ).getAttribute('value').then( function ( value ) {
	// 	return value;
	// } );
	return element( by.css('[class="group-name-view form-control hidden-md visible-lg ng-binding"]') ).getText();
}


// GET TEMPLATE NAME
function getTemplateName () {
	return  element( by.css( '[class="template-name-view form-control hidden-md visible-lg ng-binding"]' ) ).getText();
}
//////////////////////////////////////////////////////

// RUBRIC PAGE OBJECTS
function getRubricStdTitle () {
	return element.all( by.css( '[data-ng-repeat="model in vm.model.answerOptions track by $index"] [class="ng-scope col-lg-11 col-md-11 col-sm-11"]' ) );
}

function getRubricStdDescription () {
	return element.all( by.css( '[data-ng-repeat="model in vm.model.answerOptions track by $index"] [collapse="collapse && $parent.$parent.vm.viewMode"]' ) );
}

//////////////////////////////////////////////////////

exports.getGroups               = getGroups;
exports.clickGroup              = clickGroup;
exports.getGroupName            = getGroupName;

// GET TEMPLATE NAME
exports.getTemplateName         = getTemplateName;

// GET RUBRIC TITLE AND STANDARS
exports.getRubricStdTitle       = getRubricStdTitle;
exports.getRubricStdDescription = getRubricStdDescription;

