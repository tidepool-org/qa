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
        setUpDataStorage: function (setUpDSAMe, userBirthday, diagnosisDate, userFullName) {
            
            this.waitForElementPresent('@dataStorageForMeCheckbox');
            
            if (setUpDSAMe.toLowerCase().indexOf('n') === 0) {
                this
                    .click('@dataStorageForSomeoneElseCheckbox')
                    .setValue('@fullNameField', userFullName);
            } else {
                this.click('@dataStorageForMeCheckbox');
            }
            
            this
                .setValue('@aboutField', 'I am a fake person')
                .setValue('@birthdayMonth', moment(userBirthday).format('MMMM'))
                .setValue('@birthdayDay', moment(userBirthday).format('D'))
                .setValue('@birthdayYear', moment(userBirthday).format('YYYY'))
                .setValue('@diagnosisDateMonth', moment(diagnosisDate).format('MMMM'))
                .setValue('@diagnosisDateDay', moment(diagnosisDate).format('D'))
                .setValue('@diagnosisDateYear', moment(diagnosisDate).format('YYYY'))
                .pauseAndSaveScreenshot(5000, 'set-up-data-storage-page')
                .click('@submitButton');
            
            return this;
        }
    }]
};
