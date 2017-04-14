'use strict';

exports.command = function (user) {
    
    this
        .pause(1000)
        .execute(
            function () {
                return localStorage.getItem('authToken');
            },
            function (result) {
                this.globals.users[user.nickname].sessionToken = result.value;
            }
        );
    
    return this;
};
