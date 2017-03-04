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
        logout: function () {
            this
                .click('@menuDropdown')
                .pauseAndSaveScreenshot(5000, 'logging-out')
                .click('@menuLogout')
            return this.api;
        }
    }]
};
