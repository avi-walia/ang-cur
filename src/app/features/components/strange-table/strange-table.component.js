
(function () {
    'use strict';

    angular
        .module('evolution.features.strangeTableTest')
        .component('strangeTable', {
            controller: strangeTableCtrl,
            templateUrl:'app/features/components/strange-table/strange-table.tpl.html',
            bindings: {
                //moreData: '<',
                //moreData2: '<'
                data: '<',
                widths: '<',
                config: '<',
                updateSelected: '&?',
                getGroupHeader: '<',
                errors: '<?'
            }
        });


    /* @ngInject */

    strangeTableCtrl.$inject = ['$scope', '$timeout', 'removeDiacriticsService'];

    /* @ngInject */
    function strangeTableCtrl(
        $scope,
        $timeout,
        removeDiacriticsService
    ) {
        var vm = this;
        vm.filteredData = [];
        vm.isAscending = true;
        vm.orderBy = 'id';
        vm.searchInput = '';
        vm.selectedItems = [];
        vm.showSelected = false;
        vm.sortable = {};
        vm.viewColumnChoices = false;

        vm.changeOrder = changeOrder;
        vm.filterSelected = filterSelected;
        vm.hideKey = hideKey;
        vm.search = search;
        vm.showList = showList;
        vm.showOrHideColumns = showOrHideColumns;
        vm.toggleSelect = toggleSelect;

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
                var x = b.subGroups[0][vm.orderBy];
                b = a.subGroups[0][vm.orderBy];
                a = x;
            } else {
                a = a.subGroups[0][vm.orderBy];
                b = b.subGroups[0][vm.orderBy];
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
            _.forEach(vm.filteredData, function(objectGroups, key) {
                objectGroups.subGroups.sort(compareSubgroups);
            });
        }

        vm.expandOrCollapse = function(expandIndex) {
            vm.filteredData[expandIndex].expandSubGroup = !vm.filteredData[expandIndex].expandSubGroup
        }

        function reset() {
            vm.isAscending = true;
            vm.orderBy = 'id';
            vm.searchInput = '';
            vm.showSelected = false;
            vm.selectedItems = [];
        }

        //The bindings should only be changing when the user changes the dealer rep code or resets. Therefore, reset everything when the bindings change
        vm.$onChanges = function(obj) {
            _.forEach(vm.data, function (objectGroup, key) {
                _.forEach(objectGroup, function (subGroup, key) {
                    //console.log('subGroup: ', objectGroup);
                });
            });
            if (obj.hasOwnProperty('data')) {
                reset();
                console.log('selectedItems: ', vm.selectedItems.length);
                _.forEach(vm.data, function (objectGroup, key) {
                    if (!objectGroup.hasOwnProperty('groupHeading')) {
                        vm.getGroupHeader(objectGroup);
                        objectGroup.expandSubGroup = false;
                    } else {
                        if (objectGroup.groupHeading.isSelected) {
                            console.log('hi');
                            vm.selectedItems.push(objectGroup.groupHeading);
                        }
                    }
                    _.forEach(objectGroup.subGroups, function(subGroup) {
                        if (subGroup.isSelected) {
                            console.log('bye');
                            vm.selectedItems.push(subGroup);
                        }
                    });
                });
                vm.filteredData = vm.data;
            }

        };

        //SEARCH STUFF******************************************************************************************************************************************************************************************************************************************************************************
        //search results should contain atleast one search term
        function filterOr(obj) {
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
        //search results must contain every search term
        function filterAnd(obj) {
            var copyTokenizedSearchInput;
            _.forEach(vm.config.searchColumns, function(prop, key) {
                //assuming we want to make sure one column contains all the search terms. If we want to make sure all the search terms are contained in any column, then move this to where copyTokenizedSearchInput is defined.
                copyTokenizedSearchInput = tokenizedSearchInput.slice();
                var searchableProp = removeDiacriticsService.remove(obj[prop].toLowerCase());
                _.forEach(tokenizedSearchInput, function(token, key) {

                    if (searchableProp.indexOf(token) >= 0) {
                        var x = copyTokenizedSearchInput.indexOf(token);
                        if (x >= 0) {
                            copyTokenizedSearchInput.splice(x, 1);
                        }
                    }
                });
                //all search tokens have been matched, break out of loop
                if (copyTokenizedSearchInput.length === 0) {
                    return false;
                }
            });
            return copyTokenizedSearchInput.length === 0;
        }

        function tokenizer(str) {
            var ret = str.split(' ');
            return _.map(ret, removeDiacriticsService.remove);
        }

        function search(searchTerm) {
            vm.searchInput = searchTerm;
            tokenizedSearchInput = tokenizer(searchTerm.toLowerCase());
            if (tokenizedSearchInput.length) {
                //vm.config.searchColumns
                vm.filteredData = [];
                _.forEach(vm.data, function (value, key) {
                    //filters the group level profile & client names. This is how the existing system works
                    var temp = _.filter([value.groupHeading], filterAnd);
                    if (temp.length > 0) {
                        vm.filteredData.push(value);
                    }
                    /*filters all objects, not just the ones that act as a group folder heading
                    var temp = _.filter(value.subGroups, filter);
                    vm.filteredData.push(value);
                    var x = vm.filteredData.length -1;
                    vm.filteredData[x].subGroups = temp;
                    */
                });
            } else {
                vm.filteredData = vm.data;
            }
        }

        function toggleSelect(obj) {
            if (vm.config.numericAdd) {
                obj.isSelected = parseFloat(obj.allocation) > 0;
            } else {
                obj.isSelected = !obj.isSelected;
            }
            if (obj.isSelected) {
                vm.selectedItems.push(obj);
            } else {
                var index = vm.selectedItems.indexOf(obj);
                if (index >= 0) {
                    vm.selectedItems.splice(index, 1);
                }
            }
            vm.updateSelected({
                selectedItems: vm.selectedItems,
                currentList: vm.data
            });
        }

        function filterSelected(showSelected) {
            vm.showSelected = showSelected;
            if (showSelected === true) {
                vm.filteredData = [];
                _.forEach(vm.data, function (objGroup, key) {
                    var tempObjectGroup = null;
                    var selectedSubGroupIndexes = [];
                    _.forEach(objGroup.subGroups, function (subGroup, key) {
                        if (subGroup.isSelected) {
                            selectedSubGroupIndexes.push(key);
                        }
                    });
                    if (objGroup.groupHeading.isSelected && selectedSubGroupIndexes.length > 0) {
                        tempObjectGroup = {
                            id: objGroup.id,
                            groupHeading: angular.copy(objGroup.groupHeading),
                            subGroups: [],
                            expandSubGroup: objGroup.expandSubGroup
                        };
                        _.forEach(selectedSubGroupIndexes, function(subGroupIndex, key){
                            tempObjectGroup.subGroups.push(objGroup.subGroups[subGroupIndex]);
                        });
                    } else if (objGroup.groupHeading.isSelected) {
                        tempObjectGroup = {
                            id: objGroup.id,
                            groupHeading: angular.copy(objGroup.groupHeading),
                            subGroups: [],
                            expandSubGroup: objGroup.expandSubGroup
                        };
                    } else if (selectedSubGroupIndexes.length > 0) {
                        tempObjectGroup = {
                            id: objGroup.id,
                            groupHeading: {},
                            subGroups: [],
                            expandSubGroup: objGroup.expandSubGroup
                        }
                        _.forEach(selectedSubGroupIndexes, function(subGroupIndex, key) {
                            tempObjectGroup.subGroups.push(objGroup.subGroups[subGroupIndex]);
                        });
                        vm.getGroupHeader(tempObjectGroup);
                    }
                    if (tempObjectGroup) {
                        vm.filteredData.push(tempObjectGroup);
                    }
                });
            } else {
                vm.search(vm.searchInput);
            }

        }

        function showList() {
            vm.viewColumnChoices = !vm.viewColumnChoices;
        }

        function hideKey(key) {
            return vm.config.hiddenColumns.indexOf(key) < 0;
        }

        /*
            Needs the $timeout to be able to use the $scope.apply
            Needs to use $scope.apply for smooth removal/addition of column
         */
        function showOrHideColumns(column) {
            $timeout(function() {
                var index = vm.config.hiddenColumns.indexOf(column);
                if (index >= 0) {
                    vm.config.hiddenColumns.splice(index, 1);
                } else {
                    vm.config.hiddenColumns.push(column);
                }
                var temp = vm.filteredData;
                $scope.$apply(function () {
                    vm.filteredData = [];
                });
                vm.filteredData = temp;
            });
        }
        /*
        $timeout(function() {
            showOrHideColumns('id');
        },4000);
        */
    }

})();





