(function () {
    'use strict';
    angular.module('evolution.features.selectClientProfile').component('selectClientProfile', {
        controller: selectClientProfileCtrl,
        bindings: {},
        templateUrl: 'app/features/components/select-client-profile/select-client-profile.tpl.html'
    });
    selectClientProfileCtrl.$inject = ['$state', '$window', 'dataCacheLocalStorage', 'selectClientProfileService'];
    /* @ngInject */
    function selectClientProfileCtrl($state, $window, dataCacheLocalStorage, selectClientProfileService) {
        var vm = this;
        vm.goToFeeProposal = goToFeeProposal;

        function goToFeeProposal() {
            //lets grab all funds
            getFunds().then(function (data) {
                console.log(data);
                dataCacheLocalStorage.put('fundList', data);

                var url = $state.href('main.evolution.fee.profileSearch');
                $window.open(url, '_blank');
            });


        }


        function getFunds() {
            return selectClientProfileService.getData('/getAllFundList')
                .then(function (data) {
                    return data;
                }, function (error) {
                    console.error('Error: selectClientProfileService getData call');
                    return;
                });
        }


    }
})();