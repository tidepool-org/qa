'use strict';

module.exports = {
    elements: {
        menuDropdown: {
            selector: '.Navbar-userName'
        },
        menuLogout: {
            selector: '.Navbar-menuDropdown > ul > li:nth-of-type(2) > a.Navbar-button > .Navbar-menuText'
        }
    },
    
    commands: [{
        logoutEmailVerified: function () {
            this
                .waitForElementPresent('@menuDropdown')
                .click('@menuDropdown')
                .pauseAndSaveScreenshot(5000, 'logging-out')
                .click('@menuLogout')
                .api.pause(2000)
            
            return this.api;
        }
    }]
};
