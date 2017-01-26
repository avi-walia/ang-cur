(function () {
    'use strict';

    angular
        .module('evolution.core.main')
        .service('initDataService', initDataService);

    initDataService.$inject = [
        'languageSwitcherService',
        'server',
        'waitForResourcesService'
    ];

    /* @ngInject */
    function initDataService(languageSwitcherService, server, waitForResourcesService) {
        var service = this;
        service.getData = getData;
        var url = '/getInitData';
        function getData() {
            var ret = server.getSessionStorage(url, false).then(function(data){
                //service.data = data.data;

                //_.assignIn(service, [data.data]);
                Object.assign(service, data.data);
                languageSwitcherService.addLocalizationObject({unLocalized: data.unLocalizedData, callBack: translateData, key: "strangeTableTestService_data"})
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