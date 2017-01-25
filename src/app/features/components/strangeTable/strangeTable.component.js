
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
                config: '<',
                updateSelected: '&?'
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
        vm.toggleSelect = toggleSelect;
        vm.showSelected = false;
        vm.filterSelected = filterSelected;
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
            if (expandIndex < vm.expandSubGroup.length) {
                if (vm.expandSubGroup[expandIndex]) {
                    vm.expandSubGroup[expandIndex] = false;
                } else {
                    vm.expandSubGroup[expandIndex] = true;
                }
            }
            vm.filteredData[expandIndex].expandSubGroup = !vm.filteredData[expandIndex].expandSubGroup
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

        function getGroupHeader(profileGroup) {
            var tempProfileIndexWithHighestStatus = 0;
            _.forEach(profileGroup.profileSummaries, function(profile, key) {
                if(key > 0) {
                    if (mapStatus(profile.status) > mapStatus(profileGroup.profileSummaries[tempProfileIndexWithHighestStatus].status)) {
                        tempProfileIndexWithHighestStatus = key;
                    }
                }
            });
            profileGroup.groupHeading = profileGroup.profileSummaries[tempProfileIndexWithHighestStatus];
            profileGroup.profileSummaries.splice(tempProfileIndexWithHighestStatus, 1);
        }

        vm.$onChanges = function() {
            //vm.expandSubGroup = [];
            _.forEach(vm.data, function (profileGroup, key) {
                //profileGroup.groupHeading = null;
                /*
                var tempProfileIndexWithHighestStatus = 0;
                _.forEach(profileGroup.profileSummaries, function(profile, key) {
                    if(key > 0) {
                        if (mapStatus(profile.status) > mapStatus(val.profileSummaries[tempProfileIndexWithHighestStatus].status)) {
                            tempProfileIndexWithHighestStatus = key;
                        }
                    }
                });
                */
                var tempProfileIndexWithHighestStatus = getGroupHeader(profileGroup);
                //profileGroup.groupHeading = tempProfileIndexWithHighestStatus;
                //profileGroup.groupHeading = profileGroup.profileSummaries[tempProfileIndexWithHighestStatus];
                //profileGroup.profileSummaries.splice(tempProfileIndexWithHighestStatus, 1);
                profileGroup.expandSubGroup = false;
                //use this for prod
                //vm.expandSubGroup.push(false);
                //using this to test sorting
                //vm.expandSubGroup.push(true);
            });


            vm.filteredData = vm.data;
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

        function toggleSelect(profile) {
            profile.isSelected = !profile.isSelected;
        }

        function filterSelected(showSelected) {
            vm.showSelected = showSelected;
            if (showSelected === true) {
                vm.filteredData = [];
                _.forEach(vm.data, function (profileGroup, key) {
                    var tempProfileGroup = null;
                    var selectedSubProfileIndexes = [];
                    _.forEach(profileGroup.profileSummaries, function (profileSummary, key) {
                        if (profileSummary.id === 10) {
                            console.log('profileSummary: ', profileSummary);
                        }
                        if (profileSummary.isSelected) {
                            selectedSubProfileIndexes.push(key);
                        }
                    });
                    /*
                    if (profileGroup.groupHeading.isSelected || selectedSubProfileIndexes.length > 0) {
                        tempProfileGroup = angular.copy(profileGroup);
                        tempProfileGroup.profileSummaries = [];
                        _.forEach(selectedSubProfileIndexes, function(profileIndex, key){
                            tempProfileGroup.profileSummaries.push(profileGroup.profileSummaries[profileIndex]);
                        });
                    }
                    */
                    if (profileGroup.groupHeading.isSelected && selectedSubProfileIndexes.length > 0) {
                        /*
                        tempProfileGroup = angular.copy(profileGroup);
                        tempProfileGroup.profileSummaries = [];
                        _.forEach(selectedSubProfileIndexes, function(profileIndex, key){
                            tempProfileGroup.profileSummaries.push(profileGroup.profileSummaries[profileIndex]);
                        });
                        */
                        tempProfileGroup = {
                            id: profileGroup.id,
                            groupHeading: angular.copy(profileGroup.groupHeading),
                            profileSummaries: [],
                            expandSubGroup: profileGroup.expandSubGroup
                        };
                        console.log('profileGroup.profileSummaries: ', profileGroup.profileSummaries);
                        _.forEach(selectedSubProfileIndexes, function(profileIndex, key){
                            console.log('profileIndex: ', profileIndex);
                            tempProfileGroup.profileSummaries.push(profileGroup.profileSummaries[profileIndex]);
                        });
                        console.log('tempProfileGroup: ', tempProfileGroup);
                    } else if (profileGroup.groupHeading.isSelected) {
                        tempProfileGroup = {
                            id: profileGroup.id,
                            groupHeading: angular.copy(profileGroup.groupHeading),
                            profileSummaries: [],
                            expandSubGroup: profileGroup.expandSubGroup
                        };
                    } else if (selectedSubProfileIndexes.length > 0) {
                        tempProfileGroup = {
                            id: profileGroup.id,
                            groupHeading: {},
                            profileSummaries: [],
                            expandSubGroup: profileGroup.expandSubGroup
                        }
                        _.forEach(selectedSubProfileIndexes, function(profileIndex, key) {
                           tempProfileGroup.profileSummaries.push(profileIndex);
                        });
                        getGroupHeader(tempProfileGroup);
                    }
                    if (tempProfileGroup) {
                        vm.filteredData.push(tempProfileGroup);
                    }
                });
            } else {
                vm.search(vm.searchInput);
            }

        }

    }

})();





