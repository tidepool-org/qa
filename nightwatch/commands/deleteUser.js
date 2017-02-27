'use strict';

exports.command = function (email, callback) {
    var self = this;
    
    self.perform(
        function () {
            self
                .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL)
                .page.login().signIn(email, true)
                .waitForElementPresent('.Navbar-loggedInAs')
                .getAuthTokenAndUserID()
                .sendDeleteUserRequest()
                .pause(1000)
                .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL)
                .page.login().signIn(email, false)
                .page.login().confirmInvalidLogin()
                .pauseAndSaveScreenshot(5000, 'confirm-delete-user')
        },
        
        function (result) {
            if (typeof callback === "function") {
                callback.call(self, result);
            }
        }
    );
    return self;
};
