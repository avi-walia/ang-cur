
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
        vm.pageStateResolver = pageStateResolver;

        // var tmpArr = $state.current.name.split('.');
        var tmp = _.split($state.current.name, '.');
        // console.log(tmp[tmp.length-1]);
        vm.state = tmp[tmp.length-1];

        // console.log($state.current.name);
        // // console.log(vm.stepIndicator);
        // console.log(vm.pageStateResolver.stepIndicator);
        //
        //
        // console.log(vm.pageStateResolver.activePageName);


    }

})();
