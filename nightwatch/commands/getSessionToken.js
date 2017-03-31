'use strict';

exports.command = function () {
    
    this
        .pause(1000)
        .execute(
            function () {
                var sessionToken = localStorage.getItem('authToken');
                return sessionToken;
            },
            function (result) {
                this.globals.sessionToken = result.value;
            }
        );
    
    return this;
};
