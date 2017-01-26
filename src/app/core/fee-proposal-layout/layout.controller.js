(function () {
    'use strict';

    angular
        .module('evolution.core.main')
        .controller('LayoutCtrl', LayoutCtrl);

    LayoutCtrl.$inject = ['$state'];

    /* @ngInject */
    function LayoutCtrl($state) {
        var vm = this;
        vm.title = 'LayoutCtrl';


    }

})();

