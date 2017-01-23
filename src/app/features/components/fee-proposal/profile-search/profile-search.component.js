(function () {
    'use strict';

    angular
        .module('evolution.features.fee.profileSearch')
        .component('profileSearch', {
            controller: profileSearchCtrl,
            bindings: {},
            templateUrl: 'app/features/components/fee-proposal/profile-search/profile-search.tpl.html'

        });

    profileSearchCtrl.$inject = ['$state', 'feeProposalModel'];

    /* @ngInject */
    function profileSearchCtrl($state, feeProposalModel) {
        var vm = this;
        vm.checkDealerRep = checkDealerRep;
        vm.feeProposalModel = feeProposalModel;
        vm.feeProposalModel.dealerRepCode = feeProposalModel.dealerRepCode;



//        vm.profileRepCode = 'repCode';
//        console.log(vm.feeProfileSearch);

        ////////////////

        function checkDealerRep() {
            console.log(vm.feeProfileSearch);
            console.log(vm.feeProposalModel);
        }
    }

})();

