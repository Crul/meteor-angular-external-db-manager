'use strict';

angular.module('external-db-manager')
.directive('onOffButton', function() {
  return {
    restrict: 'EA',
    templateUrl: 'client/components/onOffButton/on-off-button.view.ng.html',
    replace: true,
    scope: {
      isOn: '&buttonModel',
      onAction: '&',
      offAction: '&'
    },
    link: function(scope, elem, attrs) {
      
    }
  };
});