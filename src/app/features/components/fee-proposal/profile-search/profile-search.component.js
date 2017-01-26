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


        checkIfFundsExist();

//        vm.profileRepCode = 'repCode';
//        console.log(vm.feeProfileSearch);

        ////////////////

        function checkIfFundsExist() {
            // console.log(vm.feeProfileSearch);
            var data = dataCacheLocalStorage.get('fundList');
            console.log(data);
        }
    }

})();

