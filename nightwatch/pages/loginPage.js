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
        },
        tidepoolHomepageLink: {
            selector: 'a[href="http://tidepool.org/"]'
        },        
        notification: {
            selector: '.simple-form-notification'
        }
    },
    
    commands: [{
        signIn: function (userEmail, remember) {    
            var self = this;

            self
                .waitForElementPresent('@usernameField')
                .setValue('@usernameField', userEmail)
                .setValue('@passwordField', process.env.TIDEPOOL_BLIP_USER_PASSWORD)
                .api.perform(function () {
                    if (remember) {
                        self.click('@rememberCheckbox');
                    }
                })
            self
                .pauseAndSaveScreenshot(5000, 'blip-login-page')
                .click('@submitButton')
            return self.api;
        }
    },
    {
        confirmInvalidLogin: function () {
            this
                .waitForElementPresent('@notification')
                .assert.containsText('@notification', 'Wrong username or password.', 'User (likely) deleted')
            return this.api;
        }
    }]
};
