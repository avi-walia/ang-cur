(function () {
    'use strict';

    angular
        .module('evolution.core.main')
        .component('languageSwitcher', {
            templateUrl: 'app/core/components/language-switcher/language-switcher.html',
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
