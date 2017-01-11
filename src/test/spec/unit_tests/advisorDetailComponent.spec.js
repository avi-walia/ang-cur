(function () {

    var advisorList30610 = ({
        id: 30610,
        firstName: 'Lorea',
        commonName: 'Lorea',
        lastName: 'Declercq',
        titlesEN: [],
        titlesFR: [],
        designationsEN: ['CFP<sup>&reg;</sup>', 'EPC'],
        designationsFR: ['CFP<sup>MC</sup>', 'EPC'],
        spokenLanguage: 'English',
        profilePictureUrl: 'http://dev.assante.com/advisors/pmacrae/images/images/DeClercq Lorea Bio.jpg',
        phone: '',
        email: 'ldeclercq@assante.com',
        styleNameEN: null,
        styleNameFR: null,
        website: '',
        partialBranchInfo: Object({
            id: 5410,
            dealerShip: 'AFM',
            geoLocation: Object({lng: -123.115952, lat: 49.285248, _persistence_fetchGroup: null}),
            address1: '800 West Pender Street',
            address2: 'Suite 1600',
            city: 'Vancouver',
            provinceAbbr: 'BC',
            postalCode: 'V6C 2V6',
            fax: '604-685-9815',
            _persistence_fetchGroup: null
        }),
        _persistence_fetchGroup: null,
        userMarker: Object({geoLocation: Object({lat: 49.285248, lng: -123.115952}), zoom: 15}),
        fullAddress: '800+West+Pender+StreetSuite+1600Vancouver'
    });

    describe('advisor detail component', function () {
        beforeEach(module('advisorLocator.features.searchByName'));

        var scope;
        var element;
        var $compile;
        var controller = {};
        var $stateParams = {};
        var pageStateResolver = {};
        var detectMobile = {};
        var GOOGLE_MAPS_URL = {};
        var advisorDetailService;
        var stateTrackerService;
        var advisorService;
        var $httpBackend;
        beforeEach(function () {
            module(function ($provide) {
                $provide.service('advisorDetailService', function () {
                    this.getAdvisorDetail = function () {
                        return advisorList30610;
                    }

                });
            });

            module(function ($provide) {
                $provide.service('stateTrackerService', function () {

                    this.previousState = {name: "main.advisorLocator.advisorList"};


                });
            });

            module(function ($provide) {
                $provide.service('advisorService', function () {

                    this.isLoading = false;

                });

                $provide.service('envConfigService', function () {

                    return new envConfigServiceMockConstructor();
                });

                $provide.service('server', function () {

                    return new serverMockConstructor();
                });
            });

            module('advisorLocator.features.searchByLocation');
        });


        beforeEach(function () {

            inject(['$injector', '$componentController', '$rootScope', '$compile', '$templateCache', '$httpBackend', 'advisorDetailService', 'advisorService', 'stateTrackerService', function ($injector, $componentController, $rootScope, _$compile_, _$templateCache_, _$httpBackend_, _advisorDetailService_, _advisorService_, _stateTrackerService_) {
                advisorDetailService = _advisorDetailService_;
                advisorService = _advisorService_;
                stateTrackerService = _stateTrackerService_;
                $compile = _$compile_;
                $httpBackend = _$httpBackend_;
                //$httpBackend.when('GET', 'app/features/components/advisorDetail/advisorDetail.tpl.html').respond(advisorDetailTemplate);
                scope = $rootScope.$new();


                controller = $componentController('advisorDetail', {
                        $rootScope: scope,
                        $stateParams: $stateParams,
                        pageStateResolver: pageStateResolver,
                        detectMobile: detectMobile,
                        GOOGLE_MAPS_URL: GOOGLE_MAPS_URL,
                        GOOGLE_MAPS_URL: GOOGLE_MAPS_URL,
                        advisorDetailService: advisorDetailService,
                        stateTrackerService: stateTrackerService,
                        advisorService: advisorService
                    }
                );
                //var element = $compile('<advisor-detail id="advisorDetails"></advisor-detail>')($rootScope);
                //element = angular.element('<advisor-detail id="advisorDetails"></advisor-detail>');
                //element = $compile(element)(scope);
                //scope.$apply();
                //$httpBackend.flush();
                $rootScope.$digest();


            }]);

        });

        //it('should render the text', function() {
        //
        //    console.log("Value of element", element.html());
        //});

        it('should expose googleMapsUrl', function () {

            expect(controller.googleMapsUrl).toBeDefined();

        });

        it('should expose pageStateResolver', function () {

            expect(controller.pageStateResolver).toBeDefined();

        });

        it('should expose detectMobile', function () {
            expect(controller.detectMobile).toBeDefined();

        });

        it('previous State should be Name Search', function () {

            expect(controller.stateTrackerService.previousState.name).toEqual("main.advisorLocator.advisorList");

        });

        it('getAdvisorDetail method should return the details of the advisor whose id is being passed', function () {

            expect(controller.advisorDetailService.getAdvisorDetail(30610)).toEqual(advisorList30610);

        });

    });
})();