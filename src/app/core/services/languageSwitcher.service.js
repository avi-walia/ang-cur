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
         localizationData is an object whose keys are stateNames(from the router, with periods replaced with _). The value stored at each key is an object of the form:
         {lang: string, localizationCallbacks: []}
         where lang is the last language this data was translated to, and localizationCallbacks is an array of keys from service.localizationData.
         Services and the data they load/store are singletons
         */
        service.localizationObjects = {};
        /*
         localizationData is an object whose keys are variable names from services that store localized data retrieved from the server. The value stored at each key is an object of the form:
         {unLocalized: object, callBack: function}
         where unLocalized is the unlocalized data set and updateFunc is a function that takes 1 object(the new localized value) as input that will update the corresponding localized object in the service.
         */
        service.localizationData = {};
        service.switchLanguages = switchLanguages;
        service.addLocalizationObject = addLocalizationObject;

        function addLocalizationObject(localizationObject) {
            var x;
            //the reason why we add all localizationObjects onto one object and add references to that object to the localizaationObject is to make is so when a resource is updated from multiple pages, the last update will propagate across all pages.
            service.localizationData[localizationObject.key] = localizationObject;

            var currentLang = $translate.use();
            var stateName = parseService.stripDots($state.current.name);

            if (service.localizationObjects.hasOwnProperty(stateName)) {//check if there are localization objects for the current state.
                x = service.localizationObjects[stateName].localizationCallbacks.indexOf(localizationObject.key);
                //if the localizationObject exists, just update the language it was last loaded in.
                if (x >= 0) {
                    service.localizationObjects[stateName].lang = currentLang;
                } else {//else localizationObject exists for this page, but not for the particular resource. Add a new localizationCallback.
                    service.localizationObjects[stateName].localizationCallbacks.push(localizationObject.key);
                }
            } else {
                //localizationObject for this state does not exist, create it.
                service.localizationObjects[stateName] = {
                    lang: currentLang,
                    localizationCallbacks: [localizationObject.key]
                };
            }
        }

        //iterates through the array of localizationPairs and applies i18nService.translate to the unLocalized object, and stores the result in the localized object.
        //newStateName is a string representing the state you are about to transition to. This is used to translate any data received from an API for the page you are about to transition to.
        //newStateName would only be used to translate data if the user is navigating back to a page they have been on previously.
        function switchLanguages(newStateName) {
            var states = [];
            if (!newStateName) {
                newStateName = $state.current.name;
            }
            newStateName = parseService.stripDots(newStateName);
            /*
                If the state name contains more 2 "_" then it is a substate of an abstract state.
                Translation callbacks for substate's parents will also need to be triggered.
                Currently I have no way of isolating just parents, so sibling state's callbacks will also be triggered.
             */
            var stateParts = newStateName.split("_");
            if (stateParts.length > 3 ) {
                delete stateParts[stateParts.length-1]
                newStateName = stateParts.join("_");
                newStateName = newStateName.substring(0, newStateName.length - 1);
                var newStateLength = newStateName.length;
                _.forEach(service.localizationObjects, function(value, key) {
                    if (key.substring(0, newStateLength) === newStateName) {
                        states.push(key);
                    }
                });
            } else {
                states.push(newStateName);
            }
            var lang = $translate.use();
            _.forEach(states, function(stateName) {
                //only translate if the last language this page was translated for is different from the current language
                if (service.localizationObjects[stateName] && service.localizationObjects[stateName].lang != lang) {
                    service.localizationObjects[stateName].lang = lang;
                    _.forEach(service.localizationObjects[stateName].localizationCallbacks, function (localizationDataKey) {
                        //value.callBack();
                        console.log('localizationData[localizationDataKey]: ', localizationDataKey);
                        service.localizationData[localizationDataKey].callBack(i18nService.filterLocalizedKeys(service.localizationData[localizationDataKey].unLocalized));
                    });
                }
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