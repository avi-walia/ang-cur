(function () {
    'use strict';



    angular
        .module('evolution.core.main')
        .service('parseService', parseService);

    parseService.$inject = [
    ];

    /* @ngInject */
    function parseService() {
        var service = this;
        service.stripDots = stripDots;

        //remove all persiods from given string
        function stripDots(state) {
            return state.replace(/\./g,'');
        }
    }

})();