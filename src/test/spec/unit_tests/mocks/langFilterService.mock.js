var langFilterServiceMock = {
    defaultValue: 'Language',
    globalLanguage: 'Bilingual',
    label: 'lang',
    value: 'Language',
    options: [
        'Language',
        'English',
        'French'
    ],
    filterFunc: function(advisor) {}
}
var advisorLanguages = {
    english: {
        spokenLanguage: 'English'
    },
    french: {
        spokenLanguage: 'French'

    },
    bilingual: {
        spokenLanguage: 'Bilingual'
    }
}

//designed to be used with filterRunnerService.allData = advisors
var mockEnglishFilter = function() {
    spyOn(langFilterServiceMock, "filterFunc").and.returnValues(
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
}