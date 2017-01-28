'use strict';

var moment = require('moment');

module.exports = {
    elements: {
        dataStorageForMeCheckbox: {
            selector: '#isOtherPerson0'
        },
        dataStorageForSomeoneElseCheckbox: {
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
        setUpDataStorage: function (setUpDSAForMe, userBirthday, diagnosisDate, userFullName) {
            
            var bday = moment(userBirthday),
                dday = moment(diagnosisDate);
            
            this.waitForElementPresent('@dataStorageForMeCheckbox');
            
            if (setUpDSAForMe) {
                this.click('@dataStorageForMeCheckbox');
            } else {
                this
                    .click('@dataStorageForSomeoneElseCheckbox')
                    .setValue('@fullNameField', userFullName);
            }
            
            this
                .setValue('@aboutField', 'I am a fake person')
                .setValue('@birthdayMonth', bday.format('MMMM'))
                .setValue('@birthdayDay', bday.format('D'))
                .setValue('@birthdayYear', bday.format('YYYY'))
                .setValue('@diagnosisDateMonth', dday.format('MMMM'))
                .setValue('@diagnosisDateDay', dday.format('D'))
                .setValue('@diagnosisDateYear', dday.format('YYYY'))
                .pauseAndSaveScreenshot(5000, 'set-up-data-storage-page')
                .click('@submitButton');
            
            return this;
        }
    }]
};
