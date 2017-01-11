
(function () {
    'use strict';

    angular
        .module('evolution.features.test4')
        .component('test4', {
            controller: test4Ctrl,
            templateUrl:'app/features/components/test4/test4.tpl.html'
        });


    /* @ngInject */

    test4Ctrl.$inject = ['$q', '$timeout', 'waitForResourcesService', 'testService'];

    /* @ngInject */
    function test4Ctrl($q, $timeout, waitForResourcesService, testService
    ) {
        var vm = this;
        var fakeRequest = $q.defer();
        $timeout(function() {
            fakeRequest.resolve('hello world');
        },10000);
        waitForResourcesService.pendingResources.push(fakeRequest.promise);
        waitForResourcesService.startWaiting();

        testService.getData1('http://192.168.180.155:3003/tests/');
    }

})();





