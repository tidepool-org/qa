'use strict';

exports.command = function () {
    var self = this;
    
    self
        .pause(1000)
        .execute(
            function () {
                var sessionToken = localStorage.getItem('authToken');
                return sessionToken;
            },
            function (result) {
                self.globals.sessionToken = result.value;
            }
        );
    
    return self;
};
