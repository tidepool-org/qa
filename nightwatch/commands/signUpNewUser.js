'use strict';

exports.command = function (user, vca) {
    
    if (typeof vca !== 'undefined') {
        var accountType = 'clinician';
    } else {
        var accountType = 'personal';  
    }
    
    this
        .url(process.env.TIDEPOOL_BLIP_LAUNCH_URL + 'signup/')
        .page.selectUserTypePage().selectAccountType(accountType)
        .page.signupPage().enterUserCredentials(user)
        .pause(3000)
        .page.signupPage().goToLoginPage()
        .page.loginPage().signInAndRememberMe(user)
        .page.acceptTermsPage().acceptTerms(user);
    
    return this;
};
