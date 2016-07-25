Package.describe({
  name: 'crul:meteor-angular-external-db-manager',
  version: '0.0.2',
  summary: 'meteor angular db manager component',
  // URL to the Git repository containing the source code for this package.
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.5.1');
  api.use('ecmascript');
  api.use('underscore');
  api.use('angular@1.3.11', 'client');
  api.use('driftyco:ionic@1.2.4', 'client');
  api.use('crul:meteor-external-mongo-db');
  /*
  let jsFiles = [
    'client/lib/angular.module.js'
  ];
  api.add_files(jsFiles, 'client', { transpile: false });
  */
  api.mainModule('meteor-angular-external-db-manager.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('underscore');
  api.use('tinytest');
  api.use('crul:meteor-external-mongo-db');
  api.use('crul:meteor-angular-external-db-manager');
  api.mainModule('meteor-angular-external-db-manager-tests.js');
});
