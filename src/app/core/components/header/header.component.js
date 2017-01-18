
(function () {
    'use strict';

    angular
        .module('evolution.core.main')
        .component('ciHeader', {
            controller: headerCtrl,
            templateUrl:'app/core/components/header/header.tpl.html'
        });

    /* @ngInject */

    headerCtrl.$inject = ['$state'];
    /* @ngInject */
    function headerCtrl($state) {
        var vm = this;
        vm.isActive = true;

        console.log($state.current.name);
    }

})();
