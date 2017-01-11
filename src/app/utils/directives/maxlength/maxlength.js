/**
 * Directive to ensure the maxlength attribute of input fields is enforced(mainly for android).
 * This augments existing maxlength attributes. Does not alter it's functionality.
 * Future enhancement may increase proficiency by only enabling on android phones?
 */
(function () {
    'use strict';

    angular
        .module('evolution.utils')
        .directive('maxlength', maxlength);

    // ciInputMatch.$inject = ['$element'];

    /* @ngInject */
    function maxlength() {
        var directive = {
            bindToController: true,
            controller: maxlengthController,
            controllerAs: 'vm',
            restrict: 'A',
            scope: {}
        };
        return directive;

    }

    maxlengthController.$inject = ['$element', '$attrs'];

    /* @ngInject */
    function maxlengthController($element, $attrs) {
        var vm = this;
        var maxlength = $attrs.maxlength;

        var enforceMaxLength = function (evt) {
            if ($element[0].value.length >= maxlength) {
                $element[0].value = $element[0].value.substring(0, maxlength);
                evt.preventDefault();
                return false;
            }

        };

        //only need this directive on input elements
        if ($element[0].nodeName === 'INPUT' || $element[0].nodeName === 'TEXTAREA') {
            //only this event worked on android browser.
            $element.bind('input', enforceMaxLength);
        }
        //$element.bind('keydown', enforceMaxLength);
        //$element.bind('keypress', enforceMaxLength);
        //$element.bind('keyup', enforceMaxLength);
    }

})();
