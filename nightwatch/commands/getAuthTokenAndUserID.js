'use strict';

exports.command = function (callback) {
    
    var self = this;
    
    self.perform(function () {
        self
            .pause(1000)
            .execute(
                function () {
                    var authToken = localStorage.getItem('authToken');
                    return authToken;
                },
                function (result) {
                    self.globals.authToken = result.value;
                }
            )
            .perform(
                function () {
                    self.url(function (result) {
                        var currentURL = result.value;
                        var positionUserID = currentURL.indexOf("/data");
                        var userID = currentURL.substring(positionUserID - 10, positionUserID);
                        self.globals.userID = userID;
                    })
                }
            )
    },
        
        function (result) {
            if (typeof callback === "function") {
                callback.call(self, result);
            }
        }
    )
    return self;
};
