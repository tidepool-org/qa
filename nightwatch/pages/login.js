'use strict';

module.exports = {
    elements: {
        usernameField: {
            selector: '#username'
        },
        passwordField: {
            selector: '#password'
        },
        rememberCheckbox: {
            selector: '#remember'
        },
        submitButton: {
            selector: 'button.simple-form-submit'
        }
    },
    commands: [{
        signIn: function (userEmail, remember) {
            this
                .waitForElementPresent('@usernameField')
                .setValue('@usernameField', userEmail)
                .setValue('@passwordField', process.env.TIDEPOOL_BLIP_USER_PASSWORD)
                .api.perform(function () {
                    if (remember) {
                        this.click('@rememberCheckbox');
                    }
                })
            this
                .pauseAndSaveScreenshot(5000, 'blip-login-page')
                .click('@submitButton')
            
            return this.api;
        }
    }]
};
