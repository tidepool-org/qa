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
        
        signInAndRememberMe: function (character) {
            this.signIn(character, true);
            return this.api;
        }
    },
    {
        signInAndDoNotRememberMe: function (character) {
            this.signIn(character, false);
            return this.api;
        }
    },
    {
        signIn: function (character, remember) {
            var self = this;

            self
                .waitForElementPresent('@usernameField')
                .setValue('@usernameField', character.emailAddress)
                .setValue('@passwordField', character.password)
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
        confirmInvalidLogin: function (character) {
            this
                .waitForElementPresent('@notification')
                .assert.containsText('@notification', 'Wrong username or password.',
                    'User ' + character.fullName + ' (likely) deleted');
            
            return this.api;
        }
    }]
};
