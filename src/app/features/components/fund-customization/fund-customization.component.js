(function () {
    'use strict';

    angular
        .module('evolution.features.fundCustomization')
        .component('fundCustomization', {
            controller: fundCustomizationCtrl,
            bindings: {},
            templateUrl: 'app/features/components/fund-customization/fund-customization.tpl.html'

        });

    fundCustomizationCtrl.$inject = ['$state', '$window', 'dataCacheLocalStorage', 'fundCustomizationService'];

    /* @ngInject */
    function fundCustomizationCtrl($state, $window, dataCacheLocalStorage, fundCustomizationService) {
        var vm = this;
        vm.goToFeeProposal = goToFeeProposal;

        function goToFeeProposal() {
            //lets grab all funds
            getFunds().then(function (data) {
                console.log(data);
                dataCacheLocalStorage.put('fundList', data);

                var url = $state.href('main.evolution.fee.contactInfo');
                $window.open(url, '_blank');
            });
        }


        function getFunds() {
            return fundCustomizationService.getData('/getAllFundList')
                .then(function (data) {
                    return data;
                }, function (error) {
                    console.error('Error: fundCustomizationService getData call');
                    return;
                });
        }

    }

})();

