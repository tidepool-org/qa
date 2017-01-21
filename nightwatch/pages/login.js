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
                .setValue('@passwordField', process.env.TIDEPOOL_BLIP_USER_PASSWORD);
            if (rememberMe) {
                this.click('@rememberMeCheckBox');
            }
            this
                .pauseAndSaveScreenshot(5000, 'blip-login-page')
                .click('@submit');
            
            return this;
        }
    }]
};
