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
        enterUserCredentials: function (character) {
            this
                .waitForElementPresent('@fullNameField')
                .setValue('@fullNameField', character.fullName)
                .setValue('@usernameField', character.emailAddress)
                .setValue('@passwordField', character.password)
                .setValue('@passwordConfirmField', character.password)
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
