"use strict";

module.exports = {loginRememberNo : function (browser) {
    
    var userEmail = 'nightwatch+hasData1+' +
        process.env.TIDEPOOL_BLIP_USER_SKIP_KEY + '@tidepool.org';
    
    browser
        .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL)
        .page.login().signIn(userEmail, false)
        .waitForElementPresent('.Navbar-loggedInAs')
        .pauseAndSaveScreenshot(10000, 'blip-logged-in-page')
        .page.logout().logout()
        .end();
    }
};
