function cacheTester(customCacheFactory, testKey, factoryKey, cf, testData, isLocalStorage) {
    //Should be able to put stuff in cache.
    customCacheFactory.put(testKey, testData);
    expect(customCacheFactory.get(testKey)).toEqual(testData);
    //Should be able to modify cache
    testData.is = 'a stark';
    customCacheFactory.put(testKey, testData);
    expect(customCacheFactory.get(testKey)).toEqual(testData);
    //Should be able to delete a part of the cached value
    delete testData.is;
    customCacheFactory.put(testKey, testData);
    expect(customCacheFactory.get(testKey)).toEqual(testData);

    //check that a proper cache object was created with the key defined in dataCacheSessionStorage factory
    expect(cf['$$id']).toEqual(factoryKey);

    //make sure the cache can be deleted.
    customCacheFactory.remove(testKey);
    expect(customCacheFactory.get(testKey)).toEqual(undefined);

    //locale storage is now a wrapper for the default cache factory. Since it is no longer a cache factory, we shouldn't check that it is one.
    if (!isLocalStorage) {
        //expect that accessing the cache through the factory should be the same as accessing it through CacheFactory
        expect(cf).toEqual(customCacheFactory);
    }

    //expect that we should get an error when trying to retrieve a destroyed cache.
    customCacheFactory.destroy();
    /*
    expect(function () {
        customCacheFactory.get(testKey)
    }).toThrow(new TypeError("Cannot use 'in' operator to search for 'testKey' in null"));
    */
    expect(function () {
        customCacheFactory.get(testKey);
    }).toThrow(new TypeError("Cannot read property 'value' of undefined"));
};

function getCompiledElement(rawHtml, scope, compile){
    var element = angular.element(rawHtml);
    var compiledElement = compile(element)(scope);
    scope.$digest();
    return compiledElement;
}

// This is the equivalent of the old waitsFor/runs syntax
// which was removed from Jasmine 2
function waitsForAndRuns(escapeFunction, runFunction, escapeTime) {
    // check the escapeFunction every millisecond so as soon as it is met we can escape the function
    var interval = setInterval(function() {
        if (escapeFunction()) {
            clearMe();
            runFunction();
        }
    }, 1);

    // in case we never reach the escapeFunction, we will time out
    // at the escapeTime
    var timeOut = setTimeout(function() {
        clearMe();
        runFunction();
    }, escapeTime);

    // clear the interval and the timeout
    function clearMe(){
        clearInterval(interval);
        clearTimeout(timeOut);
    }
};