"use strict";

module.exports = {
    loginViewData : function (browser) {

        var generalUser = browser.globals.users.generalUser;

        browser
            .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL)
            .page.loginPage().signInAndRememberMe(generalUser)
            .page.dataPage().confirmLoggedIn()
            .page.dataPage().confirmOnDataPage()
            .page.logout().logoutEmailVerified()
            .end();
    }
};
