(function () {
    'use strict';
    angular.module('evolution.core.main')
        .component('feeHeader', {
            controller: feeHeaderCtrl,
            templateUrl: 'app/core/components/fee-header/fee-header.tpl.html',
            bindings: {
                stepIndicator: '<?'
            }
    });

    /* @ngInject */
    feeHeaderCtrl.$inject = ['pageConfigService', 'feeHeaderService'];

    /* @ngInject */
    function feeHeaderCtrl(pageConfigService, feeHeaderService) {
        var vm = this;
        vm.steps = [1, 2, 3, 4, 5];

        vm.pageConfigService = pageConfigService;
        vm.feeHeaderService = feeHeaderService;//we will have to store exitLink & restartLink in session or local storage if fee proposal is launched in it's own tab/window
        // console.log('$ctrl.feeHeaderService: ', vm.feeHeaderService);

        //for the FEe Prop Exit & Restart Links
        // we may not need this
        //vm.exitLink = vm.feeHeaderService.exitLink;
        //vm.restartLink = vm.pageStateResolver.restartLink;
        if (vm.feeHeaderService.exitLink === '') {
            console.error('You mustve refreshed because vm.exitLink shouldnt be ' + vm.exitLink);
            return;
        }
        //end of Fee Prop Exit & Restart Links
    }
})();