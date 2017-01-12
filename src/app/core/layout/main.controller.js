(function () {
    'use strict';

    angular.module('evolution.core.main')
        .controller('MainCtrl', MainCtrl);


    MainCtrl.$inject = [
        '$window',
        'detectMobile',
        'pageStateResolver'
    ];

    function MainCtrl(
        $window,
        detectMobile,
        pageStateResolver
    ) {

        var vm = this;

        vm.print = print;

        vm.pageStateResolver = pageStateResolver;
        vm.detectMobile = detectMobile;


        function print() {
            $window.print();
        }

    }

})();