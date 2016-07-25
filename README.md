# meteor angular external db manager [![Build Status](https://travis-ci.org/Crul/meteor-angular-external-db-manager.svg?branch=master)](https://travis-ci.org/Crul/meteor-angular-external-db-manager)

external / remote db component for angular meteor apps

```Batchfile
meteor add crul:meteor-angular-external-db-manager
```

## quick start

## dependencies

- ecmascript
- underscore
- angular
- driftyco:ionic
- crul:meteor-external-mongo-db

## roadmap

- add testing (server + client)
- bootstrap version

# example project instructions 

- meteor configuration

    ```Batchfile
    meteor create meteorTestApp
    cd meteorTestApp
    meteor remove blaze-html-templates
    meteor add crul:meteor-angular-external-db-manager
    ```

- add main.js code to client:

    ```javascript
    angular('test', ['meteor-db-manager']);
    ```

- add main.html code to client:

    ```html
    <body ng-app="test">
        <external-db-manager></external-db-manager>
    </body>
    ```
