'use strict';

exports.command = function (character) {
        
    this
        .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL)
        .page.loginPage().signInAndRememberMe(character)
        .waitForElementPresent('.Navbar-loggedInAs')
        .getSessionToken(character)
        .getUserID(character)
        .sendDeleteUserRequest(character)
        .page.viewDataPage().logout()
        .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL)
        .page.loginPage().signInAndDoNotRememberMe(character)
        .page.loginPage().confirmInvalidLogin(character)
        .pause(3000)
        .pauseAndSaveScreenshot(2000, 'confirm-' + character.nickname + '-deleted');
    
    return this;
};
