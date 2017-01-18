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
.constant("ROUTES", [{"stateName":"main.evolution.selectClientProfile","isAbstract":false,"pageName":"selectClientProfile","nextPageName":"main.evolution.clientAccountInfo","previousPageName":"","stepIndicator":0},{"stateName":"main.evolution.clientAccountInfo","isAbstract":false,"pageName":"clientAccountInfo","nextPageName":"main.evolution.ipq","previousPageName":"main.evolution.selectClientProfile","stepIndicator":1},{"stateName":"main.evolution.ipq","isAbstract":false,"pageName":"ipq","stepIndicator":2},{"stateName":"main.evolution.portfolioSelection","isAbstract":false,"pageName":"ipq","stepIndicator":2},{"stateName":"main.evolution.fundCustomization","isAbstract":false,"pageName":"ipq","stepIndicator":2},{"stateName":"main.evolution.advisorInfo","isAbstract":false,"pageName":"ipq","stepIndicator":2},{"stateName":"main.evolution.profileSummary","isAbstract":false,"pageName":"ipq","stepIndicator":2},{"stateName":"main.evolution.reports","isAbstract":false,"pageName":"ipq","stepIndicator":2},{"stateName":"main.evolution.split","isAbstract":false,"pageName":"ipq","stepIndicator":2},{"stateName":"main.evolution.fee.profileSearch","isAbstract":false,"pageName":"profileSearch","nextPageName":"main.evolution.fee.contactInfo","previousPageName":"","stepIndicator":0},{"stateName":"main.evolution.fee.contactInfo","isAbstract":false,"pageName":"profileSearch","nextPageName":"main.evolution.fee.investmentOverview","previousPageName":"main.evolution.fee.profileSearch"},{"stateName":"main","isAbstract":true,"pageName":""},{"stateName":"main.evolution","isAbstract":true,"pageName":""},{"stateName":"main.evolution.test","isAbstract":false,"pageName":"test"},{"stateName":"main.evolution.abstract","isAbstract":true,"pageName":"testAbstract"},{"stateName":"main.evolution.abstract.test4","isAbstract":false,"pageName":"test4"}])
.constant("version", "0.0.3(local)");
 
})();