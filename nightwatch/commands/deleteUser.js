'use strict';

exports.command = function (user) {
        
    this
        .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL)
        .page.loginPage().signInAndRememberMe(user)
        .waitForElementPresent('.Navbar-loggedInAs')
        .sendDeleteUserRequest(user)
        .page.dataPage().logout()
        .confirmUserDeleted(user);
    
    return this;
};
