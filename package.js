Package.describe({
  name: 'devasena:accounts-wo',
  version: '0.0.16',
  // Brief, one-line summary of the package.
  summary: 'Login service for Southampton web observatory accounts',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/Southampton-RSG/accounts-wo',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {

  api.use(['underscore', 'random','templating'],'client');
  api.use(['accounts-base','aldeed:template-extension','useraccounts:core','useraccounts:iron-routing'], ['client', 'server']);

  //Export Accounts(etc) to packages using this one.
  api.imply(['accounts-base','aldeed:template-extension@4.0.0','useraccounts:core','useraccounts:iron-routing'], ['client', 'server']);

  //Allow us to call Accounts.oauth.serviceNames, if there are any OAuth
  // services.
  api.use('accounts-oauth', ['client','server']);

  //Using Web Observatory core OpenID Connect implementation
  api.use('devasena:wooidc', ['client','server']);

  api.addFiles(['wooidc_login_button.css','wo_at_social.html','wo_at_social.js'],'client');
  api.addFiles('wooidc.js')

});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('devasena:accounts-wo');
  api.mainModule('accounts-wo-tests.js');
});
