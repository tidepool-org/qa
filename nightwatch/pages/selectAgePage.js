'use strict';

module.exports = {
    elements: {
        age18orOlder: {
            selector: 'input[name="age"][value=">=18"]'
        },
        age13to17: {
            selector: 'input[name="age"][value="13-17"]'
        },
        age12orYounger: {
            selector: 'input[name="age"][value="<=12"]'
        },
        submit: {
            selector: 'button.btn'
        }
    },
    commands: [{
        selectAge: function (userAge) {
            this.waitForElementPresent('@age18orOlder');
            
            if (userAge >= 18) {
                this.click('@age18orOlder');
            } else {
                if (userAge <= 12) {
                    this.click('@age12orYounger');
                } else {
                    this.click('@age13to17');
                }
            }
            
            this
                .pauseAndSaveScreenshot(10000, 'select-age-page')
                .click('@submit');
            
            return this;
        }
    }]
};
