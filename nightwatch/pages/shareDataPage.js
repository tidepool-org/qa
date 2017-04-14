'use strict';

module.exports = {
    elements: {
        shareDataButton: {
            selector: 'a.PatientInfo-block'
        },
        shareEmailAddress: {
            selector: '#email'
        },
        inviteButton: {
            selector: 'button[type="submit"]'
        }
    },
    
    commands: [{
        shareDataAllowUpload: function (user) {
            this.shareDataWith(user, true);
            return this.api;
        }
    },
    {
        shareDataDoNotAllowUpload: function (user) {
            this.shareDataWith(user, false);
            return this.api;
        }
    },
    {
        shareDataWith: function (user, allowUpload) {
            var self = this;
            
            self
                .waitForElementPresent('@shareDataButton')
                .click('@shareDataButton')
                .waitForElementPresent('@shareEmailAddress')
                .api
                    .perform(function () {
                        self.setValue('@shareEmailAddress', user.emailAddress);
                    })
                    .pause(1000) //give blip time to check the checkbox
                    .perform(function () {
                        if (allowUpload) {
                            self.api.execute(function () {
                                return document.getElementsByClassName(
                                    "input-group-checkbox-control")[0].checked = true;
                            })
                        } else {
                            self.api.execute(function () {
                                return document.getElementsByClassName(
                                    "input-group-checkbox-control")[0].checked = false;
                            })
                        }
                    });
            self.click('@inviteButton');

            return self.api;
        }
    }]
};
