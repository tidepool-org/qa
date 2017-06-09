'use strict';

exports.command = function (user, vca) {
    
    var inviteURL = process.env.TIDEPOOL_BLIP_LAUNCH_URL + 'signup/?inviteKey='
            + process.env.TIDEPOOL_BLIP_USER_INVITE_KEY;
    
    if (typeof vca !== 'undefined') {
        inviteURL = inviteURL + '&roles=clinic';
    }
    
    this
        .url(inviteURL)
        .page.signupPage().enterUserCredentials(user)
        .pause(3000)
        .page.signupPage().goToLoginPage()
        .page.loginPage().signInAndRememberMe(user)
        .page.acceptTermsPage().acceptTerms(user);
    
    return this;
};
