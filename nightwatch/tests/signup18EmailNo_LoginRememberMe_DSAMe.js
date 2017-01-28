"use strict";

var moment = require('moment');

module.exports = {signup18EmailNo_LoginRemember_DSAMe : function (browser) {
    
    var userName = 'nightwatch+' + browser.globals.timeTestStarted +
        'R' + Math.round(Math.random() * 1E6);
    var userEmail = userName + '+' + process.env.TIDEPOOL_BLIP_USER_SKIP_KEY +
        '@tidepool.org';
    
    var rand = require('random-seed').create(browser.globals.timeTestStarted);
    var today = moment.utc();
    var maxBirthday = today.subtract(18, 'years');
    var userBirthday = maxBirthday.subtract(rand.intBetween(0, 36500), 'days');
    var userAge = today.diff(userBirthday, 'years');
    var numberDaysAlive = today.diff(userBirthday, 'days');
    var diagnosisDate = today.subtract(rand.intBetween(0, numberDaysAlive), 'days');
    
    browser
        .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL + 'signup/?inviteKey=' + process.env.TIDEPOOL_BLIP_USER_INVITE_KEY)
        .page.signupNewUser().createNewUser(userName, userEmail);
    browser
        .click('a[href="/login"]')
        .page.login().signIn(userEmail, true);
    browser.page.selectAgePage().selectAge(userAge);
    browser.page.acceptTermsPage().acceptTerms(userAge);
    browser.page.wantToSetUpDataStoragePage().setUpData(true);
    browser.page.setUpDataStoragePage().setUpDataStorage(true, userBirthday, diagnosisDate);
    browser
        .waitForElementPresent('.patient-data-message-no-data')
        .pauseAndSaveScreenshot(10000, 'patient-data-message-no-data-page')
        .end();
    }
};
