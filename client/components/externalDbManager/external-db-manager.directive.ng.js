'use strict';

let template = '' +
  '<div class="external-db-manager">' +
  '' +
  '    <div class="bar bar-header item-input-inset connection-form"' +
  '         ng-class="{ connected: isDatabaseLoaded() }">' +
  '' +
  '        <label class="item-input-wrapper">' +
  '            <input type="text"' +
  '                   style="min-width: 300px;"' +
  '                    placeholder="db url" ' +
  '                    ng-model="url"' +
  '                    ng-disabled="database.collections" />' +
  '        </label>' +
  '        <on-off-button' +
  '            button-model="isDatabaseLoaded()"' +
  '            on-action="disconnect()" ' +
  '            off-action="connect()">' +
  '        </on-off-button>' +
  '' +
  '    </div>' +
  '' +
  '    <div ng-show="isDatabaseLoaded()">' +
  '' +
  '        <ion-list ng-show="!isCollectionLoaded()">' +
  '            <ion-item ng-repeat="collection in database.collections"' +
  '                      ng-click="loadCollection(collection)">' +
  '' +
  '                <div class="item-note">{{collection._id}}</div>' +
  '                <div>{{collection.name}}</div>' +
  '' +
  '            </ion-item>' +
  '        </ion-list>' +
  '' +
  '       <div class="bar bar-header item-input-inset collection-header"' +
  '            ng-show="isCollectionLoaded()">' +
  '                ' +
  '            <button class="button button-small button-calm"' +
  '                    ng-click="exitCollection()">' +
  '                <i class="icon ion-arrow-up-c"></i>' +
  '            </button>' +
  '' +
  '            <label class="item-input-wrapper">' +
  '                <h2 class="title">' +
  '                    {{collection.$$collection._name}}' +
  '                </h2>' +
  '            </label>' +
  '' +
  '        </div>' +
  '' +
  '        <div ng-show="isCollectionLoaded()">' +
  '            <div class="row table-header">' +
  '                <div class="col"' +
  '                     ng-repeat="col in getColumns(collection)">' +
  '                        {{col}}' +
  '                </div>' +
  '            </div>' +
  '' +
  '            <div class="row"' +
  '                 ng-repeat="collectionItem in collection">' +
  '                <div class="col"' +
  '                     ng-repeat="col in getColumns(collectionItem)">' +
  '                        {{collectionItem[col]}}' +
  '                </div>' +
  '            </div>' +
  '        </div>' +
  '    </div>' +
  '</div>';

angular.module('external-db-manager')
.directive('externalDbManager', function(externalDbSubscriber) {
  return {
    restrict: 'EA',
    template: template,
    replace: true,
    scope: {
      url: '='
    },
    link: function(scope, elem, attrs) {
      
      scope.connect = connect;
      scope.disconnect = disconnect;
      scope.loadCollection = loadCollection;
      scope.exitCollection = exitCollection;
      scope.isDatabaseLoaded = isDatabaseLoaded;
      scope.isCollectionLoaded = isCollectionLoaded;
      scope.getColumns = getColumns;

      if (scope.url)
        connect(scope.url);

      function connect() {
        scope.database = externalDbSubscriber.subscribeToDb(scope.url);
      }

      function disconnect() {
        exitCollection();

        externalDbSubscriber.unsubscribeFromDb();
        scope.database = undefined;
      }

      function loadCollection(collection) {
        externalDbSubscriber.subscribeToCollection(collection).then(setCollection);
      }

      function setCollection(collection) {
        scope.collection = collection;
      }

      function exitCollection() {
        externalDbSubscriber.unsubscribeFromCollection();
        scope.collection = undefined;
      }

      function isDatabaseLoaded() {
        return !!scope.database;
      }

      function isCollectionLoaded() {
        return isDatabaseLoaded() && !!scope.collection;
      }

      function getColumns(item) {
        if (!item)
          return [];

        if (!_.isArray(item))
          return _.keys(item) || [];
        
        return item.length > 0 ? _.keys(item[0]) : [];
      }
    }
  };
});