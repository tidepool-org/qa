"use strict";

var moment = require('moment');

module.exports = {signup18EmailNo_LoginRemember_DSAMe : function (browser) {
    
    if (browser.globals.test_settings.specifyRandomSeed) {
        var randomSeed = browser.globals.test_settings.randomSeed;
    } else {
        var randomSeed = browser.globals.timeTestStarted;
    }
    
    var userName = 'nightwatch+' + browser.globals.timeTestStarted +
    var 'R' + Math.round(Math.random() * 1E6);
    var userEmail = userName + '+' + process.env.TIDEPOOL_BLIP_USER_SKIP_KEY +
        '@tidepool.org';
    var rand = require('random-seed').create(randomSeed);
    var now = moment.utc();
    var maxBirthday = moment(now).subtract(18, 'years');
    var userBirthday = maxBirthday.subtract(rand.intBetween(0, 36500), 'days');
    var userAge = moment(now).diff(userBirthday, 'years');
    var numberDaysAlive = moment(now).diff(userBirthday, 'days');
    var diagnosisDate = moment(now).subtract(rand.intBetween(0, numberDaysAlive), 'days');
    
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
