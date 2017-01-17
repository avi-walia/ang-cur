(function () {
    'use strict';

    //---------------- CORE ---------------- //
    angular.module('evolution.core.cache', []);
    angular.module('evolution.core.server', ['evolution.core.cache']);
    angular.module('evolution.core.main', ['evolution.core.server']);
    //---------------- FEATURES ---------------- //
    angular.module('evolution.features.searchByName', ['evolution.utils']);
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
        'evolution.features.searchByName',
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


