'use strict';

var moment = require('moment');

exports.command = function (user) {
    var self = this;
    var randomSeed = self.globals.randomSeed ||
        self.globals.timeTestStarted;
    var rand = require('random-seed').create(randomSeed);
    var now = moment.utc();
    
    // randomly select age to be between 1 and 80 years old
    var maxBirthday = moment(now).subtract(1, 'years');
    var birthday = maxBirthday.subtract(rand.intBetween(0, 79 * 365), 'days');
    var age = moment(now).diff(birthday, 'years');
    
    // randomly select diagnosis date/age to be between now and birth date.
    var numberDaysAlive = moment(now).diff(birthday, 'days');
    var diagnosisDate = moment(now).subtract(rand.intBetween(0,
        numberDaysAlive), 'days');
    var diagnosisAge = moment(diagnosisDate).diff(birthday, 'years');
    
    self.perform(function () {

        self.initializeNewUser(user);
        self.globals.users[user.nickname].birthday = birthday;
        self.globals.users[user.nickname].age = age;
        self.globals.users[user.nickname].diagnosisDate = diagnosisDate;
        self.globals.users[user.nickname].diagnosisAge = diagnosisAge;
        self.pause(1000);

    });
    
    return self;
};

