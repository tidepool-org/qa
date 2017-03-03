'use strict';

module.exports = {
    elements: {
        selector1Field: {
            selector: '#selector1name'
        },
        selector2Field: {
            selector: '#selector2name'
        },
        selector3Field: {
            selector: '#selector3name'
        },
        submitButton: {
            selector: 'button.simple-form-submit'
        }
    },

    commands: [{
        functionName: function (variable1, variable2) {  
            var self = this;
            
            self
                // put assertions here
                .waitForElementPresent('@selector1Field')
                .setValue('@selector2Field', selector2Field)
                // here is how to deal with calling perform
                .api.perform(function () {
                    if (variable1) {
                        self.click('@selector3Field');
                    }
                })
            self
                // put assertions here
                .pauseAndSaveScreenshot(5000, '<screen-capture-name>')
                .click('@submitButton')
            return self.api;
        }
    }]
};
