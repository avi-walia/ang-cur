(function () {
    'use strict';

    angular.module('evolution.core.main')
        .controller('EvoLayoutCrl', EvoLayoutCrl);


    EvoLayoutCrl.$inject = ['pageStateResolver'];

    function EvoLayoutCrl(pageStateResolver) {

        var vm = this;
        vm.pageStateResolver = pageStateResolver;

        // vm.detectMobile = detectMobile;
        // console.log($state.current.name);

    }

})();