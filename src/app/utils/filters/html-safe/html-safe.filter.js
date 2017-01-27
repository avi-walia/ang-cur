(function () {
    'use strict';

    angular
        .module('evolution.utils')
        .filter('htmlSafe', ['$sce', htmlSafeFilter]);
    
    function htmlSafeFilter($sce) {
        return function(htmlCode){
            return $sce.trustAsHtml(htmlCode);
        };
    }
})();
