(function () {
    'use strict';

    angular
        .module('evolution.core.main')
        .component('ciFooter', {
            controller: footerCtrl,
            bindings: {
                nextState: '=?',
                previousState: '=?',
                submit: '<?',
                displaySplit: '<?'
            },
            templateUrl:'app/core/components/footer/footer.tpl.html'
        });


    /* @ngInject */

    footerCtrl.$inject = ['$state', 'pageStateResolver'];
    /* @ngInject */
    function footerCtrl($state, pageStateResolver) {
        var vm = this;
        vm.nextLabel = '';
        vm.pageStateResolver = pageStateResolver;
        // console.log(vm.nextState);
        console.log($state);
        if ($state.current.name === 'main.evolution.selectClientProfile'){
            vm.nextLabel = 'Open Profile';
        }else{
            vm.nextLabel = 'Next';
        }
    }

})();