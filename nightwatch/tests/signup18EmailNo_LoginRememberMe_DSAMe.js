"use strict";

var moment = require('moment');

module.exports = {signup18EmailNo_LoginRemember_DSAMe : function (browser) {
    
    if (browser.globals.test_settings.randomSeed) {
        var randomSeed = browser.globals.test_settings.randomSeed;
    } else {
        var randomSeed = browser.globals.timeTestStarted;
    }
    
    var fullName = 'nightwatch+' + browser.globals.timeTestStarted +
        'R' + Math.round(Math.random() * 1E6);
    var email = fullName + '+' + process.env.TIDEPOOL_BLIP_USER_SKIP_KEY +
        '@tidepool.org';
    var rand = require('random-seed').create(randomSeed);
    var now = moment.utc();
    var maxBirthday = moment(now).subtract(18, 'years');
    var birthday = maxBirthday.subtract(rand.intBetween(0, 36500), 'days');
    var age = moment(now).diff(birthday, 'years');
    var numberDaysAlive = moment(now).diff(birthday, 'days');
    var diagnosisDate = moment(now).subtract(rand.intBetween(0, numberDaysAlive), 'days');
    
    browser
        .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL + 'signup/?inviteKey=' + process.env.TIDEPOOL_BLIP_USER_INVITE_KEY)
        .page.signupNewUser().createNewUser(fullName, email);
    browser
        .click('a[href="/login"]')
        .page.login().signIn(email, true);
    browser.page.selectAgePage().selectAge(age);
    browser.page.acceptTermsPage().acceptTerms(age);
    browser.page.wantToSetUpDataStoragePage().setUpData(true);
    browser.page.setUpDataStoragePage().setUpDataStorage(true, birthday, diagnosisDate);
    browser
        .waitForElementPresent('.patient-data-message-no-data')
        .pauseAndSaveScreenshot(10000, 'patient-data-message-no-data-page')
        .end();
    }
};
