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
        shareDataAllowUpload: function (character) {
            this.shareDataWith(character, true);
            return this.api;
        }
    },
    {
        shareDataDoNotAllowUpload: function (character) {
            this.shareDataWith(character, false);
            return this.api;
        }
    },
    {
        shareDataWith: function (character, allowUpload) {
            var self = this;
            
            self
                .waitForElementPresent('@shareDataButton')
                .click('@shareDataButton')
                .waitForElementPresent('@shareEmailAddress')
                .api
                    .perform(function () {
                        self.setValue('@shareEmailAddress', character.emailAddress);
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
