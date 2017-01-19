(function () {
    'use strict';

    angular
        .module('evolution.features.fee.summary')
        .component('feeSummary', {
            controller: feeSummaryCtrl,
            bindings: {},
            templateUrl: 'app/features/components/fee-proposal/summary/summary.tpl.html'

        });

    feeSummaryCtrl.$inject = ['$scope'];

    /* @ngInject */
    function feeSummaryCtrl($scope) {
        var vm = this;
        this.functionName = functionName;

        ////////////////

        function functionName() {

        }
    }

})();

