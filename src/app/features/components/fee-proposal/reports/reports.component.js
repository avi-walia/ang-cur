(function () {
    'use strict';

    angular
        .module('evolution.features.fee.reports')
        .component('feeReports', {
            controller: feeReportsCtrl,
            bindings: {},
            templateUrl: 'app/features/components/fee-proposal/reports/reports.tpl.html'

        });

    feeReportsCtrl.$inject = ['$scope'];

    /* @ngInject */
    function feeReportsCtrl($scope) {
        var vm = this;
        this.functionName = functionName;

        ////////////////

        function functionName() {

        }
    }

})();

