(function () {
    'use strict';

    angular
        .module('evolution.core.main')
        .service('loadingService', loadingService);

    loadingService.$inject = [
    ];

    /* @ngInject */
    function loadingService() {
        var service = this;
        service.isLoading = true;
        service.setIsLoading = setIsLoading;
        service.getIsLoading = getIsLoading;

        function setIsLoading(isLoading) {
            service.isLoading = isLoading;
        }

        function getIsLoading() {
            return service.isLoading;
        }
    }

})();