/**
 * Service used to track events through google analytics.
 * It uses a plugin called $analytics - https://luisfarzati.github.io/angulartics/
 * The labels in the code do not need to be translated since GA is in english anyway.
 * Created by vvillanu on 2016-03-15.
 */

(function () {
    'use strict';

    angular
        .module('evolution.utils')
        .service('analyticsService', analyticsService);

    analyticsService.$inject = ['$analytics'];

    /* @ngInject */
    function analyticsService($analytics) {
        var service = this;
        var evt = '';
        /** FUNCTIONS **/
        service.trackErrorAnalytics = trackErrorAnalytics;
        service.trackSuccessAnalytics = trackSuccessAnalytics;
        /** End OF FUNCTIONS **/

        /**
         *
         * @param resultBool Either true or false. True if it was a success call. Otherwise it is false.
         * @param category The pages like LOGIN, REGISTRATION etc.
         * @param errorCode API Error codes
         */

        function trackErrorAnalytics(resultBool, errorCode, category) {
            //console.clear();
            // console.log('result = ', resultBool);
            // console.log('trackErrorAnalytics errorCode = ', errorCode);
            // console.log('trackErrorAnalytics category = ', category);

            if (_.isArray(errorCode)) {

                _.forEach(errorCode, function (code) {
                    errorTracking(code, category);
                });

            } else {
                errorTracking(errorCode, category);
            }


        }

        //$analytics.eventTrack(evt, { category: category, label: label});

        function errorTracking(errorCode, category) {
            evt = 'Rest Call';


            if (errorCode === 'E409001') {

                //$analytics.eventTrack( 'Rest Call', 'REGISTRATION', );
                $analytics.eventTrack(evt, {
                    category: category,
                    label: errorCode + ': Invalid advisorID'
                });

            }
            else if (errorCode === 'E409002') {

                $analytics.eventTrack(evt, {
                    category: category,
                    label: errorCode + ': Invalid branchID'
                });

            }

        }

        /**
         *
         * @param result Boolean
         * @param evt
         * @param category The pages like LOGIN, REGISTRATION etc.
         * @param label Optional label
         */
        function trackSuccessAnalytics(result, evt, category, label) {
            //console.clear();
            // console.log('result = ', result);
            // console.log('trackSuccessAnalytics evt = ', evt);
            // console.log('trackSuccessAnalytics category = ', category);
            // console.log('trackSuccessAnalytics label = ', label);

            if (_.isBoolean(result) === false) {
                console.error('result needs to be a boolean in analytics service');
                return;
            }
            //if user didnt add a label then set it to N/A
            label = label || 'N/A';

            $analytics.eventTrack(evt, {category: category, label: label});

        }
    }

})();

