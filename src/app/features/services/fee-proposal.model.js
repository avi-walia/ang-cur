(function () {
    'use strict';

    angular
        .module('evolution.core.main')
        .service('feeProposalModel', feeProposalModel);

//    profileSearchModel.$inject = [
//        'languageSwitcherService',
//        'server',
//        'waitForResourcesService'
//    ];

    /* @ngInject */
    function feeProposalModel() {
        var service = this;
        console.log('feeProposalModel');
//        service.dealerRepCode = 2; //default value
        service.familyGroupName = 'John & James';

        /**
         * This model may not be needed.
         */
    }

})();