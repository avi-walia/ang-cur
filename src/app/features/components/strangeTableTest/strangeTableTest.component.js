
(function () {
    'use strict';

    angular
        .module('evolution.features.strangeTableTest')
        .component('strangeTableTest', {
            controller: strangeTableTestCtrl,
            templateUrl:'app/features/components/strangeTableTest/strangeTableTest.tpl.html',
        });


    /* @ngInject */

    strangeTableTestCtrl.$inject = ['strangeTableTestService'];

    /* @ngInject */
    function strangeTableTestCtrl(
        strangeTableTestService
    ) {
        var vm = this;
        vm.data = {};
        strangeTableTestService.getData('/getProfileGroups').then(
            function(data){
                vm.data = data;
            },
            function(error){
                //handle error event
                //typically a call to notificationService
            }
        );
    }

})();





