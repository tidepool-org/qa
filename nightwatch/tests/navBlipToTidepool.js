"use strict";

module.exports = {navBlipToTidepool : function (browser) {
    
    var tidepoolHomepageLink = 
        browser.page.loginPage().elements.tidepoolHomepageLink.selector;
    
    browser
        .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL)
        .waitForElementPresent(tidepoolHomepageLink)
        .pauseAndSaveScreenshot(5000, 'blip-login-page')
        .click(tidepoolHomepageLink)
        .windowHandles(function (window) {
            this.verify.equal(window.value.length, 2,
                'There should be 2 windows open');
            this.switchWindow(window.value[1]);
            this.verify.urlContains('http://tidepool.org/');
        })
        .page.tidepoolHomepage().assertLinks()
        .end();
    }
};
