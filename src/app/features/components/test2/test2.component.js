
(function () {
    'use strict';

    angular
        .module('evolution.features.test2')
        .component('test2', {
            controller: test2Ctrl,
            templateUrl:'app/features/components/test2/test2.tpl.html',
            bindings: {
                moreData: '<',
                moreData2: '<'
            }
        });


    /* @ngInject */

    test2Ctrl.$inject = [];

    /* @ngInject */
    function test2Ctrl(
    ) {
        var vm = this;
    }

})();





