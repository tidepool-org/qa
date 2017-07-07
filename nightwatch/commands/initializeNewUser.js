'use strict';

exports.command = function (user) {
    var self = this;
    
    self.perform(function () {
        // todo: code could break if tests are run in parallel and the timeTestStarted
        // is exactly the same (down to the thousandths of a second). This can be fixed 
        // adding a the PID or some other unique number to the end of fullName. For
        // example, var fullName = ... + self.globals.timeTestStarted + <uniqueNumber>
        var fullName = process.env.TIDEPOOL_BLIP_EMAIL_LOCAL_PART + '+' +
            user.name + '+' + self.globals.timeTestStarted;

        self.globals.users[user.nickname].fullName = fullName;
        self.globals.users[user.nickname].emailAddress = fullName + '+' +
            process.env.TIDEPOOL_BLIP_USER_SKIP_KEY +
            process.env.TIDEPOOL_BLIP_EMAIL_DOMAIN_PART;
        self.globals.users[user.nickname].password =
            process.env.TIDEPOOL_BLIP_USER_PASSWORD;
        self.pause(1000);
    });
    
    return self;
};

