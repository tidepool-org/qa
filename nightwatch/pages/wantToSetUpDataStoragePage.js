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
        setUpData: function (setUpDataYesOrNo) {
            
            this
                .waitForElementPresent('@yesSetUpDataSubmitButton')
                .pauseAndSaveScreenshot(10000, 'do-you-want-to-set-up-data-page');
            
            if (setUpDataYesOrNo.toLowerCase().indexOf('n') === 0) {
                this.click('@noSetUpDataSubmitButton');
            } else {
                this.click('@yesSetUpDataSubmitButton');
            }
        
            return this;
        }
    }]
};
