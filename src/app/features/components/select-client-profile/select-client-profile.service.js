(function () {
    'use strict';

    angular
        .module('evolution.features.selectClientProfile')
        .service('selectClientProfileService', selectClientProfileService);

    selectClientProfileService.$inject = ['languageSwitcherService', 'server', 'waitForResourcesService'];

    /* @ngInject */
    function selectClientProfileService(languageSwitcherService, server, waitForResourcesService) {
        var service = this;
        service.data = {};
        service.getData = getData;

        ////////////////

        function getData(url) {
            var ret = server.getNoStorage(url, false).then(function(data){
                service.data = data.data;
                // service.data = format(data.data)
                //languageSwitcherService.localizationObjects.push({unLocalized: data.unLocalizedData, callBack: translateData, key: 'testService.data'});
                languageSwitcherService.addLocalizationObject({unLocalized: data.unLocalizedData,
                    callBack: translateData, key: 'testService_data'});
                return service.data;
            });
            waitForResourcesService.pendingResources.push(ret);
            waitForResourcesService.startWaiting();
            return ret;
        }

        function translateData(translatedData) {
            _.assign(service.data, translatedData);
        }
    }

})();

