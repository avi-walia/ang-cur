(function () {
    'use strict';

    angular.module('evolution')
        .constant('CORE_EVENTS', {
            genericFailure: 'core-generic-failure'
        })
        .factory('CoreInterceptor', [
            '$rootScope',
            '$q',
            '$injector',
            'analyticsService',
            'CORE_EVENTS',

            function ($rootScope, $q, $injector, analyticsService, CORE_EVENTS) {

                function broadcastError(rejection) {


                    switch (rejection.status) {
                        case 400:
                        case 500:
                            $rootScope.$broadcast(CORE_EVENTS.genericFailure);
                            break;
                    }

                    return $q.reject(rejection);
                }

                return {
                    responseError: broadcastError
                };
            }
        ]);
})();
