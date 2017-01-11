/**
 * Used when we need to focus on an element.
 * Only use this if we cannot use the Focus-on directive due to some conflict with another directive that requests
 * for an isolate scope. For example, focus-on and maxlength will have conflicts because maxlength uses isolate scope
 * as of May 19 2016.
 * See: https://docs.angularjs.org/error/$compile/multidir?p0=focusOn&p1=%20(module:%20aio.utils)&p2=maxlength&p3=%20(module:%20aio.utils)&p4=new%2Fisolated
 *
 */
(function () {
    'use strict';

    angular
        .module('evolution.utils')
        .factory('focusService', focusService);

    focusService.$inject = ['$timeout','$window'];

    /* @ngInject */
    function focusService($timeout, $window) {
        
        var service = {
            focusElem: focusElem
        };
        return service;

        ////////////////

        function focusElem(id) {
            
            $timeout(function() {
                var element = $window.document.getElementById(id);
                if(element) {
                    element.focus();
                }
            });
        }
    }

})();

