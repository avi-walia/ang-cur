(function () {
    'use strict';

    angular
        .module('evolution.features.fee.serviceFees')
        .component('serviceFees', {
            controller: serviceFeesCtrl,
            bindings: {},
            templateUrl: 'app/features/components/fee-proposal/service-fees/service-fees.tpl.html'

        });

    serviceFeesCtrl.$inject = ['$scope'];

    /* @ngInject */
    function serviceFeesCtrl($scope) {
        var vm = this;
        this.functionName = functionName;

        ////////////////

        function functionName() {

        }
    }

})();

