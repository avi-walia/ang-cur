(function () {
    'use strict';

    angular
        .module('evolution.features.test')
        .service('testService', testService);

    testService.$inject = [
        'server',
        '$rootScope',
        'i18nService',
        'languageSwitcherService',
        'dataCacheSessionStorage',
        'waitForResourcesService'
    ];

    /* @ngInject */
    function testService(server, $rootScope, i18nService, languageSwitcherService, dataCacheSessionStorage, waitForResourcesService) {
        var service = this;
        service.data = {};

        service.getData1 = getData1;
        service.getData2 = getData2;
        service.getData3 = getData3;


        function getData1(url) {
            var ret = server.getNoStorage(url + '6', false).then(function(data){
                service.data = data.data;
                //languageSwitcherService.localizationObjects.push({unLocalized: data.unLocalizedData, callBack: translateData, key: "testService.data"});
                languageSwitcherService.addLocalizationObject({unLocalized: data.unLocalizedData, callBack: translateData, key: "testService.data"})
                return service.data;
            });
            waitForResourcesService.pendingResources.push(ret);
            waitForResourcesService.startWaiting();
            return ret;
        }
        function translateData(translatedData) {
            //service.data = translatedData;
            _.assign(service.data, translatedData);
        }
        function getData2(url) {
            var ret = server.getNoStorage(url + '4', false).then(function(data){
                service.data = data.data;
                //languageSwitcherService.localizationObjects.push({unLocalized: data.unLocalizedData, callBack: translateData, key: "testService.data"});
                data.unLocalizedData.id = "fish";
                languageSwitcherService.addLocalizationObject({unLocalized: data.unLocalizedData, callBack: translateData, key: "testService.data"})
                return service.data;
            });
            waitForResourcesService.pendingResources.push(ret);
            waitForResourcesService.startWaiting();
            return ret;
        }
        function getData3(url) {
            var ret = server.getNoStorage(url + '2', false).then(function(data){
                service.data = data.data;
                data.unLocalizedData.id = "asdg";
                //languageSwitcherService.localizationObjects.push({unLocalized: data.unLocalizedData, callBack: translateData, key: "testService.data"});
                languageSwitcherService.addLocalizationObject({unLocalized: data.unLocalizedData, callBack: translateData, key: "testService.data"})
                return service.data;
            });
            waitForResourcesService.pendingResources.push(ret);
            waitForResourcesService.startWaiting();
            return ret;
        }

        /*refresh data with translations without page reload or translate filter

        function getData() {
            var url = 'http://localhost:3003/tests/6';
            return server.getNoStorage(url, true).then(function(data){
                //do any additional data parsing/mapping/precalculating here before caching or exposing to the rest of the app by assigning to service.data
                dataCacheSessionStorage.put(url, data.data);
                service.data = i18nService.translate(data.data);
                languageSwitcherService.localizationPairs.push({unLocalized: data.data, callBack: translateData});
                return service.data;
            });
        }
        function translateData(localizedData) {
            service.data = localizedData;
        }
        */
    }

})();