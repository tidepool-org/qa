'use strict';

module.exports = {
    elements: {
        setupDataStorageLink: {
            selector: 'a[href="/patients/new"]'
        }
    },
    
    commands: [{
        setUpDataStorage: function () {
            this
                .waitForElementPresent('@setupDataStorageLink')
                .pauseAndSaveScreenshot(5000, 'setup-data-storage-option')
                .click('@setupDataStorageLink')
            return this.api;
        }
    }]
};
