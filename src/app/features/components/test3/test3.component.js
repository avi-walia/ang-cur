
(function () {
    'use strict';

    angular
        .module('evolution.features.test3')
        .component('test3', {
            controller: test3Ctrl,
            templateUrl:'app/features/components/test3/test3.tpl.html'
        });


    /* @ngInject */

    test3Ctrl.$inject = [];

    /* @ngInject */
    function test3Ctrl(
    ) {
        var vm = this;
    }

})();





