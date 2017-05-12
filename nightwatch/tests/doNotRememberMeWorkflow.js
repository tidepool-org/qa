"use strict";

module.exports = {doNotRememberMeWorkflow : function (browser) {

    var staticUser = browser.globals.users.staticUser;
    
    browser
        .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL)
        .page.loginPage().signInAndDoNotRememberMe(staticUser)
        .waitForElementPresent('.Navbar-loggedInAs')
        .pauseAndSaveScreenshot(10000, 'blip-logged-in-page')
        .pause(10000)
        .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL)
        .page.loginPage().confirmOnLoginPage()
        .pauseAndSaveScreenshot(10000, 'blip-login-page')
        .end();
    }
};
