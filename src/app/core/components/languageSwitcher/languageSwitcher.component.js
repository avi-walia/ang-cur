(function () {
    'use strict';

    angular
        .module('evolution.core.main')
        .component('languageSwitcher', {
            templateUrl: 'app/core/components/languageSwitcher/languageSwitcher.html',
            controller: LangSwitcherCtrl
        });

    LangSwitcherCtrl.$inject = ['$translate', '$state', 'languageSwitcherService'];

    /* @ngInject */
    function LangSwitcherCtrl($translate, $state, languageSwitcherService) {
        var vm = this;
        vm.service = languageSwitcherService;
    }


})();
