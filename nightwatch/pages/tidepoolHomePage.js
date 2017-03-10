'use strict';

module.exports = {
    elements: {
        blogLink: {
            selector: 'a[href*="/blog/"]'
        },
        donateLink: {
            selector: 'a[href="https://tidepool.org/donate/"]'
        },
        aboutLink: {
            selector: 'a[href="/about/"]'
        },
        pwt1dLink: {
            selector: 'a[href="/people-with-type-1-diabetes/#pwt1d"]'
        },
        clinicsLink: {
            selector: 'a[href="/clinics"]'
        },
        researchersLink: {
            selector: 'a[href="/people-with-type-1-diabetes/#researchers"]'
        },
        tidepoolLabsLink: {
            selector: 'a[href="http://labs.tidepool.io/"]'
        },
        pressLink: {
            selector: 'a[href*="/press/"]'
        },
        jobsLink: {
            selector: 'a[href*="/jobs/"]'
        },
        contactUsLink: {
            selector: 'a[href="mailto:info@tidepool.org"]'
        },
        followUsTwitterLink: {
            selector: 'a[href="https://twitter.com/Tidepool_org"]'
        },
        followUsFacebookLink: {
            selector: 'a[href="https://www.facebook.com/TidepoolOrg"]'
        },
        followUsYouTubeLink: {
            selector: 'a[href="https://www.youtube.com/channel/UCsICBdq6SUXGiRr-zaGI4ig"]'
        }
    },

    commands: [{
        assertLinks: function () {
            this
                .waitForElementPresent('@blogLink')
                .assert.elementPresent('@donateLink')
                .assert.elementPresent('@aboutLink')
                .assert.elementPresent('@pwt1dLink')
                .assert.elementPresent('@clinicsLink')
                .assert.elementPresent('@researchersLink')
                .assert.elementPresent('@tidepoolLabsLink')
                .assert.elementPresent('@pressLink')
                .assert.elementPresent('@jobsLink')
                .assert.elementPresent('@contactUsLink')
                .assert.elementPresent('@followUsTwitterLink')
                .assert.elementPresent('@followUsFacebookLink')
                .assert.elementPresent('@followUsYouTubeLink')
                .pauseAndSaveScreenshot(1000, 'tidepool-homepage.png');
            
            return this.api;
        }
    }]
};
