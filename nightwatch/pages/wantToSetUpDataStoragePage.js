'use strict';

module.exports = {
    elements: {
        submitNoSetUpData: {
            selector: 'button.btn.btn-tertiary'
        },
        submitYesSetUpData: {
            selector: 'button.btn.btn-primary'
        }
    },
    commands: [{
        setUpData: function (setUpDataYesOrNo) {
            
            this
                .waitForElementPresent('@submitYesSetUpData')
                .pauseAndSaveScreenshot(10000, 'do-you-want-to-set-up-data-page');
            
            if (setUpDataYesOrNo.toLowerCase().indexOf('n') === 0) {
                this.click('@submitNoSetUpData');
            } else {
                this.click('@submitYesSetUpData');
            }
        
            return this;
        }
    }]
};
