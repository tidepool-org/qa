'use strict';

module.exports = {
    elements: {
        noSetUpDataSubmitButton: {
            selector: 'button.btn.btn-tertiary'
        },
        yesSetUpDataSubmitButton: {
            selector: 'button.btn.btn-primary'
        }
    },
    commands: [{
        setUpData: function (setUpData) {
            
            this
                .waitForElementPresent('@yesSetUpDataSubmitButton')
                .pauseAndSaveScreenshot(10000, 'do-you-want-to-set-up-data-page');
            
            if (setUpData) {
                this.click('@yesSetUpDataSubmitButton');
            } else {
                this.click('@noSetUpDataSubmitButton');
            }
        
            return this;
        }
    }]
};
