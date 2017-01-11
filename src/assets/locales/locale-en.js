(function () {
    'use strict';
    angular.module('evolution').config(englishTranslations);

    englishTranslations.$inject = ['$translateProvider'];

    function englishTranslations($translateProvider) {
        $translateProvider.translations('en', {
            TITLE: '<h1>test title</h1>',
            FOO: 'This is a paragraph.',
            navbar: {
                en: 'EN',
                fr: 'FR'
            }
        });
    }
})();