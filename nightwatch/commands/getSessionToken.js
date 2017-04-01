'use strict';

exports.command = function (character) {
    
    this
        .pause(1000)
        .execute(
            function () {
                var sessionToken = localStorage.getItem('authToken');
                return sessionToken;
            },
            function (result) {
                this.globals.characters[character.nickname].sessionToken = result.value;
            }
        );
    
    return this;
};
