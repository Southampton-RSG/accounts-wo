Accounts.oauth.registerService('wooidc');

if (Meteor.isClient) {

    Meteor.loginWithWooidc = function (options,callback) {
        // support a callback without options
        if (! callback && typeof options === 'function') {
            callback = options;
            options = null;
        }

        var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
        Wooidc.requestCredential(options, wonode, credentialRequestCompleteCallback);
    };
}
else {
    Accounts.addAutopublishFields({
        forLoggedInUser: ['services.wooidc'],
        forOtherUsers: ['services.wooidc.id']
    });
}
