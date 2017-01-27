(function () {
    'use strict';

    angular
        .module('evolution.utils')
        .filter('clickablePhone', clickablePhoneFilter);

    clickablePhoneFilter.$inject = [
        'detectMobile',
        'phoneFilter',
        '$sce',
         '$translate'
    ];
    //this filter is used to determine if a valid email was provided and format it to be clickable if it is.
    function clickablePhoneFilter(detectMobile, phoneFilter, $sce, $translate) {
        return function (phone) {

            if (phone && detectMobile.isMobile) {
                //the text that separates the extension from the base number starts with either an e(ex./ext.) or an x(x.)
                var e = phone.indexOf('e');
                var x = phone.indexOf('x');
                var basePhone = phone;
                //use whichever extension indicator that is closest to the beginning of the phone number.
                //the extension separator begins with x.
                if (e < 0 && x > 0) {
                    basePhone = phone.substring(0, x);

                //the extension separator begins with e
                } else if (e > 0 && x < 0) {
                    basePhone = phone.substring(0, e);
                //both extension separators are present, choose the one closed to the beginning
                } else if (e > 0 && x > 0) {
                    basePhone = phone.substring(0, e < x ? e : x);
                }
                //remove all non-numeric characters from the phone number
                basePhone = basePhone.replace(/[^0-9]/g,'');
                return $sce.trustAsHtml('<a class="clickablePhone" aria-label="' + basePhone + '" title="' + phoneFilter(phone) + '" href="tel:"' + basePhone + '">' + phoneFilter(phone) + '</a>');
            }
            return phone;
        };
    }
})();
