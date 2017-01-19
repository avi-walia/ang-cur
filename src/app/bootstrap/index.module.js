(function () {
    'use strict';

    //---------------- CORE ---------------- //
    angular.module('evolution.core.cache', []);
    angular.module('evolution.core.server', ['evolution.core.cache']);
    angular.module('evolution.core.main', ['evolution.core.server']);
    //---------------- FEATURES ---------------- //
    angular.module('evolution.features.selectClientProfile', ['evolution.utils']);
    angular.module('evolution.features.clientAccountInfo', ['evolution.utils']);
    angular.module('evolution.features.ipq', ['evolution.utils']);
    angular.module('evolution.features.portfolioSelection', ['evolution.utils']);
    angular.module('evolution.features.fundCustomization', ['evolution.utils']);
    angular.module('evolution.features.advisorInfo', ['evolution.utils']);
    angular.module('evolution.features.profileSummary', ['evolution.utils']);
    angular.module('evolution.features.reports', ['evolution.utils']);
    angular.module('evolution.features.splitProfile', ['evolution.utils']);
    angular.module('evolution.features.help', ['evolution.utils']);
    angular.module('evolution.features.fee.profileSearch', ['evolution.utils']);
    angular.module('evolution.features.fee.contactInfo', ['evolution.utils']);
    angular.module('evolution.features.fee.investmentOverview', ['evolution.utils']);
    angular.module('evolution.features.fee.serviceFees', ['evolution.utils']);
    angular.module('evolution.features.fee.summary', ['evolution.utils']);
    angular.module('evolution.features.fee.reports', ['evolution.utils']);
    angular.module('evolution.features.searchByName', ['evolution.utils']);

    angular.module('evolution.features.selectClientProfile', ['evolution.utils']);
    angular.module('evolution.features.clientAccountInfo', ['evolution.utils']);
    angular.module('evolution.features.ipq', ['evolution.utils']);
    angular.module('evolution.features.portfolioSelection', ['evolution.utils']);
    angular.module('evolution.features.fundCustomization', ['evolution.utils']);
    angular.module('evolution.features.advisorInfo', ['evolution.utils']);
    angular.module('evolution.features.profileSummary', ['evolution.utils']);
    angular.module('evolution.features.reports', ['evolution.utils']);
    angular.module('evolution.features.splitProfile', ['evolution.utils']);
    angular.module('evolution.features.help', ['evolution.utils']);

    angular.module('evolution.features.fee.profileSearch', ['evolution.utils']);
    angular.module('evolution.features.fee.contactInfo', ['evolution.utils']);
    angular.module('evolution.features.fee.investmentOverview', ['evolution.utils']);
    angular.module('evolution.features.fee.serviceFees', ['evolution.utils']);
    angular.module('evolution.features.fee.summary', ['evolution.utils']);
    angular.module('evolution.features.fee.reports', ['evolution.utils']);

    angular.module('evolution.features.test', ['evolution.utils']);
    angular.module('evolution.features.test2', ['evolution.utils']);
    angular.module('evolution.features.test3', ['evolution.utils']);
    angular.module('evolution.features.test4', ['evolution.utils']);
    angular.module('evolution.features.searchBar', ['evolution.utils']);
    angular.module('evolution.features.paginatorInfiniteScroll', ['evolution.utils']);

    //---------------- UTILITIES ---------------- //
    angular.module('evolution.utils', ['matchMedia', 'ng.deviceDetector']);


    //---------------- MAIN ---------------- //
    angular.module('evolution', [
        'ui.router',
        'angular-cache',
        'pascalprecht.translate',
        'tmh.dynamicLocale',
        'ngCookies',
        'ngSanitize',
        'ngAria',
        'evolution.core.main',
        'evolution.features.selectClientProfile',
        'evolution.features.clientAccountInfo',
        'evolution.features.ipq',
        'evolution.features.portfolioSelection',
        'evolution.features.fundCustomization',
        'evolution.features.advisorInfo',
        'evolution.features.profileSummary',
        'evolution.features.reports',
        'evolution.features.splitProfile',
        'evolution.features.help',
        'evolution.features.fee.profileSearch',
        'evolution.features.fee.contactInfo',
        'evolution.features.fee.investmentOverview',
        'evolution.features.fee.serviceFees',
        'evolution.features.fee.summary',
        'evolution.features.fee.reports',
        'evolution.features.searchByName',
        'evolution.features.fee.profileSearch',
        'evolution.features.fee.contactInfo',
        'evolution.features.fee.investmentOverview',
        'evolution.features.fee.serviceFees',

        'evolution.features.test',
        'evolution.features.test2',
        'evolution.features.test3',
        'evolution.features.test4',
        'angulartics',
        'angulartics.google.analytics',
        'angular-md5',
        'ngMockE2E'
    ]);


})();


