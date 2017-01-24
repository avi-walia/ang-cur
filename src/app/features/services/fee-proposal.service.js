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
            profiles: [],
            dealerRepCode: "",
            familyGroupName: "",
            contactInfo: {
                //advisor info
                fullName:"",
                Email: "",
                phone: "",
                fax: "",

                //mailing address
                street: "",
                province: "",//required
                city: "",
                postalCode:""
            },
            investmentOverview: {
                linkedCIAssets: 0,
                totalFamilyGroupAmount: 0,
                profileInvestments: []//can hold one object if launched from fund customization screen, otherwise will have atleast 2 entries
            }
        };

        function profileInvestments() {
            return {
                investmentAmount: {
                    classI: 0,
                    classE: 0,
                    classF: 0,
                    totalIPGroupInvestmentAmount: 0
                },
                separatelyManagedAccounts: []
            }
        }
        function separatelyManagedAccounts() {
            return {
                accountType: "",
                fundClass: "",
                amount: 0,
                separatelyManagedFunds: [],
            }
        }
        function separatelyManagedFunds() {
            return {
                fundName: "",
                fundFamily: "",
                currency: "",
                
            }
        }
    }

})();