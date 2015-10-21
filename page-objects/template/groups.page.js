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
	return element( by.css('input[name="groupname"]') ).getAttribute('value').then( function ( value ) {
		return value;
	} );
}

exports.getGroups    = getGroups;
exports.clickGroup   = clickGroup;
exports.getGroupName = getGroupName;

