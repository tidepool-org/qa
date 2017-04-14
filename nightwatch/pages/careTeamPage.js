'use strict';

module.exports = {
    elements: {
        setupDSALink: {
            selector: 'a[href="/patients/new"]'
        }
    },
    
    commands: [{
        setupDSA: function () {
            this
                .waitForElementPresent('@setupDSALink')
                .pauseAndSaveScreenshot(5000, 'setup-data-storage-option')
                .click('@setupDSALink');
            
            return this.api;
        }
    }]
};
