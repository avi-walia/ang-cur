(function () {
    'use strict';

    angular
        .module('evolution.core.main')
        .service('feeHeaderService', feeHeaderService);

    feeHeaderService.$inject = [
    ];

    /* @ngInject */
    function feeHeaderService() {
        var service = this;
        service.restartLink = '';//this is set in index.run.js on successful state change.
        service.exitLink = '';//this is set in index.run.js on successful state change.
    }

})();