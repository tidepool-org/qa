'use strict';

exports.command = function (character) {
    var self = this;
    
    self.perform(function () {
        var fullName = 'nightwatch+' + character.name + '+' +
            self.globals.timeTestStarted;

        self.globals.characters[character.nickname].fullName = fullName;
        self.globals.characters[character.nickname].emailAddress = fullName + '+'
            + process.env.TIDEPOOL_BLIP_USER_SKIP_KEY + '@tidepool.org';
        self.globals.characters[character.nickname].password =
            process.env.TIDEPOOL_BLIP_USER_PASSWORD;
        self.pause(1000);
    });
    
    return self;
};

