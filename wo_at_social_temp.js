//Uses atSocial template from meteor useraccounts bootstrap in place of original atSocial.
Template.woatSocial.replaces("atSocial");

//Global helper to be used to compare OpenID connect providers so as to render the template accordingly.
Template.registerHelper('equals', function(a, b) {

   return a === b;
});

Template.registerHelper('observatories', function(){
        return ["Southampton Web Observatory",
  "UNISA",
  "IIIT-Bangalore",
  "KAIST - Korea"]
    
});

//Template.woatSocial.clearEventMaps();

//Dropdown events and overriding click button event
Template.woatSocial.events({

   'click button':function(event, t){
      
      if (this.name == "wooidc"){
        event.preventDefault();
        console.log(event);
    }
    else{

      event.preventDefault();
      event.currentTarget.blur();
        if (AccountsTemplates.disabled())
            return;
        var user = Meteor.user();
        if (user && user.services && user.services[this._id]){
            var numServices = _.keys(user.services).length; // including "resume"
            if (numServices === 2)
                return;
            else{
                AccountsTemplates.setDisabled(true);
                Meteor.call("ATRemoveService", this._id, function(error){
                    AccountsTemplates.setDisabled(false);
                });
            }
        } else {
            AccountsTemplates.setDisabled(true);
            var parentData = Template.parentData();
            var state = (parentData && parentData.state) || AccountsTemplates.getState();
            var serviceName = this._id;
            var methodName;
            if (serviceName === 'meteor-developer')
                methodName = "loginWithMeteorDeveloperAccount";
            else
                methodName = "loginWith" + capitalize(serviceName);
            var loginWithService = Meteor[methodName];
            options = {
                loginStyle: AccountsTemplates.options.socialLoginStyle,
            };
            if (Accounts.ui) {
                if (Accounts.ui._options.requestPermissions[serviceName]) {
                    options.requestPermissions = Accounts.ui._options.requestPermissions[serviceName];
                }
                if (Accounts.ui._options.requestOfflineToken[serviceName]) {
                    options.requestOfflineToken = Accounts.ui._options.requestOfflineToken[serviceName];
                }
            }
            loginWithService(options, function(err) {
                AccountsTemplates.setDisabled(false);
                if (err && err instanceof Accounts.LoginCancelledError) {
                    // do nothing
                }
                else if (err && err instanceof ServiceConfiguration.ConfigError) {
                    if (Accounts._loginButtonsSession)
                        return Accounts._loginButtonsSession.configureService(serviceName);
                }
                else
                    AccountsTemplates.submitCallback(err, state);
            });
    }
          
}
}

});
