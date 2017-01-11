
(function () {
    'use strict';

    angular
        .module('evolution.core.main')
        .component('ciHeader', {
            controller: headerCtrl,
            templateUrl:'app/core/components/header/header.tpl.html'
        });


    /* @ngInject */

    headerCtrl.$inject = [
    ];
    /* @ngInject */
    function headerCtrl(
    ) {
        var vm = this;
    }

})();
