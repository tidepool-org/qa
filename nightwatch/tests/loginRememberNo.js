"use strict";

module.exports = {loginRememberNo : function (browser) {

    var staticUser = browser.globals.characters.staticUser;
    
    browser
        .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL)
        .page.loginPage().signInAndDoNotRememberMe(staticUser)
        .waitForElementPresent('.Navbar-loggedInAs')
        .pauseAndSaveScreenshot(10000, 'blip-logged-in-page')
        .pause(5000)
        .page.logout().logoutEmailVerified()
        .end();
    }
};
