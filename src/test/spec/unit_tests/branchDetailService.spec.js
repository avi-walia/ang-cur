
(function () {
    var branchLists = [
        {"id":5404,"dealerShip":"ACM","geoLocation":{"lng":-79.382153,"lat":43.651078,"_persistence_fetchGroup":null},"address1":"80 Richmond Street West","address2":"Suite 202","city":"Toronto","provinceAbbr":"ON","postalCode":"M5H 2A4","phone":"416-216-6580","tollFree":null,"fax":"416-216-6545","managerName":"Diana Nielsen","managerEmail":"diana.nielsen@assante.com","managerPhone":"416-216-6500","coManagerName":null,"coManagerEmail":null,"coManagerPhone":null,"coManager2Name":null,"coManager2Email":null,"coManager2Phone":null,"partialAdvisorsInfo":[{"id":30818,"firstName":"Kenneth","commonName":null,"lastName":"Drabble","titlesEN":["Vice President","Senior Financial Advisor"],"titlesFR":["Vice-prÃ©sident","Senior Financial Advisor"],"designationsEN":["FCSI<sup>&reg;</sup>","CIM","R.F.P.<sup>&reg;</sup>"],"designationsFR":["FCSI<sup>MD</sup>","CIM<sup>MD</sup>","R.F.P.<sup>&reg;</sup>"],"spokenLanguage":"English","_persistence_fetchGroup":null}],"_persistence_fetchGroup":null},
        {"id":4935,"dealerShip":"AFM","geoLocation":{"lng":-114.06792,"lat":51.00154,"_persistence_fetchGroup":null},"address1":"222 - 58th Avenue SW","address2":"Suite 301","city":"Calgary","provinceAbbr":"AB","postalCode":"T2H 2S3","phone":"403-229-0541","tollFree":null,"fax":"403-228-2754","managerName":"Jim Durnin","managerEmail":"jim.durnin@assante.com","managerPhone":"403-229-0541","coManagerName":null,"coManagerEmail":null,"coManagerPhone":null,"coManager2Name":null,"coManager2Email":null,"coManager2Phone":null,"partialAdvisorsInfo":[{"id":31234,"firstName":"Peter","commonName":null,"lastName":"Minnema","titlesEN":[],"titlesFR":[],"designationsEN":[],"designationsFR":[],"spokenLanguage":"English","_persistence_fetchGroup":null},{"id":31494,"firstName":"John","commonName":"Chris","lastName":"Minnema","titlesEN":[],"titlesFR":[],"designationsEN":[],"designationsFR":[],"spokenLanguage":"English","_persistence_fetchGroup":null},{"id":31983,"firstName":"James","commonName":"Jim","lastName":"Durnin","titlesEN":[],"titlesFR":[],"designationsEN":[],"designationsFR":[],"spokenLanguage":"English","_persistence_fetchGroup":null}],"_persistence_fetchGroup":null}
    ];

    var branchList5404 = ({ id: 5404, dealerShip: 'ACM', geoLocation: Object({ lng: -79.382153, lat: 43.651078, _persistence_fetchGroup: null }), address1: '80 Richmond Street West', address2: 'Suite 202', city: 'Toronto', provinceAbbr: 'ON', postalCode: 'M5H 2A4', phone: '416-216-6580', tollFree: null, fax: '416-216-6545', managerName: 'Diana Nielsen', managerEmail: 'diana.nielsen@assante.com', managerPhone: '416-216-6500', coManagerName: null, coManagerEmail: null, coManagerPhone: null, coManager2Name: null, coManager2Email: null, coManager2Phone: null, partialAdvisorsInfo: [ Object({ id: 30818, firstName: 'Kenneth', commonName: null, lastName: 'Drabble', titlesEN: [ 'Vice President', 'Senior Financial Advisor' ], titlesFR: [ 'Vice-prÃ©sident', 'Senior Financial Advisor' ], designationsEN: [ 'FCSI<sup>&reg;</sup>', 'CIM', 'R.F.P.<sup>&reg;</sup>' ], designationsFR: [ 'FCSI<sup>MD</sup>', 'CIM<sup>MD</sup>', 'R.F.P.<sup>&reg;</sup>' ], spokenLanguage: 'English', _persistence_fetchGroup: null }) ], _persistence_fetchGroup: null, userMarker: Object({ geoLocation: Object({ lat: 43.651078, lng: -79.382153 }), zoom: 15 }), fullAddress: '80 Richmond Street West, Toronto, ON, M5H 2A4', branchManagers: [ Object({ firstName: 'Diana', lastName: 'Nielsen', email: 'diana.nielsen@assante.com', phone: '416-216-6500' }) ] });

    var listService = {
        branchList: branchLists
    };

    describe('branch detail service', function () {
        var DetailService;
        beforeEach(function() {
            module('advisorLocator.features.searchByLocation');
            module(function($provide){
                $provide.service('branchListService', function(){
                    return listService;
                });
            });
        });

        beforeEach(inject(function(branchDetailService) {
            DetailService=branchDetailService;
        }));

        it('Branch Detail Service exists', function(){
            expect(DetailService).toBeDefined();
        });

        it('getBranchDetails method exist', function() {
            expect(DetailService.getBranchDetail).toBeDefined();
        });

        it('getBranchDetails method with 5404 should return branch details of branch with id 5404', function() {
            /* use this to determine exactly which property is not matching
            var x = DetailService.getBranchDetail(5404);
            for (var i in x) {
                if(x[i] !== branchList5404[i]) {
                    console.log(i);
                    console.log('expect: ' + x[i] + ' = ' + branchList5404[i]);
                }
            }
            */
            expect(DetailService.getBranchDetail(5404)).toEqual(branchList5404);
        });

        it('getBranchDetails method with 4935 should not return branch details of branch with id 5404', function() {
            expect(DetailService.getBranchDetail(4935)).not.toEqual(branchList5404);
        });

    });
})();