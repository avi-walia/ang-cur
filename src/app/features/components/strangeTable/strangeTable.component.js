
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
                data: '<',
                widths: '<',
                config: '<'
            }
        });


    /* @ngInject */

    strangeTableCtrl.$inject = ['removeDiacriticsService', '$timeout'];

    /* @ngInject */
    function strangeTableCtrl(
        removeDiacriticsService, $timeout
    ) {
        var vm = this;
        vm.sortable = {};
        vm.changeOrder = changeOrder;
        vm.orderBy = 'id';
        vm.isAscending = true;
        vm.searchInput = "";
        vm.search = search;
        vm.filteredData = [];
        var tokenizedSearchInput = [];

        /*
            active
            submitted
            in-progress
            inactive
            archived
            canceled
         */


        function compare(a,b) {
            //existing sort order only sorts on group level, it does not sort the historical records
            if (!vm.isAscending) {
                var x = b.profileSummaries[0][vm.orderBy];
                b = a.profileSummaries[0][vm.orderBy];
                a = x;
            } else {
                a = a.profileSummaries[0][vm.orderBy];
                b = b.profileSummaries[0][vm.orderBy];
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
        function compareSubgroups(a,b) {
            //existing sort order only sorts on group level, it does not sort the historical records
            if (!vm.isAscending) {
                var x = b[vm.orderBy];
                b = a[vm.orderBy];
                a = x;
            } else {
                a = a[vm.orderBy];
                b = b[vm.orderBy];
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
            if (vm.orderBy === order) {
                //if user is sorting on the same column, sort in reverse order
                vm.isAscending = !vm.isAscending
            } else {
                //sort by ascending order when sort column is changed
                vm.isAscending = true;
            }
            vm.orderBy = order;
            vm.filteredData.sort(compare);
            _.forEach(vm.filteredData, function(profileGroups, key) {
                vm.filteredData[key].profileSummaries.sort(compareSubgroups);
            });
        }

        vm.expandSubGroup = [];
        vm.expandOrCollapse = function(expandIndex) {
            console.log('vm.expandSubGroup[expandIndex]: ', vm.expandSubGroup[expandIndex]);
            console.log('expandIndex: ', expandIndex);
            if (expandIndex < vm.expandSubGroup.length) {
                if (vm.expandSubGroup[expandIndex]) {
                    vm.expandSubGroup[expandIndex] = false;
                } else {
                    vm.expandSubGroup[expandIndex] = true;
                }
            }
        }

        function mapStatus(status) {
            if (status === 'active') {
                return 5;
            } else if (status === 'submitted') {
                return 4;
            } else if (status === 'inProgress') {
                return 3;
            } else if (status === 'inActive') {
                return 2;
            } else if (status === 'archived') {
                return 1;
            } else {//cancelled
                return 0;
            }
        }

        function compareStatus(status1, status2) {

        }

        vm.$onChanges = function() {
            vm.expandSubGroup = [];
            _.forEach(vm.data, function (val, key) {
                val.groupHeading = null;
                var tempProfileIndexWithHighestStatus = 0;
                _.forEach(val.profileSummaries, function(profile, key) {
                    if(key > 0) {
                        if (mapStatus(profile.status) > mapStatus(val.profileSummaries[tempProfileIndexWithHighestStatus].status)) {
                            tempProfileIndexWithHighestStatus = key;
                        }
                    }
                });
                val.groupHeading = tempProfileIndexWithHighestStatus;
                vm.expandSubGroup.push(false);
            });
            vm.filteredData = vm.data;
        };



        //SEARCH STUFF******************************************************************************************************************************************************************************************************************************************************************************
        function filter(obj) {
            var ret = false;
            _.forEach(vm.config.searchColumns, function(prop, key) {
                var searchableProp = removeDiacriticsService.remove(obj[prop].toLowerCase());
                _.forEach(tokenizedSearchInput, function(token, key) {
                    if (searchableProp.indexOf(token) >= 0) {
                        ret = true;
                        return false;
                    }
                });
                if (ret) {
                    return false;//break out of forEach
                }
            });
            return ret;
        }

        function tokenizer(str) {
            var ret = str.split(' ');
            return _.map(ret, removeDiacriticsService.remove);
        }

        function search(searchTerm) {
            tokenizedSearchInput = tokenizer(searchTerm.toLowerCase());
            if (tokenizedSearchInput.length) {
                //vm.config.searchColumns
                vm.filteredData = [];
                _.forEach(vm.data, function (value, key) {
                    //filters the group level profile & client names. This is how the existing system works
                    var temp = _.filter([value.profileSummaries[0]], filter);
                    if (temp.length > 0) {
                        vm.filteredData.push(value);
                    }
                    console.log('vm.filteredData: ', vm.filteredData);
                    console.log('expandSubgroup: ', vm.expandSubGroup);
                    /*filters all profiles, not just the ones that act as a group folder heading
                    var temp = _.filter(value.profileSummaries, filter);
                    vm.filteredData.push(value);
                    var x = vm.filteredData.length -1;
                    vm.filteredData[x].profileSummaries = temp;
                    */
                });
            } else {
                vm.filteredData = vm.data;
            }
        }
    }

})();





