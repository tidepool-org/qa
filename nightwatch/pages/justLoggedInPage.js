'use strict';

module.exports = {
    elements: {
        acceptInviteButton: {
            selector: 'button.invitation-action-submit'
        },
        setupDataSubmitButtonNo: {
            selector: 'button.btn.btn-tertiary'
        },
        setupDataSubmitButtonYes: {
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
        setupData: function (setupDataBoolean) {      
            var self = this;
            
            self
                .waitForElementPresent('@setupDataSubmitButtonYes')
                .pauseAndSaveScreenshot(10000, 'do-you-want-to-set-up-data-page')
                .api.perform(function () {
                    if (setupDataBoolean) {
                        self.click('@setupDataSubmitButtonYes');
                    } else {
                        self.click('@setupDataSubmitButtonNo');
                    }
                });
            
            return self.api;
        }
        
    }]
};
