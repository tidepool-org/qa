"use strict";

module.exports = {
    signupNewUsers_setupDSA_shareData : function (browser) {
        
        var users = browser.globals.users;
        var patty = users.patty;
        var candice = users.candice;
        var rebecca = users.rebecca;
        var doctor = users.doctor;
        
        browser
        // initialize the users (users) in the workflow (story)
            .initializeNewUser(patty)
            .initializeNewUser(rebecca)
            .initializeNewUser(doctor)
        
        // patty fisher 
            .signUpNewUser(patty)
            //set up data for her daughter candice
            .page.justLoggedInPage().setupData(true)
            .page.setupDSAPage().setupDSA(patty, candice)
            //invite dr. trees and her sister-in-law rebecca to view the data
            .page.dataPage().shareData()
            .page.shareDataPage().shareDataDoNotAllowUpload(rebecca)
            .page.shareDataPage().shareDataAllowUpload(doctor)
            .page.dataPage().logout()
        
        // rebecca fisher 
            .signUpNewUser(rebecca)
            // agrees to see candice's data
            .page.justLoggedInPage().acceptInviteToViewData()
            // set up DSA for herself
            .page.dataPage().goToCareTeam()
            .page.careTeamPage().setupDSA()
            .page.setupDSAPage().setupDSA(rebecca, rebecca)
            // invite dr. trees to view data
            .page.dataPage().shareData()
            .page.shareDataPage().shareDataDoNotAllowUpload(doctor)
            .page.dataPage().logout()
        
        // dr. trees signs up to view candice's and rebecca's data
            .signUpNewUser(doctor)
            .page.justLoggedInPage().acceptInviteToViewData()
            .page.justLoggedInPage().acceptInviteToViewData()
            .page.dataPage().logout()
        
        // delete users
            .deleteUser(doctor)
            .deleteUser(rebecca)
            .deleteUser(patty)
            .end();
    }
};
