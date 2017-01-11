(function () {
    var advisorLists = [
        {"id":30610,"firstName":"Lorea","commonName":"Lorea","lastName":"Declercq","titlesEN":[],"titlesFR":[],"designationsEN":["CFP<sup>&reg;</sup>", "EPC"],"designationsFR":["CFP<sup>MC</sup>","EPC"],"spokenLanguage":"English","profilePictureUrl":"http://dev.assante.com/advisors/pmacrae/images/images/DeClercq Lorea Bio.jpg","phone":"","email":"ldeclercq@assante.com","styleNameEN":null,"styleNameFR":null,"website":"","partialBranchInfo":{"id":5410,"dealerShip":"AFM","geoLocation":{"lng":-123.115952,"lat":49.285248,"_persistence_fetchGroup":null},"address1":"800 West Pender Street","address2":"Suite 1600","city":"Vancouver","provinceAbbr":"BC","postalCode":"V6C 2V6","fax":"604-685-9815","_persistence_fetchGroup":null},"_persistence_fetchGroup":null},
        {"id":30614,"firstName":"Curtis","commonName":null,"lastName":"Cross","titlesEN":["Senior Financial Advisor"],"titlesFR":["Conseiller principal en services financiers"],"designationsEN":[],"designationsFR":[],"spokenLanguage":"English","profilePictureUrl":"http://dev.assante.com/advisors/ccross/images/images/Curtis revised.JPG","phone":"204-982-1941","email":"ccross@assante.com","styleNameEN":null,"styleNameFR":null,"website":"http://www.assante.com/advisors/ccross","partialBranchInfo":{"id":5098,"dealerShip":"AFM","geoLocation":{"lng":-97.17681,"lat":49.85156,"_persistence_fetchGroup":null},"address1":"1345 Taylor Avenue","address2":"2nd Floor","city":"Winnipeg","provinceAbbr":"MB","postalCode":"R3M 3Y9","fax":"204-943-1561","_persistence_fetchGroup":null},"_persistence_fetchGroup":null}
    ];

    var advisorList30610 = {
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
        partialBranchInfo: {
            id: 5410,
            dealerShip: 'AFM',
            geoLocation: {
                lng: -123.115952,
                lat: 49.285248,
                _persistence_fetchGroup: null
            },
            address1: '800 West Pender Street',
            address2: 'Suite 1600',
            city: 'Vancouver',
            provinceAbbr: 'BC',
            postalCode: 'V6C 2V6',
            fax: '604-685-9815',
            _persistence_fetchGroup: null
        },
        _persistence_fetchGroup: null,
        userMarker: {
            geoLocation: {
                lat: 49.285248,
                lng: -123.115952
            },
            zoom:15
        }, fullAddress: '800 West Pender Street, Vancouver, BC, V6C 2V6', titles: [], designations: ['CFP<sup>MC</sup>', 'EPC'], styleName: null};



    describe('advisor detail service', function () {
        var listService, DetailService;
        beforeEach(module('advisorLocator.features.searchByName'));
        beforeEach(function(){
            module(function($provide){
                $provide.service('advisorService', function(){
                    this.getBranchDetails= function() {
                        return advisorList30610;
                    }

                    this.allAdvisors = advisorLists;
                });


                $provide.service('server', function() {

                    return new serverMockConstructor();
                });


                $provide.service('envConfigService', function() {

                    return new envConfigServiceMockConstructor();
                });
            });
        });
        beforeEach(inject(function(advisorService, advisorDetailService){
            listService=advisorService;
            DetailService=advisorDetailService;
        }));

        it('Branch Detail Service exists', function(){
            expect(DetailService).toBeDefined();
        });

        it('getAdvisorDetail method exist', function() {
            expect(DetailService.getAdvisorDetail).toBeDefined();
        });

        it('getAdvisorDetail method with 30610 should return branch details of branch with id 5404', function() {
            expect(DetailService.getAdvisorDetail(30610)).toEqual(advisorList30610);
        });

        it('getAdvisorDetail method with 30614 should not return branch details of branch with id 30610', function() {
            expect(DetailService.getAdvisorDetail(30614)).not.toEqual(advisorList30610);
        });

    });
})();