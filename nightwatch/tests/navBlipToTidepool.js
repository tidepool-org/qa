"use strict";

module.exports = {navBlipToTidepool : function (browser) {
    
    browser
        .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL)
        .waitForElementPresent('a[href="http://tidepool.org/"] > img')
        .pauseAndSaveScreenshot(5000, 'blip-login-page')
        .click('a[href="http://tidepool.org/"] > img')
        .windowHandles(function (window) {
            this.verify.equal(window.value.length, 2, 'There should be 2 windows open');
            this.switchWindow(window.value[1]);
            this.verify.urlContains('http://tidepool.org/');
        })
        .waitForElementPresent('a[href*="/blog/"]')
        .assert.containsText('a[href*="/blog/"]', 'Blog')
        .assert.containsText('a[href*="/contact/"]', 'Contact')
        .assert.containsText('a[href="https://tidepool.org/donate/"]', 'Donate')
        .assert.elementPresent('a[href="/about/"]')
        .assert.containsText('a[href="/people-with-type-1-diabetes/#pwt1d"] > h3.participant-listing__label.text-center', 'PEOPLE WITH T1D')
        .assert.containsText('a[href="/people-with-type-1-diabetes/#clinic"] > h3.participant-listing__label.text-center', 'CLINICIANS')
        .assert.containsText('a[href="/people-with-type-1-diabetes/#researchers"] > h3.participant-listing__label', 'RESEARCHERS')
        .assert.containsText('a[href="http://labs.tidepool.io/"]', 'TIDEPOOL LABS')
        .assert.containsText('a[href*="/press/"]', 'PRESS')
        .assert.containsText('a[href*="/jobs/"]', 'JOBS')
        .assert.containsText('a[href="mailto:info@tidepool.org"]', 'info@tidepool.org')
        .assert.containsText('.social > h4', 'Follow Us')
        .assert.elementPresent('a[href="https://twitter.com/Tidepool_org"]')
        .assert.elementPresent('a[href="https://www.facebook.com/TidepoolOrg"]')
        .pauseAndSaveScreenshot(1000, 'tidepool-page.png')
        .end();
    }
};
