'use strict';

module.exports = {
    elements: {
        searchBar: {
            selector: 'input[type="search"]'
        },
        showAllHideAllToggle: {
            selector: 'a.peopletable-names-toggle'
        },
        showAllLink: {
            selector: '.peopletable-instructions > a'
        },
        firstPatientInTable: {
            selector: '.peopletable-cell-content'
        },
    },
    
    commands: [{
        viewPatientData: function () {
            this
                .waitForElementPresent('@showAllHideAllToggle')
                .pauseAndSaveScreenshot(20000, 'patients-page')
                .click('@showAllHideAllToggle')
                .pauseAndSaveScreenshot(10000, 'patients-table')
                .click('@firstPatientInTable');
            
            return this.api;
        }
    }]
};
