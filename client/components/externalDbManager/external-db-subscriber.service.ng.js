'use strict';

angular.module('external-db-manager')
.factory('externalDbSubscriber', function($meteor) {
  let data = {
    collectionPool: {}
  };

  let service = {
    subscribeToDb: subscribeToDb,
    unsubscribeFromDb: unsubscribeFromDb,
    subscribeToCollection: subscribeToCollection,
    unsubscribeFromCollection: unsubscribeFromCollection,
    pageSize: 3
  };  

  return service;

  function subscribeToDb(dbUrl) {
    let dbName = ((dbUrl || '').split('/').pop() || '');
    let publicationName = `${dbName}-collections`;
    data.db = {
      url: dbUrl,
      publicationName: publicationName
    };
    $meteor.call('externalDb.connect', data.db.url).then(loadDbCollections);

    return data.db;

    function loadDbCollections() {
      return $meteor.subscribe(publicationName).then(subscribeDbCollection);
    }

    function subscribeDbCollection(subscription) {
      data.db.subscription = subscription;
      data.db.collections = getCollection(publicationName);
    }
  }
  
  function unsubscribeFromDb() {
    if (!data.db) return;
    $meteor.call('externalDb.disconnect', data.db.url);
    stopCollection(data.db.subscription, data.db.collections);
  }

  function subscribeToCollection(collection, page) {
    let publicationName = data.db.getCollectionPublicationName(collection);
    let query = {};
    let pagination = getPaginationParams(page);
    return $meteor.subscribe(publicationName, query, pagination).then(subscribeCollection);

    function subscribeCollection(subscription) {
      data.collectionSubscription = subscription;
      let collectionName = collection.name;
      data.collection = getCollection(collectionName);

      return data.collection;
    }
  }

  function unsubscribeFromCollection() {
      stopCollection(data.collectionSubscription, data.collection);
  }

  function getCollection(poolKey) {
    let pool = data.collectionPool;
    pool[poolKey] = pool[poolKey] || new Mongo.Collection(poolKey);
    return $meteor.collection(pool[poolKey]);
  }
  
  function stopCollection(subscription, collection) {
    if (collection)
      collection.stop();

    if (subscription)
      subscription.stop();
  }

  function getPaginationParams(page) {
    let skip = (page - 1) * service.pageSize;
    let limit = service.pageSize;
    return { skip: skip, limit: limit };
  }
});