# meteor angular external db manager [![Build Status](https://travis-ci.org/Crul/meteor-angular-external-db-manager.svg?branch=master)](https://travis-ci.org/Crul/meteor-angular-external-db-manager)

external / remote db component for angular meteor apps

```Batchfile
meteor add crul:meteor-angular-external-db-manager
```

## quick start

## dependencies

- **[crul:meteor-external-mongo-db](https://github.com/Crul/meteor-angular-external-db-manager)**
- ecmascript
- underscore
- [pbastowski:angular-babel](https://atmospherejs.com/pbastowski/angular-babel)
- [driftyco:ionic](https://atmospherejs.com/driftyco/ionic)

tested with Meteor 1.4

## roadmap

- templates to html files
- add css
- add testing (server + client)
- add bootstrap (vs ionic) version

# example project instructions 

- meteor configuration

    ```Batchfile
    meteor create meteorTestApp
    cd meteorTestApp
    meteor remove ecmascript
    meteor remove blaze-html-templates
    meteor npm install --save angular angular-meteor
    meteor add driftyco:ionic pbastowski:angular-babel crul:meteor-angular-external-db-manager
    ```

- replace client/main.js code:

    ```javascript
    import angular from 'angular';
    import angularMeteor from 'angular-meteor';

    let appName = 'test_app';
    angular.module(appName, ['ionic', angularMeteor, 'external-db-manager']);

    onReady = function() { angular.bootstrap(document, [appName]); };
    if(Meteor.isCordova) {
        angular.element(document).on('deviceready', onReady);
    } else {
        angular.element(document).ready(onReady);
    }
    ```

- replace client/main.html code:

    ```html
    <body>
        <h1>db manager</h1>
        <external-db-manager url="urlModel"></external-db-manager>
    </body>
    ```
