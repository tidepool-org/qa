"use strict";

module.exports = {loginRememberNo : function (browser) {
    
    browser
        .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL)
        .waitForElementPresent('a[href="http://tidepool.org/"] > img')
        .setValue('#username', 'nightwatch+hasData1+' + process.env.TIDEPOOL_BLIP_SKIP_KEY + '@tidepool.org')
        .setValue('#password', process.env.TIDEPOOL_BLIP_PASSWORD)
        .pauseAndSaveScreenshot(browser.globals.test_settings.captureScreens, 5000, 'blip-login-page')
        .click('button.simple-form-submit')
        .waitForElementPresent('.Navbar-loggedInAs')
        .pauseAndSaveScreenshot(browser.globals.test_settings.captureScreens, 10000, 'blip-logged-in-page')
        .end();
    }
};
