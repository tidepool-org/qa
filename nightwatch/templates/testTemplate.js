"use strict";

module.exports = {
    testTemplate : function (browser) {
        browser
            .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL)
            .pauseAndSaveScreenshot('<pause duration in milliseconds>', '<name of page>')
            .end();
    }
};
