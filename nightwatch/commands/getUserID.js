'use strict';

var request = require('superagent');

exports.command = function () {
    var self = this;
    
    self
        .pause(1000)
        .perform(function () {        
            request
                .get(process.env.TIDEPOOL_BLIP_API_URL +
                    'auth/login')
                .set('X-Tidepool-Session-Token', self.globals.sessionToken)
                .set('Accept', 'application/json')
                .end(function (error, result) {
                    self.globals.userID = JSON.parse(result.text).userid;
                });
            }
        )
        .pause(1000)
    
    return self;
};
