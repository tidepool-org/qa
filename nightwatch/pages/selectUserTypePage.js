'use strict';

module.exports = {
    elements: {
        personalAccountCheckbox: {
            selector: '.signup-container > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(1)'
        },
        clinicianAccountCheckbox: {
            selector: '.signup-container > div:nth-of-type(4) > div:nth-of-type(1) > div:nth-of-type(1)'
        },
        signupContinueButton: {
            selector: 'button.btn'
        },
        loginLink: {
            selector: 'a[href="/login"]'
        }
    },
    
    commands: [{
        selectAccountType: function (accountType) {
            var self = this;
            
            self
                .waitForElementPresent('@personalAccountCheckbox')
                .api.perform(function () {
                    if (accountType === 'personal') {
                        self.click('@personalAccountCheckbox');
                    } else if (accountType === 'clinician') {
                        self.click('@clinicianAccountCheckbox');
                    }
                });
            
            self
                .pauseAndSaveScreenshot(10000, accountType + '-account-selected')
                .click('@signupContinueButton');
            
            return self.api;
        }
    }]
};
