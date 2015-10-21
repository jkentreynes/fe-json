'use strict';

function getTitle ( element ) {
	return element( by.css( '.indicator-label' ) );
}

exports.getTitle     = getTitle;
