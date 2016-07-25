import { Tinytest } from "meteor/tinytest";

import { name as packageName } from "meteor/crul:meteor-angular-external-db-manager";

Tinytest.add('meteor-angular-external-db-manager - example', function (test) {
  test.equal(packageName, "meteor-angular-external-db-manager");
});
