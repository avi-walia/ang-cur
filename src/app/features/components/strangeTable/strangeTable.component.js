
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
        vm.sortable = {};
        vm.changeOrder = changeOrder;
        vm.orderBy = 'id';
        vm.isAscending = true;


        $timeout(function(){

            console.log('data: ', vm.data);
        },1000);

        /*
        _.forEach(vm.data[0], function(val, key) {


        });
        */

        function compare(a,b) {
            var x = 1;
            if (vm.isAscending) {
                x = -1;
            }
            if (a[vm.orderBy] < b[vm.orderBy])
                return -1 * x;
            if (a[vm.orderBy] > b[vm.orderBy])
                return x;
            return 0;
        }

        function changeOrder(order) {
            console.log('new order: ', order);
            if (vm.orderBy !== order) {
                vm.isAscending = !vm.isAscending
            }
            vm.orderBy = order;
            vm.data.sort(compare);

            console.log('sorted data: ', vm.data);

        }
    }

})();





