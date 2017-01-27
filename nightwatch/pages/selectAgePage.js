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
            this.waitForElementPresent('@ageGTE18RadioButton');
            
            if (userAge >= 18) {
                this.click('@ageGTE18RadioButton');
            } else if (userAge <= 12) {
                this.click('@ageLTE12RadioButton');
            } else {
                this.click('@age13to17RadioButton');
                }
            }
            
            this
                .pauseAndSaveScreenshot(10000, 'select-age-page')
                .click('@submitButton');
            
            return this;
        }
    }]
};
