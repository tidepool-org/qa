'use strict';

exports.command = function (user) {
    this
        .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL + 'signup/?inviteKey='
            + process.env.TIDEPOOL_BLIP_USER_INVITE_KEY)
        .page.signupPage().enterUserCredentials(user)
        .pause(3000)
        .page.signupPage().goToLoginPage()
        .page.loginPage().signInAndRememberMe(user)
        .page.selectAgePage().selectAge(user)
        .page.acceptTermsPage().acceptTerms(user);
    
    return this;
};
