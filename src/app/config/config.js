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
.constant("version", "0.0.3");
 
})();