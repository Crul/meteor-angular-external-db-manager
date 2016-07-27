Package.describe({
  name: 'crul:meteor-angular-external-db-manager',
  version: '0.1.0',
  summary: 'meteor angular db manager component - working!',
  git: 'https://github.com/Crul/meteor-angular-external-db-manager',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4');
  api.use('ecmascript', 'server');
  api.use('underscore');
  api.use('templating');
  api.use('pbastowski:angular-babel@1.3.6', 'client');
  api.use('driftyco:ionic@1.2.4', 'client');
  api.use('crul:meteor-external-mongo-db@0.3.10');
  
  api.addFiles([
    'client/lib/angular.module.js',
    'client/components/onOffButton/on-off-button.directive.ng.js',
    'client/components/externalDbManager/external-db-subscriber.service.ng.js',
    'client/components/externalDbManager/external-db-manager.directive.ng.js'
  ], 'client');
  
  api.mainModule('meteor-angular-external-db-manager.js');
  
});

Package.onTest(function(api) {
  /*
  api.use('ecmascript', 'server');
  api.use('underscore');
  api.use('tinytest');
  //api.use('pbastowski:angular-babel', 'client');
  //api.use('driftyco:ionic', 'client');
  api.use('crul:meteor-external-mongo-db@0.3.3');
  api.use('crul:meteor-angular-external-db-manager');
  api.mainModule('meteor-angular-external-db-manager-tests.js');
  */
});
