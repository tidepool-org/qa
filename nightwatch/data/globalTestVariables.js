"use strict";

var moment = require('moment');

module.exports = {
    "waitForConditionTimeout": 10000,
    "timeTestStarted": moment.utc().format('YYYYMMDDTHH.mm.ss.SSS'),
    "users": {
        "staticUser": {
            "nickname":"staticUser",
            "name":"general-user-account-for-qa-testing",
            "emailAddress":"nightwatch+qa-testing-do-not-delete+"
                + process.env.TIDEPOOL_BLIP_USER_SKIP_KEY + "@tidepool.org",
            "password":process.env.TIDEPOOL_BLIP_USER_PASSWORD,
        },
        "staticClinician": {
            "nickname":"staticClinician",
            "name":"verified-clinician-account-for-qa-testing",
            "emailAddress":"nightwatch+vca+qa-testing-do-not-delete+"
                + process.env.TIDEPOOL_BLIP_USER_SKIP_KEY + "@tidepool.org",
            "password":process.env.TIDEPOOL_BLIP_USER_PASSWORD,
        },
        "tempUser": {
            "nickname":"tempUser",
            "name":"temporary-fake-user",
            "about":"This is a fake person created for QA Testing. All tempUsers should be deleted after they are used for testing. If you find users in the database with this name, you are welcome to delete them.",
        },
        "patty": {
            "nickname":"patty",
            "name":"patty-g-fisher",
            "age":"35",
            "about":"Mother of Candice Fisher, owner of Candice’s Data, and sister-in-law of Rebecca Fisher. NOTE: This is fake person created for QA Testing.",
        },
        "candice": {
            "nickname":"candice",
            "name":"candice-d-fisher",
            "age":"10",
            "diagnosisAge":"9",
            "about":"Daughter of Patty Fisher, niece of Rebecca Fisher, and patient of Dr. Trees. NOTE: This is fake person created for QA Testing.",
        },
        "rebecca": {
            "nickname":"rebecca",
            "name":"rebecca-d-fisher",
            "age":"28",
            "diagnosisAge":"5",
            "about":"Aunt of Candice Fisher, sister-in-law of Patty Fisher, and patient of Dr. Trees. NOTE: This is fake person created for QA Testing.",
        },
        "doctor": {
            "nickname":"doctor",
            "name":"doctor-n-trees",
            "age":"41",
            "about":"Endocrinologist of Candice Fisher, and Rebecca Fisher. NOTE: This is fake person created for QA Testing.",
        }
    }
}
