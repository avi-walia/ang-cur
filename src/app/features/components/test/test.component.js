
(function () {
    'use strict';

    angular
        .module('evolution.features.test')
        .component('test', {
            controller: testCtrl,
            templateUrl:'app/features/components/test/test.tpl.html'
        });


    /* @ngInject */

    testCtrl.$inject = ['server', 'md5', 'testService', 'waitForResourcesService', '$state', 'notificationService'];

    /* @ngInject */
    function testCtrl(
        server,
        md5,
        testService,
        waitForResourcesService,
        $state,
        notificationService
    ) {
        waitForResourcesService.stopWaiting();
        var vm = this;
        vm.testService = testService;

        console.log('$state.current.name: ', $state.current.name);

        //String.prototype.hashCode = function() {
        function hashCode(str) {
            var hash = 0, i, chr, len;
            if (str.length === 0) return hash;
            for (i = 0, len = str.length; i < len; i++) {
                chr   = str.charCodeAt(i);
                hash  = ((hash << 5) - hash) + chr;
                hash |= 0; // Convert to 32bit integer
            }
            return hash;
        };
        notificationService.addMessage({msg:"<h1>Test Error Message</h1>", type:1});
        var obj = {
            "hello":"world",
            "test": "fibonnacci"
        };
        var test = JSON.stringify(obj);
        //console.log("hash test: ", md5.createHash(test));
/*
        testService.getData('http://192.168.180.155:3003/tests/6').then(function(data) {
            //console.log('localized data: ', data);
        })
        */

        testService.getData('http://192.168.180.155:3003/tests/1').then(
            function(data){
                //handle success event
                //console.log('data successfully retrieved: ', data);
            },
            function(error){
                //handle error event
                //console.log('an error occured: ', error);
            }
        );
        testService.getData('http://192.168.180.155:3003/tests/2').then(
            function(data){
                //handle success event
                //console.log('data successfully retrieved: ', data);
            },
            function(error){
                //handle error event
                //console.log('an error occured: ', error);
            }
        );
        testService.getData('http://192.168.180.155:3003/tests/3').then(
            function(data){
                //handle success event
                //console.log('data successfully retrieved: ', data);
            },
            function(error){
                //handle error event
                //console.log('an error occured: ', error);
            }
        )
    }

})();





