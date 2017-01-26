(function () {
    'use strict';

    angular
        .module('evolution.core.main')
        .service('pageConfigService', pageConfigService);

    pageConfigService.$inject = [
    ];

    /* @ngInject */
    function pageConfigService() {
        var service = this;
        service.pageConfig = {};//this is set in index.run.js on successful state change.
    }

})();