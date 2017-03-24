"use strict";

var moment = require('moment');

module.exports = {
    "waitForConditionTimeout": 10000,
    "timeTestStarted": moment.utc().format('YYYYMMDDTHH.mm.ss.SSS'),
    "characters": {
        "fake-person": {
            "age":"19",
            "about":"This is a fake person created for QA Testing.",
        },
        "patty-g-fisher": {
            "age":"35",
            "about":"Mother of Candice Fisher, owner of Candice’s Data, and sister-in-law of Rebecca Fisher. NOTE: This is fake person created for QA Testing.",
        },
        "candice-d-fisher": {
            "age":"10",
            "diagnosisAge":"9",
            "about":"Daughter of Patty Fisher, niece of Rebecca Fisher, and patient of Dr. Trees. NOTE: This is fake person created for QA Testing.",
        },
        "rebecca-d-fisher": {
            "age":"28",
            "diagnosisAge":"5",
            "about":"Aunt of Candice Fisher, sister-in-law of Patty Fisher, and patient of Dr. Trees. NOTE: This is fake person created for QA Testing.",
        },
        "doctor-n-trees": {
            "age":"41",
            "about":"Endocrinologist of Candice Fisher, Rebecca Fisher, and Tim Dexman. NOTE: This is fake person created for QA Testing.",
        }
    }
}
