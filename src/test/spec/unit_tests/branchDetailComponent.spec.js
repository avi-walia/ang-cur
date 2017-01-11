

(function () {
var branchLists = [
    {"id":5404,"dealerShip":"ACM","geoLocation":{"lng":-79.382153,"lat":43.651078,"_persistence_fetchGroup":null},"address1":"80 Richmond Street West","address2":"Suite 202","city":"Toronto","provinceAbbr":"ON","postalCode":"M5H 2A4","phone":"416-216-6580","tollFree":null,"fax":"416-216-6545","managerName":"Diana Nielsen","managerEmail":"diana.nielsen@assante.com","managerPhone":"416-216-6500","coManagerName":null,"coManagerEmail":null,"coManagerPhone":null,"coManager2Name":null,"coManager2Email":null,"coManager2Phone":null,"partialAdvisorsInfo":[{"id":30818,"firstName":"Kenneth","commonName":null,"lastName":"Drabble","titlesEN":["Vice President","Senior Financial Advisor"],"titlesFR":["Vice-prÃ©sident","Senior Financial Advisor"],"designationsEN":["FCSI<sup>&reg;</sup>","CIM","R.F.P.<sup>&reg;</sup>"],"designationsFR":["FCSI<sup>MD</sup>","CIM<sup>MD</sup>","R.F.P.<sup>&reg;</sup>"],"spokenLanguage":"English","_persistence_fetchGroup":null}],"_persistence_fetchGroup":null},
    {"id":4935,"dealerShip":"AFM","geoLocation":{"lng":-114.06792,"lat":51.00154,"_persistence_fetchGroup":null},"address1":"222 - 58th Avenue SW","address2":"Suite 301","city":"Calgary","provinceAbbr":"AB","postalCode":"T2H 2S3","phone":"403-229-0541","tollFree":null,"fax":"403-228-2754","managerName":"Jim Durnin","managerEmail":"jim.durnin@assante.com","managerPhone":"403-229-0541","coManagerName":null,"coManagerEmail":null,"coManagerPhone":null,"coManager2Name":null,"coManager2Email":null,"coManager2Phone":null,"partialAdvisorsInfo":[{"id":31234,"firstName":"Peter","commonName":null,"lastName":"Minnema","titlesEN":[],"titlesFR":[],"designationsEN":[],"designationsFR":[],"spokenLanguage":"English","_persistence_fetchGroup":null},{"id":31494,"firstName":"John","commonName":"Chris","lastName":"Minnema","titlesEN":[],"titlesFR":[],"designationsEN":[],"designationsFR":[],"spokenLanguage":"English","_persistence_fetchGroup":null},{"id":31983,"firstName":"James","commonName":"Jim","lastName":"Durnin","titlesEN":[],"titlesFR":[],"designationsEN":[],"designationsFR":[],"spokenLanguage":"English","_persistence_fetchGroup":null}],"_persistence_fetchGroup":null}
];
var branchList5404 = ({ id: 5404, dealerShip: 'ACM', geoLocation: Object({ lng: -79.382153, lat: 43.651078, _persistence_fetchGroup: null }), address1: '80 Richmond Street West', address2: 'Suite 202', city: 'Toronto', provinceAbbr: 'ON', postalCode: 'M5H 2A4', phone: '416-216-6580', tollFree: null, fax: '416-216-6545', managerName: 'Diana Nielsen', managerEmail: 'diana.nielsen@assante.com', managerPhone: '416-216-6500', coManagerName: null, coManagerEmail: null, coManagerPhone: null, coManager2Name: null, coManager2Email: null, coManager2Phone: null, partialAdvisorsInfo: [ Object({ id: 30818, firstName: 'Kenneth', commonName: null, lastName: 'Drabble', titlesEN: [ 'Vice President', 'Senior Financial Advisor' ], titlesFR: [ 'Vice-prÃ©sident', 'Senior Financial Advisor' ], designationsEN: [ 'FCSI<sup>&reg;</sup>', 'CIM', 'R.F.P.<sup>&reg;</sup>' ], designationsFR: [ 'FCSI<sup>MD</sup>', 'CIM<sup>MD</sup>', 'R.F.P.<sup>&reg;</sup>' ], spokenLanguage: 'English', _persistence_fetchGroup: null }) ], _persistence_fetchGroup: null, userMarker: Object({ geoLocation: Object({ lat: 43.651078, lng: -79.382153 }), zoom: 15 }), fullAddress: '80+Richmond+Street+WestSuite+202Toronto', branchManagers: [ Object({ firstName: 'Diana', lastName: 'Nielsen', email: 'diana.nielsen@assante.com', phone: '416-216-6500' }) ] });
var advisorList30610 = ({ id: 30610, firstName: 'Lorea', commonName: 'Lorea', lastName: 'Declercq', titlesEN: [  ], titlesFR: [  ], designationsEN: [ 'CFP<sup>&reg;</sup>', 'EPC' ], designationsFR: [ 'CFP<sup>MC</sup>', 'EPC' ], spokenLanguage: 'English', profilePictureUrl: 'http://dev.assante.com/advisors/pmacrae/images/images/DeClercq Lorea Bio.jpg', phone: '', email: 'ldeclercq@assante.com', styleNameEN: null, styleNameFR: null, website: '', partialBranchInfo: Object({ id: 5410, dealerShip: 'AFM', geoLocation: Object({ lng: -123.115952, lat: 49.285248, _persistence_fetchGroup: null }), address1: '800 West Pender Street', address2: 'Suite 1600', city: 'Vancouver', provinceAbbr: 'BC', postalCode: 'V6C 2V6', fax: '604-685-9815', _persistence_fetchGroup: null }), _persistence_fetchGroup: null, userMarker: Object({ geoLocation: Object({ lat: 49.285248, lng: -123.115952 }), zoom: 15 }), fullAddress: '800+West+Pender+StreetSuite+1600Vancouver' });

describe('branch detail component', function () {
    beforeEach(module('advisorLocator.features.searchByLocation'));

    var scope;
    var element;
    var $compile;
    var controller ={};
    var $stateParams = {};
    var pageStateResolver = {};
    var detectMobile = {};
    var GOOGLE_MAPS_URL ={};
    var branchDetailService;
    var stateTrackerService;
    var branchListService;
    var advisorService;
    var advisorDetailService;
    var $httpBackend;
    beforeEach(function(){
        module(function($provide){


            $provide.service('server', function() {

                return new serverMockConstructor();
            });
            $provide.service('branchDetailService', function(){
                this.getBranchDetail= function() {
                    return branchList5404;
                }

            });

            $provide.service('envConfigService', function() {

                return new envConfigServiceMockConstructor();
            });
        });

        module(function($provide){
            $provide.service('advisorDetailService', function(){
                this.getAdvisorDetail= function() {
                    return advisorList30610;
                }

            });
        });

        module(function($provide){
            $provide.service('advisorService', function(){

                this.isLoading = false;

            });
        });

        module(function($provide){
            $provide.service('stateTrackerService', function(){

                this.previousState = {name:"main.advisorLocator.branchList"};


            });
        });

        module(function($provide){
            $provide.service('branchListService', function(){
                /*
                this.branchListLoading = true;

                this.getBranchList= function() {
                    return branchLists;
                }
                */
                return branchListServiceMockConstructor(branchLists);
            });
        });

        module('advisorLocator.features.searchByLocation');
    });


    beforeEach(function() {

        inject(['$injector', '$componentController', '$rootScope', '$compile','$templateCache', '$httpBackend', 'branchDetailService', 'branchListService', 'advisorService', 'advisorDetailService','stateTrackerService', function ($injector, $componentController, $rootScope, _$compile_, _$templateCache_, _$httpBackend_, _branchDetailService_, _branchListService_, _advisorService_,_advisorDetailService_, _stateTrackerService_) {
            branchDetailService = _branchDetailService_;
            branchListService = _branchListService_;
            stateTrackerService = _stateTrackerService_;
            $compile = _$compile_;
            $httpBackend = _$httpBackend_;
            advisorService = _advisorService_;
            advisorDetailService = _advisorDetailService_;
            //$httpBackend.when('GET', 'app/features/components/branchDetail/branchDetail.tpl.html').respond(branchDetailTemplate);
            scope = $rootScope.$new();


            controller = $componentController('branchDetail', {$rootScope: scope, $stateParams:$stateParams,pageStateResolver:pageStateResolver,detectMobile:detectMobile,GOOGLE_MAPS_URL:GOOGLE_MAPS_URL,
                GOOGLE_MAPS_URL:GOOGLE_MAPS_URL, branchDetailService:branchDetailService, stateTrackerService:stateTrackerService, advisorService:advisorService, branchListService:branchListService, advisorDetailService:advisorDetailService}
            );
            $rootScope.$digest();

        }]);

    });

    it('should expose googleMapsUrl', function() {

        expect(controller.googleMapsUrl).toBeDefined();

    });

    it('should expose pageStateResolver', function() {

        expect(controller.pageStateResolver).toBeDefined();

    });

    it('should expose detectMobile', function() {
        expect(controller.detectMobile).toBeDefined();

    });

    it('previous State should be Branch Search', function() {

        expect(controller.stateTrackerService.previousState.name).toEqual("main.advisorLocator.branchList");

    });

    it('getbranchDetail method should return the details of the branch whose id is being passed', function() {

        expect(controller.branchDetailService.getBranchDetail(5404)).toEqual(branchList5404);

    });

});
})();