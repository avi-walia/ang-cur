(function () {
    'use strict';
    angular
        .module('evolution.utils')
        .directive('scrollToTop', scrollToTop);

    scrollToTop.$inject = ['$anchorScroll'];

    /* @ngInject */
    function scrollToTop($anchorScroll) {
        var directive = {
            link: link,
            restrict: 'A',
        };
        return directive;

        function link(scope, element) {
            element.on('click', function () {
                $anchorScroll('header');
            });
        }
    }
})();

