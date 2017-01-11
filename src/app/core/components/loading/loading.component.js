(function () {
    'use strict';

    angular
        .module('evolution.core.main')
        .component('loading', {
            templateUrl: 'app/core/components/loading/loading.tpl.html',
            controller: loadingCtrl
        });

    loadingCtrl.$inject = ['loadingService'];

    /* @ngInject */
    function loadingCtrl(loadingService) {
        var vm = this;
        vm.service = loadingService;
    }


})();
