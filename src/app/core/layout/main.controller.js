(function () {
    'use strict';

    angular.module('evolution.core.main')
        .controller('MainCtrl', MainCtrl);


    MainCtrl.$inject = [
            '$rootScope',
            '$scope',
            'pageStateResolver',
            '$window',
            'detectMobile'
    ];

            function MainCtrl ($rootScope, $scope,
                      pageStateResolver, $window, detectMobile) {

                var vm = this;

                vm.print = print;

                vm.pageStateResolver = pageStateResolver;
                vm.detectMobile = detectMobile;


                function print() {
                    $window.print();
                }

            }

})();