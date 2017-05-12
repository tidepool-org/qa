"use strict";

module.exports = {loginViewData : function (browser) {

    var staticUser = browser.globals.users.staticUser;
    
    browser
        .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL)
        .page.loginPage().signInAndRememberMe(staticUser)
        .page.dataPage().confirmLoggedIn()
        .page.dataPage().confirmOnDataPage()
        .page.logout().logoutEmailVerified()
        .end();
    }
};
