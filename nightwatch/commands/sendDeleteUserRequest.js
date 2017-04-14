'use strict';

var request = require('superagent');

exports.command = function (user) {
    
    this
        .perform(function () {
            request
                .delete(process.env.TIDEPOOL_BLIP_API_URL +
                    '/userservices/v1/users/' + user.userID)
                .send({ password: user.password })
                .set('X-Tidepool-Session-Token', user.sessionToken)
                .set('Accept', 'application/json')
                .end();
        })
        .pause(2000);
    
    return this;
};
