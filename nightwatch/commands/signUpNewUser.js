'use strict';

exports.command = function (userName) {
    this
        .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL + 'signup/?inviteKey=' +
            process.env.TIDEPOOL_BLIP_USER_INVITE_KEY)
        .page.signupPage().enterUserCredentials(userName)
        .pause(3000)
        .page.signupPage().goToLoginPage()
        .page.loginPage().signInAndRememberMe(
            this.globals.characters[userName].userEmail)
        .page.selectAgePage().selectAge(
            this.globals.characters[userName].age)
        .page.acceptTermsPage().acceptTerms(
            this.globals.characters[userName].age);
    
    return this;
};
