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

//Global helper to be used for finding the number of WO nodes configured.
Template.registerHelper('configLength', function() {
  
  var schemaloginservice = ServiceConfiguration.configurations.findOne({ service: 'wooidc' });

  var config_length = schemaloginservice.config.length;
  return config_length;

});

//Global helper to be used to compare service name and number of configured nodes for web observatory
Template.registerHelper('wooidcconfig', function() {

  var schemaloginservice = ServiceConfiguration.configurations.findOne({ service: 'wooidc' });
 
  var config_length = schemaloginservice.config.length;

  if ( (this._id === "wooidc")&&(config_length > 1) )
     return true;
  else
     return false;
}); 

//Meteor woatSocial template events
Template.woatSocial.events({

   'click li#at-wooidc.suwo':function(event, t){
      
        event.preventDefault();
        console.log($(event.target).text());
    }
          

});
