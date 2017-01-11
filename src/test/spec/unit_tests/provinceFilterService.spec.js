var $provinceFilterService;

(function () {
    describe('provinceFilterService test', function () {
        /*
        var possibleValues = [
            'Province',
            'AB',
            'BC',
            'MB',
            'NB',
            'NL',
            'NS',
            'NT',
            'NU',
            'ON',
            'PE',
            'QC',
            'SK',
            'YT'
        ];
        */

        beforeEach(function() {
            module('advisorLocator.features.searchByName');
        });


        beforeEach(
            inject(function(provinceFilterService) {
                $provinceFilterService = provinceFilterService;

            })
        );

        it('ProvinceFilterService should exist', function() {
            expect($provinceFilterService).toBeDefined();



            expect($provinceFilterService.defaultValue).toEqual('Province');
            expect($provinceFilterService.hasOwnProperty('filterFunc')).toEqual(true);
            expect($provinceFilterService.label).toEqual('province');
            expect($provinceFilterService.value).toEqual('Province');
            expect($provinceFilterService.options).toEqual(provinceFilterServiceMock.options);
/*



            */

        });
        it('ProvinceFilterService should show all provinces by default', function() {

            expect($provinceFilterService.filterFunc(provinceFilter.AB)).toEqual(true);
            expect($provinceFilterService.filterFunc(provinceFilter.BC)).toEqual(true);
            expect($provinceFilterService.filterFunc(provinceFilter.MB)).toEqual(true);
            expect($provinceFilterService.filterFunc(provinceFilter.NB)).toEqual(true);
            expect($provinceFilterService.filterFunc(provinceFilter.NL)).toEqual(true);
            expect($provinceFilterService.filterFunc(provinceFilter.NS)).toEqual(true);
            expect($provinceFilterService.filterFunc(provinceFilter.NT)).toEqual(true);
            expect($provinceFilterService.filterFunc(provinceFilter.NU)).toEqual(true);
            expect($provinceFilterService.filterFunc(provinceFilter.ON)).toEqual(true);
            expect($provinceFilterService.filterFunc(provinceFilter.PE)).toEqual(true);
            expect($provinceFilterService.filterFunc(provinceFilter.QC)).toEqual(true);
            expect($provinceFilterService.filterFunc(provinceFilter.SK)).toEqual(true);
            expect($provinceFilterService.filterFunc(provinceFilter.YT)).toEqual(true);
        });
        it('ProvinceFilterService should be able to filter only "AB"', function() {
            $provinceFilterService.value = provinceFilterServiceMock.options[1];
            expect($provinceFilterService.filterFunc(provinceFilter.AB)).toEqual(true);
            expect($provinceFilterService.filterFunc(provinceFilter.BC)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.MB)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.NB)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.NL)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.NS)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.NT)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.NU)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.ON)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.PE)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.QC)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.SK)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.YT)).toEqual(false);
        });
        it('ProvinceFilterService should be able to filter only "BC"', function() {
            $provinceFilterService.value = provinceFilterServiceMock.options[2];
            expect($provinceFilterService.filterFunc(provinceFilter.AB)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.BC)).toEqual(true);
            expect($provinceFilterService.filterFunc(provinceFilter.MB)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.NB)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.NL)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.NS)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.NT)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.NU)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.ON)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.PE)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.QC)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.SK)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.YT)).toEqual(false);
        });
        it('ProvinceFilterService should be able to filter only "MB"', function() {
            $provinceFilterService.value = provinceFilterServiceMock.options[3];
            expect($provinceFilterService.filterFunc(provinceFilter.AB)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.BC)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.MB)).toEqual(true);
            expect($provinceFilterService.filterFunc(provinceFilter.NB)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.NL)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.NS)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.NT)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.NU)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.ON)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.PE)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.QC)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.SK)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.YT)).toEqual(false);
        });
        it('ProvinceFilterService should be able to filter only "NB"', function() {
            $provinceFilterService.value = provinceFilterServiceMock.options[4];
            expect($provinceFilterService.filterFunc(provinceFilter.AB)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.BC)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.MB)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.NB)).toEqual(true);
            expect($provinceFilterService.filterFunc(provinceFilter.NL)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.NS)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.NT)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.NU)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.ON)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.PE)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.QC)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.SK)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.YT)).toEqual(false);
        });
        it('ProvinceFilterService should be able to filter only "NL"', function() {
            $provinceFilterService.value = provinceFilterServiceMock.options[5];
            expect($provinceFilterService.filterFunc(provinceFilter.AB)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.BC)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.MB)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.NB)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.NL)).toEqual(true);
            expect($provinceFilterService.filterFunc(provinceFilter.NS)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.NT)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.NU)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.ON)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.PE)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.QC)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.SK)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.YT)).toEqual(false);
        });
        it('ProvinceFilterService should be able to filter only "NS"', function() {
            $provinceFilterService.value = provinceFilterServiceMock.options[6];
            expect($provinceFilterService.filterFunc(provinceFilter.AB)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.BC)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.MB)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.NB)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.NL)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.NS)).toEqual(true);
            expect($provinceFilterService.filterFunc(provinceFilter.NT)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.NU)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.ON)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.PE)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.QC)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.SK)).toEqual(false);
            expect($provinceFilterService.filterFunc(provinceFilter.YT)).toEqual(false);
        });
    });
    it('ProvinceFilterService should be able to filter only "NT"', function() {
        $provinceFilterService.value = provinceFilterServiceMock.options[7];
        expect($provinceFilterService.filterFunc(provinceFilter.AB)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.BC)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.MB)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NB)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NL)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NS)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NT)).toEqual(true);
        expect($provinceFilterService.filterFunc(provinceFilter.NU)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.ON)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.PE)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.QC)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.SK)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.YT)).toEqual(false);
    });
    it('ProvinceFilterService should be able to filter only "NU"', function() {
        $provinceFilterService.value = provinceFilterServiceMock.options[8];
        expect($provinceFilterService.filterFunc(provinceFilter.AB)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.BC)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.MB)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NB)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NL)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NS)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NT)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NU)).toEqual(true);
        expect($provinceFilterService.filterFunc(provinceFilter.ON)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.PE)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.QC)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.SK)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.YT)).toEqual(false);
    });
    it('ProvinceFilterService should be able to filter only "ON"', function() {
        $provinceFilterService.value = provinceFilterServiceMock.options[9];
        expect($provinceFilterService.filterFunc(provinceFilter.AB)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.BC)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.MB)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NB)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NL)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NS)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NT)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NU)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.ON)).toEqual(true);
        expect($provinceFilterService.filterFunc(provinceFilter.PE)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.QC)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.SK)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.YT)).toEqual(false);
    });
    it('ProvinceFilterService should be able to filter only "PE"', function() {
        $provinceFilterService.value = provinceFilterServiceMock.options[10];
        expect($provinceFilterService.filterFunc(provinceFilter.AB)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.BC)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.MB)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NB)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NL)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NS)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NT)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NU)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.ON)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.PE)).toEqual(true);
        expect($provinceFilterService.filterFunc(provinceFilter.QC)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.SK)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.YT)).toEqual(false);
    });
    it('ProvinceFilterService should be able to filter only "QC"', function() {
        $provinceFilterService.value = provinceFilterServiceMock.options[11];
        expect($provinceFilterService.filterFunc(provinceFilter.AB)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.BC)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.MB)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NB)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NL)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NS)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NT)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NU)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.ON)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.PE)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.QC)).toEqual(true);
        expect($provinceFilterService.filterFunc(provinceFilter.SK)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.YT)).toEqual(false);
    });
    it('ProvinceFilterService should be able to filter only "SK"', function() {
        $provinceFilterService.value = provinceFilterServiceMock.options[12];
        expect($provinceFilterService.filterFunc(provinceFilter.AB)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.BC)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.MB)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NB)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NL)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NS)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NT)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NU)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.ON)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.PE)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.QC)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.SK)).toEqual(true);
        expect($provinceFilterService.filterFunc(provinceFilter.YT)).toEqual(false);
    });
    it('ProvinceFilterService should be able to filter only "YT"', function() {
        $provinceFilterService.value = provinceFilterServiceMock.options[13];
        expect($provinceFilterService.filterFunc(provinceFilter.AB)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.BC)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.MB)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NB)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NL)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NS)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NT)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.NU)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.ON)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.PE)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.QC)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.SK)).toEqual(false);
        expect($provinceFilterService.filterFunc(provinceFilter.YT)).toEqual(true);
    });
})();