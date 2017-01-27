(function () {
    'use strict';

    angular.module('evolution')
        .config(interceptors)
        .config(translations)
		.config(hrefSanitization);//remove this if we are fine with using buttons and window.open to open pdfs instead of ng-href

    interceptors.$inject = ['$httpProvider'];
    translations.$inject = ['$translateProvider'];
	hrefSanitization.$inject = ['$compileProvider'];
	
	
    function hrefSanitization($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
	}

    /* @ngInject */
    function interceptors($httpProvider) {
        //$httpProvider.interceptors.push('CoreInterceptor');
        //$httpProvider.interceptors.push('SearchInterceptor');

    }

    function translations($translateProvider){
        $translateProvider.preferredLanguage('en').useSanitizeValueStrategy('sanitizeParameters');
    }
})();

/*
 (function () {
 'use strict';

 angular.module('evolution')
 .config(interceptors)
 .config(translations);

 interceptors.$inject = ['$httpProvider'];
 translations.$inject = ['$translateProvider', 'tmhDynamicLocaleProvider'];


function interceptors($httpProvider) {
    //$httpProvider.interceptors.push('CoreInterceptor');
    //$httpProvider.interceptors.push('SearchInterceptor');

}


function translations($translateProvider, tmhDynamicLocaleProvider) {

    var d = encodeURIComponent((new Date()).toString());
    $translateProvider
    // get warnings in the developer console, regarding forgotten IDs in translations
    // requires 'bower install angular-translate-handler-log'
    //.useMissingTranslationHandlerLog()

    // Tell the translation system how to sanitize HTML input
        .useSanitizeValueStrategy('sanitizeParameters')

        // Configure the translation loader
        .useStaticFilesLoader({
            prefix: 'assets/locales/locale-',
            suffix: '.json?q=' + d
        })

        // Optionally use generic translations as opposed to localized translations
        .registerAvailableLanguageKeys(['en', 'fr'], {
            'en*': 'en',
            'fr*': 'fr'
        })

        // Determine the browser's preferred language
        .determinePreferredLanguage()

        // force default language
        //.preferredLanguage('en_US')

        .useLocalStorage();

    // Configure the locale loader
    tmhDynamicLocaleProvider.localeLocationPattern(
        'assets/locales/angular-locale_{{locale}}.js');
}

})();

 */