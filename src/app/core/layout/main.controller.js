(function () {
    'use strict';

    angular.module('evolution.core.main')
        .controller('MainCtrl', MainCtrl);


    MainCtrl.$inject = [
        '$window',
        'detectMobile',
        'pageStateResolver',
        '$state',
        'parseService'
    ];

    function MainCtrl(
        $window,
        detectMobile,
        pageStateResolver,
        $state,
        parseService
    ) {

        var vm = this;
        vm.currentState = parseService.stripDots($state.current.name);

        vm.print = print;

        vm.pageStateResolver = pageStateResolver;
        vm.detectMobile = detectMobile;



        function print() {
            $window.print();
        }

    }

})();