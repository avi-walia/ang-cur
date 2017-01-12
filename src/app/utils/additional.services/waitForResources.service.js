(function () {
    'use strict';

    angular
        .module('evolution.utils')
        .service('waitForResourcesService', waitForResourcesService);

    waitForResourcesService.$inject = [
        '$q',
        'loadingService'
    ];

    /* @ngInject */
    function waitForResourcesService(
        $q,
        loadingService
    ) {
        var service = this;
        var pendingPromise = null;
        var resourceCounter = 0;
        //this should be an array of promises from asynchronous resources
        service.pendingResources = [];
        service.startWaiting = startWaiting;
        service.stopWaiting = stopWaiting;

        /*
            After all pending dependencies have been pushed onto the pendingResources array, start waiting for them to resolve.
            This function will hide the loading modal when the pendingResources resolve(successfully or in failure).
            Error handling should be done by the service requesting the resource.
         */
        function startWaiting() {
            resourceCounter++;
            var currentResourceCount = resourceCounter;
            loadingService.setIsLoading(true);
            if (pendingPromise) {
                //pendingPromise.resolve();
            }
            pendingPromise = $q.all(service.pendingResources).then(
                function(data) {
                    if (currentResourceCount === resourceCounter) {
                        loadingService.setIsLoading(false);
                        service.pendingResources = [];
                        return data;
                    }
                },
                function(error) {
                    if (currentResourceCount === resourceCounter) {
                        loadingService.setIsLoading(false);
                        service.pendingResources = [];
                        return error;
                    }
                }

            );
            return pendingPromise;
        }
        function stopWaiting() {
            resourceCounter++;
            service.pendingResources = [];
            loadingService.setIsLoading(false);
        }
    }

})();