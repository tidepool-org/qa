"use strict";

module.exports = {
    testRememberMeCheckboxWithRefreshURL : function (browser) {

        var generalUser = browser.globals.users.generalUser;

        browser
            .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL)
            .page.loginPage().signInAndDoNotRememberMe(generalUser)
            .waitForElementPresent('.Navbar-loggedInAs')
            .pauseAndSaveScreenshot(10000, 'blip-logged-in-page')
            .pause(10000)
            .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL)
            .page.loginPage().confirmOnLoginPage()
            .pauseAndSaveScreenshot(10000, 'blip-login-page')
            .page.loginPage().signInAndRememberMe(generalUser)
            .waitForElementPresent('.Navbar-loggedInAs')
            .pauseAndSaveScreenshot(10000, 'blip-logged-in-again-page')
            .pause(10000)
            .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL)
            .pause(10000)
            .waitForElementPresent('.Navbar-loggedInAs')
            .end();
    }
};
