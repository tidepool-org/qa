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
        enterUserCredentials: function (user) {
            this
                .waitForElementPresent('@fullNameField')
                .setValue('@fullNameField', user.fullName)
                .setValue('@usernameField', user.emailAddress)
                .setValue('@passwordField', user.password)
                .setValue('@passwordConfirmField', user.password)
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
