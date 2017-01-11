(function () {
    'use strict';

    angular
        .module('evolution.core.main')
        .service('languageSwitcherService', languageSwitcherService);

    languageSwitcherService.$inject = [
        'i18nService',
        '$translate',
        '$state',
        'parseService'
    ];

    /* @ngInject */
    function languageSwitcherService(i18nService, $translate, $state, parseService) {
        var service = this;

        service.currentLanguage = $translate.use();
        service.changeLanguage = changeLanguage;
        /*
         localizationPairs is an array of objects of the type:
         {unLocalized: object, updateFunc: function}
         where unLocalized is the unlocalized data set and updateFunc is a function that takes 1 object(the new localized value) as input that will update the corresponding localized object in the service.
         */
        service.localizationObjects = {};
        service.switchLanguages = switchLanguages;
        service.addLocalizationObject = addLocalizationObject;

        function addLocalizationObject(localizationObject) {
            var x;
            if (service.localizationObjects.hasOwnProperty(parseService.stripDots($state.current.name))) {
                //var x = _.find(service.localizationObjects, 'key', "teasdfest");
                x = _.find(service.localizationObjects[parseService.stripDots($state.current.name)], function (obj) {
                    return obj.key === localizationObject.key;
                });

                if (x) {
                    x.callBack = localizationObject.callBack;
                    x.unLocalized = localizationObject.unLocalized;

                } else {
                    service.localizationObjects.push(localizationObject);
                }
            } else {
                service.localizationObjects[parseService.stripDots($state.current.name)] = [localizationObject];
            }
        }

        //iterates through the array of localizationPairs and applies i18nService.translate to the unLocalized object, and stores the result in the localized object.
        function switchLanguages() {
            _.forEach(service.localizationObjects[parseService.stripDots($state.current.name)], function(value, key){
                //value.callBack();

                value.callBack(i18nService.filterLocalizedKeys(value.unLocalized));
            });
        }

        function changeLanguage(langKey) {

            $translate.use(langKey).then(function () {
                service.currentLanguage = langKey;
                service.switchLanguages();
                $state.go($state.current.name, {locale: service.currentLanguage}, {notify:false});
            });

        }
    }

})();