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
		'$state',
		'RESET_EVENT',
		'NEXT_EVENT'
	];

    /* @ngInject */
    function profileSearchCtrl(
		dataCacheLocalStorage,
		$rootScope,
		$state,
		RESET_EVENT,
		NEXT_EVENT
	) {
        var vm = this;
		var eventWatchers = [];

        //lets check if there is funds in local storage because we need it for Fee Proposal
        checkIfFundsExist();

        ////////////////

        function checkIfFundsExist() {
            // console.log(vm.feeProfileSearch);
            var data = dataCacheLocalStorage.get('fundList');
            console.log(data);
        }
		
		eventWatchers.push(
			$rootScope.$on(NEXT_EVENT, function(event, nextState) {
				console.log('nextState: ', nextState);
				//add validation if needed
				$state.go(nextState);
			})
		);
		eventWatchers.push(
			$rootScope.$on(RESET_EVENT, function() {
				//add validation if needed
				console.log('resetting');
			})
		);
		
		vm.$onDestroy = function() {
			_.forEach(eventWatchers, function(deleteWatch) {
				deleteWatch();
			});
		}
    }

})();

