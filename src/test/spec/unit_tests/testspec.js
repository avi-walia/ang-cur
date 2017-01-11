var footerHtml = '<p class="copyright" translate="copyright" translate-value-year="{{::( $ctrl.year )}}"></p><span class="logo" title="{{ \'navbar.logo-text\' | translate }}" translate></span>';
var searchByHtml = '<select style="margin-top:25px;" ng-model="$ctrl.searchBy" ng-change="$ctrl.navigate($ctrl.searchBy)"><option value="name" translate>{{"search.byName" | translate }}</option> <option value="location" translate>search.byLocation</option> </select>';
var localeEn = {
    "appTitle": "App Title",
    "searchButton": "Search",
    "search": {
        "byName": "Search By: Advisor Name",
        "byLocation": "Search By: Location"
    },
    "searchResultsFound": "Search results found.",
    "noSearchCriteria": "There are no search results to be displayed.",
    "pages": {
        "page1": "Page 1 Title",
        "page2": "Page 2 Title",
        "page3": "Page 3 Title",
        "page4": "Page 4 Title",
        "page5": "Page 5 Title",
        "advisorList": "Search for Advisor"
    },
    "helpLabel": "Help",

    "navbar": {
        "EN": "English",
        "FR": "Français",
        "logo-img": "logos.svg",
        "browse-happy": "You are using an <strong>outdated</strong> browser. Please <a href='http://browsehappy.com/'>upgrade your browser</a> to improve your experience.",
        "dismiss-message": "Dismiss message",
        "logo-text": "Advisor Locator"
    },

    "universal" : {
        "font-size": "Font size:",
        "font-size-normal": "Change application font size to normal.",
        "font-size-large": "Change application font size to large.",
        "font-size-largest": "Change application font size to largest."
    },
    "footer": {
        "linkText1": "Link 1",
        "linkText2": "Link 2",
        "linkText3": "Link 3",
        "linkText4": "Link 4",
        "link1": "https://www.google.ca/",
        "link2": "https://www.yahoo.ca/",
        "link3": "https://www.ci.com/",
        "link4": "https://www.assanteservices.com/aiol/#/en/aio/landing/"
    },
    "homeFooterLink": "NameOfMyNewSite.com",
    "copyright": "©{{ year }} {{ 'company' | translate}}",
    "company": "Name of Company",
    "companyLink": "https://www.assante.com",
    "notifications": {
        "http-errors": {
            "E409001": "<em class=\"material-icons\">error</em>Invalid advisor id",
            "E409002": "<em class=\"material-icons\">error</em>Invalid branch id",
            "core-generic-failure": "<em class=\"material-icons\">error</em>There is an issue on our side."
        },
        "fe-messages": {
            "cancel": "<em class=\"material-icons\">error</em>Canceled.",
            "refresh": "<em class=\"material-icons\">error</em>Refreshing the page has resulted in any unsaved information being lost."

        }
    },
    "branchList":{
        "title": "Branch List",
        "autoComplete": "Somewhere in Canada:",
        "placeholder": "Enter a location",
        "linkToMap": "Get direction on a map",
        "currentLocation": "Current+Location"
    }
};


describe('example test', function() {
    it('should be true', function() {
        expect('foo').toBe('foo');
    });
});

(function () {
    describe('dataCacheSessionStorage', function () {
        var customCacheFactory;
        var cacheFactory;
        beforeEach(function() {
            module('advisorLocator.utils');
            module('advisorLocator.core.server');
            module('angular-cache');
            inject(['$injector', 'CacheFactory', function($injector, $CacheFactory){
                cacheFactory = $injector.get('CacheFactory');
                customCacheFactory = $injector.get('dataCacheSessionStorage');
            }]);
        });

        it('Session storage should store stuff', function() {
            var testKey = 'testKey';
            var factoryKey = 'TempAppData';
            var cf = cacheFactory.get(factoryKey);
            var testData = {jon:'snow'};

            cacheTester(customCacheFactory, testKey, factoryKey, cf, testData);
        });

    });
})();

(function () {
    describe('dataCacheLocalStorage', function () {
        var customCacheFactory;
        var cacheFactory;
        beforeEach(function() {
            module('advisorLocator.utils');
            module('advisorLocator.core.server');
            module('angular-cache');
            inject(['$injector', 'CacheFactory', function($injector, $CacheFactory){
                cacheFactory = $injector.get('CacheFactory');
                customCacheFactory = $injector.get('dataCacheLocalStorage');
            }]);
        });
        it('Session storage should store stuff', function() {
            var testKey = 'testKey';
            var factoryKey = 'PermAppData';
            var cf = cacheFactory.get(factoryKey);
            var testData = {jon:'snow'};


            cacheTester(customCacheFactory, testKey, factoryKey, cf, testData, true);
        });

    });
})();

(function () {
    describe('notificationsCacheService', function () {
        var customCacheFactory;
        var cacheFactory;
        beforeEach(function() {
            module('advisorLocator.utils');
            module('advisorLocator.core.server');
            module('angular-cache');
            inject(['$injector', 'CacheFactory', function($injector, $CacheFactory){
                cacheFactory = $injector.get('CacheFactory');
                customCacheFactory = $injector.get('notificationsCacheService');
            }]);
        });
        it('Session storage should store stuff', function() {
            var testKey = 'testKey';//some key for an item you want to store in the factory's cache
            var factoryKey = 'TempAppNotifications';//the key the factory uses to store data
            var cf = cacheFactory.get(factoryKey);
            var testData = {jon:'snow'};


            cacheTester(customCacheFactory, testKey, factoryKey, cf, testData);
        });

    });
})();


(function () {
    describe('footer Component', function () {
        var customCacheFactory;
        var controller;
        var translate;
        var copyrightYear;
        var $compile;
        var $rootScope;
        var $httpBackend
        beforeEach(function() {
            module('ui.router');
            module('pascalprecht.translate');
            module('advisorLocator.core.main');
            module('advisorLocator');
            inject(['$injector', '$controller', '$translate', 'copyrightYear', '$compile', '$rootScope', '$httpBackend', function($injector, $controller, $translate, _copyrightYear_, _$compile_, _$rootScope_, _$httpBackend_){
                controller = $controller;
                translate = $translate;
                copyrightYear = _copyrightYear_;
                $compile = _$compile_
                $rootScope = _$rootScope_;
                $httpBackend = _$httpBackend_;
                $httpBackend.when('GET', 'assets/locales/locale-en.json').respond(localeEn);
                $httpBackend.when('GET', 'app/core/components/footer/footer.tpl.html').respond(footerHtml);
                $httpBackend.when('GET', 'app/core/layout/main.layout.html').respond('test');
            }]);
        });
        it('Footer controller should do stuff', function() {
            var $scope = {};
            var element = $compile('<ci-footer id="footer"></ci-footer>')($rootScope);
            $httpBackend.flush();
            $rootScope.$digest();
            var now = new Date();
            expect(element.html()).toContain(now.getFullYear().toString());
        });

    });
})();
(function () {
    describe('footer Component', function () {
        var customCacheFactory;
        var controller;
        var translate;
        var copyrightYear;
        var $compile;
        var $rootScope;
        var $httpBackend
        beforeEach(function() {
            module('ui.router');
            module('pascalprecht.translate');
            module('advisorLocator.core.main');
            module('advisorLocator');
            inject(['$injector', '$controller', '$translate', 'copyrightYear', '$compile', '$rootScope', '$httpBackend', function($injector, $controller, $translate, _copyrightYear_, _$compile_, _$rootScope_, _$httpBackend_){
                controller = $controller;
                translate = $translate;
                copyrightYear = _copyrightYear_;
                $compile = _$compile_
                $rootScope = _$rootScope_;
                $httpBackend = _$httpBackend_;
                $httpBackend.when('GET', 'assets/locales/locale-en.json').respond(localeEn);
                $httpBackend.when('GET', 'app/core/components/footer/footer.tpl.html').respond(footerHtml);
                $httpBackend.when('GET', 'app/core/layout/main.layout.html').respond('test');
            }]);
        });
        it('Footer controller should do stuff', function() {
            var $scope = {};
            var element = $compile('<ci-footer id="footer"></ci-footer>')($rootScope);
            $httpBackend.flush();
            $rootScope.$digest();
            var now = new Date();
            expect(element.html()).toContain(now.getFullYear().toString());
        });

    });
})();


