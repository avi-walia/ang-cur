(function () {
    'use strict';

    angular
        .module('evolution')
        .service('pageStateResolver', pageStateResolver);

    pageStateResolver.$inject = [
        'i18nService',
        'ROUTES'
    ];

    /* @ngInject */
    function pageStateResolver(
        i18nService,
        ROUTES
    ) {
        var service = this;

        service.activePageName = '';

        service.pageLoading = false;

        service.getPageConfigFromState = getPageConfigurationObjectFromStateName;
        service.setActivePageName = setActivePageName;
        service.resolve = pageToStateMapper;
        service.check = stateToPageMapper;

        /**
         * Given a state will give you the entire page configuration.
         *
         * @param sState string, a state name
         * @param callback function, to act on
         */
        function getPageConfigurationObjectFromStateName(sState, callback) {

            var oPageConfiguration = _.find(ROUTES, {stateName: sState});

            if (_.isObject(oPageConfiguration)) {

                // localize it
                oPageConfiguration = i18nService.filterLocalizedKeys(oPageConfiguration);
                // closure
                if (!oPageConfiguration.isAbstract) {
                    callback(oPageConfiguration);
                }

            }

        }

        /**
         * Given a page name will return you the entire page configuration.
         *
         * @param sPage string, a page name
         * @param callback function, to act on
         */
        function getPageConfigurationObjectFromPageName(sPage) {

            var oPageConfiguration = _.find(ROUTES, {pageName: sPage});

            if (_.isUndefined(oPageConfiguration)) {
                return false;
            }
            // localize it
            oPageConfiguration = i18nService.filterLocalizedKeys(oPageConfiguration);
            return !oPageConfiguration.isAbstract ? oPageConfiguration : false;
        }


        /**
         * Given a state returns a page name.
         *
         * @param sState string, a state name
         * @returns string, holding the requested page name OR empty string (false)
         */
        function stateToPageMapper(sState) {
            var pageName;
            service.getPageConfigFromState(sState, function (oPageConfiguration) {
                pageName = 'pageName' in oPageConfiguration ? oPageConfiguration.pageName : '';
            });

            return pageName;
        }


        /**
         * Given a page returns a state name.
         *
         * @param sPage string, a page name
         * @returns string, holding the requested state name OR false
         */
        function pageToStateMapper(sPage, callback) {
            var oPageConfiguration = getPageConfigurationObjectFromPageName(sPage);
            if ('stateName' in oPageConfiguration) {
                callback(oPageConfiguration.stateName);
            }

        }

        /**
         * Sets
         * "activePageName", the active page name.
         *
         * @param sState string, a state name
         */
        function setActivePageName(sState) {
            var oPageConfiguration = _.find(ROUTES, {stateName: sState});
            if (angular.isDefined(oPageConfiguration)){
                if ('pageName' in oPageConfiguration) {
                    if (!oPageConfiguration.isAbstract) {
                        service.activePageName = oPageConfiguration.pageName;
                    }
                }
            }

        }


    }

})();
