(function () {
    'use strict';

    angular
        .module('evolution.features.test')
        .service('feeProposalService', feeProposalService);

    feeProposalService.$inject = [
        '$q',
        'server',
        'waitForResourcesService',
        'dataCacheSessionStorage',
        'GO_TO_FEE_PROPOSAL'
    ];

    /* @ngInject */
    function feeProposalService(
        $q,
        server,
        waitForResourcesService,
        dataCacheSessionStorage,
        GO_TO_FEE_PROPOSAL
    ) {
        var service = this;
        service.data = {};
        service.setProfileSearch = setProfileSearch;
        service.getProfileSearch = getProfileSearch;
        service.init = init;
        var currentListOfDisplayedProfiles = [];

        function init() {
            var keys = dataCacheSessionStorage.keys();
            //if the session storage key GO_TO_FEE_PROPOSAL is true, then we are loading the fee proposal tool for the first time.
            //if there are no caches for the fee proposal data model, then initialize it anew.
            //The cache allows each tab to create and maintain independent fee proposal data models accross different tabs and refreshes.
            if (dataCacheSessionStorage.get(GO_TO_FEE_PROPOSAL) || (keys.indexOf('FEE_PROPOSAL_STORAGE_KEY') < 0 && keys.indexOf('FEE_PROPOSAL_STORAGE_KEY' + 'currentListOfDisplayedProfiles') < 0)) {
                dataCacheSessionStorage.remove(GO_TO_FEE_PROPOSAL);
                currentListOfDisplayedProfiles = [];
                service.data = {
                    /*
                     partialProfiles is an array of partialProfileObjects
                     partialProfile only contains the following:
                     profileId
                     assetMix & funds
                     investmentOverview object
                     */
                    partialProfiles: [],
                    familyGroupName: '',
                    //contact info
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    address: '',
                    city: '',
                    province: '',//required
                    postalCode: '',
                    phone: '',
                    fax: '',
                    email: '',
                    dealerRepCode: '',

                    //investment overview
                    linkedCIAssets: 0,
                    totalFamilyGroupAmount: 0
                };
            } else {
                service.data = dataCacheSessionStorage.get('FEE_PROPOSAL_STORAGE_KEY', service.data);
                currentListOfDisplayedProfiles = dataCacheSessionStorage.get('FEE_PROPOSAL_STORAGE_KEY' + 'currentListOfDisplayedProfiles', currentListOfDisplayedProfiles);
            }
        };

        function getProfileSearch() {
            return {
                familyGroupName: service.data.familyGroupName,
                dealerRepCode: service.data.dealerRepCode,
                partialProfiles: service.data.partialProfiles,
                currentList: angular.copy(currentListOfDisplayedProfiles)
            }
        }

        function setProfileSearch(newProfileSearch) {
            service.data.familyGroupName = newProfileSearch.familyGroupName;
            service.data.dealerRepCode = newProfileSearch.dealerRepCode;
            var tempPartialProfiles = [];
            var errorCount = 0;
            var pendingPromises = [];
            //the profileSearch page only has a summary of the profile(the bare minimum profile info needed to populate the table)
            //we need to query the server for the assetMix & funds
            try {
                _.forEach(newProfileSearch.partialProfiles, function (partialProfileData) {
                    var ret = server.getNoStorage('/getProfileDetail/' + partialProfileData.id).then(
                        function (fullProfile) {
                            tempPartialProfiles.push(partialProfile(fullProfile.data, partialProfileData.profileName));
                        },
                        function (error) {
                            throw error;
                        }
                    );
                    pendingPromises.push(ret);
                    waitForResourcesService.pendingResources.push(ret);
                    waitForResourcesService.startWaiting();
                });
                $q.all(pendingPromises).then(function(){
                    service.data.partialProfiles = tempPartialProfiles;
                    currentListOfDisplayedProfiles = angular.copy(newProfileSearch.currentList);
                    dataCacheSessionStorage.put('FEE_PROPOSAL_STORAGE_KEY', service.data);
                    dataCacheSessionStorage.put('FEE_PROPOSAL_STORAGE_KEY' + 'currentListOfDisplayedProfiles', currentListOfDisplayedProfiles);
                });
            } catch(error) {
                console.log('error happened retrieving portfolio details, do something: ', error);
            }
        }

        function getInvestmentOverview() {
            var subsetPartialProfile = [];
            _.forEach(service.data.partialProfiles, function(partialProfile) {
                subsetPartialProfile.push({
                    profileId: partialProfile.profileId,//immutable from investmentOverview screen
                    profileName: partialProfile.profileName,
                    assetMix: partialProfile.assetMix,//immutable from investmentOverview screen
                    managedMarketValue: partialProfile.managedMarketValue,
                    totalIPGroupInvestmentAmount: partialProfile.totalIPGroupInvestmentAmount,
                    separatelyManagedAccounts: partialProfile.separatelyManagedAccounts
                });
            });

            return {
                familyGroupName: service.data.familyGroupName,//immutable from investmentOverview screen
                linkedCIAssets: service.data.linkedCIAssets,
                totalFamilyGroupAmount: service.data.totalFamilyGroupAmount,
                partialProfiles: subsetPartialProfile
            };
        }

        function setInvestmentOverview(newInvestmentOverview) {
            //add some data validation here?

            service.data.linkedCIAssets = newInvestmentOverview.linkedCIAssets;
            service.data.totalFamilyGroupAmount = newInvestmentOverview.totalFamilyGroupAmount;

            _.forEach(newInvestmentOverview.partialProfiles, function(partialProfile, key) {
                //reset the managedMarketValues to 0
                service.data.partialProfiles[key].separatelyManagedMarketValue = valueByClass();
                service.data.partialProfiles[key].profileName = partialProfile.profileName,
                    service.data.partialProfiles[key].managedMarketValue = partialProfile.managedKarketValue;
                    service.data.partialProfiles[key].totalIPGroupInvestmentAmount = partialProfile.totalIPGroupInvestmentAmount,
                    service.data.partialProfiles[key].separatelyManagedAccounts = partialProfile.separatelyManagedAccounts;
                _.forEach(partialProfile.separatelyManagedAccounts, function(sepManAcc, key) {
                    //updated the managedMarketValues
                    //need to be done this way because there could be two different separately managed accounts with the same fundClass.
                    service.data.partialProfiles[key].separatelyManagedMarketValue[sepManAcc.fundClass] += sepManAcc.allocation;
                });
            });
        }

        function getServiceFees() {
            var tempServiceFees = [];
            _.forEach(service.data.partialProfiles, function(partialProfile) {
                var managed = [];
                var separatelyManaged = [];
                _.forEach(partialProfile.managedMarketValue, function(marketValue, fundClass) {
                    managed.push({
                        class: fundClass,
                        marketValue: marketValue,
                        serviceFee: partialProfile.managedServiceFees[fundClass]
                    });
                });
                _.forEach(partialProfile.separatelyManagedMarketValue, function(marketValue, fundClass) {
                    separatelyManaged.push({
                        class: fundClass,
                        marketValue: marketValue,
                        serviceFee: partialProfile.separatelyManagedServiceFees[fundClass]
                    });
                });
                tempServiceFees.push({
                    profileId: partialProfile.profileId,
                    profileName: partialProfile.profileName,
                    managed: managed,
                    separatelyManaged: separatelyManaged
                });
            });
            return tempServiceFees;
        }

        /*
        The loadedProfile from the server will not contain profileName as that was loaded in the getProfileGroups call
        partialProfiles is an array of partialProfileObjects
        partialProfile only contains the following:
            profileId
        assetMix & funds
        investmentOverview object
        array of dealerServiceFee objects
        example of a partial profile
        */
        function partialProfile(loadedProfile, profileName) {
            return {
                profileId: loadedProfile.profileId,
                profileName: profileName,
                assetMix: loadedProfile.porfolio.assetMix,
                managedMarketValue: valueByClass(),
                separatelyManagedMarketValue: valueByClass(),
                totalIPGroupInvestmentAmount: 0,
                managedServiceFees: valueByClass(),
                separatelyManagedAccounts: [],
                separatelyManagedServiceFees: valueByClass()
            }
        }

        function separatelyManagedAccount() {
            return {
                accountType: '',
                fundClass: '',//should be one of the string keys in the valueByClass object, ie. "classI", "classE", "classF", and possibly more in the future
                amount: 0,
                separatelyManagedFunds: []
            }
        }
        function separatelyManagedFund() {
            return {
                fundName: '',
                assetClass: '',
                allocation:0
            }
        }
        function valueByClass() {
            return {
                classI: 0,
                classE: 0,//class E is actually called a trailer fee.
                classF: 0
            }
        }
    }

})();