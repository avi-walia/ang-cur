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
                        $state.go('main.evolution.selectClientProfile');
//                             $state.go('main.evolution.fee.profileSearch');
                        // }
                        // $state.go('main.evolution.fee.profileSearch');
                        // $state.go('main.evolution.abstract.test4');
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

                    //You can create profile & open existing profile in this state
                    .state('main.evolution.selectClientProfile', {
                        url: '/select-client-profile',
                        views: {

                            'content@main': {
                                // template: '<test></test>'
                                template: '<select-client-profile></select-client-profile>'
                            }
                        }
                    })
                    .state('main.evolution.clientAccountInfo', {
                        url: '/client-account-info',
                        views: {

                            'content@main': {
                                // template: '<test></test>'
                                template: '<client-account-info></client-account-info>'
                            }
                        }
                    })
                    .state('main.evolution.ipq', {
                        url: '/ipq',
                        views: {

                            'content@main': {
                                // template: '<test></test>'
                                template: '<ipq></ipq>'
                            }
                        }
                    })
                    .state('main.evolution.portfolioSelection', {
                        url: '/portfolio-selection',
                        views: {

                            'content@main': {
                                // template: '<test></test>'
                                template: '<portfolio-selection></portfolio-selection>'
                            }
                        }
                    })
                    .state('main.evolution.fundCustomization', {
                        url: '/fund-customization',
                        views: {

                            'content@main': {
                                // template: '<test></test>'
                                template: '<fund-customization></fund-customization>'
                            }
                        }
                    })
                    .state('main.evolution.advisorInfo', {
                        url: '/advisor-info',
                        views: {

                            'content@main': {
                                // template: '<test></test>'
                                template: '<advisor-info></advisor-info>'
                            }
                        }
                    })
                    .state('main.evolution.profileSummary', {
                        url: '/profile-summary',
                        views: {

                            'content@main': {
                                // template: '<test></test>'
                                template: '<profile-summary></profile-summary>'
                            }
                        }
                    })
                    .state('main.evolution.reports', {
                        url: '/reports',
                        views: {

                            'content@main': {
                                // template: '<test></test>'
                                template: '<reports></reports>'
                            }
                        }
                    })
                    .state('main.evolution.split', {
                        url: '/split-profile',
                        views: {

                            'content@main': {
                                // template: '<test></test>'
                                template: '<split-profile></split-profile>'
                            }

                        }
                    })

                    .state('main.evolution.help', {
                        url: '/help',
                        views: {

                            'content@main': {
                                // template: '<test></test>'
                                template: '<help></help>'
                            }

                        }
                    })

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

                            'content@main': {
                                template: '<profile-search display-toolbar="false"></profile-search>'
                            }
                        }
                    })
                    .state('main.evolution.fee.contactInfo', {
                        url: '/fee/contact-info',
                        views: {

                            'content@main': {

                                template: '<contact-info></contact-info>'
                            }
                        }
                    })
                    .state('main.evolution.fee.investmentOverview', {
                        url: '/fee/investment-overview',
                        views: {

                            'content@main': {

                                template: '<investment-overview></investment-overview>'
                            }
                        }
                    })
                    .state('main.evolution.fee.serviceFees', {
                        url: '/fee/service-fees',
                        views: {

                            'content@main': {

                                template: '<service-fees></service-fees>'
                            }
                        }
                    })
                    .state('main.evolution.fee.summary', {
                        url: '/fee/summary',
                        views: {

                            'content@main': {

                                template: '<fee-summary></fee-summary>'
                            }
                        }
                    })
                    .state('main.evolution.fee.reports', {
                        url: '/fee/reports',
                        views: {
//                            'header@main': {
//                                template: '<fee-header></fee-header>'
//                            },
                            'content@main': {

                                template: '<fee-reports></fee-reports>'
                            }
//                            ,
//                            'footer@main': {
//                                template: '<fee-footer></fee-footer>'
//                            }
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