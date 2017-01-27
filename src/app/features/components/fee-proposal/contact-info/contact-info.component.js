(function () {
    'use strict';

    angular
        .module('evolution.features.fee.contactInfo')
        .component('contactInfo', {
            controller: contactInfoCtrl,
            bindings: {},
            templateUrl: 'app/features/components/fee-proposal/contact-info/contact-info.tpl.html'

        });

    contactInfoCtrl.$inject = ['dataCacheLocalStorage'];

    /* @ngInject */
    function contactInfoCtrl(dataCacheLocalStorage) {
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

