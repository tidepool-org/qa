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
        submitButton: {
            selector: 'button.btn'
        }
    },
    
    commands: [{
        selectAge: function (userAge) { 
            var self = this;
            
            self
                .waitForElementPresent('@ageGTE18RadioButton')
                .api.perform(function () {
                    if (userAge >= 18) {
                        self.click('@ageGTE18RadioButton');
                    } else if (userAge <= 12) {
                        self.click('@ageLTE12RadioButton');
                    } else {
                        self.click('@age13to17RadioButton');
                    }
                })
            self
                .pauseAndSaveScreenshot(10000, 'select-age-page')
                .click('@submitButton')
            return self.api;
        }
    }]
};
