'use strict';

module.exports = {
    elements: {
        fullNameField: {
            selector: '#fullName'
        },
        userEmailField: {
            selector: '#username'
        },
        passwordField: {
            selector: '#password'
        },
        passwordConfirmField: {
            selector: '#passwordConfirm'
        },
        rememberCheckbox: {
            selector: '#remember'
        },
        submitButton: {
            selector: 'button.simple-form-submit'
        }
    },
    commands: [{
        createNewUser: function (userName, userEmail) {
            this
                .waitForElementPresent('@fullNameField')
                .setValue('@fullNameField', userName)
                .setValue('@userEmailField', userEmail)
                .setValue('@passwordField', process.env.TIDEPOOL_BLIP_USER_PASSWORD)
                .setValue('@passwordConfirmField', process.env.TIDEPOOL_BLIP_USER_PASSWORD)
                .pauseAndSaveScreenshot(5000, 'blip-signup-new-user-page')
                .click('@submitButton')
                .waitForElementPresent('.EmailVerification-title')
                .pauseAndSaveScreenshot(10000, 'email-verification-needed-page');
            
            return this;
        }
    }]
};
