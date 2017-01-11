(function () {
    'use strict';

    angular
        .module('evolution.utils')
        .filter('phone', phoneFilter);

    //phoneFilter.$inject = ['$locale'];
    function phoneFilter() {
        return function (phone) {
            if (!phone) {
                return phone;
            }
            phone = String(phone);

            switch (phone.length) {
                case 7:
                    return phone.replace(/^(\d{3})(\d{4})$/, '$1-$2');
                case 10:
                    return phone.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3');
                case 11:
                    return phone.replace(/^(\d{1})(\d{3})(\d{3})(\d{4})$/, '$1 ($2) $3-$4');
                default:
                    return phone;
            }
        };
    }
})();
