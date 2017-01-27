(function () {
    'use strict';

    angular
        .module('evolution.features.fundCustomization')
        .service('fundCustomizationService', fundCustomizationService);

    fundCustomizationService.$inject = ['languageSwitcherService', 'server', 'waitForResourcesService'];

    /* @ngInject */
    function fundCustomizationService(languageSwitcherService, server, waitForResourcesService) {
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

