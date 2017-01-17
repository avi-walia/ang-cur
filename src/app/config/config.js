(function () { 
  'use strict'; 
return angular.module("evolution")
.constant("APP_CONFIG", {})
.constant("COPYRIGHT_YEAR", 2016)
.constant("APP_NAME", "Evolution")
.constant("ELEMENTS_PER_PAGE", 12)
.constant("ENVIRONMENT_CONFIG_PATH", "/locator/environment-config.json")
.constant("SERVER_TIMEOUT", 15000)
.constant("EXPIRY_TIME", 86400000)
.constant("ROUTES", [{"stateName":"main","isAbstract":true,"pageName":""},{"stateName":"main.evolution","isAbstract":true,"pageName":""},{"stateName":"main.evolution.test","isAbstract":false,"pageName":"test"},{"stateName":"main.evolution.abstract","isAbstract":true,"pageName":"testAbstract"},{"stateName":"main.evolution.abstract.test4","isAbstract":false,"pageName":"test4"}])
.constant("mockBackend", {"tests":[{"id":1,"nameEN":"Mo","nameFR":"FR Mo","testFR":{"jon":"snowFR"},"testEN":{"jon":"snowEN"},"test2":{"asdfFR":"FR ASDF","asdfEN":"ASDF"}},{"id":2,"nameEN":"Vanessa","nameFR":"FR Vanessa","testFR":{"jon":"snowFR"},"testEN":{"jon":"snowEN"},"test2":{"asdfFR":"FR ASDF","asdfEN":"ASDF"}},{"id":3,"nameEN":"Dziana","nameFR":"FR Dziana","testFR":{"jon":"snowFR"},"testEN":{"jon":"snowEN"},"test2":{"asdfFR":"FR ASDF","asdfEN":"ASDF"}},{"id":4,"nameEN":"Mo2","nameFR":"FR Mo2","testFR":{"jon":"snowFR"},"testEN":{"jon":"snowEN"},"test2":{"asdfFR":"FR ASDF","asdfEN":"ASDF"}},{"id":5,"nameEN":"Avi","nameFR":"FR Avi","testFR":{"jon":"snowFR"},"testEN":{"jon":"snowEN"},"test2":{"asdfFR":"FR ASDF","asdfEN":"ASDF"}},{"id":6,"nameEN":"Michael","nameFR":"FR Michael","testFR":{"jon":"snowFR"},"testEN":{"jon":"snowEN"},"test2":{"asdfFR":"FR ASDF","asdfEN":"ASDF"}}]})
.constant("version", "0.0.3(local)");
 
})();