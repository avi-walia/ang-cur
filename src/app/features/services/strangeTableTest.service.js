(function () {
    'use strict';

    angular
        .module('evolution.features.strangeTableTest')
        .service('strangeTableTestService', strangeTableTestService);

    strangeTableTestService.$inject = [
        'languageSwitcherService',
        'server',
        'waitForResourcesService',
        'strangeTableFormatterService'
    ];

    /* @ngInject */
    function strangeTableTestService(languageSwitcherService, server, waitForResourcesService, strangeTableFormatterService) {
        var service = this;
        service.data = {};
        service.callCount = 0;
        service.getData = getData;


        function getData(url) {
            var ret = server.getNoStorage(url, false).then(function(data){
                format(data.data);
                service.data = data.data;
                //service.data = strangeTableFormatterService.formatSearchKeys(data.data, ['profileName','clientName']);
                //console.log('formatted Data: ', service.data);
                //languageSwitcherService.localizationObjects.push({unLocalized: data.unLocalizedData, callBack: translateData, key: "testService.data"});
                languageSwitcherService.addLocalizationObject({unLocalized: data.unLocalizedData, callBack: translateData, key: "testService_data"})
                return service.data;
            });
            waitForResourcesService.pendingResources.push(ret);
            waitForResourcesService.startWaiting();
            return ret;
        }
        function format(profileGroups) {
            _.forEach(profileGroups, function(profileGroup) {
                profileGroup.subGroups = profileGroup.profileSummaries;
                delete profileGroup.profileSummaries;
            });
        }

        function translateData(translatedData) {
            //service.data = translatedData;
            format(translatedData);
            _.assign(service.data, translatedData);
        }
    }

})();