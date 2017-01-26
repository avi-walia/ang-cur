(function () {
    'use strict';

    angular
        .module('evolution.features.fee.profileSearch')
        .component('profileSearch', {
            controller: profileSearchCtrl,
            bindings: {},
            templateUrl: 'app/features/components/fee-proposal/profile-search/profile-search.tpl.html'

        });

    profileSearchCtrl.$inject = ['dataCacheLocalStorage'];

    /* @ngInject */
    function profileSearchCtrl(dataCacheLocalStorage) {
        var vm = this;

        //lets check if there is funds in local storage because we need it for Fee Proposal
        checkIfFundsExist();

        ////////////////

        function checkIfFundsExist() {
            // console.log(vm.feeProfileSearch);
            var data = dataCacheLocalStorage.get('fundList');
            console.log(data);
        }
    }

})();

