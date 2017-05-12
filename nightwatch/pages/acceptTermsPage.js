'use strict';

module.exports = {
    elements: {
        ageGTE18RadioButton: {
            selector: 'input[name="age"][value=">=18"]'
        },
        age13to17RadioButton: {
            selector: 'input[name="age"][value="13-17"]'
        },
        ageLTE12RadioButton: {
            selector: 'input[name="age"][value="<=12"]'
        },
        agreedCheckbox: {
            selector: '#agreed'
        },
        agreedOnBehalfCheckbox: {
            selector: '#agreedOnBehalf'
        },
        termsSorryMessage: {
            selector: '.terms-sorry-message'
        },        
        submitButton: {
            selector: 'button.terms-button'
        }
    },
    commands: [{
        acceptTerms: function (user) {
            var self = this;
            
            self.api.perform(function () {
                self.waitForElementPresent('@ageGTE18RadioButton')
                if (user.age > 12) {
                    if (user.age >= 18) {
                        self
                            .click('@ageGTE18RadioButton')
                            .waitForElementPresent('@agreedCheckbox')
                            .click('@agreedCheckbox');
                    } else {
                        self
                            .click('@age13to17RadioButton')
                            .waitForElementPresent('@agreedOnBehalfCheckbox')
                            .click('@agreedCheckbox')
                            .click('@agreedOnBehalfCheckbox');
                    }
                    self
                        .pauseAndSaveScreenshot(10000, 'agree-to-terms-page')
                        .click('@submitButton');
                } else {
                    self
                        .click('@ageLTE12RadioButton')
                        .waitForElementPresent('@termsSorryMessage')       
                } 
            });
            
            return self.api;
        }
    }]
};
