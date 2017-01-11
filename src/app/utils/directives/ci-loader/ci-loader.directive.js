(function () {
    'use strict';

    angular
        .module('evolution.utils')
        .directive('ciLoader', ciLoader);

    /* @ngInject */
    function ciLoader() {
        var directive = {
            bindToController: {
                loading: '=loading'
            },
            controller: function() {},
            controllerAs: 'ctrl',
            transclude: true,
            replace: true,
            restrict: 'E',
            scope: {},
            template:
                '<div ng-class="{loading: ctrl.loading}" aria-busy="{{ctrl.loading}}">' +
                    '<div ng-if="!ctrl.loading" ng-transclude></div>' +
                '</div>'
        };
        return directive;

    }


})();

