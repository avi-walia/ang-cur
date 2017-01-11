/**
 * Directive to ensure the maxlength attribute of input fields is enforced(mainly for android).
 * This augments existing maxlength attributes. Does not alter it's functionality.
 * Future enhancement may increase proficiency by only enabling on android phones?
 */
(function () {
    'use strict';

    angular
        .module('evolution.utils')
        .directive('errSrc', errSrc);

    // ciInputMatch.$inject = ['$element'];
    errSrc.$inject = ['advisorService', 'PROFILE_PICTURE_BASE_PATH'];

    /* @ngInject */
    function errSrc(advisorService, PROFILE_PICTURE_BASE_PATH) {
        return {
            link: function(scope, element, attrs) {

                element.bind('error', function() {
                    if (attrs.src !== attrs.errSrc) {
                        attrs.$set('src', attrs.errSrc);

                        attrs.$set('src', attrs.errSrc);
                        var str = attrs.ngSrc;
                        var res = str.substring(PROFILE_PICTURE_BASE_PATH.length, str.length);
                        var slashIndex = res.indexOf('/');
                        var advisorId = res.substring(0, slashIndex);
                        advisorService.imageNotFound(advisorId);

                    }
                });
            }
        };
    }

})();
