(function () {
    'use strict';

    angular
        .module('evolution')
        .service('pageStateResolver', pageStateResolver);

    pageStateResolver.$inject = [
        'ROUTES',
        'i18nService'
    ];

    /* @ngInject */
    function pageStateResolver(ROUTES, i18nService) {
        var service = this;

        service.activePageName = '';
        service.stepIndicator = 0;

        service.pageLoading = false;

        service.getPageConfigFromState = getPageConfigurationObjectFromStateName;
        service.setActivePageName = setActivePageName;
        service.resolve = pageToStateMapper;
        service.check = stateToPageMapper;
      
        service.setStepIndicator = setStepIndicator;

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
            var attr = 'pageName';
            var oPageConfiguration = _.find(ROUTES, {stateName: sState});
            if (angular.isDefined(oPageConfiguration)) {
                if (attr in oPageConfiguration) {
                    if (!oPageConfiguration.isAbstract) {
                        service.activePageName = oPageConfiguration.pageName;
                    }
                }
            } else {
                console.error('state: ' + sState + ' has missing ' + attr + ' attribute. Check your ROUTES constant variable');

            }

        }

        function setStepIndicator(sState) {
            var attr = 'stepIndicator';
            console.clear();
            // var oPageConfiguration = _.find(ROUTES, { stepIndicator: sState});
            var oPageConfiguration = _.find(ROUTES, function(o){
                console.log(o);
                if (o.stateName === sState ){
                    if (o.stepIndicator !== 0){
                        return o.stepIndicator;
                    }else{
                        //just return an empty object if the stepIndicator of a state == 0
                        return {};
                    }
                }
            });

            //if oPageConfiguration isnt an empty object then lets get the stepIndicator of sState
            //by default stepIndicator is 0
            if (angular.isDefined(oPageConfiguration) && !_.isEmpty(oPageConfiguration)  ) {
                // console.log('defined');
                if (attr in oPageConfiguration) {
                    // console.log('blah');
                    if (!oPageConfiguration.isAbstract) {
                        // console.log('daga');
                        service.stepIndicator = oPageConfiguration.stepIndicator;
                        // console.log(service.stepIndicator);
                    }
                }
            } else {
                console.error('state: ' + sState + ' has missing ' + attr + ' attribute. Check your ROUTES constant variable');

            }

        }





    }

})();
