"use strict";

module.exports = {loginRememberNo : function (browser) {
    
    var userEmail = 'nightwatch+hasData1+' + process.env.TIDEPOOL_BLIP_SKIP_KEY + '@tidepool.org';
    var rememberMe = false;
    
    browser
        .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL)
        .page.login().signIn(userEmail, rememberMe);
    browser
        .waitForElementPresent('.Navbar-loggedInAs')
        .pauseAndSaveScreenshot(browser.globals.test_settings.captureScreens, 10000, 'blip-logged-in-page')
        .end();
    }
};
