'use strict';

exports.command = function (user) {
    var self = this;
    
    self.perform(function () {
        var fullName = 'nightwatch+' + user.name + '+' +
            self.globals.timeTestStarted;

        self.globals.users[user.nickname].fullName = fullName;
        self.globals.users[user.nickname].emailAddress = fullName + '+'
            + process.env.TIDEPOOL_BLIP_USER_SKIP_KEY + '@tidepool.org';
        self.globals.users[user.nickname].password =
            process.env.TIDEPOOL_BLIP_USER_PASSWORD;
        self.pause(1000);
    });
    
    return self;
};

