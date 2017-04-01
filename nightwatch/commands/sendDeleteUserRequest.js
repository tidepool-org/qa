'use strict';

var request = require('superagent');

exports.command = function (character) {
    
    this
        .perform(function () {
            request
                .delete(process.env.TIDEPOOL_BLIP_API_URL +
                    '/userservices/v1/users/' + character.userID)
                .send({ password: character.password })
                .set('X-Tidepool-Session-Token', character.sessionToken)
                .set('Accept', 'application/json')
                .end();
        })
        .pause(2000);
    
    return this;
};
