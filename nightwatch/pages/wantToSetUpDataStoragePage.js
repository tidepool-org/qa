'use strict';

module.exports = {
    elements: {
        setUpDataSubmitButtonNo: {
            selector: 'button.btn.btn-tertiary'
        },
        setUpDataSubmitButtonYes: {
            selector: 'button.btn.btn-primary'
        }
    },
    commands: [{
        setUpData: function (setUpData) {
            
            this
                .waitForElementPresent('@setUpDataSubmitButtonYes')
                .pauseAndSaveScreenshot(10000, 'do-you-want-to-set-up-data-page');
            
            if (setUpData) {
                this.click('@setUpDataSubmitButtonYes');
            } else {
                this.click('@setUpDataSubmitButtonNo');
            }
        
            return this;
        }
    }]
};
