(function () {
    'use strict';

    angular
        .module('evolution.utils')
        .service('stateTrackerService', stateTrackerService);

    stateTrackerService.$inject = ['$rootScope'];

    /* @ngInject */
    function stateTrackerService($rootScope) {
        var service = this;
        service.isNameSearch = false;
        service.isLocationSearch = false;
    }
})();

