'use strict';

module.exports = {
    elements: {
        selector1Field: {
            selector: '#selector1name'
        },
        selector2Field: {
            selector: '#selector2name'
        },
        submit: {
            selector: 'button.simple-form-submit'
        }
    },
    commands: [{
        functionName: function (variable1, variable2) {
            this
            
                // put assertions here
                .pauseAndSaveScreenshot(this.api.globals.test_settings.captureScreens, 5000, '<screen-capture-name>')
                .click('@submit');
            
            return this;
        }
    }]
};
