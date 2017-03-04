'use strict';

var request = require('superagent');

exports.command = function () {
    var self = this;
    
    self.perform(
        function () {
            request
                .delete(process.env.TIDEPOOL_BLIP_API_URL +
                    '/userservices/v1/users/' + self.globals.userID)
                .send({ password: process.env.TIDEPOOL_BLIP_USER_PASSWORD })
                .set('X-Tidepool-Session-Token', self.globals.authToken)
                .set('Accept', 'application/json')
                .end();
        }
    );
    
    return self;
};
