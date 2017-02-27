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
            
            var self = this;
            
            self
                .waitForElementPresent('@setUpDataSubmitButtonYes')
                .pauseAndSaveScreenshot(10000, 'do-you-want-to-set-up-data-page')
                .api.perform(function () {
                    if (setUpData) {
                        self.click('@setUpDataSubmitButtonYes');
                    } else {
                        self.click('@setUpDataSubmitButtonNo');
                    }
                })
            return self.api;
        }
    }]
};
