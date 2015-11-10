'use strict';

( function () {
	var initialize = function () {
		var footer                  = element( by.css( '[class="edit-template-footer"]' ) );
		var filterContainerViewMode = element.all( by.css( '[class="dropdown filter-view hidden-sm"]' ) );
		var groupForms              = element( by.css( '[ng-form="groups"]' ) );
		var groupContainer          = groupForms.all( by.css( '[collection="vm.collection"]' ) );

		// CREATE TEMPLATE
		this.createTemplateBtn       = element( by.css( '[ng-click="vm.openCreateModal();"]' ) );
		this.createTemplateModal     = element( by.css( '[class="modal-content"]' ) );
		this.createTemplateName      = element( by.model( 'vm.model.template.name' ) );
		this.createTemplateCreateBtn = element( by.css( '[data-ng-click="vm.okModal( templateNameForm.$invalid )"]' ) );
		this.createTemplateCloseBtn  = element( by.css( '[data-ng-click="vm.cancelModal()"]' ) );
		this.templateName            = element( by.model( 'vm.model.template.name' ) );

		// GROUP
		this.groupContainer = groupContainer;
		this.groupName      = element( by.model( 'vm.model.groupName' ) );

		// INDICATORS
		this.indicatorPlaceHolder       = element.all( by.css( '[ng-form="labelForm"][view-mode="vm.viewMode"] .indicator-label' ) );
		this.indicatorTitle             = element( by.css( '[name=questionText]' ) );
		this.headerAddItemBtn           = element.all( by.css( '.panel-heading .btn-group.indicator-bank' ) );
		this.headerAddIndicatorItemMenu = element.all( by.css( '.panel-heading [ng-repeat="( key, value ) in ::vm.getIndicators()"]' ) );

		// INDICATOR: MC
		this.multipleChoiceOptionDesc           = element.all( by.model( 'option.optionText' ) );
		this.multipleChoiceOptionScore          = element.all( by.model( 'option.tempValue' ) );
		this.multipleChoiceAddOption            = element( by.css( '[ng-click="vm.addOptionHandler()"]' ) );
		this.multiChoiceSubOptionDescContainer  = element.all( by.css( '[class="col-xs-8 col-sm-9 col-md-10 score-divide"] [ng-repeat="option in vm.model.answerOptions track by $index"]' ) );
		this.multiChoiceSubOptionScoreContainer = element.all( by.css( '[class="col-xs-4 col-sm-3 col-md-2 score-divide ng-scope"] [ng-repeat="option in vm.model.answerOptions track by $index"]' ) );
		this.multiChoiceAddSubOption            = element.all( by.css( '[ng-click="vm.addSubOptionHandler( option )"]' ) );
		this.multiSelectOptionCheckbox          = element.all( by.css( '[ng-checked="option.type == = 3"]' ) );

		// INDICATOR: RUBRIC
		this.rubStdTitleFld           = element.all( by.model( 'model.optionText' ) );
		this.rubStdDescFld            = element.all( by.css( '[name="rdescription"]' ) );
		this.rubScoreFld              = element.all( by.model( 'model.tempValue' ) );
		this.rubAddStdBtn             = element( by.css( '[ng-click="vm.addStandardHandler()"]' ) );

		// RUBRIC SCRAPE
		this.rubStdTitles = element.all( by.css( '[data-ng-repeat="model in vm.model.answerOptions track by $index"] [class="ng-scope col-lg-11 col-md-11 col-sm-11"]' ) );

		// FILTERS
		this.filterContainerViewMode = filterContainerViewMode;
		this.filterDropDownBtn       = element.all( by.css( '[class="dropdown filter-view hidden-sm"] [ng-disabled="vm.checkOpen()"]' ) );
		this.filterDeleteBtn         = element.all( by.css( '[class="dropdown filter-view hidden-sm"] [ng-click="vm.onDelete( { \'filter\' : vm.model } )"]' ) );
		this.filterAddBtn            = element( by.css( '[ng-click="vm.addFilterCategoryHandler()"]' ) );

		// FOOTER
		this.footer              = footer;
		this.footerPrintBtn      = footer.element( by.css( '[print]' ) );
		this.footerAddGroupBtn   = footer.element( by.css( '[data-ng-click="vm.addGroup()"]' ) );
		this.footerReorderBtn    = footer.element( by.css( '[reorder]' ) );
		this.footerFormulaBtn    = footer.element( by.css( '[ng-click="vm.viewFormula()"]' ) );
		this.footerSaveStatusMsg = footer.element( by.binding( 'vm.isSaving' ) );
		this.footerSaveCloseBtn  = footer.element( by.css( '[data-ng-click="vm.close( templateForm.$invalid )"]' ) );
	};

	var navigate = function navigate () {
		this.initialize();
		browser.get( '#!/templates' );
	};

	// CREATE NEW TEMPLATE
	var generateTemplateName = function generateTemplateName () {
		this.initialize();
		var d            = new Date();
		var templateName = 'Automated Template - ' + d;
		return templateName;
	};

	var checkIfCreateTempBtnExist = function checkIfCreateTempBtnExist () {
		this.initialize();
		return this.createTemplateBtn.isPresent();
	};

	var clickCreateTemplateBtn = function clickCreateTemplateBtn () {
		this.initialize();
		this.createTemplateBtn.click();
	};

	var closeCreateTemplateModal = function closeCreateTemplateModal () {
		this.initialize();
		this.createTemplateCloseBtn.click();
	};

	var clearTemplateName = function clearTemplateName () {
		this.initialize();
		this.createTemplateName.clear();
	};

	var enterTemplateName = function enterTemplateName ( templateName ) {
		this.initialize();
		this.createTemplateName.sendKeys( templateName );
	};

	var createTemplate = function createTemplate () {
		this.initialize();
		this.createTemplateCreateBtn.click();
	};

	// FOOTER FUNCTIONS
	var addGroupViaFooter = function addGroupViaFooter () {
		this.initialize();
		this.footerAddGroupBtn.click();
	};

	var showFormulaModal = function showFormulaModal () {
		this.initialize();
		this.footerFormulaBtn.click();
	};

	var saveAndCloseTemplate = function saveAndCloseTemplate () {
		this.initialize();
		this.footerSaveCloseBtn.click();
	};

	// ADD FILTER FUNCTIONS
	var addNewFilter = function addNewFilter () {
		this.initialize();
		this.filterAddBtn.click();
	};

	var removeFilter = function removeFilter ( filterIndex ) {
		this.initialize();
		this.filterContainerViewMode.get( filterIndex ).element( by.css( '[ng-click="vm.onDelete( { \'filter\' : vm.model } )"]' ) ).click();
	};

	var openFilterEditMode = function openFilterEditMode ( filterIndex ) {
		this.initialize();
		this.filterDropDownBtn.get( filterIndex ).click();
	};

	var getFilterDropDownName = function getFilterDropDownName ( filterIndex ) {
		this.initialize();
		return this.filterDropDownBtn.get( filterIndex ).element( by.css( '.filter-name' ) );
	};

	var getDeleteBtnPerFilter = function getDeleteBtnPerFilter ( filterIndex ) {
		this.initialize();
		return this.filterContainerViewMode.get( filterIndex ).element( by.css( '[ng-click="vm.onDelete( { \'filter\' : vm.model } )"]' ) );
	};

	// GROUP FUNCTIONS
	var enterGroupName = function enterGroupName ( groupName ) {
		this.initialize();
		this.groupName.click().clear().sendKeys( groupName );
	};

	var getGroupName = function getGroupName () {
		this.initialize();
		return this.groupName.getAttribute( 'value' );
	};

	// INDICATOR FUNCTIONS
	var clickIndicatorToEdit = function clickIndicatorToEdit ( indicatorIndex ) {
		this.initialize();
		this.indicatorPlaceHolder.get( indicatorIndex ).click();
	};

	var selectIndicatorHeader = function selectIndicatorHeader ( index ) {
		this.initialize();
		this.headerAddItemBtn.get( index ).click();
	};

	var selectIndicatorItemMenuHeader = function selectIndicatorItemMenuHeader ( index ) {
		this.initialize();
		this.headerAddIndicatorItemMenu.get( index ).click();
	};

	var filloutIndicatorTitle = function filloutIndicatorTitle ( indicatortitle ) {
		this.initialize();
		this.indicatorTitle.clear().sendKeys( indicatortitle );
	};

	// INDICATOR FUNCTIONS: MC
	var enterMultiChoiceOptDesc = function enterMultiChoiceOptDesc ( mcOptDescIndex, mcOptDesc ) {
		this.initialize();
		this.multipleChoiceOptionDesc.get( mcOptDescIndex ).clear().sendKeys( mcOptDesc );
	};

	var enterMultiChoiceOptionScore = function enterMultiChoiceOptionScore ( indexOptScore, optionScore ) {
		this.initialize();
		this.multipleChoiceOptionScore.get( indexOptScore ).clear().sendKeys( optionScore );
	};

	var addMultiChoiceOption = function addMultiChoiceOption () {
		this.initialize();
		this.multipleChoiceAddOption.click();
	};

	var selectMultiSelectOption = function selectMultiSelectOption () {
		this.initialize();
		this.multiSelectOptionCheckbox.click();
	};

	var addMultiChoiceSubOption = function addMultiChoiceSubOption ( mcAddSubOptIndex ) {
		this.initialize();
		this.multiChoiceAddSubOption.get( mcAddSubOptIndex ).click();
	};

	var getSubOptDescFromParentOpt = function getSubOptDescFromParentOpt ( optionIndex, indexSubOptDesc ) {
		this.initialize();
		var parentOption  = this.multiChoiceSubOptionDescContainer.get( optionIndex );
		var subOptionDesc = parentOption.all( by.css( '.sub-option-form' ) ).get( indexSubOptDesc );
		return subOptionDesc;
	};

	var enterMultiChoiceSubOptDesc = function enterMultiChoiceSubOptDesc ( optionIndex, indexSubOptDesc, subOptDesc ) {
		this.initialize();
		var parentOption  = this.multiChoiceSubOptionDescContainer.get( optionIndex );
		var subOptionDesc = parentOption.all( by.css( '.sub-option-form' ) ).get( indexSubOptDesc );
		subOptionDesc.clear().sendKeys( subOptDesc );
	};

	var getSubOptScoreFromParentOpt = function getSubOptScoreFromParentOpt ( optionIndex, indexSubOptScore ) {
		this.initialize();
		var parentOption   = this.multiChoiceSubOptionScoreContainer.get( optionIndex );
		var subOptionScore = parentOption.all( by.model( 'subOption.tempValue' ) ).get( indexSubOptScore );
		return subOptionScore;
	};

	var enterMultiChoiceSubOptScore = function enterMultiChoiceSubOptScore ( optionIndex, indexSubOptScore, subOptScore ) {
		this.initialize();
		var parentOption   = this.multiChoiceSubOptionScoreContainer.get( optionIndex );
		var subOptionScore = parentOption.all( by.model( 'subOption.tempValue' ) ).get( indexSubOptScore );
		subOptionScore.clear().sendKeys( subOptScore );
	};

	// INDICATOR FUNCTIONS: RUBRIC
	var enterRubStandardTitle = function enterRubStandardTitle ( rubStdTitleIndex, rubStdTitle ) {
		this.initialize();
		this.rubStdTitleFld.get( rubStdTitleIndex ).clear().sendKeys( rubStdTitle );
	};

	var enterRubStdDesc = function enterRubStdDesc ( rubStdDescIndex, rubStdDesc ) {
		this.initialize();
		this.rubStdDescFld.get( rubStdDescIndex ).clear().sendKeys( rubStdDesc );
	};

	var enterRubScore = function enterRubScore ( rubScoreIndex, rubScore ) {
		this.initialize();
		this.rubScoreFld.get( rubScoreIndex ).clear().sendKeys( rubScore );
	};

	var addRubStandard = function addRubStandard () {
		this.initialize();
		this.rubAddStdBtn.click();
	};

	var getRubricStdTitle = function getRubricStdTitle () {
		// this.initialize();
		// return element.all( by.css( '[data-ng-repeat="model in vm.model.answerOptions track by $index"] [class="ng-scope col-lg-11 col-md-11 col-sm-11"]' ) ).get( rStdIndex ).getText();
		return this.rubStdTitles.getText();
	}

	var TemplatesPage = function TemplatesPage () { };

	TemplatesPage.prototype = {
		'initialize'                    : initialize,
		'navigate'                      : navigate,
		'generateTemplateName'          : generateTemplateName,
		'clickCreateTemplateBtn'        : clickCreateTemplateBtn,
		'closeCreateTemplateModal'      : closeCreateTemplateModal,
		'clearTemplateName'             : clearTemplateName,
		'enterTemplateName'             : enterTemplateName,
		'createTemplate'                : createTemplate,
		'checkIfCreateTempBtnExist'     : checkIfCreateTempBtnExist,
		'showFormulaModal'              : showFormulaModal,
		'saveAndCloseTemplate'          : saveAndCloseTemplate,
		'addNewFilter'                  : addNewFilter,
		'removeFilter'                  : removeFilter,
		'openFilterEditMode'            : openFilterEditMode,
		'getFilterDropDownName'         : getFilterDropDownName,
		'getDeleteBtnPerFilter'         : getDeleteBtnPerFilter,
		'getGroupName'                  : getGroupName,
		'enterGroupName'                : enterGroupName,
		'addGroupViaFooter'             : addGroupViaFooter,
		'clickIndicatorToEdit'          : clickIndicatorToEdit,
		'selectIndicatorHeader'         : selectIndicatorHeader,
		'selectIndicatorItemMenuHeader' : selectIndicatorItemMenuHeader,
		'filloutIndicatorTitle'         : filloutIndicatorTitle,
		'enterMultiChoiceOptDesc'       : enterMultiChoiceOptDesc,
		'enterMultiChoiceOptionScore'   : enterMultiChoiceOptionScore,
		'addMultiChoiceOption'          : addMultiChoiceOption,
		'selectMultiSelectOption'       : selectMultiSelectOption,
		'addMultiChoiceSubOption'       : addMultiChoiceSubOption,
		'getSubOptDescFromParentOpt'    : getSubOptDescFromParentOpt,
		'enterMultiChoiceSubOptDesc'    : enterMultiChoiceSubOptDesc,
		'getSubOptScoreFromParentOpt'   : getSubOptScoreFromParentOpt,
		'enterMultiChoiceSubOptScore'   : enterMultiChoiceSubOptScore,
		'enterRubStandardTitle'         : enterRubStandardTitle,
		'enterRubStdDesc'               : enterRubStdDesc,
		'getRubricStdTitle'             : getRubricStdTitle,
		'enterRubScore'                 : enterRubScore,
		'addRubStandard'                : addRubStandard
	};

	module.exports = TemplatesPage;
} )();
