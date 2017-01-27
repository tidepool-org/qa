'use strict';

module.exports = {
    elements: {
        userNameField: {
            selector: '#username'
        },
        passwordField: {
            selector: '#password'
        },
        rememberCheckBox: {
            selector: '#remember'
        },
        submit: {
            selector: 'button.simple-form-submit'
        }
    },
    commands: [{
        signIn: function (userEmail, remember) {
            this
                .waitForElementPresent('@userNameField')
                .setValue('@userNameField', userEmail)
                .setValue('@passwordField', process.env.TIDEPOOL_BLIP_USER_PASSWORD);
            if (remember) {
                this.click('@rememberCheckBox');
            }
            this
                .pauseAndSaveScreenshot(5000, 'blip-login-page')
                .click('@submit');
            
            return this;
        }
    }]
};
