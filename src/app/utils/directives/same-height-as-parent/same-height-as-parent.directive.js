(function () {
    'use strict';

    angular
        .module('evolution.utils')
        .directive('sameHeightAsParent', sameHeightAsParent);

    sameHeightAsParent.$inject = ['$timeout'];

    /* @ngInject */
    function sameHeightAsParent($timeout) {
        return {
            link: function(scope, element, attrs) {
                //wait for dom to render and css to be applied before changing heights
                $timeout(function() {
                    try {
                        element.css('height', element[0].parentElement.offsetHeight + 'px');
                    }catch(err) {

                    }
                })
            }
        };
    }

})();
