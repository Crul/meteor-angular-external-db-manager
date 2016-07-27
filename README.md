# meteor angular external db manager [![Build Status](https://travis-ci.org/Crul/meteor-angular-external-db-manager.svg?branch=master)](https://travis-ci.org/Crul/meteor-angular-external-db-manager)

external / remote db component for angular meteor apps

```Batchfile
meteor add crul:meteor-angular-external-db-manager
```

## quick start

## dependencies

- ecmascript
- underscore
- pbastowski:angular-babel
- driftyco:ionic
- crul:meteor-external-mongo-db

## roadmap

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
    meteor add angular-templates
    meteor npm install --save angular angular-meteor
    meteor add driftyco:ionic pbastowski:angular-babel crul:meteor-external-mongo-db
    ```

- add main.js code to client:

    ```javascript
    import angular from 'angular';
    import angularMeteor from 'angular-meteor';

    let appName = 'test_app';
    angular(appName, [angularMeteor, 'external-db-manager']);

    onReady = function() { angular.bootstrap(document, [appName]); };
    if(Meteor.isCordova) {
        angular.element(document).on('deviceready', onReady);
    } else {
        angular.element(document).ready(onReady);
    }
    ```

- add main.html code to client:

    ```html
    <body>
        <h1>db manager</h1>
        <external-db-manager></external-db-manager>
    </body>
    ```
