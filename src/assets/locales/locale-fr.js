(function () {
    'use strict';
    angular.module('evolution').config(frenchTranslations);
    frenchTranslations.$inject = ['$translateProvider'];
    function frenchTranslations($translateProvider) {
        $translateProvider.translations('fr', {
            TITLE: '<h1>FR test title</h1>',
            searchPlaceHolder: 'FR Please enter words atleast 2 characters',
            searchProfileClientName: 'FR Search by profile/client name',
            dealerRepCode: 'FR Dealer/rep code',
            addProfilesToTheGroup: 'FR Add profiles to the group',
            groupName: 'FR Group name',
            nameTheGroup: 'FR Name the group',
            profilesAdded: 'FR profile(s) added',
            appTitle: "FR Evolution",
			previousPage: 'FR Previous',
			nextPage: 'FR Next',
			reset: 'FR Reset',
			cancel: 'FR Cancel',
			ok: 'FR OK',
			createTemplate: 'Create Template',
			preview: 'preview',
			save: 'save',
			warningTitle: 'FR Warning',
			feeProposal: 'FR Fee Proposal ',
			familyGroupNameErrors: {
				tooLong: 'FR The family group name should be less than 9 characters long.',
				required: 'FR The family group name is required.'
			},
			dealerRepCodeErrors: {
				required: 'FR The dealer rep code is required.'
			},
            pages: {
                strangeTableTest: {
                    title: "FR strangeTableTest"
                },
                test: {
                    title: "FR test test"
                },
                test4: {
                    title: "FR test4"
                }
            },
            navbar: {
                en: 'EN',
                fr: 'FR'
            },
            testNotification: "<h1>FR TEST MSG</h1>",
            testNotification2: "FR 2nd test msg",
            errors: {
                noData: "No Data Error Msg"
            },
            strangeTable: {
                profileName: 'FR Profile Name',
                clientName: 'FR Client Name',
                modificationDate: 'FR Modification Date',
                logs: 'FR Logs',
                pdf: 'FR PDF',
                status: 'FR Status',
                fundsReceived: 'FR Funds Received',
                cafReceived: 'FR CAF Received',
                createdBy: 'FR Created By',
                creationDate: 'FR Creation Date',
                add: 'FR Add to group',
                remove: 'FR Remove',
                addRemove: 'FR Add/remove profile',
                allocation: 'FR Allocation',
                showOnlySelected: 'FR Show only selected profiles'
            }
        });
    }
})();