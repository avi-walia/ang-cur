var $langFilterService;

(function () {
    describe('langFilterService test', function () {

        beforeEach(function() {
            module('advisorLocator.features.searchByName');
        });


        beforeEach(
            inject(function(langFilterService) {
                $langFilterService = langFilterService;

            })
        );

        it('LangFilterService should exist', function() {
            expect($langFilterService).toBeDefined();
            expect($langFilterService.defaultValue).toEqual(langFilterServiceMock.defaultValue);
            expect($langFilterService.globalLanguage).toEqual(langFilterServiceMock.globalLanguage);
            expect($langFilterService.hasOwnProperty('filterFunc')).toEqual(true);
            expect($langFilterService.label).toEqual(langFilterServiceMock.label);
            expect($langFilterService.value).toEqual(langFilterServiceMock.value);
            expect($langFilterService.options).toEqual(langFilterServiceMock.options);

        });

        it('LangFilterService should allow any language by default', function() {
            expect($langFilterService.filterFunc(advisorLanguages.english)).toEqual(true);
            expect($langFilterService.filterFunc(advisorLanguages.bilingual)).toEqual(true);
            expect($langFilterService.filterFunc(advisorLanguages.french)).toEqual(true);
        });

        it('LangFilterService should allow bilingual or english speaking advisors', function() {
            $langFilterService.value = 'English';
            expect($langFilterService.filterFunc(advisorLanguages.english)).toEqual(true);
            expect($langFilterService.filterFunc(advisorLanguages.bilingual)).toEqual(true);
            expect($langFilterService.filterFunc(advisorLanguages.french)).toEqual(false);
        });

        it('LangFilterService should allow bilingual or french speaking advisors', function() {
            $langFilterService.value = 'French';
            expect($langFilterService.filterFunc(advisorLanguages.english)).toEqual(false);
            expect($langFilterService.filterFunc(advisorLanguages.bilingual)).toEqual(true);
            expect($langFilterService.filterFunc(advisorLanguages.french)).toEqual(true);
        });

    });
})();