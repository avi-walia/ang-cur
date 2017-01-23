(function () {
    'use strict';

    angular.module('evolution.core.main')
        .controller('MainCtrl', MainCtrl);


    MainCtrl.$inject = [
        '$state',
        'pageStateResolver'
    ];

    function MainCtrl(
        $state,
        pageStateResolver
    ) {

        var vm = this;
        vm.pageStateResolver = pageStateResolver;

        // vm.detectMobile = detectMobile;
        // console.log($state.current.name);

    }

})();