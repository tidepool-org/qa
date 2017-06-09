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
        
        signInAndRememberMe: function (user) {
            this.signIn(user, true);
            return this.api;
        }
    },
    {
        signInAndDoNotRememberMe: function (user) {
            this.signIn(user, false);
            return this.api;
        }
    },
    {
        signIn: function (user, remember) {
            var self = this;

            self
                .waitForElementPresent('@usernameField')
                .setValue('@usernameField', user.emailAddress)
                .setValue('@passwordField', user.password)
                .api.perform(function () {
                    if (remember) {
                        self.click('@rememberCheckbox');
                    }
                });
            self
                .pauseAndSaveScreenshot(5000, 'blip-login-page')
                .click('@submitButton');
            
            return self.api;
        }
    },
    {
        confirmOnLoginPage: function () {
            this.waitForElementPresent('@rememberCheckbox');
            
            return this.api;
        }
    },
    {
        confirmInvalidLogin: function (user) {
            this
                .waitForElementPresent('@notification')
                .assert.containsText('@notification', 'Wrong username or password.',
                    'User ' + user.fullName + ' (likely) deleted');
            
            return this.api;
        }
    }]
};
