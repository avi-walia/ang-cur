(function () {
    'use strict';

    angular
        .module('evolution.features.fee.investmentOverview')
        .component('investmentOverview', {
            controller: investmentOverviewCtrl,
            bindings: {},
            templateUrl: 'app/features/components/fee-proposal/investment-overview/investment-overview.tpl.html'
        });

    investmentOverviewCtrl.$inject = ['mockService', 'waitForResourcesService'];

    /* @ngInject */
    function investmentOverviewCtrl(mockService, waitForResourcesService) {
        var vm = this;
        vm.totalGroupAmount = 932523523;//this is the sum of all IP group's investment amounts & LInked CI Assets

        vm.mockService = mockService;

        // console.log(vm.mockService.data[0][0][0]);
        var tmpFamilyGroup = vm.mockService.data[0][0][0];

        vm.profiles = tmpFamilyGroup.profileSummaries;

        // console.log(profiles); //for now this is length =7 but this should be dynamic!

        vm.functionName = functionName;

        ////////////////

        function functionName() {

        }
    }

})();

