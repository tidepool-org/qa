"use strict";

var moment = require('moment');

module.exports = {
    "waitForConditionTimeout": 10000,
    "timeTestStarted": moment.utc().format('YYYYMMDDTHH.mm.ss.SSS'),
    "characters": {
        "staticUser": {
            "nickname":"staticUser",
            "emailAddress":"nightwatch+hasData1+" //NOTE: this will be changing soon
                + process.env.TIDEPOOL_BLIP_USER_SKIP_KEY + "@tidepool.org",
            "password":process.env.TIDEPOOL_BLIP_USER_PASSWORD,
        },
        "fake": {
            "nickname":"fake",
            "name":"fake-person",
            "age":"19",
            "about":"This is a fake person created for QA Testing.",
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
