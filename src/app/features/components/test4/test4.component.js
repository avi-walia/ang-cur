
(function () {
    'use strict';

    angular
        .module('evolution.features.test4')
        .component('test4', {
            controller: test4Ctrl,
            templateUrl:'app/features/components/test4/test4.tpl.html'
        });


    /* @ngInject */

    test4Ctrl.$inject = [
        '$q',
        '$timeout',
        'testService',
        'waitForResourcesService'
    ];

    /* @ngInject */
    function test4Ctrl(
        $q,
        $timeout,
        testService,
        waitForResourcesService
    ) {
        var vm = this;
        var fakeRequest = $q.defer();
        $timeout(function() {
            fakeRequest.resolve('hello world');
        },10000);
        waitForResourcesService.pendingResources.push(fakeRequest.promise);
        waitForResourcesService.startWaiting();
        vm.service = testService;
        if (vm.service.callCount === 0) {
            vm.service.callCount++;
            testService.getData('/tests/4');
        }
    }

})();





