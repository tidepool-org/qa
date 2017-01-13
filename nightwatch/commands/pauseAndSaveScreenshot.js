"use strict";

exports.command = function (saveScreenshots, pauseLengthMilliSeconds, screenshotName, callback) {
    var self = this;
    var screenshotsDirectory = './screenshots/detailed/' + self.currentTest.module + '/' + self.globals.timeTestStarted;

    self.perform(
        function () {
            if (saveScreenshots) {
                self.pause(pauseLengthMilliSeconds);
                self.saveScreenshot(screenshotsDirectory + '/' + screenshotName + '.png');
            }
        },

        function (result) {
            if (typeof callback === "function") {
                callback.call(self, result);
            }
        }
    );

    return self;
};
