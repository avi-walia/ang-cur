(function () {
    'use strict';

    angular
        .module('evolution.features.fee.investmentOverview')
        .component('investmentOverview', {
            controller: investmentOverviewCtrl,
            bindings: {},
            templateUrl: 'app/features/components/fee-proposal/investment-overview/investment-overview.tpl.html'

        });

    investmentOverviewCtrl.$inject = ['$scope'];

    /* @ngInject */
    function investmentOverviewCtrl($scope) {
        var vm = this;
        this.functionName = functionName;

        ////////////////

        function functionName() {

        }
    }

})();

