(function () {
    'use strict';

    angular
        .module('evolution.utils')
        .service('localizedDataService', localizedDataService);

    localizedDataService.$inject = [];

    /* @ngInject */
    function localizedDataService() {
        var service = this;
        service.update = update;

        /*
            @param origin: object
            @param additions: object
         */
        function update(origin, additions) {
            return origin;
        }
    }
})();

