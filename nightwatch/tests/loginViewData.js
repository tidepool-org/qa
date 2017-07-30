'use strict';

module.exports = {
    loginViewData : function (browser) {

        browser
            .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL)
            .page.loginPage().signInAndRememberMe(browser.globals.users.generalUser)
            .page.dataPage().confirmLoggedIn()
            .page.dataPage().confirmOnDataPage()
            .page.logout().logoutEmailVerified()
            .end();
    }
};
