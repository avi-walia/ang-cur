(function () {
    'use strict';

    angular.module('evolution')
        .run(runBlock);

    runBlock.$inject = [
        '$interval',
        '$rootScope',
        '$translate',
        '$window',
        'languageSwitcherService',
        'loadingService',
        'notificationService',
        'pageStateResolver'
    ];

    /* @ngInject */

    function runBlock(
        $interval,
        $rootScope,
        $translate,
        $window,
        languageSwitcherService,
        loadingService,
        notificationService,
        pageStateResolver
    ) {
        $rootScope.locale = null;
        var didScroll = false;
        var lastScrollTop = 0;
        var delta = 10;
        var navbarHeight = document.getElementById('header');

        var lastSt = 0;
        var scrollDebounce = 250;//250ms
        var headerClasses = "";
        window.onscroll = function() {

            didScroll = true;
        };

        $interval(function() {
            if (didScroll) {
                hasScrolled();
            }
        }, scrollDebounce);

        function hasScrolled() {
            if (headerClasses === "") {
                headerClasses = document.getElementById('header').className;
            }
            //var st = window.scrollTop();
            var st = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

            // Make sure they scroll more than delta
            if(Math.abs(lastScrollTop - st) <= delta){
                return;
            }

            // If they scrolled down and are past the navbar, add class .nav-up.
            // This is necessary so you never see what is "behind" the navbar.
            if (st > lastScrollTop && st > navbarHeight){
                // Scroll Down
                document.getElementById('header').className = headerClasses.replace("nav-down", "nav-up");
            } else {
                // Scroll Up
                //if((st - lastScrollTop) < delta) {
                    //document.getElementById('header').removeClass('nav-up').addClass('nav-down');
                    document.getElementById('header').className = headerClasses.replace("nav-up", "nav-down");
                //}
            }

            lastScrollTop = st;
            didScroll = false;
        }

        // ionic stuff
        /*
        $ionicPlatform.ready(function()
        {
            if(window.cordova && window.cordova.plugins.Keyboard)
            {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                console.warn("ionic: hideKeyboardAccessoryBar");
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                console.warn("ionic:keyboard.disableScroll");
                cordova.plugins.Keyboard.disableScroll(false);
            }
            if(window.StatusBar)
            {
                console.warn("ionic:StatusBar.styleDefault");
                StatusBar.styleDefault();
                StatusBar.overlaysWebView(false);
            }
        });
*/
        // an object that holds the requested page configuration
        //@todo: add this one to the Registry
        $rootScope.oRequestedPageConfig = {};

        // Set dynamically loaded default values for 'currency', 'calendar'
        // and other angular components from /assets/locales/angular-locale_*.js
        $rootScope.$on('$translateChangeStart', function (event, locale) {
            // this returns a promise
            // trigger localization of third-party libraries.
            // E.g.,
            //moment.locale(locale.language);

        });
        $rootScope.$on('$translateChangeSuccess', function (event, locale) {
            $rootScope.isEnglish = locale.language === 'en';
            $rootScope.documentLanguage = locale.language;

        });

        $rootScope.$on('$stateChangeError',
            function (event, toState, toParams, fromState, fromParams, error) {
                pageStateResolver.pageLoading = false;
                console.warn('Router Error:', error);
            });

        $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                notificationService.updateMessageKey(toState.name);

                //Check routes.config.json for configurating oPageConfig objects
                pageStateResolver.getPageConfigFromState(toState.name, function (oPageConfig) {
                    console.log('oPageConfig: ', oPageConfig);
                    if ('pageName' in oPageConfig) {
                        $rootScope.oRequestedPageConfig = oPageConfig;
                    }
                });

                /*
                 * Sets the current page for:
                 *
                 * dynamic CSS class on main layout,
                 */
                pageStateResolver.setActivePageName(toState.name);

                // pageStateResolver.setPreviousPageName(toState.name);
                // pageStateResolver.setNextPageName(toState.name);

                if (toState.resolve) {
                    pageStateResolver.pageLoading = false;
                }

                //scroll at the top of the page after each route change
                $window.scrollTo(0, 0);

            });

        $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
            console.error('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
            console.error(unfoundState, fromState, fromParams);
        });


        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                // console.log('calling languageSwitcher');
                languageSwitcherService.switchLanguages(toState.name);
                loadingService.loading = true;
                console.log('fromState: ', fromState);
                console.log('toState: ', toState);
                console.log('toParams: ', toParams);
                console.log('fromParams: ', fromParams);
                if (fromParams.hasOwnProperty('locale') && fromParams.locale !== toParams.locale && (toState.url === fromState.url || fromState.url !== "^")) {
                    //event.preventDefault();

                }
                //console.log('on $stateChangeStart, fromState:', fromState);
                console.log('on $stateChangeStart, fromState() name:', fromState.name);
                console.log('on $stateChangeStart, toState() name:', toState.name);
                console.log('on $stateChangeStart, toParams() name:', toParams);

                ///////// *** KEEP ME AT THE TOP, WE HAVE TO NEGOTIATE THE LANGUAGE URL SWITCH !!! *** /////////
                // use LOCALE from URL, if any
                if (toParams.locale) {
                    // set LOCALE from URL
                    $translate.use(toParams.locale);
                } else {
                    // get user defined locale
                    toParams.locale = $translate.use();
                    if (!toParams.locale) {
                        // get storage defined locale
                        var translateLocalStorageKey = $translate.storageKey(),
                            translateStorage = $translate.storage();
                        console.log('translateLocalStorageKey: ', translateLocalStorageKey);
                        console.log('translateStorage: ', translateStorage);
                        toParams.locale = translateStorage.get(translateLocalStorageKey);
                        console.log('toParams.locale: ', toParams.locale);
                        if (!toParams.locale) {
                            // no locale set by user or into local storage.
                            // force 'en' as default locale
                            toParams.locale = 'en';
                            // add default lang to $translate storage
                            translateStorage.put(translateLocalStorageKey, toParams.locale);
                        }
                    }
                    // ...finally, use it !
                    $translate.use(toParams.locale);
                }
                // sets up lang attribute on the html tag and language class on body tag
                $rootScope.documentLanguage = toParams.locale;//at this point $translate.use() should return the same thing as toParams.locale
                ///////// *** END LANGUAGE NEGOTIATION *** /////////


                pageStateResolver.pageLoading = false;
                if (toState.resolve) {
                    pageStateResolver.pageLoading = true;
                }

            });

    }//end: runBlock

})();
