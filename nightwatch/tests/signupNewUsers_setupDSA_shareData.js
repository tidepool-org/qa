"use strict";

var moment = require('moment');

module.exports = {signupNewUsers_setupDSA_shareData :
    function (browser) {
        
        browser
        // create the users in the workflow
            .createNewUser('patty-g-fisher') 
            .createNewUser('rebecca-d-fisher')
            .createNewUser('doctor-n-trees')
        //patty fisher 
            .signUpNewUser('patty-g-fisher')
            //sets up data for her daughter candice
            .page.justLoggedInPage().setUpData(true)
            .setUpDSA('patty-g-fisher', 'candice-d-fisher')
            //invites dr. trees and her sister-in-law rebecca to view the data
            .page.viewDataPage().shareData()
            .page.shareDataPage().shareDataDoNotAllowUpload('rebecca-d-fisher')
            .page.shareDataPage().shareDataAllowUpload('doctor-n-trees')
            .page.viewDataPage().logout()
        // rebecca fisher 
            .signUpNewUser('rebecca-d-fisher')
            // agrees to see candice's data
            .page.justLoggedInPage().acceptInviteToViewData()
            // set up DSA for herself
            .page.viewDataPage().goToCareTeam()
            .page.careTeamPage().setUpDataStorage()
            .setUpDSA('rebecca-d-fisher', 'rebecca-d-fisher')
            // invite dr. trees to view data
            .page.viewDataPage().shareData()
            .page.shareDataPage().shareDataDoNotAllowUpload('doctor-n-trees')
            .page.viewDataPage().logout()
        // dr. trees signs up to view candice's and rebecca's data
            .signUpNewUser('doctor-n-trees')
            .page.justLoggedInPage().acceptInviteToViewData()
            .page.justLoggedInPage().acceptInviteToViewData()
            .page.viewDataPage().logout()
        // delete users
            .deleteUser('doctor-n-trees')
            .deleteUser('rebecca-d-fisher')
            .deleteUser('patty-g-fisher')
            .end();
    }
};
