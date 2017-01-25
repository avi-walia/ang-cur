(function () {
    'use strict';

    angular
        .module('evolution.features.test')
        .service('feeProposalService', feeProposalService);

    feeProposalService.$inject = [
    ];

    /* @ngInject */
    function feeProposalService() {
        var service = this;
        service.data = {
            /*
                partialProfiles is an array of partialProfileObjects
                partialProfile only contains the following:
                profileId
                assetMix & funds
                investmentOverview object
                array of dealerServiceFee objects
                example of a partial profile
             */
            partialProfiles: [],
            familyGroupName: "",
            //contact info
            firstName:"",
            middleName:"",
            lastName:"",
            address: "",
            city: "",
            province: "",//required
            postalCode:"",
            phone: "",
            fax: "",
            Email: "",

            //investment overview
            linkedCIAssets: 0,
            totalFamilyGroupAmount: 0
        };

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
        partialProfiles is an array of partialProfileObjects
        partialProfile only contains the following:
            profileId
        assetMix & funds
        investmentOverview object
        array of dealerServiceFee objects
        example of a partial profile
        */
        function partialProfile(loadedProfile) {
            return {
                profileId: loadedProfile.profileId,
                profileName: loadedProfile.profileName,
                assetMix: loadedProfile.assetMix,
                managedMarketValue: valueByClass(),
                separatelyManagedMarketValue: valueByClass(),
                totalIPGroupInvestmentAmount: 0,
                managedServiceFees: serviceFees(),
                separatelyManagedAccounts: [],
                separatelyManagedServiceFees: valueByClass()
            }
        }

        function separatelyManagedAccount() {
            return {
                accountType: "",
                fundClass: "",//should be one of the string keys in the valueByClass object, ie. "classI", "classE", "classF", and possibly more in the future
                amount: 0,
                separatelyManagedFunds: []
            }
        }
        function separatelyManagedFund() {
            return {
                fundName: "",
                assetClass: "",
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