(function () {
    'use strict';

    angular
        .module('evolution.core.main')
        .service('i18nService', i18nService);

    i18nService.$inject = [
        '$translate'
    ];

    /* @ngInject */
    function i18nService(
        $translate
    ) {
        var service = this;
        service.filterLocalizedKeys = getFilteredKeys;
        service.translate = translate;

        function translate(data, output) {
            return getFilteredKeys(data);
        }

        /**
         * Localizes an object by looking at the set locale and returning only values pertaining to that locale.
         * @param {*} data to be localized
         * @param boolean stripLocalizedVersion indicates that EN/FR version of the property should be removed. Defaults to false, do not remove.
         * @returns {*} localized data
         */
        function getFilteredKeys(data) {
            var locale = $translate.use();
            var x = {};
            // if it's any kind of object, go into it
            if (_.isObject(data)) {
                if (!_.isArray(data)) {
                    // if it's an Object and NOT an Array, fix the keys
                    x = remapKeys(data, locale);
                } else {
                    x = angular.copy(data);
                }
                // go into the object in case values are also objects
                _.forEach(x, function (value, key) {
                    //collection[key] = getFilteredKeys(value);
                    x[key] = getFilteredKeys(value);
                });
                return x;
            } else {
                // not an Object, nothing to remap
                return data;
            }
        }
    }

    function remapKeys(o, locale, output) {
        var keepVal = locale === 'en' ? 'EN' : 'FR';
        var removeVal = locale === 'en' ? 'FR' : 'EN';
        //var oCopy = angular.copy(o);
        /*
         return _(o)
         .mapKeys(function (value, key) {
         if (_.endsWith(key, removeVal)) {
         return '__keyToRemove__';
         } else {
         // if it ends with lang suffix that we need to rename, trim it (the last 2 characters: En/Fr)
         if (_.endsWith(key, keepVal)) {
         return key.substr(0, key.length - 2);
         }
         return key;
         }
         })
         .omit('__keyToRemove__')
         .value();
         */
        /*
         _.forEach(oCopy, function(value, key) {
         if (_.endsWith(key, keepVal)) {
         oCopy[key.substring(0, key.length - 2)] = oCopy[key];
         if (stripLocalizedVersion) {
         delete oCopy[key];
         }
         } else if (stripLocalizedVersion && _.endsWith(key, removeVal)) {
         delete oCopy[key];
         }
         });
         */
        var retVal = {};
        if (_.isObject(output)) {
            retVal = output;
        }
        _.forEach(o, function (value, key) {
            if (_.endsWith(key, keepVal)) {
                retVal[key.substring(0, key.length - 2)] = value;
            } else if (!_.endsWith(key, removeVal)) {
                retVal[key] = value;
            }
        });
        return retVal;
    }
})();

