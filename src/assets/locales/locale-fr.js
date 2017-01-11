(function () {
    'use strict';
    angular.module('evolution').config(frenchTranslations);
    frenchTranslations.$inject = ['$translateProvider'];
    function frenchTranslations($translateProvider) {
        $translateProvider.translations('fr', {
            TITLE: '<h1>FR test title</h1>',
            navbar: {
                en: 'EN',
                fr: 'FR'
            }
        });
    }
})();