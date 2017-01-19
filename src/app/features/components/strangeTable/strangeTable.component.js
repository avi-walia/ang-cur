
(function () {
    'use strict';

    angular
        .module('evolution.features.strangeTableTest')
        .component('strangeTable', {
            controller: strangeTableCtrl,
            templateUrl:'app/features/components/strangeTable/strangeTable.tpl.html',
            bindings: {
                //moreData: '<',
                //moreData2: '<'
                data: '='
            }
        });


    /* @ngInject */

    strangeTableCtrl.$inject = ['$timeout'];

    /* @ngInject */
    function strangeTableCtrl(
        $timeout
    ) {
        var vm = this;
        $timeout(function(){

            console.log('data: ', vm.data);
        },1000);
    }

})();





