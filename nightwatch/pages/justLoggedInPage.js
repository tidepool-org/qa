'use strict';

module.exports = {
    elements: {
        acceptInviteButton: {
            selector: 'button.invitation-action-submit'
        },
        setUpDataSubmitButtonNo: {
            selector: 'button.btn.btn-tertiary'
        },
        setUpDataSubmitButtonYes: {
            selector: 'button.btn.btn-primary'
        }
    },
    
    commands: [{
        acceptInviteToViewData: function () {
            this.api.pause(1000)
            this
                .waitForElementPresent('@acceptInviteButton')
                .click('@acceptInviteButton');

            return this.api;
        }
    },
    {
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
                });
            
            return self.api;
        }
        
    }]
};
