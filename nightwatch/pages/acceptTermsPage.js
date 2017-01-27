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
        acceptTerms: function (userAge) {
            this
                .waitForElementPresent('@agreedCheckbox')
                .click('@agreedCheckbox');
            
            if (userAge < 18) {
                this.click('@agreedOnBehalfCheckbox');
            }
            
            this
                .pauseAndSaveScreenshot(10000, 'agree-to-terms-page')
                .click('@submitButton');
            
            return this;
        }
    }]
};
