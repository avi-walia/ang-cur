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
        service.showValidationErrors = false;
        service.data = [];
        service.errors = [];
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
        service.reset = reset;
        service.next = next;
        service.init = init;
        var initialized = false;
        var x = false;

        function init() {
            feeProposalService.init();
            service.showValidationErrors = false;
            service.familyGroupInfo = feeProposalService.getProfileSearch();
            if (service.familyGroupInfo.dealerRepCode) {
                //if the currentlist of selected & non-selected profiles exist, use it
                if (service.familyGroupInfo.currentList.length > 0) {
                    service.data = service.familyGroupInfo.currentList;
                } else {
                    //the user has not selected any profiles yet, load the default list of profiles.
                    updateProfileList(service.familyGroupInfo.dealerRepCode);
                }
            } else {
                service.data = [];
                //currently refreshing will clear error messages. We do not persist these anywhere.
                service.errors = [];
            }
        }

        function reset() {

            //service.familyGroupInfo = feeProposalService.getProfileSearch();
            init();
            service.resetFlag = !service.resetFlag;
        }
		
		/*
		make sure all the required fields are filled out in service.familyGroupInfo
		return true if all fields are filled in.
		return false otherwise.
		*/
		function validate(form) {
		    var enoughProfiles = service.familyGroupInfo.partialProfiles.length > 1;
            if (!enoughProfiles) {
                service.errors = ['profilesInFamilyGroupErrors.tooFew'];
            } else {
                service.errors = [];
            }
			return (form.$valid && _.isArray(service.familyGroupInfo.partialProfiles) && enoughProfiles);
		}

        function next(nextState, form) {
            if (validate(form)) {
                feeProposalService.setProfileSearch(service.familyGroupInfo);
                $state.go(nextState);
            } else {
                service.showValidationErrors = true;
            }
        }

        function updateSelected(selectedItems, currentList) {
            service.familyGroupInfo.partialProfiles = selectedItems;
            service.familyGroupInfo.currentList = currentList;
        }


        function updateProfileList(dealerRepCode) {
            service.familyGroupInfo.dealerRepCode = dealerRepCode;

            console.log('/profile_groups/' + dealerRepCode);
            var ret = server.getNoStorage('/profile_groups/' + dealerRepCode, true).then(function(data){
                format(data.data);
                service.data = data.data;
                //languageSwitcherService.addLocalizationObject({unLocalized: data.unLocalizedData, callBack: translateData, key: 'profileSearchService_data'})
                return service.data;
            });
            waitForResourcesService.pendingResources.push(ret);
            waitForResourcesService.startWaiting();
            return ret;
        }
        function format(profileGroups) {
            _.forEach(profileGroups, function(profileGroup) {
                //profileGroup.subGroups = profileGroup.profileSummaries;
                //delete profileGroup.profileSummaries;
                _.forEach(profileGroup.profileSummaries, function(profileSummary) {
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
        /*
        function translateData(translatedData) {
            //service.data = translatedData;
            format(translatedData);
            _.assign(service.data, translatedData);
        }*/
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
    }

})();