'use strict';

angular.module('external-mongo-db')
.directive('externalDbManager', function(externalDbSubscriber) {
  return {
    restrict: 'EA',
    templateUrl: 'client/lib/modules/externalDb/components/externalDbManager/external-db-manager.view.ng.html',
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