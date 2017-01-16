'use strict';

module.exports = {
    elements: {
        usernameField: {
            selector: '#username'
        },
        passwordField: {
            selector: '#password'
        },
        rememberMeCheckBox: {
            selector: '#remember'
        },
        submit: {
            selector: 'button.simple-form-submit'
        }
    },
    commands: [{
        signIn: function (userEmail, rememberMe) {
            this
                .waitForElementPresent('#username')
                .setValue('@usernameField', userEmail)
                .setValue('@passwordField', process.env.TIDEPOOL_BLIP_PASSWORD);
            if (rememberMe) {
                this.click('@rememberMeCheckBox');
            }
            this
                .pauseAndSaveScreenshot(this.api.globals.test_settings.captureScreens, 5000, 'blip-login-page')
                .click('@submit');
            
            return this;
        }
    }]
};
