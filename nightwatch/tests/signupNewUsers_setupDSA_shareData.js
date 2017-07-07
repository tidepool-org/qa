"use strict";

module.exports = {
    signupNewUsers_setupDSA_shareData : function (browser) {
        
        var users = browser.globals.users;
        var patty = users.patty;
        var candice = users.candice;
        var rebecca = users.rebecca;
        var clinician = users.verifiedClinician;
        
        browser
        // initialize the users in the workflow (story)
            .initializeNewUser(patty)
            .initializeNewUser(rebecca)
        
        // patty fisher 
            .signUpNewUser(patty)
            //set up data for her daughter candice
            .page.justLoggedInPage().setupData(true)
            .page.setupDSAPage().setupDSA(patty, candice)
            //invite clinician and her sister-in-law rebecca to view the data
            .page.dataPage().shareData()
            .page.shareDataPage().shareDataDoNotAllowUpload(rebecca)
            .page.shareDataPage().shareDataAllowUpload(clinician)
            .page.dataPage().logout()
        
        // rebecca fisher 
            .signUpNewUser(rebecca)
            // agrees to see candice's data
            .page.justLoggedInPage().acceptInviteToViewData()
            // set up DSA for herself
            .page.dataPage().goToCareTeam()
            .page.careTeamPage().setupDSA()
            .page.setupDSAPage().setupDSA(rebecca, rebecca)
            // invite clinician to view data
            .page.dataPage().shareData()
            .page.shareDataPage().shareDataDoNotAllowUpload(clinician)
            .page.dataPage().logout()
        
        // log into clinician account to view candice's and rebecca's data
            .page.loginPage().signInAndRememberMe(clinician)
            .page.justLoggedInPage().acceptInviteToViewData()
            .page.justLoggedInPage().acceptInviteToViewData()
            .page.dataPage().logout()
        
        // delete users
            .deleteUser(rebecca)
            .deleteUser(patty)
            .end();
    }
};
