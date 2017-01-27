(function () {
    'use strict';

    angular
        .module('evolution.utils')
        .filter('clickableFax', clickableFaxFilter);

    clickableFaxFilter.$inject = [
        '$sce'
    ];

    //this filter is used to determine if a valid email was provided and format it to be clickable if it is.
    function clickableFaxFilter($sce) {
        return function (fax) {
            if (fax) {
                return $sce.trustAsHtml('<a aria-label="fax:' + fax + '" title="fax:' + fax + '" href="fax:' + fax + '">' + fax + '</a>');
            }
            return fax;
        };
    }
})();
