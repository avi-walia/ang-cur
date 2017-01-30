(function () {
    'use strict';
    angular.module('evolution.core.main')
        .component('feeFooter', {
            controller: feeFooterCtrl,
            bindings: {
            },
            templateUrl: 'app/core/components/fee-footer/fee-footer.tpl.html'
        });

    /* @ngInject */
    feeFooterCtrl.$inject = [
		'$uibModal',
		'$state',
		'feeProposalModel',
		'pageConfigService',
		'$rootScope',
		'PREVIOUS_EVENT',
		'CREATE_TEMPLATE_EVENT',
		'PREVIEW_EVENT',
		'SAVE_EVENT',
		'RESET_EVENT',
		'NEXT_EVENT'
	];

	
    /* @ngInject */

    function feeFooterCtrl($uibModal, $state, feeProposalModel, pageConfigService, $rootScope,
		PREVIOUS_EVENT,
		CREATE_TEMPLATE_EVENT,
		PREVIEW_EVENT,
		SAVE_EVENT,
		RESET_EVENT,
		NEXT_EVENT
	) {
        var vm = this;
        vm.modal = modal;
        vm.next = next;
        vm.previous = next;
        vm.reset = reset;
        vm.createTemplate = createTemplate;
        vm.save = save;
        vm.preview = preview;
        vm.pageConfigService = pageConfigService;
		vm.$state = $state;
		vm.enabled = true;

        //display modal when we hit next
        function modal(msg) {
			vm.enabled = false;
            var modalInstance = $uibModal.open({
                animation: false,
                component: 'modalComponent',
                resolve: {
                    dynamicMsg: function () {
                        return msg;
                    },
					title: function() {
						return 'warningTitle'
					}
                }
            });

            modalInstance.result.then(function () {
                //console.info('success');
				vm.enabled = true;
            }, function () {
                //console.info('modal-component dismissed at: ' + new Date());
				vm.enabled = true;
            });
        }

        function next() {/*
//                console.log(feeProposalModel);
            var hasMissingFields = _.includes(feeProposalModel, undefined);

            if (hasMissingFields) {
                vm.modal('Please fill out all forms before going to the next screen');
            }
            else {

                $state.go(vm.nextState);
            }
			*/
			$rootScope.$emit(NEXT_EVENT, pageConfigService.pageConfig.nextStateName);
        }
		function previous() {
			$rootScope.$emit(PREVIOUS_EVENT, pageConfigService.pageConfig.nextStateName);
        }
		function reset() {
			$rootScope.$emit(RESET_EVENT);
        }
		function createTemplate() {
			$rootScope.$emit(CREATE_TEMPLATE_EVENT);
        }
		function preview() {
			$rootScope.$emit(PREVIEW_EVENT);
        }
		function save() {
			$rootScope.$emit(SAVE_EVENT);
        }

    }
})();