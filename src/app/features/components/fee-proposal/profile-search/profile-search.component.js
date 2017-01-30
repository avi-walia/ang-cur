(function () {
    'use strict';

    angular
        .module('evolution.features.fee.profileSearch')
        .component('profileSearch', {
            controller: profileSearchCtrl,
            bindings: {},
            templateUrl: 'app/features/components/fee-proposal/profile-search/profile-search.tpl.html'

        });

    profileSearchCtrl.$inject = [
		'dataCacheLocalStorage',
		'$rootScope',
		'RESET_EVENT',
		'NEXT_EVENT',
		'profileSearchService',
		'initDataService',
		'mockService'
	];

    /* @ngInject */
    function profileSearchCtrl(
		dataCacheLocalStorage,
		$rootScope,
		RESET_EVENT,
		NEXT_EVENT,
		profileSearchService,
		initDataService,
		mockService
	) {
        var vm = this;
		var eventWatchers = [];
        vm.profileSearchService = profileSearchService;
        vm.initDataService = initDataService;


        vm.profileSearchService.init();
        initDataService.getData();
        /*
        //lets check if there is funds in local storage because we need it for Fee Proposal
        checkIfFundsExist();

        ////////////////

        function checkIfFundsExist() {
            // console.log(vm.feeProfileSearch);
            var data = dataCacheLocalStorage.get('fundList');
            console.log(data);
        }
        */
		
		eventWatchers.push(
			$rootScope.$on(NEXT_EVENT, function(event, nextState) {
				console.log('familyGroupInfoForm: ', angular.element(document.getElementById("familyGroupInfoForm")));
				vm.profileSearchService.next(nextState);
			})
		);
		eventWatchers.push(
			$rootScope.$on(RESET_EVENT, function() {
				vm.profileSearchService.reset();
			})
		);
		
		vm.$onDestroy = function() {
			_.forEach(eventWatchers, function(deleteWatch) {
				deleteWatch();
			});
		}
    }

})();

