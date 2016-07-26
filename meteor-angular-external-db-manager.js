import { ExternalDbPublisher } from 'meteor/crul:meteor-external-mongo-db';

if (Meteor.isServer) {
    var externalDbPublisher = new ExternalDbPublisher();
    Meteor.methods({
        'externalDb.connect': function(dbUrl) {
            return externalDbPublisher.connect(dbUrl);
        },
        'externalDb.disconnect': function(dbUrl) {
            return externalDbPublisher.disconnect(dbUrl);
        }
    });
}

// Variables exported by this module can be imported by other packages and
// applications. See meteor-angular-external-db-manager-tests.js for an example of importing.
export const name = 'meteor-angular-external-db-manager';
