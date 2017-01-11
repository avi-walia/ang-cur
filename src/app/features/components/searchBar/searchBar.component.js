
(function () {
    'use strict';

    angular
        .module('evolution.features.searchBar')
        .component('searchBar', {
            transpose: true,
            bindings: {
                service: '='
            },
            controller: searchBarCtrl,
            templateUrl:'app/features/components/searchBar/searchBar.tpl.html'
        });


    /* @ngInject */

    searchBarCtrl.$inject = [
        'detectMobile'
    ];
    /* @ngInject */
    function searchBarCtrl(detectMobile) {
        var vm = this;
        vm.detectMobile = detectMobile;
        vm.onBlur = onBlur;
        vm.onFocus = onFocus;
        document.getElementById('searchBar').focus();

        function onBlur() {
            document.getElementById('searchBar').setAttribute('aria-live', "off");
        }
        function onFocus() {
            document.getElementById('searchBar').setAttribute('aria-live', "polite");
        }
    }

})();





