'use strict';

exports.command = function () {
    var self = this;
    
    self.perform(
        function () {
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
                            self.globals.userID = currentURL.substring(
                                positionUserID - 10, positionUserID);
                        });
                    }
                );
        }
    );
    
    return self;
};
