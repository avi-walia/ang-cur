(function () {
    'use strict';

    angular
        .module('evolution.core.main')
        .service('localeSeparatorService', localeSeparatorService);

    localeSeparatorService.$inject = ['$translate'];

    /* @ngInject */
    function localeSeparatorService($translate) {
        var service = this;
        service.isNameSearch = false;
        service.isLocationSearch = false;
    }
})();

