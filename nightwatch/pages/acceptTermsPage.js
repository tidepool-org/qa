'use strict';

module.exports = {
    elements: {
        agreeCheckBox: {
            selector: '#agreed'
        },
        agreeOnBehalfCheckBox: {
            selector: '#agreedOnBehalf'
        },
        submit: {
            selector: 'button.terms-button.terms-button-submit'
        }
    },
    commands: [{
        acceptTerms: function (userAge) {
            this
                .waitForElementPresent('@agreeCheckBox')
                .click('@agreeCheckBox');
            
            if (userAge < 18) {
                this.click('@agreeOnBehalfCheckBox');
            }
            
            this
                .pauseAndSaveScreenshot(10000, 'agree-to-terms-page')
                .click('@submit');
            
            return this;
        }
    }]
};
