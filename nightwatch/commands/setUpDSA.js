'use strict';

var moment = require('moment');

exports.command = function (userName, pwd) {
    var self = this;
    var now = moment.utc();
    
    self.perform(function () {
        // if userName = pwd (true) then set up DSA for me, and
        // if they are not equal then set up DSA for someone else
        self.page.setUpDataStoragePage().setUpDataStorage(
            userName === pwd,
            moment(now).subtract(self.globals.characters[pwd].age, 'years'),
            moment(now).subtract(self.globals.characters[pwd].diagnosisAge, 'years'),
            pwd)
    });
    
    return self;
};
