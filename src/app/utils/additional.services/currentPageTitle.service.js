/**
 * Created by michong on 2016-05-06.
 * Used to keep track of the currentPage title.
 */

(function () {
    'use strict';
    angular
        .module('evolution.utils')
        .service('currentPageTitle', currentPageTitle);

    /* @ngInject */
    function currentPageTitle() {
        var service = this;
        //service.pageTitle = 'hello world';
        service.page = {
            title: ''
        };
        /*
        service.setPageName = setPageName;
        service.getPageName = getPageName;
        function setPageName(pgName) {
            if (_.isString(pgName)) {
                pageName = pgName;
            }
        }
        function getPageName() {
            return pageName;
        }
        */
    }

})();