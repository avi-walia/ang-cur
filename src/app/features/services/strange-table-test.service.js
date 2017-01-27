(function () {
    'use strict';

    angular
        .module('evolution.features.strangeTableTest')
        .service('strangeTableTestService', strangeTableTestService);

    strangeTableTestService.$inject = [
        'languageSwitcherService',
        'server',
        'waitForResourcesService',
        'feeProposalService'
    ];

    /* @ngInject */
    function strangeTableTestService(languageSwitcherService, server, waitForResourcesService, feeProposalService) {
        var service = this;
        service.data = {};
        service.callCount = 0;
        service.updateProfileList = updateProfileList;
        service.getGroupHeader = getGroupHeader;
        service.updateSelected = updateSelected;
        service.dealerRepCode = '';
        service.familyGroupName = '';
        service.updateFeeProposal = updateFeeProposal;
        var selectedItems = [];
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

        function updateFeeProposal() {
            return feeProposalService.setProfileSearch({
                dealerRepCode: service.dealerRepCode,
                familyGroupName: service.familyGroupName,
                partialProfiles: selectedItems
            });
        }

        function updateSelected(newSelectedItems) {
            selectedItems = newSelectedItems;
        }


        function updateProfileList(dealerRepCode) {
            var ret = server.getNoStorage('/getProfileGroups/' + dealerRepCode, false).then(function(data){
                format(data.data);
                service.data = data.data;
                languageSwitcherService.addLocalizationObject({unLocalized: data.unLocalizedData, callBack: translateData, key: 'strangeTableTestService_data'})
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