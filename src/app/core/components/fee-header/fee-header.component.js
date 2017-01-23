(function () {
    'use strict';
    angular.module('evolution.core.main').component('feeHeader', {
        controller: feeHeaderCtrl,
        templateUrl: 'app/core/components/fee-header/fee-header.tpl.html',
        bindings: {
            stepIndicator: '<?'
        }
    });

    /* @ngInject */
    feeHeaderCtrl.$inject = ['$state', 'pageStateResolver'];

    /* @ngInject */
    function feeHeaderCtrl($state, pageStateResolver) {
        var vm = this;
        vm.pageStateResolver = pageStateResolver;
        //        vm.exit = exit;
        // var tmpArr = $state.current.name.split('.');
        var tmp = _.split($state.current.name, '.');
        vm.state = tmp[tmp.length - 1];
        //        console.info('state = ' + vm.state);


        //for the FEe Prop Exit & Restart Links
        // we may not need this
        vm.exitLink = vm.pageStateResolver.exitLink;
        //        console.log('vm.exitLink = ' + vm.exitLink); 
        vm.restartLink = vm.pageStateResolver.restartLink;
        if (angular.isUndefined(vm.exitLink)) {
            console.error("You mustve refreshed because vm.exitLink shouldnt be " + vm.exitLink);
            return;
        }
        //end of Fee Prop Exit & Restart Links
    }
})();