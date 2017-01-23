(function () {
    'use strict';

    angular
        .module('evolution.features.test')
        .service('strangeTableFormatterService', strangeTableFormatterService);

    strangeTableFormatterService.$inject = [
        'strangeTableFormatterService'
    ];

    /* @ngInject */
    function strangeTableFormatterService(removeDiacriticsService) {
        var service = this;
        service.formatSearchKeys = formatSearchKeys;

        /*
        *   objArr = array of objects that needs diacritics removed from certain values
        *   diacriticKeys = array of keys that should have diacritics stripped out of their values
         */
        function formatSearchKeys(objArr, diacriticKeys) {
            _.forEach(objArr, function( value, index) {
               if (_.isObject(value) || _.isArray(value)) {
                   formatSearchKeys(objArr[index], diacriticKeys);
               } else {
                   if (diacriticKeys.indexOf(index) >= 0) {
                       objArr[index + "Searchable"] = removeDiacriticsService.remove(value);
                   }
               }
            });
            return objArr;
        }
    }

})();