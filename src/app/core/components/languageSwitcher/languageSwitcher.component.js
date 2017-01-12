(function () {
    'use strict';

    angular
        .module('evolution.core.main')
        .component('languageSwitcher', {
            templateUrl: 'app/core/components/languageSwitcher/languageSwitcher.html',
            controller: LangSwitcherCtrl
        });

    LangSwitcherCtrl.$inject = [
        'languageSwitcherService'
    ];

    /* @ngInject */
    function LangSwitcherCtrl(
        languageSwitcherService
    ) {
        var vm = this;
        vm.service = languageSwitcherService;
    }


})();
