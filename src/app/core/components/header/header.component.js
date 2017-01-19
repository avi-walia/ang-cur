
(function () {
    'use strict';

    angular
        .module('evolution.core.main')
        .component('ciHeader', {
            controller: headerCtrl,
            templateUrl:'app/core/components/header/header.tpl.html',
            bindings: {
                stepIndicator: '<?'
            }
        });

    /* @ngInject */

    headerCtrl.$inject = ['$state', 'pageStateResolver'];
    /* @ngInject */
    function headerCtrl($state, pageStateResolver) {
        var vm = this;
        vm.isActive = true;
        vm.displayOpenExistingPro = false; //flag used if we want to display Create/open profile link in navigation
        vm.isEcissUser = false;
        vm.pageStateResolver = pageStateResolver;

        // var tmpArr = $state.current.name.split('.');
        var tmp = _.split($state.current.name, '.');
        // console.log(tmp[tmp.length-1]);
        vm.state = tmp[tmp.length-1];

        if (vm.state !== 'selectClientProfile'){
            vm.displayOpenExistingPro = true;
        }

        //need to find a way to determine if user is eciss
        //assuming it is until we get API call
        vm.isEcissUser = true;

        vm.profileName = "Best profile ever!";

        // console.log($state.current.name);
        // console.log(vm.pageStateResolver.stepIndicator);
        // console.log(vm.pageStateResolver.stepIndicator);
        //
        //
        // console.log(vm.pageStateResolver.activePageName);


    }

})();
