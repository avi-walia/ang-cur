

(function () {
    var $langFilterService;
    var $filterRunnerService;
    var count = {
        AB: 0,
        BC: 0,
        MB: 0,
        NB: 0,
        NL: 0,
        NS: 0,
        NT: 0,
        NU: 0,
        ON: 0,
        PE: 0,
        QC: 0,
        SK: 0,
        YT: 0
    }
    var mockDefaultLang = function() {
        spyOn($filterRunnerService.activeFilters, 0).and.returnValues(
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true
        );
    };
    var MockDefaultProvince = function() {
        spyOn($filterRunnerService.activeFilters, 1).and.returnValues(
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true
        );
    };
    describe('filterRunnerService test', function () {
        beforeEach(function() {
            module('advisorLocator.features.searchByName');
        });


        beforeEach(
            inject(function(filterRunnerService) {
                if (!$filterRunnerService) {
                    advisors = newAdvisors();
                    $filterRunnerService = filterRunnerService;

                }
            })
        );

        it('filterRunnerService should exist', function() {
            expect($filterRunnerService).toBeDefined();
            expect($filterRunnerService.filters).toEqual({});
            expect($filterRunnerService.activeFilters).toEqual([]);
            expect($filterRunnerService.allData).toEqual([]);
            expect($filterRunnerService.filteredData).toEqual([]);
            expect($filterRunnerService.hasOwnProperty('clearFilters')).toEqual(true);
            expect($filterRunnerService.hasOwnProperty('setFilters')).toEqual(true);
            expect($filterRunnerService.hasOwnProperty('filter')).toEqual(true);
        });
        it('filterRunnerService should be able to set langFilterService and provinceFilterService', function() {
            $filterRunnerService.filters.province = provinceFilterServiceMock;
            $filterRunnerService.filters.province.value = provinceFilterServiceMock.options[0];
            $filterRunnerService.filters.lang = langFilterServiceMock;
            $filterRunnerService.filters.lang.value = langFilterServiceMock.options[0];
            expect($filterRunnerService.filters.hasOwnProperty('lang')).toEqual(true);
            expect($filterRunnerService.filters.hasOwnProperty('province')).toEqual(true);
        });
        it('filterRunnerService should be able to set array of data to be filtered', function() {
            $filterRunnerService.allData = advisors;
            expect($filterRunnerService.allData).toEqual(advisors);
        });
        it('filterRunnerService should be able to activate/deactivate language filters', function() {
            $filterRunnerService.setFilters(langFilterServiceMock.label);
            expect($filterRunnerService.activeFilters[0]).toEqual(langFilterServiceMock.filterFunc);
            langFilterServiceMock.value = '';
            $filterRunnerService.setFilters(langFilterServiceMock.label);
            expect($filterRunnerService.activeFilters[0]).toEqual(undefined);
        });
        it('filterRunnerService should be able to activate/deactivate filters', function() {
            langFilterServiceMock.value = langFilterServiceMock.options[1];
            $filterRunnerService.setFilters(langFilterServiceMock.label);
            expect($filterRunnerService.activeFilters[0]).toEqual(langFilterServiceMock.filterFunc);
        });
        it('filterRunnerService should be able to activate/deactivate filters', function() {
            spyOn($filterRunnerService.activeFilters, 0).and.returnValues(
                true,
                true,
                true,
                true,
                true,
                false,
                false,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true
            );
            var temp = $filterRunnerService.filter();
            expect(temp.length).toEqual(englishBilingualAdvisors.length);
            _.forEach(englishBilingualAdvisors, function(advisor, index) {
                //console.log(index, temp[index].firstName, advisor.firstName);
                expect(temp[index]).toEqual(advisor);
            });
        });

        it('filterRunnerService should be able to activate/deactivate province filters', function() {
            $filterRunnerService.setFilters(provinceFilterServiceMock.label);
            expect($filterRunnerService.activeFilters[1]).toEqual(provinceFilterServiceMock.filterFunc);
            provinceFilterServiceMock.value = '';
            $filterRunnerService.setFilters(provinceFilterServiceMock.label);
            expect($filterRunnerService.activeFilters[1]).toEqual(undefined);
        });
        it('filterRunnerService should be able to activate/deactivate filters', function() {
            provinceFilterServiceMock.value = provinceFilterServiceMock.options[6];
            $filterRunnerService.setFilters(provinceFilterServiceMock.label);
            expect($filterRunnerService.activeFilters[1]).toEqual(provinceFilterServiceMock.filterFunc);
        });

        it('filterRunnerService should be able to activate/deactivate filters', function() {
            spyOn($filterRunnerService.activeFilters, 0).and.returnValues(
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                true
            );

            spyOn($filterRunnerService.activeFilters, 1).and.returnValues(
                true
            );
            expect($filterRunnerService.filter()).toEqual(englishBilingual_NS_Advisors)

        });

        it('filterRunnerService should be able to activate/deactivate filters', function() {
            langFilterServiceMock.value = langFilterServiceMock.options[0];
            provinceFilterServiceMock.value = provinceFilterServiceMock.options[9];

            mockDefaultLang();

            spyOn($filterRunnerService.activeFilters, 1).and.returnValues(
                true,//0
                true,//1
                true,//2
                false,//3
                true,//4
                false,//5
                false,//6
                true,//7
                false,//8
                false,//9
                true,//10
                false,//11
                false,//12
                true,//13
                false//14
            );
            expect($filterRunnerService.filter()).toEqual(ON_Advisors());

        });

        it('filterRunnerService should be able to activate/deactivate filters', function() {
            provinceFilterServiceMock.value = provinceFilterServiceMock.options[0];

            mockDefaultLang();

            MockDefaultProvince();
            expect($filterRunnerService.filter()).toEqual(advisors)

        });
/*
        it('filterRunnerService should be able to filter by province="AB"', function() {
            langFilterServiceMock.value = langFilterServiceMock.options[0];
            provinceFilterServiceMock.value = provinceFilterServiceMock.options[0];
            mockDefaultLang();

            spyOn($filterRunnerService.activeFilters, 1).and.returnValues(
                true,//0
                true,//1
                true,//2
                false,//3
                true,//4
                false,//5
                false,//6
                true,//7
                false,//8
                false,//9
                true,//10
                false,//11
                false,//12
                true,//13
                false//14
            );
            expect($filterRunnerService.filter()).toEqual(advisors)

        });
*/
    });
})();