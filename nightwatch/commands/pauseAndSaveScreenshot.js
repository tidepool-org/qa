"use strict";

exports.command = function (pauseLengthMilliSeconds, screenshotName) {
    var self = this;
    var screenshotsDirectory = './screenshots/detailed/' + self.currentTest.module
        + '/' + self.globals.timeTestStarted;

    self.perform(
        function () {
            if (self.globals.test_settings.captureScreens) {
                self.pause(pauseLengthMilliSeconds);
                self.saveScreenshot(screenshotsDirectory + '/' + screenshotName
                    + '.png');
            }
        }
    );
    
    return self;
};
