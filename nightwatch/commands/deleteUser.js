'use strict';

exports.command = function (user) {
        
    this
        .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL)
        .page.loginPage().signInAndRememberMe(user)
        .waitForElementPresent('.Navbar-loggedInAs')
        .getSessionToken(user)
        .getUserID(user)
        .sendDeleteUserRequest(user)
        .page.dataPage().logout()
        .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL)
        .page.loginPage().signInAndDoNotRememberMe(user)
        .page.loginPage().confirmInvalidLogin(user)
        .pause(3000)
        .pauseAndSaveScreenshot(2000, 'confirm-' + user.nickname + '-deleted');
    
    return this;
};
