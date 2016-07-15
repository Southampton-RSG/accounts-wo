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


  //Finding the number of WO nodes configured.

  var configLength = schemaloginservice.config.length;


  if ( (this._id === "wooidc") ){
     if ( (configLength > 1) )
     {
        //Removing all the event handlers if the Oauth service is Web observatory and its already configured with more than one WO nodes.
        Template.atSocial.clearEventMaps();
        return true;
     }
     else
        return false;
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

       if ( this.id === "at-wooidc"){
             event.preventDefault();
             console.log("WOOIDC button clicked.")
       }
       

     },

     //WOOIDC configured domains click event.
     
    'click li':function(event, Template) {

        event.preventDefault();

        //Get the values of all domains configured and are present in dropdown list of WOOIDC button.
        var configured_domains = $(".domain").text();
        console.log("Configured WO domains: " + configured_domains);

        $(event.target).html();
        
        //InnerHTML for selected domain from dropdown list
        console.log(event.currentTarget.innerHTML);

        //InnerHTML without tags just the selected domain value.
        console.log(event.currentTarget.innerText);
        console.log(event.currentTarget.textContent);
        
     }

});