(function () {
    describe('searchBy Component', function () {
        var customCacheFactory;
        var controller;
        var translate;
        var copyrightYear;
        var $compile;
        var $rootScope;
        var $httpBackend;
        var $state;
        beforeEach(function() {
            module('pascalprecht.translate');
            module('advisorLocator.utils');
            module('advisorLocator');
            inject(['$injector', '$controller', '$translate', 'copyrightYear', '$compile', '$rootScope', '$httpBackend', '$state', function($injector, $controller, $translate, _copyrightYear_, _$compile_, _$rootScope_, _$httpBackend_, _$state_){
                controller = $controller;
                translate = $translate;
                copyrightYear = _copyrightYear_;
                $compile = _$compile_;
                $rootScope = _$rootScope_;
                $httpBackend = _$httpBackend_;
                $httpBackend.when('GET', 'assets/locales/locale-en.json').respond(localeEn);
                $httpBackend.when('GET', 'app/features/components/searchBy/searchBy.tpl.html').respond(searchByHtml);
                $httpBackend.when('GET', 'app/core/layout/main.layout.html').respond('test');
                $state = _$state_;
            }]);
        });
        it('searchBy should do stuff', function() {
            var $scope = {};
            $state.current.url = '/advisors';
            var element = $compile('<search-by service="$ctrl.service"></search-by>')($rootScope);
            $httpBackend.flush();
            $rootScope.$digest();
            //console.log('$rootScope.$$childHead["$ctrl"]: ', $rootScope.$$childHead['$ctrl']);
            var searchByCtrl = $rootScope.$$childHead['$ctrl'];
            expect(searchByCtrl.searchBy).toEqual('name');
            spyOn($state, 'go');
            searchByCtrl.navigate('location');
            expect($state.go).toHaveBeenCalledWith('main.advisorLocator.branchList');
            searchByCtrl.navigate('name');
            expect($state.go).toHaveBeenCalledWith('main.advisorLocator.advisorList');

        });

    });
})();
(function () {
    describe('advisor Service', function () {
        var advisorService;
        var server;
        var $rootScope;
        beforeEach(function() {


            module('advisorLocator.features.searchByName');

            angular.module('advisorLocator.utils');
            module('advisorLocator');
            module('advisorLocator.core.server');
            serverMock = {
                get: jasmine.createSpy('get() mock')
            };

            inject(['$injector', 'advisorService', 'server', '$q', '$rootScope', '$httpBackend', function($injector, _advisorService_, _server_, $q, _$rootScope_, _$httpBackend_){
                $httpBackend = _$httpBackend_;
                $httpBackend.when('GET', 'assets/locales/locale-en.json').respond(localeEn);
                $httpBackend.when('GET', 'app/core/layout/main.layout.html').respond('test');
                //advisorService = $injector.get('advisorService');
                advisorService = _advisorService_;
                server = _server_;
                $rootScope = _$rootScope_;
                //server.get = jasmine.createSpy('get spy');
                spyOn(server, 'get').and.callFake(function() {
                    var deferred = $q.defer();
                    deferred.resolve({data: advisors});
                    return deferred.promise;
                });

                spyOn(advisorService, 'init').and.callThrough();

            }]);
        });
        it('advisorService should do stuff', function() {
            //spyOn(server, 'get');
            advisorService.init();

            var BASE_URL = 'http://localhost:3000';
            var ENDPOINT_URI = '/advisorlocatorws';
            expect(advisorService.isLoading).toEqual(true);
            expect(advisorService.numPerPage).toEqual(50);
            $rootScope.$apply();//this is needed for the async $q to resolve
            expect(server.get).toHaveBeenCalledWith(BASE_URL + ENDPOINT_URI + '/advisors', false, 'localStorage', false);
            expect(server.init).toHaveBeenCalled;
            expect(advisorService.searchResults).toEqual([]);
            expect(advisorService.isLoading).toEqual(false);
            advisorService.search('Ye');
            expect(advisorService.searchTerm).toEqual('Ye');
            var advisorsWithYeByLastName = [
                {"id":35383,"firstName":"Janaye","commonName":null,"lastName":"Chubb","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5700,"dealerShip":"AFM","geoLocation":{"lng":-108.2988,"lat":52.77904,"_persistence_fetchGroup":null},"address1":"1421 - 100th Street","address2":null,"city":"North Battleford","provinceAbbr":"SK","postalCode":"S9A 0W1","phone":"306-445-9455","tollFree":null,"fax":"306-445-4966","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":36268,"firstName":"Perry","commonName":null,"lastName":"Loyello","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5843,"dealerShip":"ACM","geoLocation":{"lng":-73.78454,"lat":45.48395,"_persistence_fetchGroup":null},"address1":"2020 Transcanadienne","address2":"Suite 200","city":"Dorval","provinceAbbr":"QC","postalCode":"H9P 2N4","phone":"514-832-5100","tollFree":null,"fax":"514-832-5232","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":35680,"firstName":"Michelle","commonName":null,"lastName":"Pilgrim-Byers","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"705-325-7743","email":"mpilgrim@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/mpilgrim/","partialBranchInfo":{"id":5497,"dealerShip":"ACM","geoLocation":{"lng":-79.42835,"lat":44.61826,"_persistence_fetchGroup":null},"address1":"384 West Street North","address2":"Suite 1","city":"Orillia","provinceAbbr":"ON","postalCode":"L3V 5E6","phone":"705-325-7743","tollFree":null,"fax":"705-325-5761","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":34979,"firstName":"Ian","commonName":null,"lastName":"Yeo","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"604-685-2214","email":"IYeo@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/iyeo","partialBranchInfo":{"id":5411,"dealerShip":"ACM","geoLocation":{"lng":-123.115952,"lat":49.285248,"_persistence_fetchGroup":null},"address1":"800 West Pender Street","address2":"Suite 1600","city":"Vancouver","provinceAbbr":"BC","postalCode":"V6C 2V6","phone":"604-685-2214","tollFree":null,"fax":"604-602-0211","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":31096,"firstName":"Kendall","commonName":null,"lastName":"Yeomans","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"kyeomans@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/kyeomans","partialBranchInfo":{"id":5265,"dealerShip":"ACM","geoLocation":{"lng":-80.93607,"lat":46.50878,"_persistence_fetchGroup":null},"address1":"363 Falconbridge Road","address2":"Unit 2","city":"Sudbury","provinceAbbr":"ON","postalCode":"P3A 5K5","phone":"705-521-1444","tollFree":null,"fax":"705-521-1450","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":30719,"firstName":"Michele","commonName":null,"lastName":"Yergens","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"myergens@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5075,"dealerShip":"ACM","geoLocation":{"lng":-102.99876,"lat":49.14201,"_persistence_fetchGroup":null},"address1":"1330-4th Street","address2":"Unit #1","city":"Estevan","provinceAbbr":"SK","postalCode":"S4A 0X2","phone":"306-634-9008","tollFree":null,"fax":"306-634-8099","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":34179,"firstName":"Teresa","commonName":null,"lastName":"Yeung","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"416-490-9944","email":"tyeung@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/tyeung","partialBranchInfo":{"id":5862,"dealerShip":"AFM","geoLocation":{"lng":-79.36599,"lat":43.85091,"_persistence_fetchGroup":null},"address1":"15 Allstate Parkway","address2":"Suite 600","city":"Markham","provinceAbbr":"ON","postalCode":"L3R 5B4","phone":"416-490-9944  E","tollFree":" ","fax":"888-454-4811","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false}
            ];


            var sortOptions = [
                'firstname',
                'lastname',
                'city',
                'province'
            ];

            expect(advisorService.sortableColumns).toEqual(sortOptions);


            expect(advisorService.searchResults).toEqual(advisorsWithYeByLastName);
            //console.log('advisorService.maxPages: ', advisorService.maxPages);
            expect(advisorService.maxPages).toEqual(1);
            expect(advisorService.mobileMaxNumDisplay).toEqual(50);
            advisorService.sortBy(sortOptions[1]);
            expect(advisorService.searchResults).toEqual(advisorsWithYeByLastName.reverse());
            var advisorsWithYeByFirstName = [
                {"id":34979,"firstName":"Ian","commonName":null,"lastName":"Yeo","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"604-685-2214","email":"IYeo@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/iyeo","partialBranchInfo":{"id":5411,"dealerShip":"ACM","geoLocation":{"lng":-123.115952,"lat":49.285248,"_persistence_fetchGroup":null},"address1":"800 West Pender Street","address2":"Suite 1600","city":"Vancouver","provinceAbbr":"BC","postalCode":"V6C 2V6","phone":"604-685-2214","tollFree":null,"fax":"604-602-0211","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":35383,"firstName":"Janaye","commonName":null,"lastName":"Chubb","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5700,"dealerShip":"AFM","geoLocation":{"lng":-108.2988,"lat":52.77904,"_persistence_fetchGroup":null},"address1":"1421 - 100th Street","address2":null,"city":"North Battleford","provinceAbbr":"SK","postalCode":"S9A 0W1","phone":"306-445-9455","tollFree":null,"fax":"306-445-4966","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":31096,"firstName":"Kendall","commonName":null,"lastName":"Yeomans","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"kyeomans@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/kyeomans","partialBranchInfo":{"id":5265,"dealerShip":"ACM","geoLocation":{"lng":-80.93607,"lat":46.50878,"_persistence_fetchGroup":null},"address1":"363 Falconbridge Road","address2":"Unit 2","city":"Sudbury","provinceAbbr":"ON","postalCode":"P3A 5K5","phone":"705-521-1444","tollFree":null,"fax":"705-521-1450","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":30719,"firstName":"Michele","commonName":null,"lastName":"Yergens","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"myergens@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5075,"dealerShip":"ACM","geoLocation":{"lng":-102.99876,"lat":49.14201,"_persistence_fetchGroup":null},"address1":"1330-4th Street","address2":"Unit #1","city":"Estevan","provinceAbbr":"SK","postalCode":"S4A 0X2","phone":"306-634-9008","tollFree":null,"fax":"306-634-8099","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":35680,"firstName":"Michelle","commonName":null,"lastName":"Pilgrim-Byers","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"705-325-7743","email":"mpilgrim@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/mpilgrim/","partialBranchInfo":{"id":5497,"dealerShip":"ACM","geoLocation":{"lng":-79.42835,"lat":44.61826,"_persistence_fetchGroup":null},"address1":"384 West Street North","address2":"Suite 1","city":"Orillia","provinceAbbr":"ON","postalCode":"L3V 5E6","phone":"705-325-7743","tollFree":null,"fax":"705-325-5761","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},

                {"id":36268,"firstName":"Perry","commonName":null,"lastName":"Loyello","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5843,"dealerShip":"ACM","geoLocation":{"lng":-73.78454,"lat":45.48395,"_persistence_fetchGroup":null},"address1":"2020 Transcanadienne","address2":"Suite 200","city":"Dorval","provinceAbbr":"QC","postalCode":"H9P 2N4","phone":"514-832-5100","tollFree":null,"fax":"514-832-5232","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":34179,"firstName":"Teresa","commonName":null,"lastName":"Yeung","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"416-490-9944","email":"tyeung@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/tyeung","partialBranchInfo":{"id":5862,"dealerShip":"AFM","geoLocation":{"lng":-79.36599,"lat":43.85091,"_persistence_fetchGroup":null},"address1":"15 Allstate Parkway","address2":"Suite 600","city":"Markham","provinceAbbr":"ON","postalCode":"L3R 5B4","phone":"416-490-9944  E","tollFree":" ","fax":"888-454-4811","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false}
            ];

            advisorService.sortBy(sortOptions[0]);
            expect(advisorService.searchResults).toEqual(advisorsWithYeByFirstName);

            advisorService.sortBy(sortOptions[0]);
            expect(advisorService.searchResults).toEqual(advisorsWithYeByFirstName.reverse());

            var advisorsWithYeByCity = [
                {"id":36268,"firstName":"Perry","commonName":null,"lastName":"Loyello","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5843,"dealerShip":"ACM","geoLocation":{"lng":-73.78454,"lat":45.48395,"_persistence_fetchGroup":null},"address1":"2020 Transcanadienne","address2":"Suite 200","city":"Dorval","provinceAbbr":"QC","postalCode":"H9P 2N4","phone":"514-832-5100","tollFree":null,"fax":"514-832-5232","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":30719,"firstName":"Michele","commonName":null,"lastName":"Yergens","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"myergens@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5075,"dealerShip":"ACM","geoLocation":{"lng":-102.99876,"lat":49.14201,"_persistence_fetchGroup":null},"address1":"1330-4th Street","address2":"Unit #1","city":"Estevan","provinceAbbr":"SK","postalCode":"S4A 0X2","phone":"306-634-9008","tollFree":null,"fax":"306-634-8099","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":34179,"firstName":"Teresa","commonName":null,"lastName":"Yeung","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"416-490-9944","email":"tyeung@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/tyeung","partialBranchInfo":{"id":5862,"dealerShip":"AFM","geoLocation":{"lng":-79.36599,"lat":43.85091,"_persistence_fetchGroup":null},"address1":"15 Allstate Parkway","address2":"Suite 600","city":"Markham","provinceAbbr":"ON","postalCode":"L3R 5B4","phone":"416-490-9944  E","tollFree":" ","fax":"888-454-4811","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":35383,"firstName":"Janaye","commonName":null,"lastName":"Chubb","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5700,"dealerShip":"AFM","geoLocation":{"lng":-108.2988,"lat":52.77904,"_persistence_fetchGroup":null},"address1":"1421 - 100th Street","address2":null,"city":"North Battleford","provinceAbbr":"SK","postalCode":"S9A 0W1","phone":"306-445-9455","tollFree":null,"fax":"306-445-4966","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":35680,"firstName":"Michelle","commonName":null,"lastName":"Pilgrim-Byers","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"705-325-7743","email":"mpilgrim@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/mpilgrim/","partialBranchInfo":{"id":5497,"dealerShip":"ACM","geoLocation":{"lng":-79.42835,"lat":44.61826,"_persistence_fetchGroup":null},"address1":"384 West Street North","address2":"Suite 1","city":"Orillia","provinceAbbr":"ON","postalCode":"L3V 5E6","phone":"705-325-7743","tollFree":null,"fax":"705-325-5761","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":31096,"firstName":"Kendall","commonName":null,"lastName":"Yeomans","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"kyeomans@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/kyeomans","partialBranchInfo":{"id":5265,"dealerShip":"ACM","geoLocation":{"lng":-80.93607,"lat":46.50878,"_persistence_fetchGroup":null},"address1":"363 Falconbridge Road","address2":"Unit 2","city":"Sudbury","provinceAbbr":"ON","postalCode":"P3A 5K5","phone":"705-521-1444","tollFree":null,"fax":"705-521-1450","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":34979,"firstName":"Ian","commonName":null,"lastName":"Yeo","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"604-685-2214","email":"IYeo@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/iyeo","partialBranchInfo":{"id":5411,"dealerShip":"ACM","geoLocation":{"lng":-123.115952,"lat":49.285248,"_persistence_fetchGroup":null},"address1":"800 West Pender Street","address2":"Suite 1600","city":"Vancouver","provinceAbbr":"BC","postalCode":"V6C 2V6","phone":"604-685-2214","tollFree":null,"fax":"604-602-0211","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
            ];
            advisorService.sortBy(sortOptions[2]);
            expect(advisorService.searchResults).toEqual(advisorsWithYeByCity);
            advisorService.sortBy(sortOptions[2]);
            expect(advisorService.searchResults).toEqual(advisorsWithYeByCity.reverse());

            advisorService.sortBy(sortOptions[0]);
            expect(advisorService.searchResults).toEqual(advisorsWithYeByFirstName.reverse());



            var advisorsWithYeByProvince = [
                {"id":34979,"firstName":"Ian","commonName":null,"lastName":"Yeo","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"604-685-2214","email":"IYeo@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/iyeo","partialBranchInfo":{"id":5411,"dealerShip":"ACM","geoLocation":{"lng":-123.115952,"lat":49.285248,"_persistence_fetchGroup":null},"address1":"800 West Pender Street","address2":"Suite 1600","city":"Vancouver","provinceAbbr":"BC","postalCode":"V6C 2V6","phone":"604-685-2214","tollFree":null,"fax":"604-602-0211","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":34179,"firstName":"Teresa","commonName":null,"lastName":"Yeung","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"416-490-9944","email":"tyeung@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/tyeung","partialBranchInfo":{"id":5862,"dealerShip":"AFM","geoLocation":{"lng":-79.36599,"lat":43.85091,"_persistence_fetchGroup":null},"address1":"15 Allstate Parkway","address2":"Suite 600","city":"Markham","provinceAbbr":"ON","postalCode":"L3R 5B4","phone":"416-490-9944  E","tollFree":" ","fax":"888-454-4811","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":35680,"firstName":"Michelle","commonName":null,"lastName":"Pilgrim-Byers","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"705-325-7743","email":"mpilgrim@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/mpilgrim/","partialBranchInfo":{"id":5497,"dealerShip":"ACM","geoLocation":{"lng":-79.42835,"lat":44.61826,"_persistence_fetchGroup":null},"address1":"384 West Street North","address2":"Suite 1","city":"Orillia","provinceAbbr":"ON","postalCode":"L3V 5E6","phone":"705-325-7743","tollFree":null,"fax":"705-325-5761","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":31096,"firstName":"Kendall","commonName":null,"lastName":"Yeomans","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"kyeomans@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/kyeomans","partialBranchInfo":{"id":5265,"dealerShip":"ACM","geoLocation":{"lng":-80.93607,"lat":46.50878,"_persistence_fetchGroup":null},"address1":"363 Falconbridge Road","address2":"Unit 2","city":"Sudbury","provinceAbbr":"ON","postalCode":"P3A 5K5","phone":"705-521-1444","tollFree":null,"fax":"705-521-1450","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":36268,"firstName":"Perry","commonName":null,"lastName":"Loyello","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5843,"dealerShip":"ACM","geoLocation":{"lng":-73.78454,"lat":45.48395,"_persistence_fetchGroup":null},"address1":"2020 Transcanadienne","address2":"Suite 200","city":"Dorval","provinceAbbr":"QC","postalCode":"H9P 2N4","phone":"514-832-5100","tollFree":null,"fax":"514-832-5232","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":30719,"firstName":"Michele","commonName":null,"lastName":"Yergens","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"myergens@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5075,"dealerShip":"ACM","geoLocation":{"lng":-102.99876,"lat":49.14201,"_persistence_fetchGroup":null},"address1":"1330-4th Street","address2":"Unit #1","city":"Estevan","provinceAbbr":"SK","postalCode":"S4A 0X2","phone":"306-634-9008","tollFree":null,"fax":"306-634-8099","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":35383,"firstName":"Janaye","commonName":null,"lastName":"Chubb","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5700,"dealerShip":"AFM","geoLocation":{"lng":-108.2988,"lat":52.77904,"_persistence_fetchGroup":null},"address1":"1421 - 100th Street","address2":null,"city":"North Battleford","provinceAbbr":"SK","postalCode":"S9A 0W1","phone":"306-445-9455","tollFree":null,"fax":"306-445-4966","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false}

            ];
            advisorService.sortBy(sortOptions[3]);
            expect(advisorService.searchResults).toEqual(advisorsWithYeByProvince);
            advisorService.sortBy(sortOptions[3]);
            expect(advisorService.searchResults).toEqual(advisorsWithYeByProvince.reverse());


            advisorService.sortBy(sortOptions[0]);
            expect(advisorService.searchResults).toEqual(advisorsWithYeByFirstName);

            advisorService.sortBy(sortOptions[3]);
            expect(advisorService.searchResults).toEqual(advisorsWithYeByProvince.reverse());


            advisorService.sortBy(sortOptions[0]);
            expect(advisorService.searchResults).toEqual(advisorsWithYeByFirstName);

            advisorService.sortBy(sortOptions[1]);
            expect(advisorService.searchResults).toEqual(advisorsWithYeByLastName.reverse());

            advisorService.sortBy(sortOptions[3]);
            expect(advisorService.searchResults).toEqual(advisorsWithYeByProvince);


            advisorService.sortBy(sortOptions[0]);
            expect(advisorService.searchResults).toEqual(advisorsWithYeByFirstName);

            advisorService.sortBy(sortOptions[1]);
            expect(advisorService.searchResults).toEqual(advisorsWithYeByLastName);

            advisorService.sortBy(sortOptions[2]);
            expect(advisorService.searchResults).toEqual(advisorsWithYeByCity.reverse());

            advisorService.sortBy(sortOptions[3]);
            expect(advisorService.searchResults).toEqual(advisorsWithYeByProvince);

            advisorService.sortBy(sortOptions[1]);
            expect(advisorService.searchResults).toEqual(advisorsWithYeByLastName);

            advisorService.sortBy(sortOptions[0]);
            expect(advisorService.searchResults).toEqual(advisorsWithYeByFirstName);


            advisorService.sortBy(sortOptions[2]);
            expect(advisorService.searchResults).toEqual(advisorsWithYeByCity);

            advisorService.sortBy(sortOptions[3]);
            expect(advisorService.searchResults).toEqual(advisorsWithYeByProvince);

            /*
            advisorService.sortBy(sortOptions[3]);
            expect(advisorService.searchResults).toEqual(advisorsWithYeByProvince.reverse());
*/

            advisorService.search('TeSt');
            expect(advisorService.searchTerm).toEqual('TeSt');
            var advisorsWithTest = [
                {"id":33186,"firstName":"Test","commonName":null,"lastName":"Advisor99","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"416-2527777  ext. 999","email":"tadvisor99@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/tadvisor99/","partialBranchInfo":{"id":5074,"dealerShip":"AFM","geoLocation":{"lng":-135.05425,"lat":60.72251,"_persistence_fetchGroup":null},"address1":"3147 3rd Avenue","address2":null,"city":"Whitehorse","provinceAbbr":"YK","postalCode":"Y1A 1E9","phone":"867-667-6100","tollFree":null,"fax":"867-668-7843","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":33630,"firstName":"Test","commonName":null,"lastName":"Assistant99","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5074,"dealerShip":"AFM","geoLocation":{"lng":-135.05425,"lat":60.72251,"_persistence_fetchGroup":null},"address1":"3147 3rd Avenue","address2":null,"city":"Whitehorse","provinceAbbr":"YK","postalCode":"Y1A 1E9","phone":"867-667-6100","tollFree":null,"fax":"867-668-7843","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false}
            ];
            expect(advisorService.searchResults).toEqual(advisorsWithTest);
            expect(advisorService.maxPages).toEqual(1);
            expect(advisorService.mobileMaxNumDisplay).toEqual(50);

            advisorService.search('mi');
            expect(advisorService.searchTerm).toEqual('mi');
            var advisorsWithMi = [
                {"id":30721,"firstName":"Michael","commonName":"Mike","lastName":"Andrews","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"519-438-0338","email":"mandrews@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/mandrews","partialBranchInfo":{"id":5141,"dealerShip":"ACM","geoLocation":{"lng":-81.24213,"lat":42.98852,"_persistence_fetchGroup":null},"address1":"371 Dufferin Avenue","address2":null,"city":"London","provinceAbbr":"ON","postalCode":"N6B 1Z5","phone":"519-438-0338","tollFree":"1-800-547-9669","fax":"519-438-5901","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":true},
                {"id":31691,"firstName":"James","commonName":"Jim","lastName":"Armit","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"jarmit@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5410,"dealerShip":"AFM","geoLocation":{"lng":-123.115952,"lat":49.285248,"_persistence_fetchGroup":null},"address1":"800 West Pender Street","address2":"Suite 1600","city":"Vancouver","provinceAbbr":"BC","postalCode":"V6C 2V6","phone":"604-484-2070","tollFree":null,"fax":"604-685-9815","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":true},
                {"id":35733,"firstName":"Michel","commonName":null,"lastName":"Baril","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"819-771-2196","email":"mbaril@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5825,"dealerShip":"AFM","geoLocation":{"lng":-75.73465,"lat":45.44374,"_persistence_fetchGroup":null},"address1":"500 - 15 Rue Gamelin","address2":null,"city":"Gatineau","provinceAbbr":"QC","postalCode":"J8Y 6N5","phone":"819-771-2196","tollFree":null,"fax":"819-771-2197","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":31539,"firstName":"Michael","commonName":"Mike","lastName":"Berton","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"mberton@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/mberton","partialBranchInfo":{"id":5473,"dealerShip":"AFM","geoLocation":{"lng":-123.11774,"lat":49.282141,"_persistence_fetchGroup":null},"address1":"Assante Vancouver Centre","address2":"650 West Georgia St 8 Fl, Box 11588","city":"Vancouver","provinceAbbr":"BC","postalCode":"V6B 4N8","phone":"604-687-7526","tollFree":null,"fax":"604-682-8124","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":true},
                {"id":31600,"firstName":"Benjamin","commonName":"Ben","lastName":"Cairns","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"bcairns@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5148,"dealerShip":"AFM","geoLocation":{"lng":-80.47965,"lat":43.47433,"_persistence_fetchGroup":null},"address1":"487 Riverbend Drive","address2":"2nd Floor","city":"Kitchener","provinceAbbr":"ON","postalCode":"N2K 3S3","phone":"519-578-4494","tollFree":null,"fax":"519-578-1786","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":34623,"firstName":"Allan","commonName":"Michael","lastName":"Chersey","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5679,"dealerShip":"AFM","geoLocation":{"lng":-79.36515,"lat":43.84637,"_persistence_fetchGroup":null},"address1":"600 Cochrane Dr.","address2":"Suite 110","city":"Markham","provinceAbbr":"ON","postalCode":"L3R 5K3","phone":"905-415-0455","tollFree":null,"fax":"905-415-0744","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":true},
                {"id":30964,"firstName":"Michael","commonName":"Mike","lastName":"Connon","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"mconnon@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5475,"dealerShip":"ACM","geoLocation":{"lng":-79.42487,"lat":43.81799,"_persistence_fetchGroup":null},"address1":"7787 Yonge Street","address2":null,"city":"Thornhill","provinceAbbr":"ON","postalCode":"L3T 7L2","phone":"905-771-5200","tollFree":null,"fax":"905-771-5255","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":true},
                {"id":34996,"firstName":"Christien","commonName":null,"lastName":"Cormier","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"204-942-1169","email":"ChCormier@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://assante.com/advisors/jcormier/","partialBranchInfo":{"id":5698,"dealerShip":"AFM","geoLocation":{"lng":-97.183112,"lat":49.839674,"_persistence_fetchGroup":null},"address1":"59 Lindenwood Drive W","address2":null,"city":"Winnipeg","provinceAbbr":"MB","postalCode":"R3P 1K9","phone":"204-488-3392","tollFree":null,"fax":"204-488-3341","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":32998,"firstName":"Darren","commonName":null,"lastName":"Cormier","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5282,"dealerShip":"ACM","geoLocation":{"lng":-52.79345,"lat":47.50776,"_persistence_fetchGroup":null},"address1":"197 Commonwealth Ave.","address2":null,"city":"Mount Pearl","provinceAbbr":"NF","postalCode":"A1N 4L3","phone":"709-576-1785","tollFree":null,"fax":"709-576-1815","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":30833,"firstName":"Dean","commonName":null,"lastName":"Cormier","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"709-5761785  ext. 1868","email":"dcormier@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/dcormier","partialBranchInfo":{"id":5282,"dealerShip":"ACM","geoLocation":{"lng":-52.79345,"lat":47.50776,"_persistence_fetchGroup":null},"address1":"197 Commonwealth Ave.","address2":null,"city":"Mount Pearl","provinceAbbr":"NF","postalCode":"A1N 4L3","phone":"709-576-1785","tollFree":null,"fax":"709-576-1815","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":33222,"firstName":"Julien","commonName":null,"lastName":"Cormier","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"204-488-3392","email":"jcormier@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/jcormier","partialBranchInfo":{"id":5698,"dealerShip":"AFM","geoLocation":{"lng":-97.183112,"lat":49.839674,"_persistence_fetchGroup":null},"address1":"59 Lindenwood Drive W","address2":null,"city":"Winnipeg","provinceAbbr":"MB","postalCode":"R3P 1K9","phone":"204-488-3392","tollFree":null,"fax":"204-488-3341","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":30998,"firstName":"Matthew","commonName":"Kyle","lastName":"Cumming","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"604-532-8622","email":"kcumming@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/kcumming","partialBranchInfo":{"id":5516,"dealerShip":"ACM","geoLocation":{"lng":-122.67517,"lat":49.12305,"_persistence_fetchGroup":null},"address1":"6632 - 197th Street","address2":null,"city":"Langley","provinceAbbr":"BC","postalCode":"V2Y 1A8","phone":"604-532-8622","tollFree":null,"fax":"604-602-0211","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":true},
                {"id":35701,"firstName":"Dominic","commonName":null,"lastName":"Denicourt","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"450-923-0722","email":"ddenicourt@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/ddenicourt","partialBranchInfo":{"id":5743,"dealerShip":"AFM","geoLocation":{"lng":-73.44082,"lat":45.45525,"_persistence_fetchGroup":null},"address1":"4605 B Boul. Lapiniere","address2":"Suite 260","city":"Brossard","provinceAbbr":"QC","postalCode":"J4Z 3T5","phone":"450-923-0722","tollFree":null,"fax":"450-923-2252","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":30959,"firstName":"Michael","commonName":null,"lastName":"Deveau","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"mdeveau@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5864,"dealerShip":"ACM","geoLocation":{"lng":-63.28784,"lat":45.36497,"_persistence_fetchGroup":null},"address1":"18 Willow Street","address2":"Suite 201B","city":"Truro","provinceAbbr":"NS","postalCode":"B2N 4Z4","phone":"902-895-3080  E","tollFree":" ","fax":"902-895-5958","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":31011,"firstName":"Michael","commonName":null,"lastName":"Deverill","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"416-4942300  ext. 254","email":"mdeverill@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/mdeverill","partialBranchInfo":{"id":5272,"dealerShip":"ACM","geoLocation":{"lng":-79.36578,"lat":43.77145,"_persistence_fetchGroup":null},"address1":"1210 Sheppard Ave E","address2":"Suite 307","city":"Toronto","provinceAbbr":"ON","postalCode":"M2K 1E3","phone":"416-494-2300","tollFree":"1-877-494-7744","fax":"416-494-3030","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":31090,"firstName":"James","commonName":"Jamie","lastName":"Geisler","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"jgeisler@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/ijenner","partialBranchInfo":{"id":5242,"dealerShip":"ACM","geoLocation":{"lng":-79.36579,"lat":46.09012,"_persistence_fetchGroup":null},"address1":"535 Main Street","address2":"Box 162","city":"Powassan","provinceAbbr":"ON","postalCode":"P0H 1Z0","phone":"705-724-2400","tollFree":null,"fax":"705-724-1988","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":true},
                {"id":31851,"firstName":"Michael","commonName":null,"lastName":"Hadford","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"403-543-6985","email":"mhadford@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/mhadford","partialBranchInfo":{"id":5465,"dealerShip":"AFM","geoLocation":{"lng":-114.08121,"lat":51.04159,"_persistence_fetchGroup":null},"address1":"Petrowest Plaza","address2":"210 - 1210 8th Street SW","city":"Calgary","provinceAbbr":"AB","postalCode":"T2R 1L3","phone":"403-543-6985","tollFree":null,"fax":"403-543-6987","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":35046,"firstName":"Michael","commonName":null,"lastName":"Holland","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"705-325-7743","email":"MHolland@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/mholland","partialBranchInfo":{"id":5497,"dealerShip":"ACM","geoLocation":{"lng":-79.42835,"lat":44.61826,"_persistence_fetchGroup":null},"address1":"384 West Street North","address2":"Suite 1","city":"Orillia","provinceAbbr":"ON","postalCode":"L3V 5E6","phone":"705-325-7743","tollFree":null,"fax":"705-325-5761","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":30921,"firstName":"Benjamin","commonName":"Chris","lastName":"Horan","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"416-216-6532","email":"choran@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/choran","partialBranchInfo":{"id":5183,"dealerShip":"ACM","geoLocation":{"lng":-79.38405,"lat":43.649283,"_persistence_fetchGroup":null},"address1":"130 Adelaide Street West","address2":"Suite 3401","city":"Toronto","provinceAbbr":"ON","postalCode":"M5H 3P5","phone":"416-216-6500","tollFree":null,"fax":"416-216-6512","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":31229,"firstName":"Michael","commonName":"Mike","lastName":"Hutsal","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"mhutsal@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5098,"dealerShip":"AFM","geoLocation":{"lng":-97.17681,"lat":49.85156,"_persistence_fetchGroup":null},"address1":"1345 Taylor Avenue","address2":"2nd Floor","city":"Winnipeg","provinceAbbr":"MB","postalCode":"R3M 3Y9","phone":"204-942-1169","tollFree":"1-800-296-8060","fax":"204-943-1561","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":true},
                {"id":31032,"firstName":"Michael","commonName":"Mick","lastName":"Jackson","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"mjackson@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/mjackson","partialBranchInfo":{"id":5814,"dealerShip":"ACM","geoLocation":{"lng":-82.40182,"lat":42.99523,"_persistence_fetchGroup":null},"address1":"137 Kendall St","address2":null,"city":"Sarnia","provinceAbbr":"ON","postalCode":"N7V 4G6","phone":"519-332-4100","tollFree":null,"fax":"519-332-4670","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":true},
                {"id":30926,"firstName":"Scott","commonName":null,"lastName":"Jamieson","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"sjamieson@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/sjamieson","partialBranchInfo":{"id":5376,"dealerShip":"ACM","geoLocation":{"lng":-79.64706,"lat":43.58337,"_persistence_fetchGroup":null},"address1":"350 Burnhamthorpe Road West","address2":"Suite 218","city":"Mississauga","provinceAbbr":"ON","postalCode":"L5B 3J1","phone":"905-272-2750","tollFree":"1-800-265-4658","fax":"905-272-9252","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":31214,"firstName":"John","commonName":"Michael","lastName":"Kup","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"mkup@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5226,"dealerShip":"AFM","geoLocation":{"lng":-79.64706,"lat":43.58337,"_persistence_fetchGroup":null},"address1":"350 Burnhamthorpe Road West","address2":"Suite 218","city":"Mississauga","provinceAbbr":"ON","postalCode":"L5B 3J1","phone":"905-273-6605","tollFree":null,"fax":"905-273-9260","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":true},
                {"id":34370,"firstName":"Joseph","commonName":"Mike","lastName":"Labadie","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"604-541-1941","email":"MLabadie@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/mlabadie","partialBranchInfo":{"id":5593,"dealerShip":"ACM","geoLocation":null,"address1":"250 - 2411 160th Street","address2":null,"city":"Surrey","provinceAbbr":"BC","postalCode":"V3Z 0C8","phone":"604-541-1941","tollFree":null,"fax":"604-283-9869","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":true},
                {"id":31244,"firstName":"Madhu","commonName":"Mike","lastName":"Lakhani","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"mlakhani@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":null,"partialBranchInfo":{"id":5226,"dealerShip":"AFM","geoLocation":{"lng":-79.64706,"lat":43.58337,"_persistence_fetchGroup":null},"address1":"350 Burnhamthorpe Road West","address2":"Suite 218","city":"Mississauga","provinceAbbr":"ON","postalCode":"L5B 3J1","phone":"905-273-6605","tollFree":null,"fax":"905-273-9260","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":true},
                {"id":32700,"firstName":"Michael","commonName":"Mike","lastName":"Langille","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"mlangille@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5783,"dealerShip":"AFM","geoLocation":{"lng":-63.59972,"lat":44.6618,"_persistence_fetchGroup":null},"address1":"5548 Kaye Street","address2":"Suite 201","city":"Halifax","provinceAbbr":"NS","postalCode":"B3K 1Y5","phone":"902-466-4234","tollFree":null,"fax":"902-464-0104","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":true},
                {"id":31221,"firstName":"Paul","commonName":null,"lastName":"Lermitte","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"plermitte@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://assante.com/advisors/legacyfamilyoffice/","partialBranchInfo":{"id":5473,"dealerShip":"AFM","geoLocation":{"lng":-123.11774,"lat":49.282141,"_persistence_fetchGroup":null},"address1":"Assante Vancouver Centre","address2":"650 West Georgia St 8 Fl, Box 11588","city":"Vancouver","provinceAbbr":"BC","postalCode":"V6B 4N8","phone":"604-687-7526","tollFree":null,"fax":"604-682-8124","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":30846,"firstName":"Waheed","commonName":"Mike","lastName":"Louli","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"mlouli@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5272,"dealerShip":"ACM","geoLocation":{"lng":-79.36578,"lat":43.77145,"_persistence_fetchGroup":null},"address1":"1210 Sheppard Ave E","address2":"Suite 307","city":"Toronto","provinceAbbr":"ON","postalCode":"M2K 1E3","phone":"416-494-2300","tollFree":"1-877-494-7744","fax":"416-494-3030","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":true},
                {"id":31686,"firstName":"Ian","commonName":null,"lastName":"Michayluk","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"250-752-0352","email":"imichayluk@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5032,"dealerShip":"AFM","geoLocation":{"lng":-124.44409,"lat":49.34795,"_persistence_fetchGroup":null},"address1":"200 West First Avenue","address2":"Suite #101","city":"Qualicum Beach","provinceAbbr":"BC","postalCode":"V9K 2J3","phone":"250-752-0352","tollFree":null,"fax":"250-594-0352","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":31005,"firstName":"Andre","commonName":null,"lastName":"Mickovitch","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"amickovitch@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/amickovitch","partialBranchInfo":{"id":5534,"dealerShip":"ACM","geoLocation":{"lng":-75.746794,"lat":45.380377,"_persistence_fetchGroup":null},"address1":"Churchill Office Park","address2":"1600 Carling Avenue, Ste. 550","city":"Ottawa","provinceAbbr":"ON","postalCode":"K1Z 1G3","phone":"613-729-3222","tollFree":null,"fax":"613-729-5568","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":34510,"firstName":"Aaron","commonName":null,"lastName":"Migie","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"204-977--8045","email":"amigie@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/amigie","partialBranchInfo":{"id":5491,"dealerShip":"ACM","geoLocation":{"lng":-97.17681,"lat":49.85156,"_persistence_fetchGroup":null},"address1":"1345 Taylor Avenue","address2":"Main Floor","city":"Winnipeg","provinceAbbr":"MB","postalCode":"R3M 3Y9","phone":"204-985-6060","tollFree":null,"fax":"204-452-6273","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":30969,"firstName":"Suzanne","commonName":null,"lastName":"Mignault","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"613-5678266  ext. 222","email":"smignault@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://assante.com/advisors/lrainville/","partialBranchInfo":{"id":5767,"dealerShip":"ACM","geoLocation":{"lng":-75.67704,"lat":45.42699,"_persistence_fetchGroup":null},"address1":"5 Blackburn Avenue","address2":"3rd Floor","city":"Ottawa","provinceAbbr":"ON","postalCode":"K1N 8A2","phone":"613-567-8266","tollFree":null,"fax":"613-567-8269","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":34071,"firstName":"Holly","commonName":null,"lastName":"Millar","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5385,"dealerShip":"ACM","geoLocation":{"lng":-123.11774,"lat":49.282141,"_persistence_fetchGroup":null},"address1":"Assante Vancouver Centre","address2":"650 West Georgia St 8 Fl, Box 11588","city":"Vancouver","provinceAbbr":"BC","postalCode":"V6B 4N8","phone":"604-678-3444","tollFree":null,"fax":"604-678-3361","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":31477,"firstName":"Paul","commonName":null,"lastName":"Milton","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"pmilton@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5098,"dealerShip":"AFM","geoLocation":{"lng":-97.17681,"lat":49.85156,"_persistence_fetchGroup":null},"address1":"1345 Taylor Avenue","address2":"2nd Floor","city":"Winnipeg","provinceAbbr":"MB","postalCode":"R3M 3Y9","phone":"204-942-1169","tollFree":"1-800-296-8060","fax":"204-943-1561","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":30916,"firstName":"Seong-Hee","commonName":"Jessica","lastName":"Min","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"jmin@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5272,"dealerShip":"ACM","geoLocation":{"lng":-79.36578,"lat":43.77145,"_persistence_fetchGroup":null},"address1":"1210 Sheppard Ave E","address2":"Suite 307","city":"Toronto","provinceAbbr":"ON","postalCode":"M2K 1E3","phone":"416-494-2300","tollFree":"1-877-494-7744","fax":"416-494-3030","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":true},
                {"id":31494,"firstName":"John","commonName":"Chris","lastName":"Minnema","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"cminnema@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":4935,"dealerShip":"AFM","geoLocation":{"lng":-114.06792,"lat":51.00154,"_persistence_fetchGroup":null},"address1":"222 - 58th Avenue SW","address2":"Suite 301","city":"Calgary","provinceAbbr":"AB","postalCode":"T2H 2S3","phone":"403-229-0541","tollFree":null,"fax":"403-228-2754","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":true},
                {"id":31234,"firstName":"Peter","commonName":null,"lastName":"Minnema","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"pminnema@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":null,"partialBranchInfo":{"id":4935,"dealerShip":"AFM","geoLocation":{"lng":-114.06792,"lat":51.00154,"_persistence_fetchGroup":null},"address1":"222 - 58th Avenue SW","address2":"Suite 301","city":"Calgary","provinceAbbr":"AB","postalCode":"T2H 2S3","phone":"403-229-0541","tollFree":null,"fax":"403-228-2754","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":32538,"firstName":"Douglas","commonName":null,"lastName":"Miske","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"905-4289911  ext. 215","email":"dmiske@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5185,"dealerShip":"ACM","geoLocation":{"lng":-78.9247,"lat":43.87386,"_persistence_fetchGroup":null},"address1":"1001 Burns Street East","address2":"Suite 1","city":"Whitby","provinceAbbr":"ON","postalCode":"L1N 6A6","phone":"905-428-9911","tollFree":null,"fax":"905-428-9922","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":30728,"firstName":"Harris","commonName":"Ross","lastName":"Mitton","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"rmitton@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5103,"dealerShip":"ACM","geoLocation":{"lng":-82.95286,"lat":42.30498,"_persistence_fetchGroup":null},"address1":"3295 Quality Way","address2":"Suite 303","city":"Windsor","provinceAbbr":"ON","postalCode":"N8T 3R9","phone":"519-966-5593","tollFree":null,"fax":"519-972-0111","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":true},
                {"id":31963,"firstName":"Michelle","commonName":null,"lastName":"Miziolek","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"mmiziolek@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5771,"dealerShip":"AFM","geoLocation":{"lng":-79.75985,"lat":43.3936,"_persistence_fetchGroup":null},"address1":"5420 North Service Road","address2":"Suite 100","city":"Burlington","provinceAbbr":"ON","postalCode":"L7L 6C7","phone":"905-335-1950","tollFree":null,"fax":"866-297-2147","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":31066,"firstName":"Michael","commonName":null,"lastName":"Morrisey","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"mmorrisey@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5159,"dealerShip":"ACM","geoLocation":{"lng":-79.901963,"lat":43.255495,"_persistence_fetchGroup":null},"address1":"175 Longwood Road South","address2":"Suite 400","city":"Hamilton","provinceAbbr":"ON","postalCode":"L8P 0A1","phone":"905-526-0485","tollFree":null,"fax":"905-526-8277","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":35479,"firstName":"Michael","commonName":"Mike","lastName":"Munro","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5615,"dealerShip":"AFM","geoLocation":{"lng":-114.05939,"lat":51.04317,"_persistence_fetchGroup":null},"address1":"221-10th Avenue SE","address2":"Suite 204","city":"Calgary","provinceAbbr":"AB","postalCode":"T2G 0V9","phone":"403-231-8619","tollFree":null,"fax":"403-231-8646","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":true},
                {"id":31298,"firstName":"Michael","commonName":"Mike","lastName":"Nicoletopoulos","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"mnicoletopoulos@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/mnicoletopoulos","partialBranchInfo":{"id":5328,"dealerShip":"ACM","geoLocation":{"lng":-63.59972,"lat":44.6618,"_persistence_fetchGroup":null},"address1":"5548 Kaye Street","address2":"Suite 201","city":"Halifax","provinceAbbr":"NS","postalCode":"B3K 1Y5","phone":"902-423-1200","tollFree":"1-888-305-7526","fax":"902-423-6550","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":true},
                {"id":31272,"firstName":"Eeva","commonName":null,"lastName":"Niemi","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"807-683--4588","email":"eniemi@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/eniemi","partialBranchInfo":{"id":5270,"dealerShip":"ACM","geoLocation":{"lng":-89.21966,"lat":48.43378,"_persistence_fetchGroup":null},"address1":"180 Park Avenue","address2":"Suite 301","city":"Thunder Bay","provinceAbbr":"ON","postalCode":"P7B 6J4","phone":"807-345-0200","tollFree":null,"fax":"807-345-6526","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":30811,"firstName":"Michael","commonName":null,"lastName":"Nuschke","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"mnuschke@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/mnuschke","partialBranchInfo":{"id":5328,"dealerShip":"ACM","geoLocation":{"lng":-63.59972,"lat":44.6618,"_persistence_fetchGroup":null},"address1":"5548 Kaye Street","address2":"Suite 201","city":"Halifax","provinceAbbr":"NS","postalCode":"B3K 1Y5","phone":"902-423-1200","tollFree":"1-888-305-7526","fax":"902-423-6550","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":35680,"firstName":"Michelle","commonName":null,"lastName":"Pilgrim-Byers","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"705-325-7743","email":"mpilgrim@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/mpilgrim/","partialBranchInfo":{"id":5497,"dealerShip":"ACM","geoLocation":{"lng":-79.42835,"lat":44.61826,"_persistence_fetchGroup":null},"address1":"384 West Street North","address2":"Suite 1","city":"Orillia","provinceAbbr":"ON","postalCode":"L3V 5E6","phone":"705-325-7743","tollFree":null,"fax":"705-325-5761","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":32667,"firstName":"Emily","commonName":null,"lastName":"Rae","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"902-423-1200","email":"erae@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/erae","partialBranchInfo":{"id":5328,"dealerShip":"ACM","geoLocation":{"lng":-63.59972,"lat":44.6618,"_persistence_fetchGroup":null},"address1":"5548 Kaye Street","address2":"Suite 201","city":"Halifax","provinceAbbr":"NS","postalCode":"B3K 1Y5","phone":"902-423-1200","tollFree":"1-888-305-7526","fax":"902-423-6550","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":36288,"firstName":"Michael","commonName":null,"lastName":"Roy","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5762,"dealerShip":"AFM","geoLocation":{"lng":-72.94822,"lat":45.62531,"_persistence_fetchGroup":null},"address1":"935 Avenue du Palais","address2":null,"city":"St-Hyacinthe","provinceAbbr":"QC","postalCode":"J2S 5C6","phone":"450-250-4757","tollFree":null,"fax":"450-774-1914","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":30908,"firstName":"Ronald","commonName":"Ron","lastName":"Schmidt","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"rschmidt@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/rschmidt","partialBranchInfo":{"id":4953,"dealerShip":"ACM","geoLocation":{"lng":-124.99894,"lat":49.69197,"_persistence_fetchGroup":null},"address1":"391 4th St","address2":"201","city":"Courtenay","provinceAbbr":"BC","postalCode":"V9N 1G8","phone":"250-334-8872","tollFree":null,"fax":"250-338-8534","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":true},
                {"id":31337,"firstName":"Edward","commonName":"Ed","lastName":"Smilar","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"780-944-2750","email":"esmilar@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":4965,"dealerShip":"AFM","geoLocation":{"lng":-113.44208,"lat":53.54114,"_persistence_fetchGroup":null},"address1":"7525 101 Avenue","address2":null,"city":"Edmonton","provinceAbbr":"AB","postalCode":"T6A 0J5","phone":"780-450-3311","tollFree":null,"fax":"780-463-1415","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":true},
                {"id":31765,"firstName":"Darryl","commonName":null,"lastName":"Smith","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"dsmith@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5328,"dealerShip":"ACM","geoLocation":{"lng":-63.59972,"lat":44.6618,"_persistence_fetchGroup":null},"address1":"5548 Kaye Street","address2":"Suite 201","city":"Halifax","provinceAbbr":"NS","postalCode":"B3K 1Y5","phone":"902-423-1200","tollFree":"1-888-305-7526","fax":"902-423-6550","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":36134,"firstName":"Jane","commonName":null,"lastName":"Smith","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5328,"dealerShip":"ACM","geoLocation":{"lng":-63.59972,"lat":44.6618,"_persistence_fetchGroup":null},"address1":"5548 Kaye Street","address2":"Suite 201","city":"Halifax","provinceAbbr":"NS","postalCode":"B3K 1Y5","phone":"902-423-1200","tollFree":"1-888-305-7526","fax":"902-423-6550","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":31070,"firstName":"Robert","commonName":"Robert J.M.","lastName":"Smith","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"robert.smith@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5159,"dealerShip":"ACM","geoLocation":{"lng":-79.901963,"lat":43.255495,"_persistence_fetchGroup":null},"address1":"175 Longwood Road South","address2":"Suite 400","city":"Hamilton","provinceAbbr":"ON","postalCode":"L8P 0A1","phone":"905-526-0485","tollFree":null,"fax":"905-526-8277","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":true},
                {"id":31185,"firstName":"Michel","commonName":null,"lastName":"St.-Georges","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"mstgeorges@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5526,"dealerShip":"ACM","geoLocation":{"lng":-73.67101,"lat":45.5218,"_persistence_fetchGroup":null},"address1":"795 Rue Muir","address2":"Suite 1005","city":"St. Laurent","provinceAbbr":"QC","postalCode":"H4L 5H8","phone":"514-748-7865","tollFree":null,"fax":"514-748-0047","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":35152,"firstName":"Michael","commonName":null,"lastName":"Taglieri","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"mtaglieri@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/mtaglieri","partialBranchInfo":{"id":5161,"dealerShip":"ACM","geoLocation":{"lng":-79.671502,"lat":43.534111,"_persistence_fetchGroup":null},"address1":"2145 Dunwin Drive","address2":"Suite 2","city":"Mississauga","provinceAbbr":"ON","postalCode":"L5L 4L9","phone":"905-607-7981","tollFree":null,"fax":"905-607-1919","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":31204,"firstName":"James","commonName":"Jamie","lastName":"Thomas","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"613-766-8600","email":"Jamie.Thomas@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/thomasj","partialBranchInfo":{"id":5775,"dealerShip":"AFM","geoLocation":{"lng":-76.51955,"lat":44.24444,"_persistence_fetchGroup":null},"address1":"1187 Princess Street","address2":"Unit 7","city":"Kingston","provinceAbbr":"ON","postalCode":"K7M 3E1","phone":"613-766-8600","tollFree":null,"fax":"613-766-8606","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":true},
                {"id":31817,"firstName":"Michael","commonName":"Mike","lastName":"Tomkins","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"mtomkins@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5052,"dealerShip":"AFM","geoLocation":{"lng":-123.95188,"lat":49.18323,"_persistence_fetchGroup":null},"address1":"1200 Princess Royal Avenue","address2":"Suite #1","city":"Nanaimo","provinceAbbr":"BC","postalCode":"V9S 3Z7","phone":"250-753-7777","tollFree":null,"fax":"250-753-6650","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":true},
                {"id":31737,"firstName":"Michael","commonName":null,"lastName":"Treurniet","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"mtreurniet@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5148,"dealerShip":"AFM","geoLocation":{"lng":-80.47965,"lat":43.47433,"_persistence_fetchGroup":null},"address1":"487 Riverbend Drive","address2":"2nd Floor","city":"Kitchener","provinceAbbr":"ON","postalCode":"N2K 3S3","phone":"519-578-4494","tollFree":null,"fax":"519-578-1786","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":34882,"firstName":"Jean-Michel","commonName":"John","lastName":"Vachon","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"613-5678266  ext. 309","email":"JVachon@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5767,"dealerShip":"ACM","geoLocation":{"lng":-75.67704,"lat":45.42699,"_persistence_fetchGroup":null},"address1":"5 Blackburn Avenue","address2":"3rd Floor","city":"Ottawa","provinceAbbr":"ON","postalCode":"K1N 8A2","phone":"613-567-8266","tollFree":null,"fax":"613-567-8269","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":33106,"firstName":"Michael","commonName":"Mike","lastName":"Winters","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"604-685-1938","email":"mwinters@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/mwinters","partialBranchInfo":{"id":5410,"dealerShip":"AFM","geoLocation":{"lng":-123.115952,"lat":49.285248,"_persistence_fetchGroup":null},"address1":"800 West Pender Street","address2":"Suite 1600","city":"Vancouver","provinceAbbr":"BC","postalCode":"V6C 2V6","phone":"604-484-2070","tollFree":null,"fax":"604-685-9815","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":true},
                {"id":30719,"firstName":"Michele","commonName":null,"lastName":"Yergens","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"myergens@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5075,"dealerShip":"ACM","geoLocation":{"lng":-102.99876,"lat":49.14201,"_persistence_fetchGroup":null},"address1":"1330-4th Street","address2":"Unit #1","city":"Estevan","provinceAbbr":"SK","postalCode":"S4A 0X2","phone":"306-634-9008","tollFree":null,"fax":"306-634-8099","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
                {"id":35475,"firstName":"Michael","commonName":null,"lastName":"Zonta","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"mzonta@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/mzonta","partialBranchInfo":{"id":5167,"dealerShip":"ACM","geoLocation":{"lng":-79.78535,"lat":43.36969,"_persistence_fetchGroup":null},"address1":"4145 North Service Road","address2":"Suite 100","city":"Burlington","provinceAbbr":"ON","postalCode":"L7L 6A3","phone":"905-332-5988","tollFree":null,"fax":"905-332-7276","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, "showCommon":false},
            ];
            function minAdvisor(advisors) {
                var minAdvisors = [];
                for (var i = 0; i < advisors.length; i++){
                    minAdvisors.push({
                        firstName: advisors[i].firstName,
                        lastName: advisors[i].lastName,
                        city: advisors[i].city,
                        provinceAbbr: advisors[i].provinceAbbr
                    });
                }
                return minAdvisors;
            }
            var minMiAdvisors = minAdvisor(advisorsWithMi);
            expect(advisorService.searchResults).toEqual(advisorsWithMi);

            expect(advisorService.maxPages).toEqual(2);
            expect(advisorService.mobileMaxNumDisplay).toEqual(50);




            advisorService.search('o');
            expect(advisorService.searchTerm).toEqual('o');
            expect(advisorService.searchResults).toEqual([]);
            expect(advisorService.maxPages).toEqual(0);
            expect(advisorService.numPerPage).toEqual(50);
            expect(advisorService.mobileMaxNumDisplay).toEqual(50);
            expect(advisorService.currentPage).toEqual(1);

            advisorService.search('obri');
            expect(advisorService.searchTerm).toEqual('obri');
            var obrien = [
                {"id":31051,"firstName":"Dennis","commonName":null,"lastName":"O'Brien","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"dobrien@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/dobrien","partialBranchInfo":{"id":5167,"dealerShip":"ACM","geoLocation":{"lng":-79.78535,"lat":43.36969,"_persistence_fetchGroup":null},"address1":"4145 North Service Road","address2":"Suite 100","city":"Burlington","provinceAbbr":"ON","postalCode":"L7L 6A3","phone":"905-332-5988","tollFree":null,"fax":"905-332-7276","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon:false},
            ];
            expect(advisorService.searchResults).toEqual(obrien);

            advisorService.search("o'bri");
            expect(advisorService.searchTerm).toEqual("obri");
            expect(advisorService.searchResults).toEqual(obrien);

            advisorService.search("o'");
            expect(advisorService.searchTerm).toEqual("o");
            expect(advisorService.searchResults).toEqual([]);


            advisorService.search("dennis o'bri");
            expect(advisorService.searchTerm).toEqual("dennis obri");
            expect(advisorService.searchResults).toEqual([]);

            advisorService.search("dennis o'brien");
            expect(advisorService.searchTerm).toEqual("dennis obrien");
            expect(advisorService.searchResults).toEqual(obrien);

            var obNames = [
                {"id":34509,"firstName":"Edward","commonName":"Ed","lastName":"Bobko","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5211,"dealerShip":"ACM","geoLocation":{"lng":-79.563294,"lat":43.639589,"_persistence_fetchGroup":null},"address1":"1 Eva Road","address2":"Suite 303","city":"Etobicoke","provinceAbbr":"ON","postalCode":"M9C 4Z5","phone":"416-620-6662","tollFree":null,"fax":"416-626-2569","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon: true},
                {"id":34576,"firstName":"Walter","commonName":null,"lastName":"Bobko Jr.","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"905-685--7888","email":"WBobko@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/wbobko","partialBranchInfo":{"id":5846,"dealerShip":"ACM","geoLocation":null,"address1":"211 King Street","address2":null,"city":"St. Catharines","provinceAbbr":"ON","postalCode":"L2R3J8","phone":"905-685-7888","tollFree":"1-866-578-8837","fax":"905-685-6788","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon: false},
                {"id":33916,"firstName":"Robert","commonName":null,"lastName":"Bouchard","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"rbouchard@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5832,"dealerShip":"ACM","geoLocation":{"lng":-100.05711,"lat":51.14389,"_persistence_fetchGroup":null},"address1":"701 Main Street South","address2":"Suite A","city":"Dauphin","provinceAbbr":"MB","postalCode":"R7N 1L6","phone":"204-622-4766","tollFree":null,"fax":"204-452-6273","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon:false},
                {"id":31149,"firstName":"Robert","commonName":"Rob","lastName":"Clark","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"604-535-8739","email":"rclark@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/rclark","partialBranchInfo":{"id":5049,"dealerShip":"ACM","geoLocation":{"lng":-122.87235,"lat":49.03253,"_persistence_fetchGroup":null},"address1":"1752 Ocean Park Road","address2":null,"city":"Surrey","provinceAbbr":"BC","postalCode":"V4A 3L9","phone":"604-535-8739","tollFree":"877-535-8732","fax":"604-648-8630","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon:true},
                {"id":34196,"firstName":"Roberta","commonName":null,"lastName":"Colabufalo","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5376,"dealerShip":"ACM","geoLocation":{"lng":-79.64706,"lat":43.58337,"_persistence_fetchGroup":null},"address1":"350 Burnhamthorpe Road West","address2":"Suite 218","city":"Mississauga","provinceAbbr":"ON","postalCode":"L5B 3J1","phone":"905-272-2750","tollFree":"1-800-265-4658","fax":"905-272-9252","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon:false},
                {"id":30840,"firstName":"Robin","commonName":null,"lastName":"Danielson","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"rdanielson@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5230,"dealerShip":"ACM","geoLocation":{"lng":-79.46394,"lat":46.31172,"_persistence_fetchGroup":null},"address1":"101 McIntyre Street West","address2":null,"city":"North Bay","provinceAbbr":"ON","postalCode":"P1B 2Y5","phone":"705-476-5422","tollFree":"1-800-461-9519","fax":"705-476-7842","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon: false},
                {"id":35653,"firstName":"Garrett","commonName":null,"lastName":"Dobson","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"250-564-2020","email":"gdobson@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5533,"dealerShip":"ACM","geoLocation":{"lng":-122.74947,"lat":53.91721,"_persistence_fetchGroup":null},"address1":"1550 - 4th Ave.","address2":null,"city":"Prince George","provinceAbbr":"BC","postalCode":"V2L 5L7","phone":"250-564-2020","tollFree":null,"fax":"250-561-2020","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon: false},
                {"id":31895,"firstName":"Robert","commonName":null,"lastName":"Fry","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"705-476-5422","email":"rfry@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"www.thethomsonteam.ca","partialBranchInfo":{"id":5230,"dealerShip":"ACM","geoLocation":{"lng":-79.46394,"lat":46.31172,"_persistence_fetchGroup":null},"address1":"101 McIntyre Street West","address2":null,"city":"North Bay","provinceAbbr":"ON","postalCode":"P1B 2Y5","phone":"705-476-5422","tollFree":"1-800-461-9519","fax":"705-476-7842","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon: false},
                {"id":31176,"firstName":"Robert","commonName":"Brian","lastName":"Humphrys","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"416-620-5800","email":"bhumphrys@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/bhumphrys","partialBranchInfo":{"id":5160,"dealerShip":"ACM","geoLocation":{"lng":-79.58786,"lat":43.66572,"_persistence_fetchGroup":null},"address1":"5405 Eglinton Avenue West","address2":"Suite 203","city":"Etobicoke","provinceAbbr":"ON","postalCode":"M9C 5K6","phone":"416-620-4800","tollFree":null,"fax":"416-620-4613","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon: false},
                {"id":31122,"firstName":"Robert","commonName":"Rob","lastName":"Liebing","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"rliebing@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5103,"dealerShip":"ACM","geoLocation":{"lng":-82.95286,"lat":42.30498,"_persistence_fetchGroup":null},"address1":"3295 Quality Way","address2":"Suite 303","city":"Windsor","provinceAbbr":"ON","postalCode":"N8T 3R9","phone":"519-966-5593","tollFree":null,"fax":"519-972-0111","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon: true},
                {"id":36153,"firstName":"Robert","commonName":"Bob","lastName":"Mackay","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5328,"dealerShip":"ACM","geoLocation":{"lng":-63.59972,"lat":44.6618,"_persistence_fetchGroup":null},"address1":"5548 Kaye Street","address2":"Suite 201","city":"Halifax","provinceAbbr":"NS","postalCode":"B3K 1Y5","phone":"902-423-1200","tollFree":"1-888-305-7526","fax":"902-423-6550","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon: true},
                {"id":30743,"firstName":"Robert","commonName":"Rob","lastName":"MacRae","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"rmacrae@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5157,"dealerShip":"ACM","geoLocation":{"lng":-79.87073,"lat":43.25528,"_persistence_fetchGroup":null},"address1":"25 Main Street West","address2":"Suite 1110","city":"Hamilton","provinceAbbr":"ON","postalCode":"L8P 1H1","phone":"905-526-8664","tollFree":null,"fax":"905-526-9033","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon: true},
                {"id":31061,"firstName":"Robert-Yves","commonName":null,"lastName":"Mazerolle","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"rymazerolle@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/rymazerolle","partialBranchInfo":{"id":5328,"dealerShip":"ACM","geoLocation":{"lng":-63.59972,"lat":44.6618,"_persistence_fetchGroup":null},"address1":"5548 Kaye Street","address2":"Suite 201","city":"Halifax","provinceAbbr":"NS","postalCode":"B3K 1Y5","phone":"902-423-1200","tollFree":"1-888-305-7526","fax":"902-423-6550","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon:false},
                {"id":34062,"firstName":"Robert","commonName":"Glenn","lastName":"McClelland","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"905-595-3863","email":"gmcclelland@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/gmcclelland","partialBranchInfo":{"id":5626,"dealerShip":"AFM","geoLocation":{"lng":-79.717855,"lat":43.681137,"_persistence_fetchGroup":null},"address1":"350 Rutherford Rd. S","address2":"Plaza II, Suite 103","city":"Brampton","provinceAbbr":"ON","postalCode":"L6W 4N6","phone":"905-595-3863","tollFree":null,"fax":"905-595-3864","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon: false},
                {"id":30754,"firstName":"Robert","commonName":"Rob","lastName":"McClelland","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"rmcclelland@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5475,"dealerShip":"ACM","geoLocation":{"lng":-79.42487,"lat":43.81799,"_persistence_fetchGroup":null},"address1":"7787 Yonge Street","address2":null,"city":"Thornhill","provinceAbbr":"ON","postalCode":"L3T 7L2","phone":"905-771-5200","tollFree":null,"fax":"905-771-5255","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon: true},
                {"id":34800,"firstName":"Fredrick","commonName":"Rob","lastName":"McDowell","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5703,"dealerShip":"AFM","geoLocation":{"lng":-63.28784,"lat":45.36497,"_persistence_fetchGroup":null},"address1":"18 Willow Street","address2":"Suite 201B","city":"Truro","provinceAbbr":"NS","postalCode":"B2N 4Z4","phone":"902-843-7375","tollFree":null,"fax":"902-893-4144","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon:true},
                {"id":30799,"firstName":"Robert","commonName":"Bob","lastName":"Nicholls","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"bnicholls@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/bnicholls","partialBranchInfo":{"id":5230,"dealerShip":"ACM","geoLocation":{"lng":-79.46394,"lat":46.31172,"_persistence_fetchGroup":null},"address1":"101 McIntyre Street West","address2":null,"city":"North Bay","provinceAbbr":"ON","postalCode":"P1B 2Y5","phone":"705-476-5422","tollFree":"1-800-461-9519","fax":"705-476-7842","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon: true},
                {"id":36102,"firstName":"Collin","commonName":null,"lastName":"Noble","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5614,"dealerShip":"AFM","geoLocation":{"lng":-114.917861,"lat":52.378473,"_persistence_fetchGroup":null},"address1":"5204 - 49th St","address2":null,"city":"Rocky Mtn House","provinceAbbr":"AB","postalCode":"T4T 1G7","phone":"403-845-2822","tollFree":null,"fax":"403-845-6242","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon: false},
                {"id":31051,"firstName":"Dennis","commonName":null,"lastName":"O'Brien","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"dobrien@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/dobrien","partialBranchInfo":{"id":5167,"dealerShip":"ACM","geoLocation":{"lng":-79.78535,"lat":43.36969,"_persistence_fetchGroup":null},"address1":"4145 North Service Road","address2":"Suite 100","city":"Burlington","provinceAbbr":"ON","postalCode":"L7L 6A3","phone":"905-332-5988","tollFree":null,"fax":"905-332-7276","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon: false},
                {"id":35376,"firstName":"Robert","commonName":"Jay","lastName":"Rayner","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"613-766-7220","email":"jrayner@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/jrayner","partialBranchInfo":{"id":5797,"dealerShip":"ACM","geoLocation":null,"address1":"1187 Princess Street","address2":"Unit 7","city":"Kingston","provinceAbbr":"ON","postalCode":"K7M3E1","phone":"613-766-7220","tollFree":null,"fax":"613-766-8606","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon:false},
                {"id":31617,"firstName":"Altagracia","commonName":null,"lastName":"Robbins","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"arobbins@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5255,"dealerShip":"AFM","geoLocation":{"lng":-78.31312,"lat":44.28483,"_persistence_fetchGroup":null},"address1":"161 Wilson Street","address2":null,"city":"Peterborough","provinceAbbr":"ON","postalCode":"K9J 1S6","phone":"705-743-6036","tollFree":null,"fax":"705-741-5475","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon: false},
                {"id":35734,"firstName":"Stephan","commonName":null,"lastName":"Robert","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"srobert@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":null,"partialBranchInfo":{"id":5825,"dealerShip":"AFM","geoLocation":{"lng":-75.73465,"lat":45.44374,"_persistence_fetchGroup":null},"address1":"500 - 15 Rue Gamelin","address2":null,"city":"Gatineau","provinceAbbr":"QC","postalCode":"J8Y 6N5","phone":"819-771-2196","tollFree":null,"fax":"819-771-2197","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon:false},
                {"id":31566,"firstName":"David","commonName":null,"lastName":"Robinson","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"david.robinson@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5819,"dealerShip":"ACM","geoLocation":{"lng":-121.9512,"lat":49.1714,"_persistence_fetchGroup":null},"address1":"46167 Yale Rd","address2":"#205","city":"Chilliwack","provinceAbbr":"BC","postalCode":"V2P 2P2","phone":"604-703-1019","tollFree":"1-855-703-1019","fax":"604-703-1038","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon:false},
                {"id":30660,"firstName":"Robert","commonName":"Bob","lastName":"Sawatzky","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"604-685-1938","email":"rsawatzky@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5410,"dealerShip":"AFM","geoLocation":{"lng":-123.115952,"lat":49.285248,"_persistence_fetchGroup":null},"address1":"800 West Pender Street","address2":"Suite 1600","city":"Vancouver","provinceAbbr":"BC","postalCode":"V6C 2V6","phone":"604-484-2070","tollFree":null,"fax":"604-685-9815","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon: true},
                {"id":35936,"firstName":"Robert","commonName":"Bob","lastName":"Shimbashi","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5520,"dealerShip":"AFM","geoLocation":{"lng":-112.83741,"lat":49.69536,"_persistence_fetchGroup":null},"address1":"309 - 6 Street S.","address2":"2nd Floor","city":"Lethbridge","provinceAbbr":"AB","postalCode":"T1J 2C7","phone":"403-320-7777","tollFree":null,"fax":"403-320-7799","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon:true},
                {"id":31070,"firstName":"Robert","commonName":"Robert J.M.","lastName":"Smith","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"robert.smith@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5159,"dealerShip":"ACM","geoLocation":{"lng":-79.901963,"lat":43.255495,"_persistence_fetchGroup":null},"address1":"175 Longwood Road South","address2":"Suite 400","city":"Hamilton","provinceAbbr":"ON","postalCode":"L8P 0A1","phone":"905-526-0485","tollFree":null,"fax":"905-526-8277","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon:true},
                {"id":33637,"firstName":"Gustavo","commonName":null,"lastName":"Soberanis","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"GSoberanis@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://assante.com/advisors/jkocoris/","partialBranchInfo":{"id":5843,"dealerShip":"ACM","geoLocation":{"lng":-73.78454,"lat":45.48395,"_persistence_fetchGroup":null},"address1":"2020 Transcanadienne","address2":"Suite 200","city":"Dorval","provinceAbbr":"QC","postalCode":"H9P 2N4","phone":"514-832-5100","tollFree":null,"fax":"514-832-5232","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon:false},
                {"id":31633,"firstName":"Robert","commonName":"Bob","lastName":"Spiers","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"bspiers@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5098,"dealerShip":"AFM","geoLocation":{"lng":-97.17681,"lat":49.85156,"_persistence_fetchGroup":null},"address1":"1345 Taylor Avenue","address2":"2nd Floor","city":"Winnipeg","provinceAbbr":"MB","postalCode":"R3M 3Y9","phone":"204-942-1169","tollFree":"1-800-296-8060","fax":"204-943-1561","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon: true},
                {"id":30729,"firstName":"Robert","commonName":"Rob","lastName":"Taylor","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"902-423-1200","email":"rtaylor@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/rtaylor","partialBranchInfo":{"id":5328,"dealerShip":"ACM","geoLocation":{"lng":-63.59972,"lat":44.6618,"_persistence_fetchGroup":null},"address1":"5548 Kaye Street","address2":"Suite 201","city":"Halifax","provinceAbbr":"NS","postalCode":"B3K 1Y5","phone":"902-423-1200","tollFree":"1-888-305-7526","fax":"902-423-6550","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon: true},
                {"id":36106,"firstName":"Robert","commonName":"Rob","lastName":"Torrance","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"604-434--4960","email":"RTorrance@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5595,"dealerShip":"AFM","geoLocation":{"lng":-123.00552,"lat":49.23036,"_persistence_fetchGroup":null},"address1":"5945 Kathleen Ave","address2":"Suite 600A","city":"Burnaby","provinceAbbr":"BC","postalCode":"V5H 4J7","phone":"604-434-4960","tollFree":null,"fax":"604-434-4906","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon:true},
                {"id":30805,"firstName":"Robert","commonName":"Bob","lastName":"Wark","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"bwark@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://assante.com/advisors/tvanos/","partialBranchInfo":{"id":5814,"dealerShip":"ACM","geoLocation":{"lng":-82.40182,"lat":42.99523,"_persistence_fetchGroup":null},"address1":"137 Kendall St","address2":null,"city":"Sarnia","provinceAbbr":"ON","postalCode":"N7V 4G6","phone":"519-332-4100","tollFree":null,"fax":"519-332-4670","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon: true},
                {"id":30795,"firstName":"Robert","commonName":"Gary","lastName":"Woodward","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"gwoodward@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5167,"dealerShip":"ACM","geoLocation":{"lng":-79.78535,"lat":43.36969,"_persistence_fetchGroup":null},"address1":"4145 North Service Road","address2":"Suite 100","city":"Burlington","provinceAbbr":"ON","postalCode":"L7L 6A3","phone":"905-332-5988","tollFree":null,"fax":"905-332-7276","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon:false},
            ];

            advisorService.search("o'b");
            expect(advisorService.searchTerm).toEqual("ob");
            expect(advisorService.searchResults).toEqual(obNames);

            advisorService.search("ob");
            expect(advisorService.searchTerm).toEqual("ob");
            expect(advisorService.searchResults).toEqual(obNames);


            var ebNames = [
                {"id":30706,"firstName":"Marie","commonName":null,"lastName":"Debono","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"mdebono@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/mdebono","partialBranchInfo":{"id":5750,"dealerShip":"ACM","geoLocation":{"lng":-79.46697,"lat":43.99995,"_persistence_fetchGroup":null},"address1":"258 Earl Stewart Drive","address2":"Suite 3","city":"Aurora","provinceAbbr":"ON","postalCode":"L4G 6V8","phone":"905-841-7684","tollFree":null,"fax":"905-841-1220","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon:false},
                {"id":1235,"firstName": "FirstnameB","commonName": "CommonnameB","lastName": "LastnameB","titles" : ["titleB", "titleB"],"profilePictureUrl": "http://nameofpicture.jpg","phone": "123-345-6789","email": "emailB@email.com","altEmail": "alternateemailB@email.com","styleNameEN": "Style name EnglishB","styleNameFR": "Style name FrenchB","website": "http://urlB","spokenLanguage": "Bilingual","partialBranchInfo": {"id": 123456,"dealerShip": "ACN","geoLocation": {"lng": -119.47,"lat": 39.02},"address1": "Address 1B","address2": "Address 2B","city": "city","provinceAbbr": "ON","postalCode": "A1A 1A1","tollFree": "12345"}, showCommon:true},
                {"id":31122,"firstName":"Robert","commonName":"Rob","lastName":"Liebing","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"rliebing@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5103,"dealerShip":"ACM","geoLocation":{"lng":-82.95286,"lat":42.30498,"_persistence_fetchGroup":null},"address1":"3295 Quality Way","address2":"Suite 303","city":"Windsor","provinceAbbr":"ON","postalCode":"N8T 3R9","phone":"519-966-5593","tollFree":null,"fax":"519-972-0111","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon:true},
                {"id":34091,"firstName":"Debbie","commonName":null,"lastName":"Perepolkin (Pereversoff)","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"dperepolkin@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/dperepolkin","partialBranchInfo":{"id":5645,"dealerShip":"AFM","geoLocation":{"lng":-117.66406,"lat":49.32546,"_persistence_fetchGroup":null},"address1":"1127- 4th Street","address2":null,"city":"Castlegar","provinceAbbr":"BC","postalCode":"V1N 2A8","phone":"888-365-4888","tollFree":null,"fax":"888-365-4888","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon:false},
                {"id":30970,"firstName":"Deborah","commonName":null,"lastName":"Pierce","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"519-725-2580","email":"dpierce@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/dpierce","partialBranchInfo":{"id":5110,"dealerShip":"ACM","geoLocation":{"lng":-80.53861,"lat":43.49253,"_persistence_fetchGroup":null},"address1":"490 Dutton Drive","address2":"Suite B10","city":"Waterloo","provinceAbbr":"ON","postalCode":"N2L 6H7","phone":"519-725-2580","tollFree":null,"fax":"519-746-8095","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon:false},
                {"id":36289,"firstName":"Sebastien","commonName":null,"lastName":"Roy","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5743,"dealerShip":"AFM","geoLocation":{"lng":-73.44082,"lat":45.45525,"_persistence_fetchGroup":null},"address1":"4605 B Boul. Lapiniere","address2":"Suite 260","city":"Brossard","provinceAbbr":"QC","postalCode":"J4Z 3T5","phone":"450-923-0722","tollFree":null,"fax":"450-923-2252","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon:false},
                {"id":36290,"firstName":"Sebastien","commonName":null,"lastName":"Roy","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5743,"dealerShip":"AFM","geoLocation":{"lng":-73.44082,"lat":45.45525,"_persistence_fetchGroup":null},"address1":"4605 B Boul. Lapiniere","address2":"Suite 260","city":"Brossard","provinceAbbr":"QC","postalCode":"J4Z 3T5","phone":"450-923-0722","tollFree":null,"fax":"450-923-2252","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon:false},
                {"id":34863,"firstName":"Sébastien","commonName":null,"lastName":"Roy","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5743,"dealerShip":"AFM","geoLocation":{"lng":-73.44082,"lat":45.45525,"_persistence_fetchGroup":null},"address1":"4605 B Boul. Lapiniere","address2":"Suite 260","city":"Brossard","provinceAbbr":"QC","postalCode":"J4Z 3T5","phone":"450-923-0722","tollFree":null,"fax":"450-923-2252","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon:false},
                {"id":31086,"firstName":"Deborah","commonName":null,"lastName":"Wallis","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"dwallis@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/dwallis","partialBranchInfo":{"id":5230,"dealerShip":"ACM","geoLocation":{"lng":-79.46394,"lat":46.31172,"_persistence_fetchGroup":null},"address1":"101 McIntyre Street West","address2":null,"city":"North Bay","provinceAbbr":"ON","postalCode":"P1B 2Y5","phone":"705-476-5422","tollFree":"1-800-461-9519","fax":"705-476-7842","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon:false},
                {"id":35327,"firstName":"Rebecca","commonName":null,"lastName":"Whitcher","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"867-393-3545","email":"RWhitcher@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5074,"dealerShip":"AFM","geoLocation":{"lng":-135.05425,"lat":60.72251,"_persistence_fetchGroup":null},"address1":"3147 3rd Avenue","address2":null,"city":"Whitehorse","provinceAbbr":"YK","postalCode":"Y1A 1E9","phone":"867-667-6100","tollFree":null,"fax":"867-668-7843","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon:false},
            ];

            advisorService.search("eb");

            expect(advisorService.searchTerm).toEqual("eb");
            expect(advisorService.searchResults).toEqual(ebNames);


            advisorService.search("éb");
            expect(advisorService.searchTerm).toEqual("eb");
            expect(advisorService.searchResults).toEqual(ebNames);


            var stgeorges = [
                {"id":34955,"firstName":"Darren","commonName":null,"lastName":"St-Georges","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"514-303--2695","email":"dstgeorges@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/dstgeorges","partialBranchInfo":{"id":5843,"dealerShip":"ACM","geoLocation":{"lng":-73.78454,"lat":45.48395,"_persistence_fetchGroup":null},"address1":"2020 Transcanadienne","address2":"Suite 200","city":"Dorval","provinceAbbr":"QC","postalCode":"H9P 2N4","phone":"514-832-5100","tollFree":null,"fax":"514-832-5232","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon:false},
                {"id":31185,"firstName":"Michel","commonName":null,"lastName":"St.-Georges","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"mstgeorges@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5526,"dealerShip":"ACM","geoLocation":{"lng":-73.67101,"lat":45.5218,"_persistence_fetchGroup":null},"address1":"795 Rue Muir","address2":"Suite 1005","city":"St. Laurent","provinceAbbr":"QC","postalCode":"H4L 5H8","phone":"514-748-7865","tollFree":null,"fax":"514-748-0047","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon:false},
                {"id":31251,"firstName":"Barbara","commonName":"Barb","lastName":"Stranak-St-Georges","titles":null,"spokenLanguage":null,"profilePictureUrl":"","phone":"","email":"bstranakstgeorges@assante.com","altEmail":null,"styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5526,"dealerShip":"ACM","geoLocation":{"lng":-73.67101,"lat":45.5218,"_persistence_fetchGroup":null},"address1":"795 Rue Muir","address2":"Suite 1005","city":"St. Laurent","provinceAbbr":"QC","postalCode":"H4L 5H8","phone":"514-748-7865","tollFree":null,"fax":"514-748-0047","_persistence_fetchGroup":null},"_persistence_fetchGroup":null, showCommon:true}
            ];



            advisorService.search("st.-geor");
            expect(advisorService.searchTerm).toEqual("stgeor");
            expect(advisorService.searchResults).toEqual(stgeorges);


            advisorService.search("stgeor");
            expect(advisorService.searchTerm).toEqual("stgeor");
            expect(advisorService.searchResults).toEqual(stgeorges);

        });

    });
})();

/*
(function () {
    describe('languageSwitcherController', function () {
        var $controller;
        var $rootScope;
        var $translate;
        var $state;
        var $stateParams;
        //var languageSwitcherController;

        beforeEach(function() {
            module('ui.router');
            module('pascalprecht.translate');
            module('advisorLocator.core.main');
            module('advisorLocator');
            inject(['$controller', '$rootScope', '$state', '$stateParams', '$httpBackend', '$q', '$timeout', function(_$controller, _$rootScope, _$state, _$stateParams, _$httpBackend, _$q, _$timeout){

                _$httpBackend.when('GET', 'assets/locales/locale-en.json').respond(['test', 'one']);
                _$httpBackend.when('GET', 'assets/locales/locale-fr.json').respond(['test', 'one']);
                _$httpBackend.when('GET', 'app/core/includes/header/languageSwitcher/languageSwitcher.html').respond(['test', 'one']);
                _$httpBackend.when('GET', 'app/core/includes/layouts/main.layout.html').respond(['test', 'one']);
                $controller = _$controller;
                //languageSwitcherController = $controller('LanguageSwitcherController', {$rootScope: $rootScope, $translate: $translate, $state: $state});
                $rootScope = _$rootScope;
                $state = _$state;
                $stateParams = _$stateParams;
                $translate = function() {
                    var vm = this;
                    vm.use = function(langKey) {
                        console.log('new Lang Key: ', langKey);
                        if(langKey){
                            console.log('setting new Lang Key: ', langKey);
                            var deferred = _$q.defer();
                            setTimeout(function(){
                               //vm.langKey = langKey;
                                console.log('resolving promise');
                                deferred.resolve(langKey);
                                $rootScope.$digest();
                            },10);
                            return deferred.promise;
                        } else {
                            console.log('returning new Lang Key: ', vm.langKey);
                            console.log('langKey1123: ', vm.langKey);
                            return vm.langKey;
                        }
                    }
                    return vm;
                };



                //deferred.resolve('resolveData');
                //spyOn($translate, 'use').andReturn(deferred.promise);

            }]);
        });
        it('languageSwitcherController controller should do stuff', function(done) {
            $rootScope.documentLanguage = 'en';
            var languageSwitcherController = $controller('LanguageSwitcherController', {$rootScope: $rootScope, $translate: $translate(), $state: $state});
            expect(languageSwitcherController.currentLanguage).toEqual('en');

            waitsForAndRuns(function(){return languageSwitcherController.currentLanguage == 'fr';}, function(){languageSwitcherController.changeLanguage('fr');}, 5000)

            expect(languageSwitcherController.currentLanguage).toEqual('fr');
        });

    });
})();
*/
/*
describe("Directive", function () {

    var $scope, controller, element, rootScope;
    var tempScope;
    beforeEach(function() {

        module('ui.router');
        module('pascalprecht.translate');
        module('advisorLocator.core.main');
        module('advisorLocator');
        inject(function ($rootScope, $compile, $httpBackend) {
            rootScope = $rootScope;
            $httpBackend.when('GET', 'assets/locales/locale-en.json').respond(['test', 'one']);
            $httpBackend.when('GET', 'app/core/includes/header/languageSwitcher/languageSwitcher.html').respond(['test', 'one']);
            $httpBackend.when('GET', 'app/core/includes/layouts/main.layout.html').respond(['test', 'one']);
            $scope = $rootScope.$new();
            $scope.test = 'fish';
            element = angular.element("<language-switcher></language-switcher>");
            $compile(element)($scope);
            $scope.$digest();

            //rootScope = $rootScope;
        })
    });
    it("should toogle open when toggle() is called", inject(function() {
        console.log('controller: ',element.isolateScope());
        expect(element.isolateScope()).toBe({});
    }));

});
*/