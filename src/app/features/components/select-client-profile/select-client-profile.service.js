(function () {
    'use strict';

    angular
        .module('evolution.features.selectClientProfile')
        .service('selectClientProfileService', selectClientProfileService);

    selectClientProfileService.$inject = ['languageSwitcherService', 'server', 'waitForResourcesService', 'dataCacheSessionStorage', '$state', '$window'];

    /* @ngInject */
    function selectClientProfileService(languageSwitcherService, server, waitForResourcesService, dataCacheSessionStorage, $state, $window) {
        var service = this;
        service.data = {};
        service.init = init;
        service.goToFeeProposal = goToFeeProposal;
        var initialized = false;

        ////////////////
        /*
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
        */
        function goToFeeProposal() {
            //dataCacheLocalStorage.put('fundList', data);
            dataCacheSessionStorage.put('startingFeeProposal', true);
            //temporarily commented out because this runs when we sort Client Names in FP > Profile search
            // $window.open(
            //     $state.href('main.evolution.fee.profileSearch'),
            //     '_blank'
            // );
        }

        function init() {
            if (!initialized) {
                initialized = true;
                var ret = server.getNoStorage('/init', false).then(function(data) {
                    dataCacheSessionStorage.put('initData', data.data);
                    service.data = data.data;
                    console.log('data.data: ', data.data);
                    languageSwitcherService.addLocalizationObject({
                        unLocalized: data.unLocalizedData,
                        callBack: translateData, key: 'testService_data'}
                    );
                    return service.data;
                }, function(error) {
                    console.log('err: ', error);
                    }
                
                );
                waitForResourcesService.pendingResources.push(ret);
                waitForResourcesService.startWaiting();
                return ret;
            }
        }

        function translateData(translatedData) {
            _.assign(service.data, translatedData);
        }
    }

})();

