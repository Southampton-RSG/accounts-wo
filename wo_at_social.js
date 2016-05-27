//Uses atSocial template from meteor useraccounts bootstrap in place of original atSocial.
Template.woatSocial.replaces("atSocial");

//Global helper to be used to compare OpenID connect providers so as to render the template accordingly.
Template.registerHelper('equals', function(a, b) {

   return a === b;
});

Template.registerHelper('observatories', function(){
        return ["Southampton Web Observatory",
  "NUS Singapore NeXT Observatory",
  "UNISA",
  "COSMOS - Cardiff",
  "RPI Web Observatory",
  "Indiana University Truthy",
  "SONIC - Northwestern",
  "UI - Indonesia",
  "IIIT-Bangalore",
  "KAIST - Korea",
  "Stanford - SNAP",
  "The Koblenz Network Collection"]
    
});


//Dropdown events
Template.woatSocial.events({

  /*"change #observatory-select": function (event, template) {
        var observatory = $(event.currentTarget).val();
        console.log("observatory : " + observatory);
        // additional code to do what you want with the observatory
    },

  'click button': function(evt) {

      evt.preventDefault();
      evt.stopPropagation(); //Stop the full-page click handler from firing
      Session.set('woatSocial', this.name);

   },*/

   'click .dropdown-menu li a': function(evt){

      evt.preventDefault();
      Session.set('woatSocial', null);
   },

   'change .dropdown-menu li a': function(event, t){

    //Action to be performed when one of the web observatories domain OIDC provider in the list is clicked.

   } 





});
