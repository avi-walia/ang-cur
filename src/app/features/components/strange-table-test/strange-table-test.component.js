
(function () {
    'use strict';

    angular
        .module('evolution.features.strangeTableTest')
        .component('strangeTableTest', {
            controller: strangeTableTestCtrl,
            templateUrl:'app/features/components/strange-table-test/strange-table-test.tpl.html'
        });


    /* @ngInject */

    strangeTableTestCtrl.$inject = ['strangeTableTestService', 'initDataService', 'mockService'];

    /* @ngInject */
    function strangeTableTestCtrl(
        strangeTableTestService,
        initDataService,
        mockService
    ) {
        var vm = this;
        vm.mock = mockService.data;
        vm.data = {};
        vm.strangeTableTestService = strangeTableTestService;
        vm.initDataService = initDataService;


        vm.strangeTableTestService.init();
        initDataService.getData();
    }

})();





