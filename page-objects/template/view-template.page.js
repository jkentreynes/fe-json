'use strict';

function searchTemplate () {
	return element( by.model( 'vm.searchTemplate[ vm.searchField ]' ) );
	// return element( by.css( 'class="form-group template-forms table-grid"' ) ).getAttribute();
}

exports.getTemplateName = getTemplateName;
