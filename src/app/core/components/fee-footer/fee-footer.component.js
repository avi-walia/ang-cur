(function () {
    'use strict';
    angular.module('evolution.core.main')
        .component('feeFooter', {
            controller: feeFooterCtrl,
            bindings: {
                submit: '<?',
                split: '<?',
                reset: '<?',
                createTemplate: '<?', //aka Clone!!!
                save: '<?',
                preview: '<?' //used in Reports screen only!
            },
            templateUrl: 'app/core/components/fee-footer/fee-footer.tpl.html'
        });

    /* @ngInject */
    feeFooterCtrl.$inject = ['$uibModal', '$state', 'feeProposalModel', 'pageConfigService'];
    /* @ngInject */

    function feeFooterCtrl($uibModal, $state, feeProposalModel, pageConfigService) {
        var vm = this;
        vm.modal = modal;
        vm.next = next;
        vm.pageConfig = pageConfigService.pageConfig;

        //display modal when we hit next
        function modal(msg) {
            var modalInstance = $uibModal.open({
                animation: false,
                component: 'modalComponent',
                resolve: {
                    dynamicMsg: function () {
                        return msg;
                    }
                }
            });

            modalInstance.result.then(function () {
                console.info('success');
            }, function () {
                console.info('modal-component dismissed at: ' + new Date());
            });
        }

        function next() {
//                console.log(feeProposalModel);
            var hasMissingFields = _.includes(feeProposalModel, undefined);

            if (hasMissingFields) {
                vm.modal('Please fill out all forms before going to the next screen');
            }
            else {

                $state.go(vm.nextState);
            }

        }

    }
})();