(function () {
    'use strict';
    angular.module('evolution').config(englishTranslations);

    englishTranslations.$inject = ['$translateProvider'];

    function englishTranslations($translateProvider) {
        $translateProvider.translations('en', {
            TITLE: '<h1>test title</h1>',
            searchPlaceHolder: 'Please enter words atleast 2 characters',
            searchProfileClientName: 'Search by profile/client name',
            dealerRepCode: 'Dealer/rep code',
            addProfilesToTheGroup: 'Add profiles to the group',
            groupName: 'Group name',
            nameTheGroup: 'Name the group',
            profilesAdded: 'profile(s) added',
			previousPage: 'Previous',
			nextPage: 'Next',
			reset: 'Reset',
			cancel: 'Cancel',
			ok: 'OK',
			createTemplate: 'Create Template',
			preview: 'preview',
			save: 'save',
			warningTitle: 'Warning',
			feeProposal: 'Fee Proposal ',
			familyGroupNameErrors: {
				tooLong: 'The family group name should be less than 9 characters long.',
				required: 'The family group name is required.'
			},
			dealerRepCodeErrors: {
				required: 'The dealer rep code is required.'
			},
            profilesInFamilyGroupErrors: {
			    tooFew: 'There must be atleast 2 profiles in your family group.'
            },
            linkToFeeProposal: 'Family group fee proposal',
            pages: {
                strangeTableTest: {
                    title: "strangeTableTest"
                },
                test: {
                    title: "test"
                },
                test4: {
                    title: "test4"
                }
            },
            appTitle: "Evolution",
            FOO: 'This is a paragraph.',
            navbar: {
                en: 'EN',
                fr: 'FR'
            },
            testNotification: "<h1>TEST MSG</h1>",
            testNotification2: "2nd test msg",
            errors: {
                noData: "No Data Error Msg"
            },
            strangeTable: {
                id: 'id',
                profileName: 'Profile Name',
                clientName: 'Client Name',
                modificationDate: 'Modification Date',
                logs: 'Logs',
                pdf: 'PDF',
                status: 'Status',
                fundsReceived: 'Funds Received',
                cafReceived: 'CAF Received',
                createdBy: 'Created By',
                creationDate: 'Creation Date',
                add: 'Add to group',
                remove: 'Remove',
                addRemove: 'Add/remove profile',
                allocation: 'Allocation',
                showOnlySelected: 'Show only selected profiles'
            }
        });
    }
})();