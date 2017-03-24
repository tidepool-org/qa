'use strict';

exports.command = function (userName) {
    var self = this;
    
    self.perform(function () {
        var fullName = 'nightwatch+' + userName + '+' +
            self.globals.timeTestStarted;

        self.globals.characters[userName].fullName = fullName;
        self.globals.characters[userName].userEmail = fullName + '+' +
            process.env.TIDEPOOL_BLIP_USER_SKIP_KEY + '@tidepool.org';
    });
    
    return self;
};

