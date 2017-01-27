(function () {
    'use strict';

    angular
        .module('evolution.features.fee.profileSearch')
        .service('profileSearchService', profileSearchService);

    profileSearchService.$inject = [
        'feeProposalService',
        'languageSwitcherService',
        'server',
        '$state',
        'waitForResourcesService'
    ];

    /* @ngInject */
    function profileSearchService(
        feeProposalService,
        languageSwitcherService,
        server,
        $state,
        waitForResourcesService
    ) {
        var service = this;
        service.data = [];
        //this is the object that is loaded from and saved to the feeProposalService. Shoul contain dealerRepCode, familyGroupName, and partialProfiles array.
        service.familyGroupInfo = {};
        service.configStrangeTable = {
            searchColumns: [
                'profileName',
                'clientName'
            ],
            hiddenColumns: ['id'],
            showOrHideColumns: false,
            numericAdd: false,
            expandColumn: 'profileName'
        };
        service.resetFlag = false;
        var backupProfileList = [];

        service.updateProfileList = updateProfileList;
        service.getGroupHeader = getGroupHeader;
        service.updateSelected = updateSelected;
        service.updateFeeProposal = updateFeeProposal;
        service.reset = reset;
        service.next = next;
        service.init = init;
        var initialized = false;
        var x = false;

        function init() {
            //add some logic so that it only does this once
                feeProposalService.init();

            service.familyGroupInfo = feeProposalService.getProfileSearch();
            if (service.familyGroupInfo.dealerRepCode) {
                if (service.familyGroupInfo.currentList.length > 0) {
                    console.log('existing: ', service.data);
                    console.log('new: ',service.familyGroupInfo.currentList);
                    service.data = service.familyGroupInfo.currentList;
                } else {
                    updateProfileList(service.familyGroupInfo.dealerRepCode);
                }
            } else {
                service.data = [];
            }
        }

        function reset() {

            //service.familyGroupInfo = feeProposalService.getProfileSearch();
            init();
            service.resetFlag = !service.resetFlag;
        }

        function next() {
            feeProposalService.setProfileSearch(service.familyGroupInfo);
        }

        function updateFeeProposal() {
            /*
            return feeProposalService.setProfileSearch({
                familyGroupName: service.familyGroupName,
                dealerRepCode: service.dealerRepCode,
                partialProfiles: selectedItems
            });
            */
            feeProposalService.setProfileSearch(service.familyGroupInfo);
        }

        function updateSelected(selectedItems, currentList) {
            service.familyGroupInfo.partialProfiles = selectedItems;
            service.familyGroupInfo.currentList = currentList;
        }


        function updateProfileList(dealerRepCode) {
            service.familyGroupInfo.dealerRepCode = dealerRepCode;
            var ret = server.getNoStorage('/getProfileGroups/' + dealerRepCode, false).then(function(data){
                format(data.data);
                service.data = data.data;
                languageSwitcherService.addLocalizationObject({unLocalized: data.unLocalizedData, callBack: translateData, key: 'profileSearchService_data'})
                return service.data;
            });
            waitForResourcesService.pendingResources.push(ret);
            waitForResourcesService.startWaiting();
            return ret;
        }
        function format(profileGroups) {
            _.forEach(profileGroups, function(profileGroup) {
                profileGroup.subGroups = profileGroup.profileSummaries;
                delete profileGroup.profileSummaries;
                _.forEach(profileGroup.subGroups, function(profileSummary) {
                    profileSummary.createdBy = stripPrefix(profileSummary.createdBy);
                });
            });
        }
        function stripPrefix(str) {
            var prefix = 'UPMA_ADV::';
            if (str.substring(0, prefix.length) === prefix) {
                str = str.substring(prefix.length, str.length);
            }
            return str;
        }

        function translateData(translatedData) {
            //service.data = translatedData;
            format(translatedData);
            _.assign(service.data, translatedData);
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
            _.forEach(profileGroup.subGroups, function(profile, key) {
                if(key > 0) {
                    if (mapStatus(profile.status) > mapStatus(profileGroup.subGroups[tempProfileIndexWithHighestStatus].status)) {
                        tempProfileIndexWithHighestStatus = key;
                    }
                }
            });
            profileGroup.groupHeading = profileGroup.subGroups[tempProfileIndexWithHighestStatus];
            profileGroup.subGroups.splice(tempProfileIndexWithHighestStatus, 1);
        }
    }

})();