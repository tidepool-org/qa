'use strict';

module.exports = {
    elements: {
        fullNameField: {
            selector: '#fullName'
        },
        usernameField: {
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
        loginLink: {
            selector: 'a[href="/login"]'
        },
        submitButton: {
            selector: 'button.simple-form-submit'
        }
    },
    
    commands: [{
        enterUserCredentials: function (userName) {
            this
                .waitForElementPresent('@fullNameField')
                .setValue('@fullNameField', this.api.globals.characters[userName].fullName)
                .setValue('@usernameField', this.api.globals.characters[userName].userEmail)
                .setValue('@passwordField', process.env.TIDEPOOL_BLIP_USER_PASSWORD)
                .setValue('@passwordConfirmField', process.env.TIDEPOOL_BLIP_USER_PASSWORD)
                .pauseAndSaveScreenshot(5000, 'blip-signup-new-user-page')
                .click('@submitButton')
                .waitForElementPresent('.EmailVerification-title')
                .pauseAndSaveScreenshot(10000, 'email-verification-needed-page');
            
            return this.api;
        }
    },
    {
        goToLoginPage: function () {
            this.click('@loginLink')
            return this.api;
        }
    }]
};
