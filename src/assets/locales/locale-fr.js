(function () {
    'use strict';
    angular.module('evolution').config(frenchTranslations);
    frenchTranslations.$inject = ['$translateProvider'];
    function frenchTranslations($translateProvider) {
        $translateProvider.translations('fr', {
            TITLE: '<h1>FR test title</h1>',
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
            pages: {
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
            }
        });
    }
})();