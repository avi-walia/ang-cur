(function () {
    'use strict';

    angular.module('evolution.core.main')
        .config([
            '$stateProvider',
            '$urlMatcherFactoryProvider',
            '$urlRouterProvider',
            function ($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {
                function valToString(val) {
                    return val !== null ? decodeURIComponent(val).toString() : val;
                }

                $urlMatcherFactoryProvider.type('doURIdecode', {
                    encode: valToString,
                    decode: valToString,
                    is: function () {
                        return true;
                    }
                });

                /**
                 * There seems to be a problem with otherwise('/url') it keeps looping.
                 * Instead redirect to a state $urlRouterProvider.otherwise('/aio/portfolio');
                 */

                $urlRouterProvider.otherwise(function ($injector) {
                    $injector.invoke(['$state', 'deviceDetector', function ($state, deviceDetector) {
                       
                        // //if we are not in IE 9 then lets try to go to portfolio.
                        // if (!(deviceDetector.browser === 'ie' && deviceDetector.browser_version <= '9.0')  ) {
                            // @todo: check if back btn functionality apply
                            //$state.go('main.advisorLocator.portfolio');
                            // $state.go('main.evolution.fee.profileSearch');
                            $state.go('main.evolution.test');
                        // }
                    }]);

                });



                $stateProvider
                    .state('main', {
                        url: '/{locale:(?:en|fr)}',
                        abstract: true,
                        controller: 'MainCtrl as Main',
                        templateUrl: 'app/core/layout/main.layout.html'
                    })
                    .state('main.evolution', {
                        url: '/evolution',
                        abstract: true,
                        views: {
                            'content': {}
                        }
                    })

                    /************Search by Name ****************/
             /*       .state('main.advisorLocator.searchByName', {
                        abstract: true,
                        url: '/searchByName',
                        views: {
                            // use absolute naming [view-name @ state where the view is defined]
                            'content@main': {
                                controller: 'SearchByNameCtrl as SearchByName',
                                templateUrl: 'app/features/containers/searchByName/searchByName.layout.tpl.html'

                            }
                        }
                    })*/

                    /****** FEE PROPOSAL ROUTES STARTS HERE **/
                    .state('main.evolution.fee', {
                        abstract: true,
                        views: {
                            'content@main': {}
                        }
                    })
                    .state('main.evolution.fee.profileSearch', {
                        url: '/fee/profile-search',
                        views: {
                            // 'header@main': {
                            //     template: '<ci-header></ci-header>'
                            // },
                            'content@main': {

                                template: '<profile-search display-toolbar="false"></profile-search>'
                            }
                            // 'footer@main': {
                            //     template: '<ci-footer next-state="\'main.evolution.fee.contactInfo\'" ></ci-footer>'
                            // }
                        }
                    })
                    .state('main.evolution.fee.contactInfo', {
                        url: '/fee/contact-info',
                        views: {
                            // 'header@main': {
                            //     template: '<ci-header></ci-header>'
                            // },
                            'content@main': {

                                template: '<contact-info></contact-info>'
                            }
                            // 'footer@main': {
                            //     template: '<ci-footer next-state="\'main.evolution.fee.investmentOverview\'" previous-state="\'main.evolution.fee.profileSearch\'"></ci-footer>'
                            // }
                        }
                    })
                    .state('main.evolution.fee.investmentOverview', {
                        url: '/fee/investment-overview',
                        views: {
                            // 'header@main': {
                            //     template: '<ci-header></ci-header>'
                            // },
                            'content@main': {

                                template: '<investment-overview></investment-overview>'
                            }
                            // 'footer@main': {
                            //     template: '<ci-footer next-state="\'main.evolution.fee.serviceFees\'" previous-state="\'main.evolution.fee.contactInfo\'"></ci-footer>'
                            // }
                        }
                    })
                    .state('main.evolution.fee.serviceFees', {
                        url: '/fee/service-fees',
                        views: {
                            // 'header@main': {
                            //     template: '<ci-header></ci-header>'
                            // },
                            'content@main': {

                                template: '<service-fees></service-fees>'
                            }
                            // 'footer@main': {
                            //     template: '<ci-footer next-state="\'main.evolution.fee.summary\'" previous-state="\'main.evolution.fee.investmentOverview\'"></ci-footer>'
                            // }
                        }
                    })

                    /*** END OF FEE PROPOSAL ROUTES ***/

                    .state('main.evolution.test', {
                        url: '/test',
                        reloadOnSearch: false,
                        views: {
                            'content@main': {
                                template: '<test></test>'
                            }
                        }
                    })
                    .state('main.evolution.abstract', {
                        url: '/abstract',
                        abstract: true,
                        views: {
                            "content@main": {
                                controller: 'test3Ctrl as Test',
                                //templateUrl: 'app/core/layout/main.layout.html'
                                templateUrl: 'app/features/components/test3/test3.tpl.html'
                            }
                        }
                    })
                    .state('main.evolution.abstract.test4', {
                        url: '/test4',
                        abstract: false,
                        views: {
                            'content2@main.evolution.abstract': {
                                template: '<test4></test4>'
                            }
                        }
                    })


                   ;


            }
        ]);
})();