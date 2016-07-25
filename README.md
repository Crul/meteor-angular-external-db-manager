# meteor angular external db manager

external / remote db component for angular meteor apps

```Batchfile
meteor add crul:meteor-angular-external-db-manager
```

## quick start

## dependencies

- ecmascript
- underscore
- pbastowski:angular-babel
- angular-templates
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

- add main.html code to client:

    ```html
    <body>
        <external-db-manager></external-db-manager>
    </body>
    ```
