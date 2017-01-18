(function () {
    'use strict';

    angular
        .module('evolution.features.test')
        .service('testService', testService);

    testService.$inject = [
        'languageSwitcherService',
        'server',
        'waitForResourcesService'
    ];

    /* @ngInject */
    function testService(languageSwitcherService, server, waitForResourcesService) {
        var service = this;
        service.data = {};
        service.callCount = 0;
        service.getData = getData;


        function getData(url) {
            var ret = server.getNoStorage(url, false).then(function(data){
                service.data = data.data;
                service.data = format(data.data)
                //languageSwitcherService.localizationObjects.push({unLocalized: data.unLocalizedData, callBack: translateData, key: "testService.data"});
                languageSwitcherService.addLocalizationObject({unLocalized: data.unLocalizedData, callBack: translateData, key: "testService_data"})
                return service.data;
            });
            waitForResourcesService.pendingResources.push(ret);
            waitForResourcesService.startWaiting();
            return ret;
        }

        function translateData(translatedData) {
            //service.data = translatedData;
            translatedData = format(translatedData);
            _.assign(service.data, translatedData);
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