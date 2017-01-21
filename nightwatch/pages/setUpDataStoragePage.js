'use strict';

var moment = require('moment');

module.exports = {
    elements: {
        forMe: {
            selector: '#isOtherPerson0'
        },
        forSomeoneElse: {
            selector: '#isOtherPerson1'
        },
        fullName: {
            selector: '#fullName'
        },
        aboutPerson: {
            selector: '#about'
        },
        birthMonth: {
            selector: 'div[name="birthday"] > select[name="month"].DatePicker-control.DatePicker-control--month'
        },
        birthDay: {
            selector: 'div[name="birthday"] > input[name="day"].DatePicker-control.DatePicker-control--day'
        },
        birthYear: {
            selector: 'div[name="birthday"] > input[name="year"].DatePicker-control.DatePicker-control--year'
        },
        diagnosisMonth: {
            selector: 'div[name="diagnosisDate"] > select[name="month"].DatePicker-control.DatePicker-control--month'
        },
        diagnosisDay: {
            selector: 'div[name="diagnosisDate"] > input[name="day"].DatePicker-control.DatePicker-control--day'
        },
        diagnosisYear: {
            selector: 'div[name="diagnosisDate"] > input[name="year"].DatePicker-control.DatePicker-control--year'
        },
        submit: {
            selector: 'button.btn'
        }
    },
    commands: [{
        setUpDataStorage: function (setUpDSAMe, userBirthday, diagnosisDate, userFullName) {
            this
                .waitForElementPresent('@forMe')
                .pauseAndSaveScreenshot(10000, 'set-up-data-storage-page');
            
            if (setUpDSAMe.toLowerCase().indexOf('n') === 0) {
                this
                    .click('@forSomeoneElse')
                    .setValue('@fullName', userFullName);
            } else {
                this.click('@forMe');
            }
            
            this
                .setValue('@aboutPerson', 'I am a fake person')
                .setValue('@birthMonth', moment(userBirthday).format('MMMM'))
                .setValue('@birthDay', moment(userBirthday).format('D'))
                .setValue('@birthYear', moment(userBirthday).format('YYYY'))
                .setValue('@diagnosisMonth', moment(diagnosisDate).format('MMMM'))
                .setValue('@diagnosisDay', moment(diagnosisDate).format('D'))
                .setValue('@diagnosisYear', moment(diagnosisDate).format('YYYY'))
                .pauseAndSaveScreenshot(5000, 'set-up-data-storage-page')
                .click('@submit');
            
            return this;
        }
    }]
};
