'use strict';

var moment = require('moment');

module.exports = {
    elements: {
        DSAForMeCheckbox: {
            selector: '#isOtherPerson0'
        },
        DSAForSomeoneElseCheckbox: {
            selector: '#isOtherPerson1'
        },
        fullNameField: {
            selector: '#fullName'
        },
        aboutField: {
            selector: '#about'
        },
        birthdayMonth: {
            selector: 'div[name="birthday"] > select[name="month"].DatePicker-control.DatePicker-control--month'
        },
        birthdayDay: {
            selector: 'div[name="birthday"] > input[name="day"].DatePicker-control.DatePicker-control--day'
        },
        birthdayYear: {
            selector: 'div[name="birthday"] > input[name="year"].DatePicker-control.DatePicker-control--year'
        },
        diagnosisDateMonth: {
            selector: 'div[name="diagnosisDate"] > select[name="month"].DatePicker-control.DatePicker-control--month'
        },
        diagnosisDateDay: {
            selector: 'div[name="diagnosisDate"] > input[name="day"].DatePicker-control.DatePicker-control--day'
        },
        diagnosisDateYear: {
            selector: 'div[name="diagnosisDate"] > input[name="year"].DatePicker-control.DatePicker-control--year'
        },
        submitButton: {
            selector: 'button.btn'
        }
    },
    
    commands: [{
        setupDSA: function (userName, pwd) {
            var self = this;
            var now = moment.utc();
            var pwdIsUser = userName === pwd;
            var birthDate = moment(now).subtract(self.api.globals.characters[pwd].age, 'years');
            var diagnosisDate = moment(now).subtract(self.api.globals.characters[pwd].diagnosisAge, 'years');

            self.waitForElementPresent('@DSAForMeCheckbox')
                .api.perform(function () {
                    if (pwdIsUser) {
                        self.click('@DSAForMeCheckbox');
                    } else {
                        self.api.pause(1000)
                        self
                            .click('@DSAForSomeoneElseCheckbox')
                            .setValue('@fullNameField', pwd)
                    }
                })
            
            self
                .setValue('@aboutField', self.api.globals.characters["fake-person"].about)
                .setValue('@birthdayMonth', birthDate.format('MMMM'))
                .setValue('@birthdayDay', birthDate.format('D'))
                .setValue('@birthdayYear', birthDate.format('YYYY'))
                .setValue('@diagnosisDateMonth', diagnosisDate.format('MMMM'))
                .setValue('@diagnosisDateDay', diagnosisDate.format('D'))
                .setValue('@diagnosisDateYear', diagnosisDate.format('YYYY'))
                .pauseAndSaveScreenshot(5000, 'set-up-data-storage-page')
                .click('@submitButton')
            
            return self.api;
        }
    }]
};
