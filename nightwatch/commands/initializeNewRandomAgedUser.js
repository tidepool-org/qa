'use strict';

var moment = require('moment');

exports.command = function (user) {
    var self = this;
    var randomSeed = self.globals.test_settings.randomSeed ||
        self.globals.timeTestStarted;
    var rand = require('random-seed').create(randomSeed);
    var now = moment.utc();
    var maxBirthday = moment(now).subtract(5, 'years');
    var birthday = maxBirthday.subtract(rand.intBetween(0, 75 * 365), 'days');
    var age = moment(now).diff(birthday, 'years');
    var numberDaysAlive = moment(now).diff(birthday, 'days');
    var diagnosisDate = moment(now).subtract(rand.intBetween(0,
        numberDaysAlive), 'days');
    var diagnosisAge = moment(diagnosisDate).diff(birthday, 'years');
    var fullName = 'nightwatch+' + user.name + '+' + self.globals.timeTestStarted;
    
    self.perform(function () {

        self.globals.users[user.nickname].fullName = fullName;
        self.globals.users[user.nickname].emailAddress = fullName + '+'
            + process.env.TIDEPOOL_BLIP_USER_SKIP_KEY + '@tidepool.org';
        self.globals.users[user.nickname].password =
            process.env.TIDEPOOL_BLIP_USER_PASSWORD;
        self.globals.users[user.nickname].birthday = birthday;
        self.globals.users[user.nickname].age = age;
        self.globals.users[user.nickname].diagnosisDate = diagnosisDate;
        self.globals.users[user.nickname].diagnosisAge = diagnosisAge;
        self.pause(1000);

    });
    
    return self;
};

