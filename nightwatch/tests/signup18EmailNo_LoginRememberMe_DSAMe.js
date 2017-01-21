"use strict";

var moment = require('moment');

module.exports = {signup18EmailNo_LoginRememberMe_DSAMe : function (browser) {
    
    function randInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    var userName = 'nightwatch+' + browser.globals.timeTestStarted + 'R' + Math.random();
    var userEmail = userName + '+' + process.env.TIDEPOOL_BLIP_USER_SKIP_KEY + '@tidepool.org';
    var userBirthday = moment([1980 + randInt(0, 18), randInt(0, 11), randInt(1, 28)]);
    var userDiagnosisDate = moment(userBirthday).add(1, 'years');
    var userAge = moment.utc().diff(userBirthday, 'years');
    
    browser
        .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL + 'signup/?inviteKey=' + process.env.TIDEPOOL_BLIP_USER_INVITE_KEY)
        .page.signupNewUser().createNewUser(userName, userEmail);
    browser
        .click('a[href="/login"]')
        .page.login().signIn(userEmail, true);
    browser.page.selectAgePage().selectAge(userAge);
    browser.page.acceptTermsPage().acceptTerms(userAge);
    browser.page.wantToSetUpDataStoragePage().setUpData('yes');
    browser.page.setUpDataStoragePage().setUpDataStorage('yes', userBirthday, userDiagnosisDate);
    browser
        .waitForElementPresent('.patient-data-message-no-data')
        .pauseAndSaveScreenshot(10000, 'patient-data-message-no-data-page')
        .end();
    }
};
