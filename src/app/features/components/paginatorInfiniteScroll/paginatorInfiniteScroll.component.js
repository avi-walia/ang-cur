
(function () {
    'use strict';

    angular
        .module('evolution.features.paginatorInfiniteScroll')
        .component('paginatorInfiniteScroll', {
            transpose: true,
            bindings: {
              service: '='
            },
            controller: paginatorInfiniteScrollCtrl,
            templateUrl:'app/features/components/paginatorInfiniteScroll/paginatorInfiniteScroll.tpl.html'
        });


    /* @ngInject */

    paginatorInfiniteScrollCtrl.$inject = [
        'detectMobile'
    ];
    /* @ngInject */
    function paginatorInfiniteScrollCtrl(
        detectMobile
    ) {
        var vm = this;
        vm.detectMobile = detectMobile;
        vm.PROFILE_PICTURE_BASE_PATH = './testImg.png';
    }

})();