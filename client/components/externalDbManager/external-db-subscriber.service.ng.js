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
    unsubscribeFromCollection: unsubscribeFromCollection 
  };  

  return service;

  function subscribeToDb(dbUrl) {
    data.db = new ExternalDb(dbUrl);
    let publicationName = data.db.publicationName;
    $meteor.call('externalDb.connect', data.db.url).then(loadDbCollections);

    return data.db;

    function loadDbCollections() {
      return $meteor.subscribe(publicationName).then(subscribeDbCollection);
    }

    function subscribeDbCollection(subscription) {
      data.db.subscription = subscription;
      data.db.collections = $meteor.collection(getCollection(publicationName));
    }
  }
  
  function unsubscribeFromDb() {
    if (!data.db) return;
    $meteor.call('externalDb.disconnect', data.db.name);
    stopCollection(data.db.subscription, data.db.collections);
  }

  function subscribeToCollection(collection) {
    let publicationName = data.db.getCollectionPublicationName(collection);
    return $meteor.subscribe(publicationName).then(subscribeCollection);

    function subscribeCollection(subscription) {
      data.collectionSubscription = subscription;
      let collectionName = collection.name;
      let meteorCollection = getCollection(collectionName, collectionName);
      data.collection = $meteor.collection(meteorCollection);

      return data.collection;
    }
  }

  function unsubscribeFromCollection() {
      stopCollection(data.collectionSubscription, data.collection);
  }

  function getCollection(poolKey, collectionName) {
    let pool = data.collectionPool;
    pool[poolKey] = pool[poolKey] || data.db.createCollection(collectionName);
    return pool[poolKey];
  }
  
  function stopCollection(subscription, collection) {
    if (collection) {
      collection.stop();
      collection.remove();
    }

    if (subscription)
      subscription.stop();
  }
});