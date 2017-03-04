'use strict';

exports.command = function (email) {
    var self = this;
    
    self.perform(
        function () {
            self
                .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL)
                .page.loginPage().signIn(email, true)
                .waitForElementPresent('.Navbar-loggedInAs')
                .getAuthTokenAndUserID()
                .sendDeleteUserRequest()
                .pause(1000)
                .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL)
                .page.loginPage().signIn(email, false)
                .page.loginPage().confirmInvalidLogin()
                .pauseAndSaveScreenshot(5000, 'confirm-delete-user');
        }
    );
    
    return self;
};
