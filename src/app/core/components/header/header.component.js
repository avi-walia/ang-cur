
(function () {
    'use strict';

    angular
        .module('evolution.core.main')
        .component('ciHeader', {
            controller: headerCtrl,
            templateUrl:'app/core/components/header/header.tpl.html'

        });

    /* @ngInject */

    headerCtrl.$inject = ['pageStateResolver','pageConfigService'];
    /* @ngInject */
    function headerCtrl(pageStateResolver, pageConfigService) {
        var vm = this;
        vm.steps = [1, 2, 3, 4, 5, 6, 7];
        // vm.isActive = true;
                
        vm.pageStateResolver = pageStateResolver;
        vm.pageConfigService = pageConfigService;


        //temporary variables until we get API working
        vm.isEcissUser = true;
        vm.profileName = 'Best profile ever!';



    }

})();
