'use strict';

exports.command = function (userName) {
    var userEmail = this.globals.characters[userName].userEmail;
        
    this
        .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL)
        .page.loginPage().signInAndRememberMe(userEmail)
        .waitForElementPresent('.Navbar-loggedInAs')
        .getSessionToken()
        .getUserID()
        .sendDeleteUserRequest()
        .page.viewDataPage().logout()
        .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL)
        .page.loginPage().signInAndDoNotRememberMe(userEmail)
        .page.loginPage().confirmInvalidLogin(userName)
        .pause(3000)
        .pauseAndSaveScreenshot(2000, 'confirm-' + userName + '-deleted');
    
    return this;
};
