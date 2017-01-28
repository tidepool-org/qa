'use strict';

module.exports = {
    elements: {
        selector1Field: {
            selector: '#selector1name'
        },
        selector2Field: {
            selector: '#selector2name'
        },
        submitButton: {
            selector: 'button.simple-form-submit'
        }
    },
    commands: [{
        functionName: function (variable1, variable2) {
            this
            
                // put assertions here
                .pauseAndSaveScreenshot(5000, '<screen-capture-name>')
                .click('@submitButton');
            
            return this;
        }
    }]
};
