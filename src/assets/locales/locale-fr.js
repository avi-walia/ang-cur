(function () {
    'use strict';
    angular.module('evolution').config(frenchTranslations);
    frenchTranslations.$inject = ['$translateProvider'];
    function frenchTranslations($translateProvider) {
        $translateProvider.translations('fr', {
            TITLE: '<h1>FR test title</h1>',
            appTitle: "FR Evolution",
            pages: {
                test: {
                    title: "FR test"
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
            testNotification2: "FR 2nd test msg"
        });
    }
})();