'use strict';

exports.command = function (userName) {

    this
        .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL)
        .page.loginPage().signInAndRememberMe(
            this.globals.characters[userName].userEmail)
        .waitForElementPresent('.Navbar-loggedInAs')
        .getSessionToken()
        .getUserID()
        .sendDeleteUserRequest()
        .page.viewDataPage().logout()
        .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL)
        .page.loginPage().signInAndDoNotRememberMe(
            this.globals.characters[userName].userEmail)
        .page.loginPage().confirmInvalidLogin(userName)
        .pause(3000)
        .pauseAndSaveScreenshot(2000, 'confirm-' + userName + '-deleted');
    
    return this;
};
