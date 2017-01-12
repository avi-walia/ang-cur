(function () {
    'use strict';

    angular
        .module('evolution.core.server')
        .service('server', server)
        .constant('GET', 'get')
        .constant('POST', 'post');

    server.$inject = [
        '$http',
        '$q',
        '$rootScope',
        '$timeout',
        'dataCacheLocalStorage',
        'dataCacheSessionStorage',
        'ENDPOINT_URI',
        'GET',
        'i18nService',
        'md5',
        'POST',
        'SERVER_TIMEOUT'
    ];

    /* @ngInject */
    function server(
        $http,
        $q,
        $rootScope,
        $timeout,
        dataCacheLocalStorage,
        dataCacheSessionStorage,
        ENDPOINT_URI,
        GET,
        i18nService,
        md5,
        POST,
        SERVER_TIMEOUT
    ) {
console.log('GET: ', GET);
        var service = this;
        //get and post arrays should be arrays of objects of type:
        /*
            {
               path: (string) url to resource
               request: promise
        */

        var activeRequests = {
            'post': [],
            'get': []
        };

        /**
         * GET call, no caching involved.
         *
         * @param sPath string Relative URL specifying the destination of the request.
         */
        //service.get = get;
        service.getLocalStorage = getLocalStorage;
        service.getSessionStorage = getSessionStorage;
        service.getNoStorage = getNoStorage;

        service.postLocalStorage = postLocalStorage;
        service.postSessionStorage = postSessionStorage;
        service.postNoStorage = postNoStorage;


        /**
         * POST call used for authorization, no caching involved.
         *
         * @param state string The state requested in ui-router.
         * @returns {*} promise holding a boolean
         */
        /*
        service.ping = function (sState) {
            return post('/authentication/pageCheck',
                {
                    currentPage: pageStateResolver.check(sState)
                }, true, null)
                .then(function (response) {
                        // no data is being sent
                        return response.status === 204;
                    },
                    function () {
                        pageStateResolver.pageLoading = false;
                    }
                );


        };
        */

        function fetchFromServer(method, sPath, deferred, sStorageType, bIsUnlocalized, data) {
            //currently only support methods get and post.
            var requests = activeRequests[method];
            var pathKey = sPath;

            function success(response) {
                //remove request from array of unresolved requests.
                removeFromActiveRequests(pathKey, requests);

                // check for no data being sent
                if (response && response.status !== 204) {
                    // put data in cache if it is not an empty array
                    if (sStorageType === 'sessionStorage') {
                        dataCacheSessionStorage.put(sPath, response);
                    } else if (sStorageType === 'localStorage') {
                        dataCacheLocalStorage.put(sPath, response);
                    }
                    //response = bIsUnlocalized ? response : filterLangResponse(response);
                    deferred.resolve(bIsUnlocalized ? response : filterLangResponse(response));
                    return;
                }
                $rootScope.$emit('noData');
                deferred.reject('noData');
            }


            function failure(error) {
                console.log('server error: ', error);
                //remove request from array of unresolved requests.
                removeFromActiveRequests(pathKey, requests);
                //if the server is capable of returning different errors, do not emit an event and reject with error object instead of 'noData'
                $rootScope.$emit('noData');
                deferred.reject('noData');

            }

            function checkActiveRequests(sPath, requests, makeRequest, method) {
                var index = indexOfActiveRequests(sPath, requests);
                if (index < 0) {

                    activeRequests[method].push({path: sPath.substring(ENDPOINT_URI.length, sPath), request: makeRequest()});
                } else {
                    return requests[index].request;
                }
            }


            if (method === GET) {
                requests = activeRequests.get;

                var getRequest = function() {
                    return $http.get(sPath, {timeout: SERVER_TIMEOUT})//15 seconds, timeout is measured in milliseconds.
                        .then(success, failure);
                };

                return checkActiveRequests(pathKey, requests, getRequest, GET);

            } else {//post requests
                pathKey = sPath;
                if (!_.isEmpty(data)) {
                    pathKey += md5.createHash(JSON.stringify(data));
                } else {
                    data = {};
                }
                requests = activeRequests.post;
                var postRequest = function() {
                    return $http.post(sPath, data, {timeout: SERVER_TIMEOUT})//15 seconds, timeout is measured in milliseconds.
                        .then(success, failure);
                };

                return checkActiveRequests(sPath, requests, postRequest, POST);


            }
            //methodFunc(sPath, {timeout: SERVER_TIMEOUT})//15 seconds, timeout is measured in milliseconds.
            //    .then(success, failure);
        }

        //---------------- implementation starts here ---------------- //


        function getLocalStorage(sPath, bIsUnlocalized) {
            return fetch(GET, sPath, false, 'localStorage', bIsUnlocalized);
        }

        function getNoStorage(sPath, bIsUnlocalized) {
            //return fetch(GET, sPath, false, 'noStorage', bIsUnlocalized);
            //these $timeouts were added to test asynchronous loading, remove before pushing to prod
            var deferred = $q.defer();

            fetch(GET, sPath, false, 'noStorage', bIsUnlocalized)
                .then(function(data) {
                    $timeout(function() {
                        deferred.resolve(data);
                    },800);
                },
                function(data) {
                    $timeout(function() {
                        deferred.reject(data);
                    },800);
                });
            return deferred.promise;
        }

        /**
         * GET call, caches to sessionStorage.
         *
         * @param sPath string Relative URL specifying the destination of the request.
         * @param bIsUnlocalized boolean Specifies if the request is locallized(requires translation)
         */
        function getSessionStorage(sPath, bIsUnlocalized) {
            return fetch(GET, sPath, false, 'sessionStorage', bIsUnlocalized);
        }

        function fetch(method, sPath, bRemoveCache, sStorageType, bIsUnlocalized) {
            sPath = ENDPOINT_URI + sPath;
            var deferred = $q.defer();
            var cachedObj;
            if (typeof bRemoveCache === 'undefined' && typeof sStorageType === 'undefined' && typeof bIsUnlocalized === 'undefined') {
                bRemoveCache = false;
                sStorageType = 'localStorage';
                bIsUnlocalized = false;
            }

            // force re-cache the call
            if (bRemoveCache) {
                // clean cache record using the key
                dataCacheSessionStorage.remove(sPath);
            }
            // if the key is not in cache then cachedObj is undefined
            if (sStorageType === 'sessionStorage') {
                cachedObj = dataCacheSessionStorage.get(sPath);
            } else if (sStorageType === 'localStorage') {
                cachedObj = dataCacheLocalStorage.get(sPath);
            }

            if (_.isObject(cachedObj)) {
                //cachedObj = bIsUnlocalized ? cachedObj : filterLangResponse(cachedObj);
                deferred.resolve(bIsUnlocalized ? cachedObj : filterLangResponse(cachedObj));

            } else {
                fetchFromServer(method, sPath, deferred, sStorageType, bIsUnlocalized);

            }

            // return a promise with data back
            return deferred.promise;
        }

        function removeFromActiveRequests(fullPath, requests) {
            var path = fullPath.substring(ENDPOINT_URI.length, fullPath.length);
            var index = indexOfActiveRequests(path, requests);
            if (index >= 0) {
                requests.splice(index, 1);
            }
        }

        function indexOfActiveRequests(path, requests) {
            var index = -1;//activePosts.indexOf(path);
            _.forEach(requests, function(value, key){
                if (value.path === path) {
                    index = key;
                    return false;
                }
            });
            return index;
        }


        function postLocalStorage(sPath, bIsUnlocalized) {
            return fetch(POST, sPath, false, 'localStorage', bIsUnlocalized);
        }

        function postSessionStorage(sPath, bIsUnlocalized) {
            return fetch(POST, sPath, false, 'sessionStorage', bIsUnlocalized);
        }

        function postNoStorage(sPath, bIsUnlocalized) {
            return fetch(POST, sPath, false, 'noStorage', bIsUnlocalized);
        }
/*
        function post(path, data, removeCache, storageType, isUnlocalized) {
            var deferred = $q.defer();
            var cacheKey = path;
            var cachedObj;
            // console.log('post path: ', path);
            // console.log('post data: ', data);
            // console.log('active posts: ', activePosts);
            // console.log('activePosts.indexOf(path): ', activePosts.indexOf(path));

            // force re-cache the call
            if (removeCache) {
                // clean cache record using the key
                dataCacheSessionStorage.remove(cacheKey);
            }

            // if the key is not in cache then cachedObj is undefined
            if (storageType === 'sessionStorage') {
                cachedObj = dataCacheSessionStorage.get(cacheKey);
            }
            if (storageType === 'localStorage') {
                cachedObj = dataCacheLocalStorage.get(cacheKey);
            }

            if (_.isObject(cachedObj)) {
                cachedObj = isUnlocalized ? cachedObj : filterLangResponse(cachedObj);
                deferred.resolve(cachedObj);

            } else {
                var index = indexOfActivePosts(path);
                if (index < 0) {
                    activePosts.push({'path': path, 'promise': deferred.promise});
                    $http.post(ENDPOINT_URI + path, data)
                        .then(function (response) {
                            removeFromActivePosts(response.config.url);
                            // console.log('post response: ', response);
                            // check for no data being sent
                            if (response.status !== 204) {
                                // put data in cache
                                if (storageType === 'sessionStorage') {
                                    dataCacheSessionStorage.put(cacheKey, response);
                                }
                                if (storageType === 'localStorage') {
                                    dataCacheLocalStorage.put(cacheKey, response);
                                }
                                response = isUnlocalized ? response : filterLangResponse(response);
                            }
                            deferred.resolve(response);
                        })
                        // set the error, in case some promise handlers need to deal with it
                        .then(null, function (error) {
                            // console.log('post error: ', error);
                            removeFromActivePosts(error.config.url);
                            deferred.reject(error);
                        });
                } else {
                    //deferred.reject();
                    //return deferred.promise;
                    return activePosts[index].promise;
                }
            }

            // return a promise with data back
            return deferred.promise;

        }
*/
        /**
         * Returns a response where data has only the current language fields. The
         * rest are filtered out.
         * @param response - response, which contains data property
         * @returns {*} mutated response
         */
        function filterLangResponse(response) {
            var unLocalizedData = angular.copy(response.data);
            response.unLocalizedData = unLocalizedData;
            if ('data' in response) {
                response.data = i18nService.filterLocalizedKeys(response.data);
            }
            return response;
        }


    }

})();