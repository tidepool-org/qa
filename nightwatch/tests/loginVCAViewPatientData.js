"use strict";

module.exports = {
    loginVCAViewPatientData : function (browser) {

        var vca = browser.globals.users.verifiedClinician;

        browser
            .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL)
            .page.loginPage().signInAndRememberMe(vca)
            .page.dataPage().confirmLoggedIn()
            .page.patientsPage().viewPatientData()
            .page.dataPage().confirmOnDataPage()
            .page.logout().logoutEmailVerified()
            .end();
    }
};
