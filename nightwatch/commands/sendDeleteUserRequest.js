'use strict';

var request = require('superagent');

exports.command = function (callback) {
    
    var self = this;
    
    self.perform(
        function () {
            request
                .delete(process.env.TIDEPOOL_BLIP_API_URL +
                    '/userservices/v1/users/' + self.globals.userID)
                .send({ password: process.env.TIDEPOOL_BLIP_USER_PASSWORD })
                .set('X-Tidepool-Session-Token', self.globals.authToken)
                .set('Accept', 'application/json')
                .end(function (err, result) {
                    // Calling the end function sends the request 
                });
        },
        
        function (result) {
            if (typeof callback === "function") {
                callback.call(self, result);
            }
        }
    );
    return self;
};
