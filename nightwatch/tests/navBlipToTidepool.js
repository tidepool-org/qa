"use strict";

module.exports = {navBlipToTidepool : function (browser) {
    
    var tidepoolHomePageLink =
        browser.page.loginPage().elements.tidepoolHomePageLink.selector;
    
    browser
        .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL)
        .waitForElementPresent(tidepoolHomePageLink)
        .pauseAndSaveScreenshot(5000, 'blip-login-page')
        .click(tidepoolHomePageLink)
        .windowHandles(function (window) {
            this.verify.equal(window.value.length, 2,
                'There should be 2 windows open');
            this.switchWindow(window.value[1]);
            this.verify.urlContains('http://tidepool.org/');
        })
        .page.tidepoolHomePage().assertLinks()
        .end();
    }
};
