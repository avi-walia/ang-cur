
(function () {
    'use strict';

    angular
        .module('evolution.features.test')
        .component('test', {
            controller: testCtrl,
            templateUrl:'app/features/components/test/test.tpl.html'
        });


    /* @ngInject */

    testCtrl.$inject = [
        'notificationService',
        'testService',
        'waitForResourcesService',
        'mockService'
    ];

    /* @ngInject */
    function testCtrl(notificationService, testService, waitForResourcesService,mockService) {

        var vm = this;
        vm.testService = testService;
        vm.mockService = mockService;
		vm.linkText = 'testPDF';
		vm.fileName = 'test.pdf';
        vm.url = '/mockPDF';

        //stop the testSERvice stuff
        waitForResourcesService.stopWaiting();

        notificationService.addMessage({msg:"testNotification", type:1});
        notificationService.addMessage({msg:"<h2 translate>testNotification2</h2>", type:1});


        testService.getData('/tests/1').then(
            function(data){
                //handle success event
                console.log(data);
                //console.log('data successfully retrieved: ', data);
            },
            function(error){
                //handle error event
                //typically a call to notificationService
            }
        );

        // testService.getData('/tests/2').then(
        //     function(data){
        //         //handle success event
        //         //typically a call to notificationService
        //     },
        //     function(error){
        //         //handle error event
        //         //typically a call to notificationService
        //     }
        // );
        // testService.getData('/tests/3').then(
        //     function(data){
        //         //handle success event
        //         //console.log('data successfully retrieved: ', data);
        //     },
        //     function(error){
        //         //handle error event
        //         //typically a call to notificationService
        //     }
        // );


    }

})();





