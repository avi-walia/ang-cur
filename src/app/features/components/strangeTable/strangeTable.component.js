
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

    strangeTableCtrl.$inject = ['removeDiacriticsService'];

    /* @ngInject */
    function strangeTableCtrl(
        removeDiacriticsService
    ) {
        var vm = this;
        vm.sortable = {};
        vm.changeOrder = changeOrder;
        vm.orderBy = 'id';
        vm.isAscending = true;
        vm.searchInput = "";
        vm.search = search;


        function compare(a,b) {
            if (!vm.isAscending) {
                var x = b.profileSummary[vm.orderBy];
                b = a.profileSummary[vm.orderBy];
                a = x;
            } else {
                a = a.profileSummary[vm.orderBy];
                b = b.profileSummary[vm.orderBy];
            }

            if (vm.orderBy === 'creationDate' || vm.orderBy === 'modificationDate') {
                a = (new Date(a)).getTime();
                b = (new Date(b)).getTime();
            }

            if (a < b)
                return -1;
            if (a > b)
                return 1;

            return 0
        }

        function changeOrder(order) {
            console.log('new order: ', order);
            if (vm.orderBy === order) {
                //if user is sorting on the same column, sort in reverse order
                vm.isAscending = !vm.isAscending
            } else {
                //sort by ascending order when sort column is changed
                vm.isAscending = true;
            }
            vm.orderBy = order;
            vm.data.sort(compare);
        }





        //SEARCH STUFF******************************************************************************************************************************************************************************************************************************************************************************


        function search() {

        }
    }

})();





