'use strict';

angular.module('external-db-manager')
.directive('onOffButton', function() {
  return {
    restrict: 'EA',
    template: '' +
              '<button class="button button-small"' +
              '        style="float: right; margin-left: 9px;"' +
              '        ng-class="isOn() ? \'button-assertive\' : \'button-balanced\'"' +
              '        ng-click="isOn() ? onAction() : offAction()">' +
              '' +
              '    <i class="icon"' +
              '        ng-class="isOn() ? \'ion-toggle-filled\' : \'ion-toggle\'"></i>' +
              '' +
              '</button>',
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