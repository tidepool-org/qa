'use strict';

var request = require('superagent');

exports.command = function (character) {
    var self = this;
    
    self
        .pause(1000)
        .perform(function () {        
            request
                .get(process.env.TIDEPOOL_BLIP_API_URL +
                    'auth/login')
                .set('X-Tidepool-Session-Token', character.sessionToken)
                .set('Accept', 'application/json')
                .end(function (error, result) {
                    self.globals.characters[character.nickname].userID =
                        JSON.parse(result.text).userid;
                });
        })
        .pause(1000);
    
    return self;
};
