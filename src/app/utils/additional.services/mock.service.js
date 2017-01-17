


(function () {
    'use strict';

    angular
        .module('evolution.utils')
        .service('mockService', mockService);

    mockService.$inject = ['$httpBackend', 'mockBackend'];

    /* @ngInject */
    function mockService($httpBackend, mockBackend) {
        var service = this;
        service.init = init;

        function init() {
            $httpBackend.whenGET(/(app|styles|scripts|assets|fonts).*/).passThrough();

            //Note will need to setup a version of this for each webservice call
            $httpBackend.whenGET(/evolutionws\/tests\/.*/).respond(function (method, url, data, headers) {
                //var message = angular.fromJson(data);
                var urlParams = url.split('/');
                urlParams.shift();//get rid of the first element in the array as it is just the web service endpoint
                //urlParams[0] holds the name of the webservice we are trying to call
                //urlParams[>= 1] holds route params passed to our service

                var mockData = mockBackend[urlParams[0]][urlParams[1]];
                //messages.data.push(message);
                //You should consider having the back-end being responsible for creating new id tho!
                //messages.index[message.id] = message;
                console.log('mockData: ', mockData);
                return [200, mockData, {/*headers*/}];
            });

        }
    }
})();

