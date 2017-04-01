'use strict';

exports.command = function (character) {
    this
        .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL + 'signup/?inviteKey='
            + process.env.TIDEPOOL_BLIP_USER_INVITE_KEY)
        .page.signupPage().enterUserCredentials(character)
        .pause(3000)
        .page.signupPage().goToLoginPage()
        .page.loginPage().signInAndRememberMe(character)
        .page.selectAgePage().selectAge(character)
        .page.acceptTermsPage().acceptTerms(character);
    
    return this;
};
