'use strict';

module.exports = {
    elements: {
        shareDataLink: {
            locateStrategy: 'xpath',
            selector: '//*[@id="app"]/div/div/div[1]/div/div[2]/div/div[1]/div/a[2]'
        },
        careTeamLink: {
            locateStrategy: 'css',
            selector: 'i.Navbar-icon.icon-careteam'
        },
        emailNotVerifiedPopUp: {
            locateStrategy: 'xpath',
            selector: '//*[@id="app"]/div/div/div[2]/div/a'
        },
        menuDropdown: {
            selector: '.Navbar-userName'
        },
        menuLogout: {
            selector: '.Navbar-menuDropdown > ul > li:nth-of-type(2) > a.Navbar-button > .Navbar-menuText'
        }
    },
    
    commands: [{
        shareData: function () {
            this
                .waitForElementPresent('@shareDataLink')
                .closeEmailNotVerifiedPopUp();
            this.click('@shareDataLink');

            return this.api;
        }
    },
    {
         closeEmailNotVerifiedPopUp: function () {
            var self = this;
             
            // NOTE: this is not working correctly if email has been verified, 
            // that is, if the pop up is NOT there. Other nightwatch users have
            // complained about this issue, and have suggested more complicated
            // workarounds. Once we get email verification in the workflow, this
            // issue will need to be worked out. 
            self.api
                    .pause(1000)
                    .perform(function () {
                        if (self.isVisible('@emailNotVerifiedPopUp')) {
                            self.click('@emailNotVerifiedPopUp');
                        }
                    });

            return self.api;
        }
    },
    {
        logout: function () {
            this
                .waitForElementPresent('@menuDropdown')
                .closeEmailNotVerifiedPopUp();
            this
                .click('@menuDropdown')
                .pauseAndSaveScreenshot(5000, 'logging-out')
                .click('@menuLogout')
                .api.pause(5000);
            
            return this.api;
        }
    },
    {
        goToCareTeam: function () {
            this
                .waitForElementPresent('@careTeamLink')
                .closeEmailNotVerifiedPopUp();
            this.click('@careTeamLink');

            return this.api;
        }
        
    }]
};
