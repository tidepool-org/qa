"use strict";

module.exports = {testTOSwithRandomAgedUsers :
    function (browser) {
        
        var tempUser = browser.globals.users.tempUser;
        
        browser
            .initializeNewRandomAgedUser(tempUser)
            .signUpNewUser(tempUser)
            .perform(function () {
                if (tempUser.age > 12) {
                    browser
                        .page.dataPage().logout()
                        .deleteUser(tempUser);
                } else {
                    browser
                        .sendDeleteUserRequest(tempUser)
                        .pause(1000)
                        .confirmUserDeleted(tempUser);
                }
            })
            .end();
    }
};
