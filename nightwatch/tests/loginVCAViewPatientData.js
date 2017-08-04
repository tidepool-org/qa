'use strict';

module.exports = {
    loginVCAViewPatientData : function (browser) {
        browser
            .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL)
            .page.loginPage().signInAndRememberMe(browser.globals.users.verifiedClinician)
            .page.dataPage().confirmLoggedIn()
            .page.patientsPage().viewPatientData()
            .page.dataPage().confirmOnDataPage()
            .page.logout().logoutEmailVerified()
            .end();
    }
};
