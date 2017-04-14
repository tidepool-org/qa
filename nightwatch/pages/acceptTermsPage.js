'use strict';

module.exports = {
    elements: {
        agreedCheckbox: {
            selector: '#agreed'
        },
        agreedOnBehalfCheckbox: {
            selector: '#agreedOnBehalf'
        },
        submitButton: {
            selector: 'button.terms-button.terms-button-submit'
        }
    },
    commands: [{
        acceptTerms: function (user) {
            var self = this;
            
            self
                .waitForElementPresent('@agreedCheckbox')
                .click('@agreedCheckbox')
                .api.perform(function () {
                    if (user.age < 18) {
                        self.click('@agreedOnBehalfCheckbox');
                    }
                });
            self
                .pauseAndSaveScreenshot(10000, 'agree-to-terms-page')
                .click('@submitButton');
            
            return self.api;
        }
    }]
};
