(function () {
    'use strict';
    angular.module('evolution').config(englishTranslations);

    englishTranslations.$inject = ['$translateProvider'];

    function englishTranslations($translateProvider) {
        $translateProvider.translations('en', {
            TITLE: '<h1>test title</h1>',
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
            pages: {
                test: {
                    title: "FR test"
                },
                test4: {
                    title: "FR test4"
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
            }
        });
    }
})();