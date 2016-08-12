//Uses atSocial template from meteor useraccounts bootstrap in place of original atSocial.
Template.woatSocial.replaces("atSocial");

//Global helper to be used to compare OpenID connect providers so as to render the template accordingly.
Template.registerHelper('equals', function(a, b) {

   return a === b;
});

//Global helper to be used to check whether number of configured Web Observatory nodes for service WOOIDC are more than one.
Template.registerHelper('morethanone', function(n, one) {

  return n > one;
});


//Global helper to be used to compare service name and number of configured nodes for web observatory
Template.registerHelper('wooidcconfig', function() {

  //WOOIDC login service schema.

  var schemaloginservice =  ServiceConfiguration.configurations.findOne({ service: 'wooidc' });
  var configLength;

  if ( (this._id === "wooidc") ){
     if(!schemaloginservice)
        console.log("No Web observatory nodes configured yet.");
     else{
        //Finding the number of WO nodes configured.
        configLength = schemaloginservice.config.length;
     }
  }

 if ( (this._id === "wooidc") ){
     if ( (configLength >= 1) )
     {
        //Removing all the event handlers if the Oauth service is Web observatory and if its configured with one or more than one WO nodes.
        Template.atSocial.clearEventMaps();
        return true;
     }
     else{
        console.log("Using button's default click functionality");
        return false;
        }
 }
 else
     return false;
});

//All the configured WO nodes are stored in this array with their respective clientIDs and secret keys for application.
var nodeArray = [];

//Global helper for populating WOOIDC dropdown menu with configured domains.
Template.registerHelper('woNodes', function() {
    
   //WOOIDC login service schema.

    var schemaloginservice =  ServiceConfiguration.configurations.findOne({ service: 'wooidc' });

    var configArray = schemaloginservice.config;

    /*return configArray.forEach(function (doc) {
       console.log(doc.domain);
       nodeArray.push(doc.domain);
       console.log(nodeArray);
       return nodeArray;
    });*/

    console.log(configArray);
    return configArray;

}); 

//Meteor woatSocial template events

  Template.body.events({

     //WOOIDC button click event.
    'click button': function(event, t) {

       console.log("Button text is: ", event.currentTarget.innerText);
       if ( (this.id === "at-wooidc") ){
            if (event.currentTarget.innerText === "CONFIGURE WOOIDC")
            {
              event.preventDefault();

              console.log(this.id);        
              console.log(event.target);

 
              //InnerHTML without tags just the selected button value.
              console.log(event.currentTarget.textContent);
              var wonode = event.currentTarget.textContent;

              //Main action once the button is clicked.
              event.currentTarget.blur();

              var serviceName = "wooidc";            
              var methodName;
              //var parentData = Template.parentData();
              //var state = (parentData && parentData.state) || AccountsTemplates.getState();
              var state = AccountsTemplates.getState();

              //Debug for template state
              console.log(state);

             //capitalize function
            var capitalize = function(str) {
               str = str == null ? '' : String(str);
               return str.charAt(0).toUpperCase() + str.slice(1);
            }; 

            if (serviceName === 'meteor-developer')
                 methodName = "loginWithMeteorDeveloperAccount";
            else
                 methodName = "loginWith" + capitalize(serviceName);

            //Debug for methodName
            console.log("Method Name is: ", methodName);            

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
            loginWithService(options, wonode, function(err) {
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
            else
            {
              event.preventDefault();
              console.log("WOOIDC button clicked.")
            }

       } 

     },

     //WOOIDC configured domains click event.
     
    'click .wodomain li':function(event, Template) {

        event.preventDefault();

        //Get the values of all domains configured and are present in dropdown list of WOOIDC button.
        var configured_domains = $(".domain").text();
        console.log("Configured WO domains: " + configured_domains); //Command for testing whether the configured domains are updated in the dropdown list

        $(event.target).html();
        
        console.log(this.id);        
        console.log(event.target);

        //InnerHTML for selected domain from dropdown list
        //console.log(event.currentTarget.innerHTML); //Command for testing

        //InnerHTML without tags just the selected domain value.
        //console.log(event.currentTarget.innerText); //Command for testing
        console.log(event.currentTarget.textContent);
        var wonode = event.currentTarget.textContent;

        //Main action once the configured domain is clicked.
        event.currentTarget.blur();
        if (AccountsTemplates.disabled())
            return;

         var serviceName = "wooidc";            
         var methodName;
         //var parentData = Template.parentData();
         //var state = (parentData && parentData.state) || AccountsTemplates.getState();
         var state = AccountsTemplates.getState();

         //Debug for template state
         console.log(state);

         //capitalize function
         var capitalize = function(str) {
             str = str == null ? '' : String(str);
             return str.charAt(0).toUpperCase() + str.slice(1);
         }; 

         if (serviceName === 'meteor-developer')
                methodName = "loginWithMeteorDeveloperAccount";
         else
                methodName = "loginWith" + capitalize(serviceName);

         //Debug for methodName
         console.log(methodName);            

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
            loginWithService(options, wonode, function(err) {
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
        
     },

});

