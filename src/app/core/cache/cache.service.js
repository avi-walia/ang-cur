/**
 * Cache service.
 * File includes: WebIDs cache service, Auth cache service, User cache service, Data Cache Session storage,
 * Data Cache Local storage, App Permissions cache service and Notifications cache service.
 */
(function () {
    'use strict';
    var STORAGE_PREFIX = 'advLocator';
    angular
        .module('evolution.core.cache')
        .factory('dataCacheSessionStorage', dataCacheSessionStorage)
        .factory('dataCacheLocalStorage', dataCacheLocalStorage)
        .factory('notificationsCacheService', notificationsCacheService);

    dataCacheSessionStorage.$inject = ['APP_NAME', 'CacheFactory'];
    dataCacheLocalStorage.$inject = ['APP_NAME', 'CacheFactory', 'EXPIRY_TIME'];//EXPIRY_TIME is how long an item can be stored in localstorage before it expires.
    notificationsCacheService.$inject = ['APP_NAME', 'CacheFactory'];//should session storage also have an expiration time?

    /* @ngInject */
    function dataCacheSessionStorage(APP_NAME, CacheFactory){
        var dataCache = CacheFactory.get('TempAppData');
        if (!dataCache) {
            dataCache = CacheFactory.createCache('TempAppData', {
                storagePrefix: APP_NAME,
                storageMode: 'sessionStorage'
            });
        }
        return dataCache;
    }
    function dataCacheLocalStorage(APP_NAME, CacheFactory, EXPIRY_TIME){
        var dataCache = CacheFactory.get('PermAppData');
        if (!dataCache) {
            dataCache = CacheFactory.createCache('PermAppData', {
                storagePrefix: APP_NAME,
                storageMode: 'localStorage'
            });
        }

        function timeCapsule(data, expiryDate) {
            return  {
                data: data,
                expiryTime: expiryDate
            };
        }

        function put(path, data, noExpiration) {
            var expiryTime = (new Date()).getTime() + EXPIRY_TIME;
            if (!noExpiration) {
                dataCache.put(path, timeCapsule(data, expiryTime));
            } else {
                dataCache.put(path, data);
            }
        }
        function get(path) {
            var data = dataCache.get(path);
            if (data && data.hasOwnProperty('expiryTime') && data.expiryTime > (new Date()).getTime()) {
                return data.data;
            } else {
                //If data has expired return undefined
                return undefined;
            }
            //no expiry flag was set, return the data
            return data;
        }
        function remove2(key) {
            dataCache.remove(key);
        }
        function removeAll2() {
            dataCache.removeAll();
        }
        function destroy() {
            dataCache.destroy();
        }

        var localCache = {
            'get': get,
            'put': put,
            'remove': remove2,
            'removeAll': removeAll2,
            'destroy': destroy
        };
        return localCache;
    }
    function notificationsCacheService(APP_NAME, CacheFactory) {
        var appErrors = CacheFactory.get('TempAppNotifications');
        if (!appErrors) {
            appErrors = CacheFactory.createCache('TempAppNotifications', {
                storagePrefix: APP_NAME,
                storageMode: 'sessionStorage'
            });
        }
        return appErrors;
    }

})();

